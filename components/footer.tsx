import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/ojohpeters", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ojoh-peter-ojochegbe-79b0603b6", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/_smok3scr33n", label: "X / Twitter" },
]

const links = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "CV (PDF)", href: "/resume.pdf" },
]

export default function Footer() {
  return (
    <footer className="bg-stage text-stage-foreground">
      <div className="container border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#hero" className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-xs font-bold text-black">OP</span>
              Ojoh Peters Ojochegbe
            </a>
            <p className="mt-3 text-sm text-zinc-400">Senior Software &amp; Cloud Solutions Engineer · Kaduna, Nigeria</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            {links.map((l) => (
              <a key={l.name} href={l.href} className="text-zinc-400 transition-colors duration-300 hover:text-white">
                {l.name}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-400 transition-all duration-300 ease-standard hover:border-white/30 hover:text-white active:scale-[0.98]"
              >
                <Icon size={16} />
              </a>
            ))}
            <a
              href="#hero"
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-400 transition-all duration-300 ease-standard hover:border-white/30 hover:text-white active:scale-[0.98]"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 space-y-2 border-t border-white/10 pt-6 text-xs leading-relaxed text-zinc-500">
          <p>© {new Date().getFullYear()} Ojoh Peters Ojochegbe. Built with Next.js, Tailwind CSS, Framer Motion and React Three Fiber.</p>
          <p>
            Efiko Daily, SalesPro, CoachPro, TrainerPro, FeedbackPro, RiskPro, WorkFlow Pro and Efiko HRIS are proprietary
            products of Efiko Management Consulting. Other product and company names are trademarks of their respective
            owners; technologies are named for identification only. Dashboards and figures inside UI illustrations are
            illustrative.
          </p>
          <p>Credits: Inter, Inter Tight and Instrument Serif (SIL Open Font License) · globe rendered with cobe (MIT) · icons by Lucide (ISC).</p>
        </div>
      </div>
    </footer>
  )
}
