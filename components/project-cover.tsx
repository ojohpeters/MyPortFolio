/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"

/**
 * Card artwork for a project. Shows the uploaded thumbnail (or a bundled
 * screenshot) when there is one; otherwise renders a generated, on-brand
 * cover — a hue-tinted gradient with an abstract product window — so no card
 * ever falls back to a generic stock photo.
 */
export default function ProjectCover({
  title,
  hue,
  src,
  className,
  size = "md",
  priority = false,
}: {
  title: string
  hue: number
  src?: string
  className?: string
  size?: "sm" | "md" | "lg"
  priority?: boolean
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-muted", className)}>
        <img
          src={src}
          alt={`${title} — screenshot`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-fluid group-hover:scale-[1.04]"
        />
      </div>
    )
  }

  const h2 = (hue + 48) % 360
  const words = title.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean)
  const caps = words.filter((w) => /^[A-Z0-9]/.test(w))
  const initials =
    words.length === 1
      ? (title.match(/[A-Z]/g) ?? [title[0]]).slice(0, 2).join("")
      : caps.slice(0, 2).map((w) => w[0]).join("")

  return (
    <div
      role="img"
      aria-label={`${title} cover`}
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, hsl(${hue} 45% 48% / 0.35), transparent 55%),
          radial-gradient(90% 80% at 100% 100%, hsl(${h2} 35% 45% / 0.22), transparent 60%),
          linear-gradient(160deg, hsl(${hue} 14% 11%), hsl(30 10% 5%))`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 70% 40%, black, transparent 75%)",
        }}
      />

      {/* abstract product window */}
      <div
        aria-hidden
        className="absolute right-[-6%] top-[14%] w-[68%] transition-transform duration-700 ease-fluid group-hover:-translate-y-1 group-hover:rotate-0"
        style={{ transform: "perspective(900px) rotateY(-14deg) rotateX(6deg) rotate(-2deg)" }}
      >
        <div className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.07] shadow-2xl shadow-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-1 border-b border-white/10 px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="ml-2 h-1.5 w-16 rounded-full bg-white/10" />
          </div>
          <div className="flex gap-2 p-2.5">
            <div className="hidden w-1/5 space-y-1.5 sm:block">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-1.5 rounded-full bg-white/15" style={{ width: `${90 - i * 15}%` }} />
              ))}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-6 flex-1 rounded-md border border-white/10 bg-white/[0.06] p-1">
                    <div className="h-1 w-1/2 rounded-full bg-white/25" />
                    <div className="mt-1 h-1.5 w-3/4 rounded-full" style={{ background: `hsl(${i ? 30 : hue} 70% 62% / 0.85)` }} />
                  </div>
                ))}
              </div>
              <div className="flex h-12 items-end gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1.5">
                {[40, 65, 45, 80, 60, 95, 70, 85].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ height: `${v}%`, background: `linear-gradient(to top, hsl(${hue} 30% 45% / 0.5), hsl(20 95% 58% / 0.9))` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 p-4 sm:p-5">
        <div
          className={cn(
            "font-display font-semibold tracking-[-0.04em] text-white/95",
            size === "lg" ? "text-5xl sm:text-6xl" : size === "md" ? "text-4xl" : "text-2xl",
          )}
        >
          {initials}
        </div>
      </div>
    </div>
  )
}
