"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/ojohpeters", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/_smok3scr33n", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ojoh-peter-ojochegbe-79b0603b6",
    label: "LinkedIn",
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
        <Link href="#hero" className="font-display text-lg font-bold">
          <span className="text-gradient">OJOCHEGBE</span>
        </Link>

        <p className="text-sm text-muted-foreground">
          © {currentYear} Ojoh Peters. Built with Next.js & Tailwind.
        </p>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Icon size={16} />
            </a>
          ))}
          <a
            href="#hero"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
