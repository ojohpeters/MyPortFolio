"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

/** Like framer-motion's useReducedMotion, but always false during SSR and the
 *  first client render so branching on it can't cause a hydration mismatch. */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !!reduce
}
