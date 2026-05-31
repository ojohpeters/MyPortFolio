"use client"

/**
 * Fixed, full-page ambient backdrop: a subtle grid plus three slowly drifting
 * "aurora" blobs that tint the page in the brand gradient. Sits behind all
 * content (z-index -10) and is purely decorative.
 */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="absolute -top-32 -left-24 h-64 w-64 rounded-full bg-primary/25 blur-[90px] animate-aurora md:h-[28rem] md:w-[28rem] md:blur-[120px]" />
      <div className="absolute top-1/3 -right-24 h-60 w-60 rounded-full bg-accent/20 blur-[90px] animate-aurora [animation-delay:-6s] md:h-[26rem] md:w-[26rem] md:blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-[90px] animate-aurora [animation-delay:-12s] md:h-[24rem] md:w-[24rem] md:blur-[120px]" />
    </div>
  )
}
