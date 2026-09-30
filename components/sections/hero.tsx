"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { ArrowDown, ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react"
import HeroStage from "@/components/hero/hero-stage"

const ease = [0.22, 1, 0.36, 1] as const

const headline: { w: string; accent?: boolean }[] = [
  { w: "Software" },
  { w: "that" },
  { w: "ships,", accent: true },
  { w: "scales", accent: true },
  { w: "&" },
  { w: "stays" },
  { w: "secure.", accent: true },
]

const socials = [
  { icon: Github, href: "https://github.com/ojohpeters", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ojoh-peter-ojochegbe-79b0603b6", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/_smok3scr33n", label: "X / Twitter" },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  return (
    <section ref={ref} id="hero" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-24">
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]" />
        <div className="animate-orb absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-primary/40" />
        <div className="animate-orb absolute -right-16 top-1/3 h-[24rem] w-[24rem] rounded-full bg-accent/35 [animation-delay:-5s]" />
      </div>

      <div className="container grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-8">
        <div className="relative z-10">
          <h1 className="font-display text-[clamp(2.75rem,7.2vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {headline.map(({ w, accent }, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] pr-[0.25em] align-top">
                <motion.span
                  className={`inline-block ${accent ? "serif-shimmer text-[1.1em] leading-[0.9]" : ""}`}
                  initial={{ y: "105%", filter: "blur(12px)", opacity: 0 }}
                  animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.07 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m <span className="font-medium text-foreground">Ojoh Peters</span> — I take B2B products from spec
            to production: multi-tenant SaaS, cloud deployments, AI features and the security work that keeps them
            standing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.82 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-lg shadow-primary/20 transition-all duration-300 ease-standard hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              Explore my work
              <ArrowRight size={16} className="transition-transform duration-300 ease-standard group-hover:translate-x-0.5" />
            </a>
            <a
              href="/resume.pdf"
              download="Ojoh-Peters-CV.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3.5 text-sm font-medium backdrop-blur transition-all duration-300 ease-standard hover:-translate-y-0.5 hover:border-primary/40 active:scale-[0.98]"
            >
              Download CV <Download size={15} />
            </a>
            <div className="flex items-center gap-1 sm:ml-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-all duration-300 ease-standard hover:bg-muted hover:text-foreground active:scale-[0.98]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex items-center gap-2.5 text-sm text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Kaduna, Nigeria · open to select freelance &amp; collaborations
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="relative h-[340px] sm:h-[440px] lg:h-[600px]"
        >
          <HeroStage progress={scrollYProgress} />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground lg:flex"
      >
        <ArrowDown size={14} className="animate-bounce" /> Scroll to play
      </a>
    </section>
  )
}
