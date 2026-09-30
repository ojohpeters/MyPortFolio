"use client"

import { useEffect, useRef, useState } from "react"
import { Cloud, Database, ShieldCheck, Code2 } from "lucide-react"
import DeployScreen, { SCREEN_H, SCREEN_W } from "./deploy-screen"

/** Scale a fixed-size child to fit its container's width. */
function useFitScale(width: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return [ref, scale] as const
}

const props = [
  { Icon: Cloud, cls: "left-[2%] top-[12%]", delay: "0s" },
  { Icon: ShieldCheck, cls: "right-[0%] top-[4%]", delay: "-2s" },
  { Icon: Database, cls: "right-[4%] bottom-[22%]", delay: "-4s" },
  { Icon: Code2, cls: "left-[6%] bottom-[18%]", delay: "-1s" },
]

/** CSS-3D laptop playing the same story as the WebGL scene. Shown instantly,
 *  and kept when WebGL is unavailable or motion is reduced. */
export default function HeroPoster() {
  const [ref, scale] = useFitScale(SCREEN_W)

  return (
    <div className="relative flex h-full w-full items-center justify-center [perspective:1600px]">
      {props.map(({ Icon, cls, delay }) => (
        <div
          key={cls}
          className={`absolute ${cls} z-0 grid h-12 w-12 animate-float place-items-center rounded-2xl border border-white/40 bg-white/60 text-primary shadow-lg shadow-primary/10 backdrop-blur dark:border-white/10 dark:bg-white/[0.06]`}
          style={{ animationDelay: delay }}
        >
          <Icon size={20} />
        </div>
      ))}

      <div className="relative w-[78%] max-w-[520px] [transform-style:preserve-3d] [transform:rotateX(10deg)_rotateY(-16deg)_rotateZ(1deg)]">
        {/* lid */}
        <div className="rounded-[14px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[2.2%] shadow-[0_40px_80px_-30px_rgba(40,20,120,0.55)] ring-1 ring-black/40">
          <div ref={ref} className="relative w-full overflow-hidden rounded-[8px]" style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}>
            <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
              <DeployScreen />
            </div>
          </div>
        </div>
        {/* base */}
        <div className="relative -mt-px h-4 origin-top rounded-b-[18px] bg-gradient-to-b from-zinc-400 to-zinc-600 [transform:rotateX(62deg)] dark:from-zinc-600 dark:to-zinc-800" style={{ width: "112%", marginLeft: "-6%" }} />
        <div className="mx-auto mt-4 h-6 w-[85%] rounded-[50%] bg-black/25 blur-xl dark:bg-black/60" />
      </div>
    </div>
  )
}
