"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useReducedMotion } from "framer-motion"
import HeroPoster from "./hero-poster"

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false })

function canUseWebGL() {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

/**
 * Shows the CSS poster immediately, requests the WebGL scene once the browser
 * is idle, and crossfades to it after its first frames render. The poster
 * stays for reduced-motion, Save-Data or no-WebGL visitors. Rendering pauses
 * whenever the stage is offscreen.
 */
export default function HeroStage({ progress }: { progress: { get(): number } }) {
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (reduce) return
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (nav.connection?.saveData || !canUseWebGL()) return
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setLoad(true), { timeout: 2500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setLoad(true), 800)
    return () => window.clearTimeout(id)
  }, [reduce])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="relative h-full w-full">
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-standard"
        style={{ opacity: ready ? 0 : 1 }}
        aria-hidden={ready}
      >
        <HeroPoster />
      </div>
      {load && (
        <div className="absolute inset-0 transition-opacity duration-1000 ease-standard" style={{ opacity: ready ? 1 : 0 }}>
          <HeroScene active={active} progress={progress} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  )
}
