"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", id: "about" },
  { name: "Work", id: "work" },
  { name: "Process", id: "process" },
  { name: "Projects", id: "projects" },
  { name: "Stack", id: "stack" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    ;[...navItems.map((n) => n.id), "hero", "contact"].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <div
        className={cn(
          "flex w-full items-center justify-between rounded-full transition-all duration-500 ease-fluid",
          scrolled
            ? "glass max-w-4xl py-2 pl-5 pr-2 shadow-lg shadow-black/[0.04] dark:shadow-black/40"
            : "max-w-7xl border border-transparent py-3 pl-2 pr-0",
        )}
      >
        <a href="#hero" className="group flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-[11px] font-bold text-background transition-transform duration-300 ease-standard group-hover:rotate-[-8deg]">
            OP
          </span>
          <span className="hidden sm:inline">Ojoh Peters</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "group relative px-3 py-1.5 text-sm transition-colors duration-300 ease-standard",
                active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-primary to-accent transition-transform duration-300 ease-standard",
                  active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ModeToggle />
          <a
            href="#contact"
            className="hidden items-center gap-1 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-300 ease-standard hover:opacity-90 active:scale-[0.98] sm:inline-flex"
          >
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 420, damping: 42 }}
            className="glass absolute inset-x-4 top-[4.25rem] flex flex-col gap-1 rounded-3xl p-3 shadow-xl md:hidden"
          >
            {[...navItems, { name: "Contact", id: "contact" }].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-base font-medium transition-colors active:scale-[0.98]",
                  active === item.id ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
              >
                {item.name}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
