"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Tool = { name: string; use: string; daily?: boolean }

const toolbox: { label: string; tools: Tool[] }[] = [
  {
    label: "Frameworks",
    tools: [
      { name: "Laravel", use: "Efiko product suite, Rebuilders Path", daily: true },
      { name: "Vue 3 + Inertia", use: "Every Efiko SaaS frontend", daily: true },
      { name: "Tailwind CSS", use: "All current UIs", daily: true },
      { name: "Next.js / React", use: "FlexBill, HOHI, Auctor dashboard" },
      { name: "CodeIgniter 4", use: "Efiko HRIS suite" },
      { name: "Flutter", use: "Efiko Daily mobile app" },
      { name: "FastAPI / Django", use: "Auctor Stack, Gift Card Shop" },
    ],
  },
  {
    label: "Languages",
    tools: [
      { name: "PHP", use: "Backends across the Efiko suite", daily: true },
      { name: "TypeScript", use: "Vue and Next.js frontends", daily: true },
      { name: "SQL", use: "MySQL & PostgreSQL schemas", daily: true },
      { name: "JavaScript", use: "Browser & Node tooling" },
      { name: "Python", use: "FastAPI services, automation" },
      { name: "Dart", use: "Flutter mobile" },
    ],
  },
  {
    label: "Cloud & DevOps",
    tools: [
      { name: "GitHub Actions", use: "CI and static analysis on every push", daily: true },
      { name: "Cloudflare", use: "DNS, CDN and edge protection" },
      { name: "cPanel / WHM", use: "Efiko production hosting" },
      { name: "Docker", use: "Local services, containerised APIs" },
      { name: "Vercel", use: "Next.js deployments" },
      { name: "Fly.io", use: "Auctor Stack API" },
      { name: "Linux", use: "Server ops, backups, recovery" },
    ],
  },
  {
    label: "Data & realtime",
    tools: [
      { name: "MySQL", use: "Primary store for the Efiko suite", daily: true },
      { name: "PostgreSQL", use: "Row-Level Security multi-tenancy" },
      { name: "Redis", use: "Queues, caching, rate limits" },
      { name: "Laravel Reverb", use: "WebSockets for live stand-ups" },
      { name: "Firebase", use: "Mobile push notifications" },
      { name: "MongoDB", use: "Marketplace catalogues" },
    ],
  },
  {
    label: "AI & integrations",
    tools: [
      { name: "Claude API", use: "Feedback synthesis, headline drafting" },
      { name: "OpenAI / Azure", use: "Grounded document assistant" },
      { name: "Stripe Connect", use: "FlexBill and RPS billing" },
      { name: "Paystack", use: "Efiko Daily subscriptions" },
      { name: "WhatsApp Cloud API", use: "Pay-now invoice delivery" },
      { name: "Microsoft Graph", use: "SharePoint document storage" },
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

function monogram(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").split(" ").filter(Boolean)
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase()
}

export default function Toolbox() {
  const [active, setActive] = useState(0)
  const group = toolbox[active]

  return (
    <div className="mt-20 overflow-hidden rounded-[2rem] border border-border/70 bg-card">
      <div className="flex flex-col gap-5 border-b border-border/70 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Toolbox</div>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">What I build with — and where.</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" /> Daily driver
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full border border-muted-foreground/50" /> Shipped in production
          </span>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Tool categories"
        className="flex gap-1 overflow-x-auto border-b border-border/70 px-4 py-3 [scrollbar-width:none] sm:px-6"
      >
        {toolbox.map((g, i) => (
          <button
            key={g.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-standard active:scale-[0.98]",
              i === active ? "text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {i === active && (
              <motion.span
                layoutId="toolbox-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 420, damping: 40 }}
              />
            )}
            <span className="relative">
              {g.label}
              <span className={cn("ml-1.5 text-xs", i === active ? "text-background/60" : "text-muted-foreground/60")}>
                {g.tools.length}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.ul
            key={group.label}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{ show: { transition: { staggerChildren: 0.045 } } }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {group.tools.map((t) => {
              return (
                <motion.li
                  key={t.name}
                  variants={{
                    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease } },
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-background/60 p-4 transition-all duration-300 ease-standard hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold transition-transform duration-300 ease-standard group-hover:rotate-[-6deg] group-hover:scale-105",
                      t.daily ? "bg-primary text-primary-foreground" : "bg-foreground text-background",
                    )}
                    aria-hidden
                  >
                    {monogram(t.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-medium">
                      {t.name}
                      {t.daily && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          Daily
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted-foreground">{t.use}</span>
                  </span>
                </motion.li>
              )
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  )
}
