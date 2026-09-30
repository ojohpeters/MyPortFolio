"use client"

import { useRef, useState, type FormEvent } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, Send, Twitter } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const ease = [0.22, 1, 0.36, 1] as const
const EMAIL = "petersojochegbe@gmail.com"

const channels = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Linkedin, label: "LinkedIn", value: "ojoh-peter-ojochegbe", href: "https://www.linkedin.com/in/ojoh-peter-ojochegbe-79b0603b6" },
  { icon: Github, label: "GitHub", value: "ojohpeters", href: "https://github.com/ojohpeters" },
  { icon: Twitter, label: "X / Twitter", value: "@_smok3scr33n", href: "https://x.com/_smok3scr33n" },
]

/** CTA that leans toward the cursor and springs back, with a sheen sweep. */
function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.5 })

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-5 text-base font-semibold text-black shadow-[0_20px_60px_-15px_rgba(139,92,246,0.7)] transition-[box-shadow] duration-300 ease-standard hover:shadow-[0_24px_80px_-10px_rgba(139,92,246,0.9)] active:scale-[0.98] sm:text-lg"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-violet-300/60 to-transparent transition-transform duration-700 ease-standard group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-black text-white transition-transform duration-300 ease-standard group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </motion.a>
  )
}

export default function Finale() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function submit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    toast({ title: "Opening your email app…", description: "Your message is pre-filled — just hit send." })
  }

  const input =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-zinc-500 transition-colors duration-300 ease-standard focus:border-violet-400/60 focus:outline-none focus:ring-2 focus:ring-violet-400/20"

  return (
    <section ref={ref} id="contact" className="relative isolate scroll-mt-0 overflow-hidden bg-stage text-stage-foreground">
      {/* full-bleed atmosphere that slowly settles as it scrolls in */}
      <motion.div aria-hidden style={{ scale }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,58,237,0.45),transparent_70%),radial-gradient(40%_40%_at_85%_60%,rgba(34,211,238,0.22),transparent_70%),radial-gradient(40%_40%_at_10%_80%,rgba(192,38,211,0.2),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_70%)]" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 shadow-[inset_0_0_200px_60px_rgba(0,0,0,0.85)]" />

      <div className="container px-4 pb-20 pt-28 sm:px-6 md:pt-40 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease }}
          className="text-center"
        >
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            <span className="font-mono text-violet-300">08</span> — Contact
          </div>
          <h2 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            Have something worth building?
            <br />
            <span className="serif-shimmer text-[1.08em]">Let&apos;s ship it.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-lg text-zinc-400">
            Tell me what you&apos;re working on — a product, a platform that needs hardening, or a role. I reply within
            a day or two.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href={`mailto:${EMAIL}`}>Start a conversation</MagneticButton>
          </div>
        </motion.div>

        <div className="mx-auto mt-24 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="space-y-3"
          >
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 ease-standard hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white/[0.06] active:scale-[0.98]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.06] text-violet-200">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-zinc-400">{label}</span>
                    <span className="block truncate font-medium text-white">{value}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-zinc-500 transition-transform duration-300 ease-standard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
            className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="c-name">Name</label>
              <input id="c-name" required placeholder="Your name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <label className="sr-only" htmlFor="c-email">Email</label>
              <input id="c-email" required type="email" placeholder="you@company.com" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <label className="sr-only" htmlFor="c-msg">Message</label>
            <textarea id="c-msg" required rows={5} placeholder="What are you building?" className={`${input} resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3.5 font-medium text-white transition-all duration-300 ease-standard hover:opacity-90 active:scale-[0.98]"
            >
              Send message <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
