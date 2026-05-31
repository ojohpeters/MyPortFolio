"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
}

/** Consistent, animated heading block: a small eyebrow label, a large
 *  gradient-accented title and an optional supporting line. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base text-muted-foreground sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
