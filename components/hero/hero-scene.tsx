"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  PerformanceMonitor,
  RoundedBox,
  Sparkles,
} from "@react-three/drei"
import * as THREE from "three"
import DeployScreen, { SCREEN_H, SCREEN_W } from "./deploy-screen"

type Progress = { get(): number }

const W = 3.6 // laptop width
const D = 2.4 // base depth
const LID_H = 2.3
const SCREEN_WORLD_W = 3.36
const SCREEN_WORLD_H = (SCREEN_WORLD_W * SCREEN_H) / SCREEN_W
const { damp, clamp } = THREE.MathUtils
const easeOutBack = (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2)
const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)

/* ---------- canvas-drawn icon textures (shapes, not font glyphs) ---------- */

type Draw = (c: CanvasRenderingContext2D) => void

function useIconTexture(draw: Draw, w = 256, h = 256) {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const c = canvas.getContext("2d")!
    c.strokeStyle = "#fff"
    c.fillStyle = "#fff"
    c.lineWidth = 16
    c.lineCap = "round"
    c.lineJoin = "round"
    draw(c)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    return tex
  }, [draw, w, h])
}

const drawCloud: Draw = (c) => {
  c.beginPath()
  c.arc(96, 150, 38, Math.PI * 0.5, Math.PI * 1.5)
  c.arc(128, 104, 46, Math.PI * 1.05, Math.PI * 1.95)
  c.arc(168, 138, 32, Math.PI * 1.4, Math.PI * 0.5)
  c.closePath()
  c.stroke()
}
const drawShield: Draw = (c) => {
  c.beginPath()
  c.moveTo(128, 44)
  c.lineTo(196, 72)
  c.bezierCurveTo(196, 150, 170, 190, 128, 214)
  c.bezierCurveTo(86, 190, 60, 150, 60, 72)
  c.closePath()
  c.stroke()
  c.beginPath()
  c.moveTo(98, 128)
  c.lineTo(120, 150)
  c.lineTo(160, 108)
  c.stroke()
}
const drawDb: Draw = (c) => {
  for (const y of [72, 128, 184]) {
    c.beginPath()
    c.ellipse(128, y, 62, 20, 0, 0, Math.PI * 2)
    c.stroke()
  }
  c.beginPath()
  c.moveTo(66, 72)
  c.lineTo(66, 184)
  c.moveTo(190, 72)
  c.lineTo(190, 184)
  c.stroke()
}
const drawCode: Draw = (c) => {
  c.beginPath()
  c.moveTo(92, 82)
  c.lineTo(48, 128)
  c.lineTo(92, 174)
  c.moveTo(164, 82)
  c.lineTo(208, 128)
  c.lineTo(164, 174)
  c.moveTo(144, 64)
  c.lineTo(112, 192)
  c.stroke()
}
const drawBolt: Draw = (c) => {
  c.beginPath()
  c.moveTo(142, 40)
  c.lineTo(78, 140)
  c.lineTo(126, 140)
  c.lineTo(112, 216)
  c.lineTo(178, 110)
  c.lineTo(130, 110)
  c.closePath()
  c.fill()
}
const drawToast: Draw = (c) => {
  c.clearRect(0, 0, 512, 192)
  c.fillStyle = "#10b981"
  c.beginPath()
  c.arc(84, 96, 44, 0, Math.PI * 2)
  c.fill()
  c.strokeStyle = "#04130d"
  c.lineWidth = 12
  c.beginPath()
  c.moveTo(64, 98)
  c.lineTo(80, 114)
  c.lineTo(106, 82)
  c.stroke()
  c.fillStyle = "#fff"
  c.font = "600 46px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  c.fillText("Deployed", 150, 90)
  c.fillStyle = "rgba(255,255,255,0.6)"
  c.font = "400 32px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  c.fillText("Production · 38s", 150, 134)
}

/* ---------- DOM screen projection ---------- */

/** 3×3 homography mapping the unit rect (0,0)-(w,h) onto four points. */
function homography(w: number, h: number, dst: number[][]) {
  const src = [[0, 0], [w, 0], [w, h], [0, h]]
  const A: number[][] = []
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i]
    const [u, v] = dst[i]
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u])
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y, v])
  }
  // Gaussian elimination on the 8×9 augmented matrix
  for (let c = 0; c < 8; c++) {
    let p = c
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r
    ;[A[c], A[p]] = [A[p], A[c]]
    const d = A[c][c] || 1e-9
    for (let k = c; k < 9; k++) A[c][k] /= d
    for (let r = 0; r < 8; r++) {
      if (r === c) continue
      const f = A[r][c]
      for (let k = c; k < 9; k++) A[r][k] -= f * A[c][k]
    }
  }
  const [a, b, c2, d, e, f, g, hh] = A.map((row) => row[8])
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c2},${f},0,1)`
}

const corners = [
  new THREE.Vector3(-SCREEN_WORLD_W / 2, SCREEN_WORLD_H / 2, 0),
  new THREE.Vector3(SCREEN_WORLD_W / 2, SCREEN_WORLD_H / 2, 0),
  new THREE.Vector3(SCREEN_WORLD_W / 2, -SCREEN_WORLD_H / 2, 0),
  new THREE.Vector3(-SCREEN_WORLD_W / 2, -SCREEN_WORLD_H / 2, 0),
]
const tmp = new THREE.Vector3()
const normal = new THREE.Vector3()
const toCam = new THREE.Vector3()

/** Pins a DOM element onto an anchor plane every frame (like drei's
 *  <Html transform>, which doesn't mount reliably with React 19). */
function ScreenProjector({
  anchor,
  overlay,
  visibility,
}: {
  anchor: React.RefObject<THREE.Object3D>
  overlay: React.RefObject<HTMLDivElement | null>
  visibility: React.MutableRefObject<number>
}) {
  useFrame(({ camera, size }) => {
    const a = anchor.current
    const el = overlay.current
    if (!a || !el) return
    a.updateWorldMatrix(true, false)
    const pts = corners.map((c) => {
      tmp.copy(c).applyMatrix4(a.matrixWorld).project(camera)
      return [((tmp.x + 1) / 2) * size.width, ((1 - tmp.y) / 2) * size.height]
    })
    normal.set(0, 0, 1).transformDirection(a.matrixWorld)
    a.getWorldPosition(toCam)
    toCam.subVectors(camera.position, toCam)
    const facing = normal.dot(toCam) > 0
    el.style.transform = homography(SCREEN_W, SCREEN_H, pts)
    el.style.opacity = facing ? String(visibility.current) : "0"
  })
  return null
}

/* ---------- scene pieces ---------- */

function Laptop({
  progress,
  overlay,
}: {
  progress: Progress
  overlay: React.RefObject<HTMLDivElement | null>
}) {
  const root = useRef<THREE.Group>(null!)
  const lid = useRef<THREE.Group>(null!)
  const anchor = useRef<THREE.Object3D>(null!)
  const visibility = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const on = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", on, { passive: true })
    return () => window.removeEventListener("pointermove", on)
  }, [])

  const keys = useIconTexture(
    (c) => {
      c.fillStyle = "#15161b"
      c.fillRect(0, 0, 512, 200)
      c.fillStyle = "#26272e"
      for (let r = 0; r < 5; r++)
        for (let k = 0; k < 14; k++) c.fillRect(8 + k * 36, 10 + r * 38, 30, 30)
    },
    512,
    200,
  )

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const s = clamp(progress.get(), 0, 1)
    const intro = easeOutQuart(clamp(t / 1.8, 0, 1))
    const lidOpen = easeOutQuart(clamp((t - 0.5) / 1.5, 0, 1))
    const g = root.current

    g.position.y = THREE.MathUtils.lerp(-4, 0, intro) - s * 1.4 + Math.sin(t * 0.9) * 0.04
    g.rotation.y = damp(g.rotation.y, -0.42 + pointer.current.x * 0.16 + s * 0.6, 3.5, dt)
    g.rotation.x = damp(g.rotation.x, 0.1 + pointer.current.y * 0.06 + s * 0.3, 3.5, dt)
    lid.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.03, -0.22, lidOpen)
    visibility.current = clamp((lidOpen - 0.55) / 0.3, 0, 1)

    // camera dolly as the hero scrolls away
    state.camera.position.z = 9 + s * 3
    state.camera.position.y = 1.2 + s * 0.8
    state.camera.lookAt(0, 0.9 - s * 0.6, 0)
  })

  const body = (
    <meshPhysicalMaterial color="#2b2d34" metalness={0.85} roughness={0.32} clearcoat={0.8} clearcoatRoughness={0.25} />
  )

  return (
    <group ref={root} position={[0, -4, 0]}>
      {/* base */}
      <RoundedBox args={[W, 0.12, D]} radius={0.05} smoothness={4} position={[0, 0.06, 0]}>
        {body}
      </RoundedBox>
      <mesh position={[0, 0.121, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.1, 1.2]} />
        <meshStandardMaterial map={keys} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.121, 0.72]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 0.72]} />
        <meshStandardMaterial color="#35373f" roughness={0.45} metalness={0.4} />
      </mesh>

      {/* lid, hinged at the back edge */}
      <group ref={lid} position={[0, 0.12, -D / 2 + 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <RoundedBox args={[W, LID_H, 0.08]} radius={0.04} smoothness={4} position={[0, LID_H / 2, -0.04]}>
          {body}
        </RoundedBox>
        <mesh position={[0, LID_H / 2, 0.002]}>
          <planeGeometry args={[W - 0.08, LID_H - 0.08]} />
          <meshStandardMaterial color="#050507" roughness={0.2} metalness={0.2} />
        </mesh>
        <object3D ref={anchor} position={[0, LID_H / 2 + 0.02, 0.006]} />
      </group>
      <ScreenProjector anchor={anchor} overlay={overlay} visibility={visibility} />

      <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={9} blur={2.6} far={3} resolution={512} color="#1b1340" />
    </group>
  )
}

function Tile({
  position,
  draw,
  color,
  delay,
}: {
  position: [number, number, number]
  draw: Draw
  color: string
  delay: number
}) {
  const ref = useRef<THREE.Group>(null!)
  const tex = useIconTexture(draw)
  useFrame(({ clock }) => {
    const k = clamp((clock.elapsedTime - delay) / 0.7, 0, 1)
    ref.current.scale.setScalar(Math.max(0.0001, easeOutBack(k)))
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.5 + delay * 3) * 0.35
  })
  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.9}>
      <group ref={ref} position={position} scale={0.0001}>
        <RoundedBox args={[0.66, 0.66, 0.16]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial color={color} metalness={0.15} roughness={0.22} clearcoat={1} clearcoatRoughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[0.44, 0.44]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

function GlassCard() {
  const ref = useRef<THREE.Group>(null!)
  const tex = useIconTexture(drawToast, 512, 192)
  useFrame(({ clock }) => {
    const k = clamp((clock.elapsedTime - 2.2) / 0.8, 0, 1)
    ref.current.scale.setScalar(Math.max(0.0001, easeOutBack(k)))
  })
  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={ref} position={[-1.35, 0.15, 1.4]} rotation={[0, 0.35, 0]} scale={0.0001}>
        <RoundedBox args={[1.7, 0.66, 0.1]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial transmission={0.55} thickness={0.6} roughness={0.3} ior={1.4} color="#1a1633" clearcoat={1} attenuationColor="#6d5dfc" attenuationDistance={1.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.056]}>
          <planeGeometry args={[1.56, 0.585]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

function Ready({ onReady }: { onReady: () => void }) {
  const frames = useRef(0)
  const done = useRef(false)
  useFrame(() => {
    if (done.current) return
    if (++frames.current > 3) {
      done.current = true
      onReady()
    }
  })
  return null
}

export default function HeroScene({
  active,
  progress,
  onReady,
}: {
  active: boolean
  progress: Progress
  onReady: () => void
}) {
  const [dpr, setDpr] = useState(1.75)
  const overlay = useRef<HTMLDivElement>(null)
  return (
    <div className="relative h-full w-full">
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, dpr]}
      camera={{ position: [0, 1.2, 9], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y", pointerEvents: "none" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 6, 4]} intensity={1.3} />
      <pointLight position={[-4.5, 2.5, -2]} intensity={40} color="#8b5cf6" />
      <pointLight position={[4.5, 1.5, -2.5]} intensity={34} color="#22d3ee" />
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 5, -3]} scale={[10, 3, 1]} />
        <Lightformer intensity={1.4} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} color="#a78bfa" />
        <Lightformer intensity={1.2} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#67e8f9" />
      </Environment>

      <Laptop progress={progress} overlay={overlay} />
      <Tile position={[-2.2, 2.5, -1.4]} draw={drawCloud} color="#7c3aed" delay={1.4} />
      <Tile position={[2.25, 2.75, -1.6]} draw={drawShield} color="#0891b2" delay={1.55} />
      <Tile position={[2.45, 0.95, -0.9]} draw={drawDb} color="#4f46e5" delay={1.7} />
      <Tile position={[0.2, 3.3, -2.4]} draw={drawCode} color="#c026d3" delay={1.85} />
      <Tile position={[-2.5, 1.1, -0.6]} draw={drawBolt} color="#0f766e" delay={2.0} />
      <GlassCard />
      <Sparkles count={46} scale={[9, 5, 4]} position={[0, 1.6, -1]} size={2.2} speed={0.35} color="#a78bfa" opacity={0.7} />

      <Ready onReady={onReady} />
    </Canvas>
      <div
        ref={overlay}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 origin-top-left"
        style={{ width: SCREEN_W, height: SCREEN_H, opacity: 0, willChange: "transform" }}
      >
        <DeployScreen paused={!active} />
      </div>
    </div>
  )
}
