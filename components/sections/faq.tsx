import SectionHeading from "@/components/section-heading"

const faqs = [
  {
    q: "What kind of work are you open to?",
    a: "I'm full-time at Efiko Management Consulting, and I take on a small number of freelance projects and collaborations — typically SaaS builds, backend and API work, deployment and hardening of existing apps, or AI features inside a product.",
  },
  {
    q: "Can I see the code or a live demo?",
    a: "Yes, on request. Source and live links are kept private because most of this work belongs to clients or to Efiko. Get in touch and I'll arrange a walkthrough or access where the owner allows it.",
  },
  {
    q: "What's your core stack?",
    a: "Laravel with Vue 3 and Inertia is my daily driver, alongside Next.js/React, CodeIgniter 4, Django/FastAPI and Flutter for mobile. MySQL and PostgreSQL for data, Redis and Reverb for queues and realtime.",
  },
  {
    q: "Do you handle hosting and deployment?",
    a: "Yes — CI pipelines, production deploys, DNS and CDN via Cloudflare, backups and disaster-recovery plans. I've shipped on shared hosting and cPanel/WHM as well as Vercel, Fly.io and Render, and I'm comfortable choosing what fits the budget.",
  },
  {
    q: "How do you approach security?",
    a: "As part of the build, not an afterthought: per-tenant authorization, signed webhooks, MFA and audit trails, dependency and static analysis in CI — plus a background in digital forensics and incident response for when something does go wrong.",
  },
  {
    q: "How do you work with remote teams?",
    a: "Async-first with written specs and regular demos. I'm on West Africa Time (UTC+1), which overlaps well with Europe and the US East Coast mornings.",
  },
]

export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="relative py-24 md:py-32">
      <div className="container grid gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-8">
        <SectionHeading
          index="07"
          eyebrow="FAQ"
          title={
            <span id="faq-title">
              Before you <em>reach out.</em>
            </span>
          }
        />
        <div className="divide-y divide-border/80 border-y border-border/80">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl px-2 py-5 text-lg font-medium transition-colors duration-300 ease-standard hover:text-primary group-open:text-primary">
                {f.q}
                <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-all duration-300 ease-standard group-open:rotate-45 group-open:border-primary/40 group-open:bg-primary/10">
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current" />
                </span>
              </summary>
              <p className="max-w-2xl px-2 pb-6 text-pretty leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
