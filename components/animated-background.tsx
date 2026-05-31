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

      <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[120px] animate-aurora" />
      <div className="absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px] animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/15 blur-[120px] animate-aurora [animation-delay:-12s]" />
    </div>
  )
}
