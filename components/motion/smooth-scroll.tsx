"use client"

import { useEffect } from "react"
import Lenis from "lenis"

/** Inertial smooth scrolling. Skipped entirely for reduced-motion users and
 *  on touch devices, where native momentum scrolling already feels right. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduce || coarse) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      autoRaf: true,
      anchors: { offset: -72 },
    })
    return () => lenis.destroy()
  }, [])
  return null
}
