"use client"

import { useEffect, useState } from "react"
import { Check, GitBranch, Loader2, Rocket } from "lucide-react"
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe"

/**
 * The hero's "core moment", rendered as real DOM so it stays razor-sharp both
 * in the CSS poster and when projected onto the 3D laptop screen:
 * git push → CI checks → deploy → live. Loops every ~11 s. Numbers are
 * illustrative UI, not claims.
 */

export const SCREEN_W = 560
export const SCREEN_H = 350
const LOOP = 11000
const COMMAND = "git push origin main"

const checks = ["Lint & format", "Type-check", "Test suite · 80 passed", "Production build"]
const steps = ["Run migrations", "Warm caches", "Restart workers"]

function useLoopClock(paused: boolean) {
  const [t, setT] = useState(paused ? LOOP - 1 : 0)
  useEffect(() => {
    if (paused) return
    const start = performance.now()
    const id = window.setInterval(() => setT((performance.now() - start) % LOOP), 80)
    return () => window.clearInterval(id)
  }, [paused])
  return paused ? LOOP - 1 : t
}

export default function DeployScreen({ paused = false }: { paused?: boolean }) {
  const reduce = useReducedMotionSafe()
  const t = useLoopClock(paused || !!reduce)

  const phase = t < 2600 ? 0 : t < 5000 ? 1 : t < 7000 ? 2 : 3
  const typed = COMMAND.slice(0, Math.max(0, Math.floor((t - 300) / 70)))
  const checksDone = Math.floor((t - 2800) / 520)
  const deployPct = Math.min(100, Math.max(0, ((t - 5000) / 1800) * 100))

  return (
    <div
      style={{ width: SCREEN_W, height: SCREEN_H }}
      className="relative select-none overflow-hidden rounded-[10px] bg-[#0e0c0a] font-sans text-[13px] text-zinc-200 antialiased"
    >
      {/* window chrome */}
      <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-0.5 text-[11px] text-zinc-400">
          <GitBranch size={11} /> saas-platform · main
        </div>
      </div>

      <div className="relative h-[calc(100%-2rem)] p-5">
        {/* 0 — terminal */}
        <Panel show={phase === 0}>
          <div className="font-mono text-[13px] leading-6">
            <div className="text-zinc-500">~/saas-platform</div>
            <div>
              <span className="text-emerald-400">❯</span> {typed}
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-zinc-300" />
            </div>
            {t > 2000 && (
              <>
                <div className="text-zinc-500">Enumerating objects: 42, done.</div>
                <div className="text-orange-300">→ Pipeline triggered</div>
              </>
            )}
          </div>
        </Panel>

        {/* 1 — CI */}
        <Panel show={phase === 1}>
          <Heading icon={<Loader2 size={14} className="animate-spin text-orange-300" />} title="Continuous integration" sub="GitHub Actions · PHP 8.4 · Node 22" />
          <ul className="mt-4 space-y-2">
            {checks.map((c, i) => {
              const done = i < checksDone
              const running = i === checksDone
              return (
                <li key={c} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                  <span className={`grid h-5 w-5 place-items-center rounded-full transition-colors duration-300 ${done ? "bg-emerald-500 text-black" : "bg-white/10"}`}>
                    {done ? <Check size={12} strokeWidth={3} /> : running ? <Loader2 size={12} className="animate-spin" /> : null}
                  </span>
                  <span className={done ? "text-zinc-100" : "text-zinc-400"}>{c}</span>
                  {done && <span className="ml-auto text-[11px] text-zinc-500">{(i + 1) * 7}s</span>}
                </li>
              )
            })}
          </ul>
        </Panel>

        {/* 2 — deploy */}
        <Panel show={phase === 2}>
          <Heading icon={<Rocket size={14} className="text-amber-200" />} title="Deploying to production" sub="Zero-downtime release" />
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300" style={{ width: `${deployPct}%` }} />
          </div>
          <ul className="mt-5 space-y-2.5">
            {steps.map((s, i) => {
              const done = deployPct > (i + 1) * 30
              return (
                <li key={s} className="flex items-center gap-2.5 text-zinc-300">
                  <Check size={14} className={done ? "text-emerald-400" : "text-zinc-700"} strokeWidth={3} />
                  {s}
                </li>
              )
            })}
          </ul>
        </Panel>

        {/* 3 — live */}
        <Panel show={phase === 3}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-zinc-500">Production</div>
              <div className="mt-0.5 text-lg font-semibold text-white">saas-platform</div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              ["Uptime", "99.98%"],
              ["p95", "142 ms"],
              ["Errors", "0"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                <div className="text-[11px] text-zinc-500">{k}</div>
                <div className="text-base font-semibold text-white">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-[86px] items-end gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            {[30, 42, 38, 55, 48, 62, 58, 70, 66, 78, 72, 84, 80, 92].map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-orange-500/50 to-amber-300/90 transition-transform duration-700 ease-fluid"
                style={{ height: `${h}%`, transform: `scaleY(${t > 7000 + i * 60 ? 1 : 0})` }}
              />
            ))}
          </div>
          <div
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-[#0f1a17] px-3 py-2 text-xs text-emerald-200 shadow-xl transition-all duration-500 ease-fluid"
            style={{ opacity: t > 7600 ? 1 : 0, transform: `translateY(${t > 7600 ? 0 : 12}px)` }}
          >
            <Check size={13} strokeWidth={3} /> Deployed in 38s
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Panel({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!show}
      className="absolute inset-0 p-5 transition-all duration-500 ease-fluid"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(8px) scale(0.99)",
        filter: show ? "none" : "blur(4px)",
      }}
    >
      {children}
    </div>
  )
}

function Heading({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06]">{icon}</span>
      <div>
        <div className="font-medium text-white">{title}</div>
        <div className="text-[11px] text-zinc-500">{sub}</div>
      </div>
    </div>
  )
}
