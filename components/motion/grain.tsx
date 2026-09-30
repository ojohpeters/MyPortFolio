/** Subtle animated film-grain overlay (static under reduced motion). */
export default function Grain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden opacity-[0.045] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen">
      <svg className="grain absolute -inset-[10%] h-[120%] w-[120%]">
        <filter id="grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  )
}
