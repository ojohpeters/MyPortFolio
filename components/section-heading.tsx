"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const

/** Eyebrow ("02 — Work"), large display title (wrap accent words in
 *  <em>), and an optional supporting line. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const center = align === "center"
  return (
    <div className={cn("mb-12 max-w-3xl md:mb-16", center && "mx-auto text-center", className)}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className={cn(
          "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
          center && "justify-center",
        )}
      >
        <span className="font-mono text-primary">{index}</span>
        <span className="h-px w-8 bg-border" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease, delay: 0.06 }}
        className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl [&_em]:serif-shimmer [&_em]:text-[1.08em]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease, delay: 0.14 }}
          className={cn(
            "mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            center && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
