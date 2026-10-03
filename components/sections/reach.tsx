"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"
import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import { Clock, Globe2, MapPin, Wifi } from "lucide-react"
import SectionHeading from "@/components/section-heading"

const ease = [0.22, 1, 0.36, 1] as const
const KADUNA: [number, number] = [10.52, 7.44]
const markers: { location: [number, number]; size: number }[] = [
  { location: KADUNA, size: 0.06 },
  { location: [9.08, 7.4], size: 0.035 },
  { location: [6.52, 3.38], size: 0.035 },
  { location: [38.9, -77.04], size: 0.05 },
]

function Globe() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const reduce = useReducedMotion()
  const drag = useRef<{ x: number; phi: number } | null>(null)

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const dark = resolvedTheme === "dark"
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = el.offsetWidth
    // Centre on the mid-Atlantic so Nigeria and the US are both in view,
    // then rock gently either side rather than spinning them out of frame.
    const BASE = Math.PI - ((-32 * Math.PI) / 180 - Math.PI / 2)
    let phi = BASE
    let target = phi
    let offset = 0
    const t0 = performance.now()
    let visible = true
    let raf = 0

    const globe = createGlobe(el, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi,
      theta: 0.22,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.4 : 1.2,
      mapSamples: 16000,
      mapBrightness: dark ? 5 : 8,
      mapBaseBrightness: dark ? 0 : 0.05,
      baseColor: dark ? [0.3, 0.27, 0.24] : [1, 1, 1],
      markerColor: [0.93, 0.36, 0.08],
      glowColor: dark ? [0.22, 0.16, 0.11] : [1, 0.96, 0.9],
      markers,
      arcs: markers.slice(1).map((m) => ({ from: KADUNA, to: m.location })),
      arcColor: [0.95, 0.5, 0.15],
      arcWidth: 0.5,
      arcHeight: 0.22,
      opacity: 0.95,
    })

    const loop = () => {
      if (visible) {
        if (!drag.current && !reduce) target = BASE + offset + Math.sin((performance.now() - t0) / 4000) * 0.55
        phi += (target - phi) * 0.06
        globe.update({ phi, width: width * dpr, height: width * dpr })
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)
    const ro = new ResizeObserver(() => (width = el.offsetWidth))
    ro.observe(el)

    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, phi: offset }
      el.setPointerCapture(e.pointerId)
      el.style.cursor = "grabbing"
    }
    const move = (e: PointerEvent) => {
      if (drag.current) {
        offset = drag.current.phi + (e.clientX - drag.current.x) / 180
        target = BASE + offset
      }
    }
    const up = () => {
      drag.current = null
      el.style.cursor = "grab"
    }
    el.addEventListener("pointerdown", down)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerup", up)
    el.addEventListener("pointercancel", up)
    requestAnimationFrame(() => (el.style.opacity = "1"))

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      globe.destroy()
      el.removeEventListener("pointerdown", down)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerup", up)
      el.removeEventListener("pointercancel", up)
    }
  }, [resolvedTheme, reduce])

  return (
    <canvas
      ref={canvas}
      aria-label="Globe showing Kaduna, Nigeria connected to Abuja, Lagos and the United States"
      role="img"
      className="aspect-square w-full cursor-grab opacity-0 transition-opacity duration-1000 ease-standard [contain:layout_paint_size]"
      style={{ touchAction: "pan-y" }}
    />
  )
}

const chips = [
  { icon: MapPin, label: "Kaduna, Nigeria" },
  { icon: Clock, label: "WAT · UTC+1" },
  { icon: Globe2, label: "Nigeria & United States" },
  { icon: Wifi, label: "Remote-first, async-friendly" },
]

export default function Reach() {
  return (
    <section aria-labelledby="reach-title" className="relative overflow-hidden py-24 md:py-32">
      <div className="container grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            index="06"
            eyebrow="Reach"
            className="mb-8 md:mb-10"
            title={
              <span id="reach-title">
                Building from Kaduna, <em>shipping across borders.</em>
              </span>
            }
            description="I work with teams in Nigeria and the United States — Efiko operates in both — and overlap comfortably with European and US East Coast hours."
          />
          <div className="flex flex-wrap gap-2.5">
            {chips.map(({ icon: Icon, label }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.07 }}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                <Icon size={15} className="text-primary" /> {label}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[560px]">
          <div aria-hidden className="absolute inset-[12%] rounded-full bg-primary/20 blur-3xl" />
          <Globe />
        </div>
      </div>
    </section>
  )
}
