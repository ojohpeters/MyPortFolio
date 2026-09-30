"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

/** framer-motion honours the OS reduced-motion setting everywhere. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
