"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Briefcase, Check, Lock, MapPin } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import ProjectCover from "@/components/project-cover"
import { experience, workProducts } from "@/lib/projects"
import type { ThumbnailMap } from "@/lib/thumbnails"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

export default function Work({ thumbnails }: { thumbnails: ThumbnailMap }) {
  const [active, setActive] = useState(0)
  const product = workProducts[active]

  return (
    <section id="work" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Work · Efiko Management Consulting"
          title={
            <>
              Building Efiko&apos;s <em>product suite.</em>
            </>
          }
          description="Proprietary B2B platforms I've built and run as Efiko's lead engineer — from the client's SRS to production. Walkthroughs are available on request."
        />

        {/* Role card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="grid gap-8 rounded-[2rem] border border-border/70 bg-card p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12 lg:p-10"
        >
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase size={15} /> {experience.period}
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">{experience.role}</h3>
            <div className="mt-1 text-lg text-primary">{experience.company}</div>
            <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={14} /> {experience.location}
            </div>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{experience.summary}</p>
          </div>
          <ul className="space-y-3.5">
            {experience.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-pretty leading-relaxed">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Product showcase */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
          <div
            role="tablist"
            aria-label="Efiko products"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {workProducts.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                id={`tab-${p.slug}`}
                aria-selected={i === active}
                aria-controls="work-panel"
                onClick={() => setActive(i)}
                className={cn(
                  "group relative shrink-0 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ease-standard active:scale-[0.98] lg:px-5 lg:py-4",
                  i === active
                    ? "border-primary/30 bg-card shadow-lg shadow-primary/5"
                    : "border-transparent hover:border-border hover:bg-card/60",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-aria-selected:scale-125"
                    style={{ background: `hsl(${p.hue} 80% 55%)` }}
                  />
                  <span className="whitespace-nowrap font-medium">{p.title}</span>
                </div>
                <div className="mt-1 hidden pl-[1.4rem] text-sm leading-snug text-muted-foreground lg:block">{p.tagline}</div>
              </button>
            ))}
          </div>

          <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${product.slug}`} className="relative min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.article
                key={product.slug}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.2, ease: "easeIn" } }}
                transition={{ duration: 0.55, ease }}
                className="overflow-hidden rounded-[2rem] border border-border/70 bg-card"
              >
                <div className="group relative">
                  <ProjectCover
                    title={product.title}
                    hue={product.hue}
                    src={thumbnails[product.slug]}
                    size="lg"
                    className="aspect-[16/7]"
                  />
                  {product.status && (
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      {product.status}
                    </span>
                  )}
                </div>
                <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.1fr_1fr]">
                  <div>
                    <h3 className="font-display text-3xl font-semibold tracking-tight">{product.title}</h3>
                    <p className="mt-1 text-primary">{product.tagline}</p>
                    <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{product.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.tags.map((t) => (
                        <span key={t} className="rounded-full border border-border/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Highlights</div>
                    <ul className="mt-3 space-y-2.5">
                      {product.features.map((f) => (
                        <li key={f} className="flex gap-2.5 text-sm leading-relaxed">
                          <Check size={15} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-t border-border/70 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Lock size={14} /> Proprietary to Efiko Management Consulting
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 font-medium text-primary transition-all duration-300 ease-standard hover:gap-2"
                  >
                    Request a walkthrough <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
