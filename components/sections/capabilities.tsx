"use client"

import type { CSSProperties, ReactNode } from "react"
import { motion } from "framer-motion"
import { Bell, Cloud, Code2, Layers, ShieldCheck, Sparkles } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import TiltCard from "@/components/tilt-card"
import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

const stack = [
  { label: "Languages", items: ["PHP", "TypeScript", "JavaScript", "Python", "Dart", "SQL", "Rust"] },
  { label: "Frameworks", items: ["Laravel", "Vue 3 · Inertia", "Next.js · React", "CodeIgniter 4", "Django · FastAPI", "Flutter"] },
  { label: "Cloud & DevOps", items: ["GitHub Actions", "Docker", "Linux", "cPanel / WHM", "Cloudflare", "Vercel", "Fly.io", "Render"] },
  { label: "Data & realtime", items: ["MySQL", "PostgreSQL", "Redis", "MongoDB", "Firebase", "Laravel Reverb"] },
  { label: "AI & integrations", items: ["Claude API", "OpenAI · Azure", "Stripe Connect", "Paystack", "WhatsApp Cloud", "Microsoft Graph"] },
]

export default function Capabilities() {
  return (
    <section id="stack" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Capabilities"
          title={
            <>
              The whole stack, <em>and what&apos;s under it.</em>
            </>
          }
          description="Product code is half the job. The rest is the infrastructure, security and integrations that keep it running."
        />

        <div className="grid auto-rows-[minmax(300px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          <Cell i={0} className="md:col-span-2" icon={Code2} title="Product engineering" body="Multi-module B2B platforms on Laravel with Vue/Inertia, Next.js and Flutter — typed, tested and specification-driven.">
            <TypingClip />
          </Cell>
          <Cell i={1} icon={Cloud} title="Cloud & DevOps" body="CI on every push, zero-downtime deploys behind Cloudflare, backups and recovery plans.">
            <PipelineClip />
          </Cell>
          <Cell i={2} icon={ShieldCheck} title="Security" body="Tenant isolation, signed webhooks, MFA, audit trails — and incident response when it counts.">
            <ScanClip />
          </Cell>
          <Cell i={3} icon={Layers} title="Multi-tenant SaaS" body="Workspaces, hierarchies, plans and billing that stay isolated per customer.">
            <TenantClip />
          </Cell>
          <Cell i={4} icon={Sparkles} title="Applied AI" body="Claude and OpenAI features with human review built in — synthesis, drafting and grounded retrieval.">
            <AiClip />
          </Cell>
          <Cell i={5} className="md:col-span-3 lg:col-span-3" icon={Bell} title="Realtime & mobile" body="WebSockets with Laravel Reverb, Web Push and Firebase notifications, and native Flutter apps on a dedicated mobile API." wide>
            <PushClip />
          </Cell>
        </div>

        <div className="mt-16 grid gap-8 border-t border-border/70 pt-12 sm:grid-cols-2 lg:grid-cols-5">
          {stack.map((g) => (
            <div key={g.label}>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{g.label}</div>
              <ul className="mt-3 space-y-1.5">
                {g.items.map((it) => (
                  <li key={it} className="text-[15px]">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cell({
  i,
  icon: Icon,
  title,
  body,
  children,
  className,
  wide,
}: {
  i: number
  icon: typeof Code2
  title: string
  body: string
  children: ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay: (i % 3) * 0.08 }}
      className={className}
    >
      <TiltCard className={cn("flex flex-col", wide && "md:flex-row")}>
        <div className={cn("relative z-0 flex-1 overflow-hidden border-b border-border/60 bg-secondary/40 p-5", wide && "md:border-b-0 md:border-r md:order-2")} style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
        <div className={cn("p-6", wide && "md:w-[40%] md:self-center")}>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon size={16} />
            </span>
            <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
          </div>
          <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* ---------------- clips (CSS-only loops) ---------------- */

function TypingClip() {
  const lines = [
    { w: "58%", c: "bg-primary/70", d: "0s", i: 0 },
    { w: "72%", c: "bg-foreground/25", d: "0.3s", i: 1 },
    { w: "44%", c: "bg-accent/70", d: "0.6s", i: 2 },
    { w: "66%", c: "bg-foreground/25", d: "0.9s", i: 2 },
    { w: "38%", c: "bg-fuchsia-500/60", d: "1.2s", i: 1 },
    { w: "52%", c: "bg-foreground/25", d: "1.5s", i: 0 },
  ]
  return (
    <div className="flex h-full min-h-[150px] gap-4 rounded-xl border border-border/70 bg-background/80 p-4 font-mono text-[11px]">
      <div className="space-y-2.5 text-right text-muted-foreground/60">
        {lines.map((_, i) => (
          <div key={i} className="h-2 leading-[8px]">{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 space-y-2.5">
        {lines.map((l, i) => (
          <div key={i} style={{ paddingLeft: l.i * 16 }}>
            <div className={`clip-type h-2 rounded-full ${l.c}`} style={{ "--w": l.w, animationDelay: l.d } as CSSProperties} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PipelineClip() {
  const nodes = ["Build", "Test", "Deploy"]
  return (
    <div className="relative flex h-full min-h-[150px] items-center justify-between px-2">
      <svg className="absolute inset-x-6 top-1/2 h-2 w-[calc(100%-3rem)] -translate-y-1/2" preserveAspectRatio="none" viewBox="0 0 100 2">
        <line x1="0" y1="1" x2="100" y2="1" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 8" className="clip-dash" vectorEffect="non-scaling-stroke" />
      </svg>
      {nodes.map((n, i) => (
        <div key={n} className="relative z-10 flex flex-col items-center gap-2">
          <span className="clip-node grid h-11 w-11 place-items-center rounded-2xl border border-border bg-background text-xs font-semibold text-primary" style={{ animationDelay: `${i * 0.8}s` }}>
            {i + 1}
          </span>
          <span className="text-xs font-medium text-muted-foreground">{n}</span>
        </div>
      ))}
    </div>
  )
}

function ScanClip() {
  return (
    <div className="relative grid h-full min-h-[150px] grid-cols-8 content-center gap-1.5 overflow-hidden rounded-xl border border-border/70 bg-background/80 p-4">
      {Array.from({ length: 32 }, (_, i) => (
        <span key={i} className="clip-cell aspect-square rounded-[4px]" style={{ animationDelay: `${(Math.floor(i / 8) * 0.8).toFixed(1)}s` }} />
      ))}
      <span className="clip-scan pointer-events-none absolute inset-x-0 h-px bg-accent shadow-[0_0_14px_3px_hsl(var(--accent)/0.6)]" />
    </div>
  )
}

function TenantClip() {
  return (
    <div className="flex h-full min-h-[150px] flex-col justify-center gap-4">
      <div className="relative mx-auto grid w-48 grid-cols-2 rounded-full border border-border bg-background p-1 text-center text-xs font-medium">
        <span className="clip-knob absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-foreground" />
        <span className="relative z-10 py-1.5 text-muted-foreground">Acme Ltd</span>
        <span className="relative z-10 py-1.5 text-muted-foreground">Globex</span>
      </div>
      <div className="relative mx-auto h-16 w-full max-w-[220px]">
        {[
          ["clip-tenant-a", "bg-violet-500"],
          ["clip-tenant-b", "bg-emerald-500"],
        ].map(([cls, c]) => (
          <div key={cls} className={`${cls} absolute inset-0 flex gap-2 rounded-xl border border-border/70 bg-background/80 p-3`}>
            <span className={`h-full w-2 rounded-full ${c}`} />
            <div className="flex-1 space-y-2">
              <div className={`h-2 w-2/3 rounded-full ${c} opacity-70`} />
              <div className="h-2 w-full rounded-full bg-foreground/10" />
              <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AiClip() {
  return (
    <div className="flex h-full min-h-[150px] flex-col justify-center gap-3 rounded-xl border border-border/70 bg-background/80 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles size={13} className="text-fuchsia-500" /> Synthesising 142 responses…
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
        <div className="clip-fill h-full rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-accent" />
      </div>
      <div className="flex h-10 items-end gap-1">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="clip-stream flex-1 rounded-sm bg-primary/60" style={{ height: `${40 + ((i * 37) % 60)}%`, animationDelay: `${(i * 0.07).toFixed(2)}s` }} />
        ))}
      </div>
    </div>
  )
}

function PushClip() {
  const pushes = [
    ["Morning plan", "Your 6 tasks for today are ready", "0s"],
    ["Team stand-up", "Amaka accepted “Q3 pipeline review”", "1.2s"],
    ["Deploy", "Release 1.14 is live in production", "2.4s"],
  ]
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center">
      <div className="w-full max-w-sm space-y-2.5">
        {pushes.map(([t, b, d]) => (
          <div key={t} className="clip-push flex items-start gap-3 rounded-2xl border border-border/70 bg-background/90 p-3 shadow-sm" style={{ animationDelay: d }}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Bell size={14} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium">{t}</div>
              <div className="truncate text-xs text-muted-foreground">{b}</div>
            </div>
            <span className="ml-auto text-[11px] text-muted-foreground">now</span>
          </div>
        ))}
      </div>
    </div>
  )
}
