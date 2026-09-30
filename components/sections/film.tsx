"use client"

import { useRef, useState } from "react"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Check, FileText, ShieldCheck, Rocket, Code2 } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe"

const chapters = [
  {
    icon: FileText,
    title: "Spec",
    heading: "Start from the requirement, not the framework.",
    body: "I work from the client's SRS and meetings — turning it into modules, roles and acceptance criteria before writing code.",
  },
  {
    icon: Code2,
    title: "Build",
    heading: "Ship a product, not a prototype.",
    body: "Laravel, Vue/Inertia, Next.js or Flutter — typed, tested and multi-tenant from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Harden",
    heading: "Assume it will be attacked.",
    body: "Per-tenant access control, signed webhooks, MFA and audit trails. CI runs lint, static analysis and the full suite on every push.",
  },
  {
    icon: Rocket,
    title: "Ship",
    heading: "Deploy it — then keep it standing.",
    body: "Zero-downtime releases, realtime and push infrastructure, encrypted off-server backups and a recovery plan.",
  },
]

/** Integer derived from a motion value; re-renders only when it changes. */
function useStep(mv: MotionValue<number>, fn: (v: number) => number) {
  const [n, setN] = useState(() => fn(mv.get()))
  useMotionValueEvent(mv, "change", (v) => {
    const next = fn(v)
    setN((prev) => (prev === next ? prev : next))
  })
  return n
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a))

export default function Film() {
  const reduce = useReducedMotionSafe()
  return (
    <section id="process" className="relative scroll-mt-0 bg-stage text-stage-foreground">
      {reduce ? <StaticFilm /> : <PinnedFilm />}
    </section>
  )
}

function StaticFilm() {
  return (
    <div className="container px-4 py-24 sm:px-6 lg:px-8">
      <FilmHeading />
      <div className="grid gap-4 md:grid-cols-2">
        {chapters.map((c, i) => (
          <div key={c.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="font-mono text-sm text-violet-300">0{i + 1} · {c.title}</div>
            <h3 className="mt-3 font-display text-2xl font-semibold">{c.heading}</h3>
            <p className="mt-2 text-zinc-400">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FilmHeading() {
  return (
    <SectionHeading
      index="03"
      eyebrow="Process"
      title={
        <>
          How I take software <em>from spec to shipped.</em>
        </>
      }
      className="[&_p]:text-zinc-400 [&>div:first-child]:text-zinc-400"
    />
  )
}

function PinnedFilm() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35, restDelta: 0.0005 })

  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_65%_50%,black,transparent_70%)]" />
          <div className="animate-orb absolute right-[10%] top-[20%] h-96 w-96 rounded-full bg-violet-600/30" />
          <div className="animate-orb absolute bottom-[5%] left-[35%] h-80 w-80 rounded-full bg-cyan-500/20 [animation-delay:-4s]" />
        </div>

        <div className="container relative grid h-full grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr] gap-4 px-4 pb-6 pt-24 sm:px-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:grid-rows-1 lg:items-center lg:gap-10 lg:px-8 lg:pb-0 lg:pt-0">
          <Captions p={p} />
          <div className="relative flex h-full items-center justify-center [perspective:1400px]">
            <div className="relative h-[440px] w-[560px] shrink-0 origin-center scale-[0.62] [transform-style:preserve-3d] sm:scale-[0.8] xl:scale-100">
              <SpecShot p={p} />
              <BuildShot p={p} />
              <HardenShot p={p} />
              <ShipShot p={p} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Captions({ p }: { p: MotionValue<number> }) {
  const fill = useTransform(p, [0.02, 0.95], [0, 1])
  const active = useStep(p, (v) => Math.min(3, Math.floor(v * 4)))
  return (
    <div className="relative flex gap-6">
      <div className="relative hidden w-px shrink-0 bg-white/10 sm:block">
        <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-gradient-to-b from-violet-400 to-cyan-300" />
        {chapters.map((c, i) => (
          <span
            key={c.title}
            className={`absolute -left-[5px] h-[11px] w-[11px] rounded-full border-2 transition-all duration-500 ease-standard ${
              i <= active ? "border-cyan-300 bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" : "border-white/25 bg-stage"
            }`}
            style={{ top: `${(i / 3) * 100}%`, marginTop: i === 3 ? -11 : 0 }}
          />
        ))}
      </div>
      <div className="flex-1">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          <span className="font-mono text-violet-300">03</span> — Process
        </div>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
          From spec <span className="serif-shimmer text-[1.1em]">to shipped.</span>
        </h2>
        <div className="relative mt-6 h-[150px] sm:h-[170px] lg:mt-10 lg:h-[220px]">
          {chapters.map((c, i) => (
            <Chapter key={c.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Chapter({ p, i }: { p: MotionValue<number>; i: number }) {
  const c = chapters[i]
  const a = i / 4
  const b = (i + 1) / 4
  const first = i === 0
  const last = i === 3
  const opacity = useTransform(p, [a - 0.04, a + 0.03, b - 0.04, b + 0.02], [first ? 1 : 0, 1, 1, last ? 1 : 0])
  const y = useTransform(p, [a - 0.04, a + 0.03, b - 0.04, b + 0.02], [first ? 0 : 24, 0, 0, last ? 0 : -24])
  const blur = useTransform(p, [a - 0.04, a + 0.03, b - 0.04, b + 0.02], [first ? 0 : 8, 0, 0, last ? 0 : 8])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)
  const Icon = c.icon
  return (
    <motion.div style={{ opacity, y, filter }} className="absolute inset-0">
      <div className="flex items-center gap-3 font-mono text-sm text-cyan-300">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06]">
          <Icon size={16} />
        </span>
        0{i + 1} / {c.title}
      </div>
      <h3 className="mt-4 text-balance font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{c.heading}</h3>
      <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base">{c.body}</p>
    </motion.div>
  )
}

/* ------------------------------ shots ------------------------------ */

const shotBase = "absolute inset-0 m-auto [backface-visibility:hidden]"

function SpecShot({ p }: { p: MotionValue<number> }) {
  const scale = useTransform(p, [0, 0.19, 0.28], [1, 1, 0.3])
  const x = useTransform(p, [0.19, 0.28], [0, -190])
  const y = useTransform(p, [0.19, 0.28], [0, -150])
  const rotateY = useTransform(p, [0, 0.19], [-18, 8])
  const rotateX = useTransform(p, [0, 0.19], [10, 4])
  const opacity = useTransform(p, [0.24, 0.29], [1, 0])
  const ticks = useStep(p, (v) => Math.floor(range(v, 0.03, 0.18) * 5))
  const reqs = ["Multi-tenant workspaces", "Role-based access", "Daily rollover engine", "Paystack subscriptions", "Weekly PDF reports"]

  return (
    <motion.div style={{ scale, x, y, rotateY, rotateX, opacity }} className={`${shotBase} h-[420px] w-[330px]`}>
      <div className="h-full rounded-2xl bg-[#f7f6f2] p-6 text-zinc-800 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">SRS · v1.3</div>
          <FileText size={16} className="text-zinc-400" />
        </div>
        <div className="mt-3 font-display text-xl font-semibold leading-tight">Software Requirements Specification</div>
        <div className="mt-4 space-y-1.5">
          {[92, 80, 86, 60].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-zinc-300" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Acceptance criteria</div>
        <ul className="mt-2 space-y-2">
          {reqs.map((r, i) => (
            <li key={r} className="flex items-center gap-2.5 text-[13px]">
              <span
                className={`grid h-4 w-4 place-items-center rounded border transition-all duration-300 ${
                  i < ticks ? "border-violet-600 bg-violet-600 text-white" : "border-zinc-400"
                }`}
              >
                {i < ticks && <Check size={11} strokeWidth={3.5} />}
              </span>
              <span className={i < ticks ? "text-zinc-900" : "text-zinc-500"}>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const code = [
  ["kw", "final class", "tx", " RolloverService"],
  ["tx", "{"],
  ["tx", "  ", "kw", "public function", "fn", " rollover", "tx", "(Member $m): void"],
  ["tx", "  {"],
  ["tx", "    $tz = $m->", "fn", "timezone", "tx", "();"],
  ["tx", "    $open = $m->tasks()->", "fn", "unfinished", "tx", "($tz);"],
  ["tx", "    ", "kw", "foreach", "tx", " ($open ", "kw", "as", "tx", " $task) {"],
  ["tx", "      $task->", "fn", "carryForward", "tx", "(", "st", "'next-day'", "tx", ");"],
  ["tx", "    }"],
  ["tx", "    ", "fn", "event", "tx", "(", "kw", "new", "tx", " DayRolledOver($m));"],
  ["tx", "  }"],
  ["tx", "}"],
]
const tone: Record<string, string> = { kw: "text-violet-300", fn: "text-cyan-300", st: "text-emerald-300", tx: "text-zinc-300" }

function Editor({ lines }: { lines: number }) {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d16] shadow-[0_50px_120px_-30px_rgba(91,75,230,0.55)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.06] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md bg-white/[0.06] px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">RolloverService.php</span>
      </div>
      <div className="flex">
        <div className="w-32 shrink-0 space-y-1.5 border-r border-white/[0.06] p-3 font-mono text-[11px] text-zinc-500">
          {["app/", "  Models/", "  Services/", "  Policies/", "resources/js/", "  Pages/", "tests/", "  Feature/"].map((f) => (
            <div key={f} className={f.includes("Services") ? "text-cyan-300" : ""}>{f}</div>
          ))}
        </div>
        <pre className="flex-1 p-4 font-mono text-[12.5px] leading-[1.7]">
          {code.map((ln, i) => (
            <div key={i} className="transition-opacity duration-200" style={{ opacity: i < lines ? 1 : 0 }}>
              <span className="mr-4 inline-block w-4 text-right text-zinc-600">{i + 1}</span>
              {Array.from({ length: ln.length / 2 }, (_, k) => (
                <span key={k} className={tone[ln[k * 2]]}>{ln[k * 2 + 1]}</span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

function BuildShot({ p }: { p: MotionValue<number> }) {
  const rotateY = useTransform(p, [0.2, 0.3, 0.48, 0.55], [-55, -6, -6, -14])
  const rotateX = useTransform(p, [0.2, 0.3, 0.48, 0.55], [8, 4, 4, 14])
  const x = useTransform(p, [0.2, 0.3], [260, 0])
  const opacity = useTransform(p, [0.2, 0.27, 0.5, 0.53], [0, 1, 1, 0])
  const lines = useStep(p, (v) => Math.floor(range(v, 0.29, 0.47) * code.length))
  return (
    <motion.div style={{ rotateY, rotateX, x, opacity }} className={`${shotBase} h-[380px] w-[560px]`}>
      <Editor lines={lines} />
    </motion.div>
  )
}

function HardenShot({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.49, 0.53, 0.74, 0.78], [0, 1, 1, 0])
  const rotateX = useTransform(p, [0.5, 0.56, 0.74, 0.8], [14, 12, 12, 40])
  const rotateY = useTransform(p, [0.5, 0.56], [-14, -8])
  const z = useTransform(p, [0.74, 0.8], [0, -300])
  const scan = useTransform(p, [0.54, 0.7], ["0%", "100%"])
  const passed = useStep(p, (v) => Math.floor(range(v, 0.55, 0.71) * 6))
  const shield = useTransform(p, [0.68, 0.72], [0, 1])
  const checks = ["Tenant isolation", "Authorization policies", "CSRF & signed webhooks", "Static analysis (PHPStan)", "Feature tests", "Dependency audit"]
  return (
    <motion.div style={{ opacity, rotateX, rotateY, z }} className={`${shotBase} h-[380px] w-[560px]`}>
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d16] p-5 shadow-[0_50px_120px_-30px_rgba(34,211,238,0.35)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Security & quality gate</div>
            <div className="mt-0.5 font-medium text-white">Pull request #214</div>
          </div>
          <span className="font-mono text-xs text-zinc-400">{passed}/6 passing</span>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2.5">
          {checks.map((c, i) => (
            <li key={c} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-[13px]">
              <span className={`grid h-5 w-5 place-items-center rounded-full transition-colors duration-300 ${i < passed ? "bg-emerald-500 text-black" : "bg-white/10"}`}>
                {i < passed && <Check size={12} strokeWidth={3} />}
              </span>
              <span className={i < passed ? "text-white" : "text-zinc-500"}>{c}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 h-[92px] rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 font-mono text-[11px] leading-5 text-zinc-500">
          <div><span className="text-emerald-400">✓</span> policies: WorkspacePolicy, TaskPolicy</div>
          <div><span className="text-emerald-400">✓</span> webhook signature verified (HMAC-SHA512)</div>
          <div><span className="text-emerald-400">✓</span> 80 tests, 0 failures</div>
        </div>
        <motion.div style={{ top: scan }} className="absolute inset-x-0 h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent">
          <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-300 shadow-[0_0_16px_2px_rgba(103,232,249,0.8)]" />
        </motion.div>
        <motion.div
          style={{ scale: shield, opacity: shield }}
          className="absolute bottom-5 right-5 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,0.6)]"
        >
          <ShieldCheck size={30} />
        </motion.div>
      </div>
    </motion.div>
  )
}

function ShipShot({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.75, 0.8], [0, 1])
  const rotateX = useTransform(p, [0.75, 0.84], [48, 8])
  const z = useTransform(p, [0.75, 0.84], [-420, 0])
  const y = useTransform(p, [0.75, 0.84], [120, 0])
  const k = useTransform(p, [0.8, 0.92], [0, 1])
  const bars = useTransform(p, [0.82, 0.94], [0, 1])
  const stampScale = useTransform(p, [0.9, 0.94], [2.4, 1])
  const stampOpacity = useTransform(p, [0.9, 0.93], [0, 1])
  const users = useStep(k, (v) => Math.round(v * 1284))
  const uptime = useStep(k, (v) => Math.round(v * 9998))
  const releases = useStep(k, (v) => Math.round(v * 46))

  return (
    <motion.div style={{ opacity, rotateX, z, y }} className={`${shotBase} h-[400px] w-[560px]`}>
      <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#12121d] to-[#0b0b12] p-5 shadow-[0_60px_140px_-30px_rgba(91,75,230,0.6)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Production</div>
            <div className="mt-0.5 text-lg font-semibold text-white">Release dashboard</div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            ["Active users", users.toLocaleString("en-US")],
            ["Uptime", `${(uptime / 100).toFixed(2)}%`],
            ["Releases", String(releases)],
          ].map(([label, v]) => (
            <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
              <div className="text-[11px] text-zinc-500">{label}</div>
              <div className="mt-1 font-display text-2xl font-semibold tabular-nums text-white">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-[170px] items-end gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          {[28, 40, 34, 52, 46, 60, 55, 68, 62, 74, 70, 82, 78, 90, 86, 96].map((h, i) => (
            <motion.div key={i} style={{ scaleY: bars, height: `${h}%` }} className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-violet-500/50 to-cyan-300/90" />
          ))}
        </div>
        <div className="mt-2 text-[10px] text-zinc-600">Illustrative data</div>
        <motion.div
          style={{ scale: stampScale, opacity: stampOpacity, rotate: -10 }}
          className="absolute bottom-24 right-10 rounded-xl border-[3px] border-emerald-400 px-4 py-1.5 font-display text-3xl font-bold tracking-[0.12em] text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.35)] backdrop-blur-sm"
        >
          SHIPPED
        </motion.div>
      </div>
    </motion.div>
  )
}

