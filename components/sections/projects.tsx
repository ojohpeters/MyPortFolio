"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Check, Lock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import SectionHeading from "@/components/section-heading"
import ProjectCover from "@/components/project-cover"
import TiltCard from "@/components/tilt-card"
import { categories, projects, type Category, type Project } from "@/lib/projects"
import type { ThumbnailMap } from "@/lib/thumbnails"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

const categoryHue: Record<Category, number> = {
  "SaaS & Platforms": 256,
  "Web Apps": 218,
  "E-Commerce": 152,
  Web3: 34,
  "AI & Automation": 296,
}

/** Category sets the family; a per-slug hash spreads projects apart so
 *  neighbouring generated covers never look identical. */
function hueFor(p: Project) {
  const h = [...p.slug].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
  return (categoryHue[p.category] + (h % 200) - 100 + 360) % 360
}

export default function Projects({ thumbnails }: { thumbnails: ThumbnailMap }) {
  const [filter, setFilter] = useState<"All" | Category>("All")
  const [open, setOpen] = useState<Project | null>(null)
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter)
  const src = (p: Project) => thumbnails[p.slug] ?? p.image

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title={
            <>
              Client work &amp; <em>independent builds.</em>
            </>
          }
          description="Platforms I've built for clients in Nigeria and the US, and products of my own. Source and live links are private — happy to walk you through any of them."
        />

        <div role="group" aria-label="Filter projects" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {(["All", ...categories] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-standard active:scale-[0.98]",
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, ease, delay: (i % 3) * 0.07 }}
              >
                <TiltCard max={5}>
                  <button
                    onClick={() => setOpen(p)}
                    className="flex h-full w-full flex-col text-left"
                    aria-label={`${p.title} — view details`}
                  >
                    <div className="relative">
                      <ProjectCover title={p.title} hue={hueFor(p)} src={src(p)} className="aspect-[16/10]" />
                      <div className="absolute left-3 top-3 flex gap-1.5">
                        {p.featured && <Badge>Featured</Badge>}
                        {p.inProgress && <Badge tone="amber">In progress</Badge>}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span>{p.category}</span>
                        {p.client && <span className="truncate">for {p.client}</span>}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                      <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground/80">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-sm">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Lock size={13} /> Available on request
                        </span>
                        <span className="flex items-center gap-1 font-medium text-primary transition-all duration-300 ease-standard group-hover:gap-1.5">
                          Details <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </button>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90svh] max-w-2xl overflow-y-auto rounded-3xl border-border/70 p-0 sm:rounded-3xl" data-lenis-prevent>
          {open && (
            <>
              <ProjectCover title={open.title} hue={hueFor(open)} src={src(open)} size="lg" className="aspect-[16/8] rounded-t-3xl" priority />
              <div className="p-6 sm:p-8">
                <div className="text-sm text-muted-foreground">
                  {open.category}
                  {open.client && <> · Built for {open.client}</>}
                  {open.year && <> · {open.year}</>}
                </div>
                <DialogTitle className="mt-2 font-display text-3xl font-semibold tracking-tight">{open.title}</DialogTitle>
                <p className="mt-1 text-primary">{open.tagline}</p>
                <DialogDescription className="mt-4 text-base leading-relaxed">{open.description}</DialogDescription>
                <ul className="mt-6 space-y-2.5">
                  {open.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-relaxed">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {open.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-secondary/70 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Lock size={14} /> Source &amp; live demo are private.
                  </span>
                  <a
                    href="#contact"
                    onClick={() => setOpen(null)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2 font-medium text-background transition-all duration-300 ease-standard hover:opacity-90 active:scale-[0.98]"
                  >
                    Request access <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Badge({ children, tone }: { children: React.ReactNode; tone?: "amber" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur",
        tone === "amber" ? "bg-amber-400/90 text-black" : "bg-black/55 text-white",
      )}
    >
      {children}
    </span>
  )
}
