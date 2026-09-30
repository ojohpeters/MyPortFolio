"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import SectionHeading from "@/components/section-heading"
import Counter from "@/components/counter"

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: 5, suffix: "+", label: "Years building for the web" },
  { value: 8, suffix: "", label: "Products shipped at Efiko" },
  { value: 25, suffix: "+", label: "Projects delivered" },
  { value: 2, suffix: "", label: "Markets served — NG & US" },
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              An engineer who owns it <em>end to end.</em>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="relative mx-auto w-full max-w-[380px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/70 bg-muted">
              <Image
                src="/image.png"
                alt="Portrait of Ojoh Peters Ojochegbe"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover transition-transform duration-1000 ease-fluid hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="glass absolute -bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:left-auto sm:right-[-2.5rem] sm:w-[19rem]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
              </span>
              <div className="text-sm leading-tight">
                <div className="font-medium">Efiko Management Consulting</div>
                <div className="text-muted-foreground">Senior Software &amp; Cloud Engineer</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-pretty text-xl leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed">
              I lead engineering on Efiko Management Consulting&apos;s B2B product portfolio — turning client
              specifications into production software, usually as the only developer on the product, and then
              owning how it&apos;s deployed, monitored, backed up and secured.
            </p>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Alongside that I build for clients in Nigeria and the US — case-management platforms, AI backends,
              payments products and NGO websites. My roots are in networking, electronics and digital forensics,
              which is why I care about how systems fail as much as how they work. I&apos;m also studying Electrical
              Engineering at the Air Force Institute of Technology, Kaduna.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-background p-5 md:p-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <div className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
