"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/** Thin gradient bar pinned to the top that fills as the page scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-primary via-fuchsia-500 to-accent"
    />
  )
}
