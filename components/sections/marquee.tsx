const rowA = ["Laravel 13", "Vue 3 · Inertia", "Next.js", "TypeScript", "Flutter", "CodeIgniter 4", "Django", "FastAPI", "Tailwind CSS", "Rust"]
const rowB = ["GitHub Actions", "Cloudflare", "Docker", "PostgreSQL · RLS", "MySQL", "Redis", "Laravel Reverb", "Claude API", "Stripe Connect", "Paystack", "WhatsApp Cloud API", "Microsoft Graph"]

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <div className={`flex w-max shrink-0 gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border/70 bg-card/60 px-5 py-2 text-sm font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary to-accent" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Two rows of the stack scrolling in opposite directions. */
export default function Marquee() {
  return (
    <section aria-label="Technologies" className="space-y-3 border-y border-border/60 py-8">
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </section>
  )
}
