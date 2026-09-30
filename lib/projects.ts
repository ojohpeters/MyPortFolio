/**
 * Single source of truth for everything shown in the Work and Projects
 * sections (and in /admin/thumbnails). Each entry's `slug` is the key its
 * uploaded thumbnail is stored under — don't rename a slug once a thumbnail
 * has been uploaded for it.
 *
 * Source/live links are deliberately absent: they're private and shared on
 * request.
 */

export type Category =
  | "SaaS & Platforms"
  | "Web Apps"
  | "E-Commerce"
  | "Web3"
  | "AI & Automation"

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  features: string[]
  tags: string[]
  category: Category
  /** Optional bundled screenshot used until a thumbnail is uploaded. */
  image?: string
  featured?: boolean
  inProgress?: boolean
  /** Who it was built for, when it was client work. */
  client?: string
  year?: string
}

export interface WorkProduct {
  slug: string
  title: string
  tagline: string
  description: string
  features: string[]
  tags: string[]
  /** Brand hue (0–360) used for the generated cover. */
  hue: number
  status?: string
}

export const categories: Category[] = [
  "SaaS & Platforms",
  "Web Apps",
  "E-Commerce",
  "Web3",
  "AI & Automation",
]

export const projects: Project[] = [
  {
    slug: "auctor-stack",
    title: "Auctor Stack",
    tagline: "Agent-native cloud backend for AI applications",
    description:
      "A Firebase/Supabase-style control plane purpose-built for AI: projects and workspaces, API keys, a bring-your-own-key model gateway, document ingestion with hybrid retrieval and grounded, citation-checked responses.",
    features: [
      "Tenant isolation enforced by Postgres Row-Level Security",
      "BYOK model gateway with rate limits, spend caps and guardrails",
      "Hybrid retrieval with grounded responses and verified citations",
      "Dashboard, CLI, TypeScript & Python SDKs and an MCP server",
      "Traces, usage metering and OpenTelemetry observability",
    ],
    tags: ["FastAPI", "PostgreSQL RLS", "Redis", "Next.js 15", "Fly.io"],
    category: "AI & Automation",
    featured: true,
    year: "2026",
  },
  {
    slug: "flexbill",
    title: "FlexBill",
    tagline: "WhatsApp-first B2B micro-billing",
    description:
      "Suppliers issue invoices from a dashboard; buyers get a WhatsApp message with a Pay now link, and payment settles straight into the supplier's own Stripe account — the platform never holds funds.",
    features: [
      "Single and bulk (CSV) invoicing with a tamper-evident ledger",
      "Meta WhatsApp Cloud API delivery with automated reminders",
      "Stripe Connect direct charges, with Paystack support",
      "Signed-webhook verification, API keys and an audit log",
    ],
    tags: ["Next.js 16", "Prisma", "PostgreSQL", "Stripe Connect", "WhatsApp API"],
    category: "SaaS & Platforms",
    featured: true,
    year: "2026",
  },
  {
    slug: "rebuilders-path",
    title: "Rebuilders Path Systems",
    tagline: "Public site + case-management platform for a US firm",
    description:
      "Marketing site with a verification lookup, plus a staff platform: MFA sign-in, a CRM, a deadline-guardianship engine, workflows, compliance tracking, documents and billing.",
    features: [
      "Deadline engine with templated workflows and notifications",
      "Documents stored in SharePoint via Microsoft Graph, with audit trail",
      "Azure OpenAI document assistant grounded in the client's own files",
      "Stripe invoicing with hardened webhook signature checks",
    ],
    tags: ["Laravel 13", "Microsoft Graph", "Azure OpenAI", "Stripe", "MySQL"],
    category: "SaaS & Platforms",
    client: "Rebuilders Path Systems LLC",
    featured: true,
    year: "2026",
  },
  {
    slug: "hohi",
    title: "Housing for Humanity International",
    tagline: "NGO website, live and secured",
    description:
      "A 40+ page website for an international housing charity — initiatives, impact, insights, partnerships and get-involved flows — built to the organisation's own information architecture.",
    features: [
      "Full content architecture delivered as specified by the client",
      "SEO foundations: sitemap, robots, structured metadata",
      "Contact and involvement flows with server-side handling",
      "Documented handover and phase-two scoping",
    ],
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind"],
    category: "Web Apps",
    client: "HOHI",
    year: "2026",
  },
  {
    slug: "the-green-seal",
    title: "The Green Seal",
    tagline: "Executive activity tracking for IHS-BiRD&L",
    description:
      "Tracks executive activity across federal, state and local government in Nigeria through a five-role editorial pipeline, from contributor submission to published record.",
    features: [
      "Contributor → Editor → Copy Editor → Managing Editor workflow",
      "Role-based access control and admin resource management",
      "Category/sub-category taxonomy for government activity",
    ],
    tags: ["Laravel", "MySQL", "RBAC", "Editorial workflow"],
    category: "Web Apps",
    client: "IHS-BiRD&L",
  },
  {
    slug: "public-records-ng",
    title: "Public Records NG",
    tagline: "A central hub for Nigeria's public records",
    description:
      "Collects, organises and shares public information from institutions and communities, with contributor, editor and admin workflows.",
    features: [
      "Contributor submissions with editorial review",
      "Searchable records with role-based permissions",
      "Admin moderation tooling",
    ],
    tags: ["Laravel", "React", "MySQL", "Spatie"],
    category: "Web Apps",
    image: "/projects/publicrecords.png",
  },
  {
    slug: "ndnb",
    title: "NDNB",
    tagline: "Nigerian Dictionary of National Biography",
    description:
      "Creates, curates and publishes verified biographies of notable Nigerians, with contributor, editor and admin roles.",
    features: [
      "Structured biography authoring and review",
      "Verification workflow before publication",
      "Role-based contributor, editor and admin areas",
    ],
    tags: ["Laravel", "React", "MySQL", "Spatie"],
    category: "Web Apps",
    image: "/projects/ndnb.png",
  },
  {
    slug: "serviceman",
    title: "ServiceMan",
    tagline: "Three-sided service marketplace",
    description:
      "Connects clients, skilled servicemen and admins — booking, emergency detection, price negotiation and Paystack payments, with an Android build.",
    features: [
      "Booking and live price negotiation",
      "Emergency request detection and prioritisation",
      "Paystack payments and admin oversight",
      "REST API powering web and Android clients",
    ],
    tags: ["Laravel", "React", "Redux", "React Query", "Paystack"],
    category: "Web Apps",
    image: "/projects/jobs.png",
  },
  {
    slug: "farmers-marketplace",
    title: "Farmers Marketplace",
    tagline: "Connecting farmers directly with buyers",
    description:
      "Full-stack commerce platform for fresh produce — product management, cart, checkout, order tracking and analytics.",
    features: [
      "Farmer storefronts and product management",
      "Cart, checkout and order tracking",
      "Sales analytics dashboard",
    ],
    tags: ["Next.js", "React", "MongoDB", "Tailwind"],
    category: "E-Commerce",
    image: "/projects/farmers.png",
  },
  {
    slug: "gift-card-shop",
    title: "Gift Card Shop",
    tagline: "Gift-card marketplace with referrals",
    description:
      "Neo-brutalist storefront with referrals, discount codes, support tickets and an analytics admin dashboard.",
    features: [
      "JWT auth with referral and discount engine",
      "Support ticketing",
      "Admin analytics dashboard",
    ],
    tags: ["Django REST", "Next.js", "JWT", "PostgreSQL"],
    category: "E-Commerce",
  },
  {
    slug: "crowdsource-emergency",
    title: "Crowdsource Emergency",
    tagline: "Community-powered emergency response",
    description:
      "Real-time platform where people report emergencies and volunteers respond, with a live report dashboard.",
    features: [
      "Real-time incident reporting",
      "Responder sign-up and live dashboard",
      "API on Render, frontend on Vercel",
    ],
    tags: ["Next.js", "Laravel", "PostgreSQL", "Render"],
    category: "Web Apps",
    image: "/projects/emergency.jpg",
  },
  {
    slug: "blogscribe",
    title: "BlogScribe",
    tagline: "AI writer that publishes to WordPress",
    description:
      "Generates SEO-ready posts with the OpenAI API and auto-publishes them to WordPress over its REST API.",
    features: [
      "OpenAI-powered drafting with Markdown preview",
      "One-click publishing via WordPress REST",
      "Content import from external sources",
    ],
    tags: ["Django", "OpenAI API", "Next.js", "WordPress REST"],
    category: "AI & Automation",
    image: "/projects/wordpress-bot.jpg",
  },
  {
    slug: "ecocoin",
    title: "EcoCoin",
    tagline: "Sustainability token on Solana",
    description:
      "SPL token with an airdrop and gamification system, Phantom wallet integration and IPFS-hosted assets.",
    features: [
      "SPL token and airdrop distribution",
      "Gamified rewards",
      "Phantom wallet + IPFS integration",
    ],
    tags: ["Rust", "Solana", "SPL", "web3.js"],
    category: "Web3",
    image: "/projects/ecocoin.jpg",
  },
  {
    slug: "roadrescue",
    title: "RoadRescue",
    tagline: "Roadside assistance, located in real time",
    description:
      "Location-based platform connecting stranded drivers with nearby mechanics, with AI-assisted fault triage.",
    features: [
      "Live location matching",
      "Gemini-assisted fault description",
      "Firebase real-time updates",
    ],
    tags: ["React", "TypeScript", "Firebase", "Gemini AI"],
    category: "Web Apps",
  },
  {
    slug: "job-matcher",
    title: "Job Matcher",
    tagline: "AI-powered candidate–role matching",
    description:
      "Matching platform in the spirit of Upwork and Jobberman that pairs candidates with roles.",
    features: ["Candidate and employer profiles", "Match scoring", "Tailwind dashboard"],
    tags: ["Django REST", "Next.js", "PostgreSQL"],
    category: "AI & Automation",
    inProgress: true,
  },
]

/** Products built as part of my role at Efiko Management Consulting. */
export const workProducts: WorkProduct[] = [
  {
    slug: "efiko-daily",
    title: "Efiko Daily",
    tagline: "Team to-do lists with an accountability layer",
    description:
      "Replaces the photographed morning to-do list with a multi-tenant platform where every member plans, completes and hands off work that can be searched, counted and reported — as an offline-capable PWA and a native Flutter app for iOS and Android.",
    features: [
      "Rollover engine: unfinished work rolls at each person's local midnight, with full task lineage",
      "Live team stand-ups, assignment with accept/decline, weekly consolidated reports",
      "Realtime over Laravel Reverb; email, Web Push and Firebase notifications with quiet hours",
      "Subscriptions, Paystack checkout with signed webhooks and a referral ledger",
      "Flutter app (Riverpod, go_router) on a dedicated mobile API with deep links",
    ],
    tags: ["Laravel 12", "Vue 3 · Inertia", "Reverb", "Flutter", "Paystack"],
    hue: 152,
    status: "In production",
  },
  {
    slug: "salespro",
    title: "SalesPro",
    tagline: "Pipeline discipline for structured sales teams",
    description:
      "Multi-tenant, mobile-first sales pipeline where managers automatically see everything below them in the reporting tree — and every logged activity must carry a next action.",
    features: [
      "Up to 8 hierarchy levels with automatic visibility cascade",
      "Configurable pipelines, Kanban board, weighted forecasting and deal-health bands",
      "Mandatory next-action enforcement, win/loss and competitor tracking",
      "Token-scoped partner API with Efiko Daily; CentricPro deal handoff",
    ],
    tags: ["Laravel 13", "Vue 3 · TypeScript", "Inertia", "115 tests"],
    hue: 221,
  },
  {
    slug: "coachpro",
    title: "CoachPro",
    tagline: "Practice management for coaches and coaching firms",
    description:
      "Client intake, engagements, sessions, goals, finances and a branded client portal for executive, leadership and life coaches — including multi-coach firms and sponsor organisations.",
    features: [
      "Relationship-health scoring and duplicate detection",
      "Four engagement types with session counters and goals",
      "Invoices, payments, agreements and progress reports",
      "Client portal, analytics, affiliate and referral programme",
      "2FA and passkeys via Fortify",
    ],
    tags: ["Laravel 13", "Vue 3", "Tailwind 4", "shadcn-vue", "Docker"],
    hue: 262,
  },
  {
    slug: "trainerpro",
    title: "TrainerPro",
    tagline: "Everything a corporate trainer runs, in one practice",
    description:
      "Scheduling, attendance, testing, feedback, certification and invoicing for trainers — then a year of follow-up to measure whether behaviour actually changed. All sixteen specified modules shipped.",
    features: [
      "Per-session QR sign-in with no app or login; Zoom/Teams attendance import",
      "Marked tests, certificates with public verification and revocation by record",
      "Kirkpatrick Level 3 tracker: participant and manager ratings from baseline to 365 days",
      "AI-drafted reports and refreshers using the trainer's own model key",
      "Invoices with instalments; every list exports to CSV, Excel and PDF",
    ],
    tags: ["Laravel 13", "Inertia 3", "Tailwind 4", "Bring-your-own AI"],
    hue: 32,
  },
  {
    slug: "feedbackpro",
    title: "FeedbackPro",
    tagline: "Anonymous workshop feedback, client-ready reports",
    description:
      "Trainers collect anonymous rated and open-text feedback by QR or short link and turn it into scored analytics and branded PDF/Excel reports, with AI synthesis of the comments.",
    features: [
      "Versioned form builder with an organisation template library",
      "Scoring engine with trends across repeat workshops",
      "Claude-powered theme synthesis of open-text feedback",
      "Trainer, org-admin and read-only client dashboards",
    ],
    tags: ["Laravel 13", "Vue 3", "Claude API", "PHPStan"],
    hue: 340,
    status: "In production",
  },
  {
    slug: "efiko-hris",
    title: "Efiko HRIS",
    tagline: "A modular strategic HR management suite",
    description:
      "Specification-driven HRIS covering the employee lifecycle through dedicated modules, delivered iteratively with the client. I lead development on the codebase.",
    features: [
      "Performance, L&D planning, change management and HR risk",
      "Grievance, exit, mentoring, succession and talent management",
      "Payroll/PAYE, leave, attendance and careers",
      "Assessment tools including a self-assessment builder",
    ],
    tags: ["CodeIgniter 4", "PHP", "MySQL", "PhpSpreadsheet"],
    hue: 190,
    status: "In production",
  },
  {
    slug: "riskpro",
    title: "RiskPro",
    tagline: "Operational risk & control self-assessment",
    description:
      "A CRO oversees risk centrally while departments own their registers: 5×5 scoring, controls, KRIs, loss events and attestations behind a tamper-evident audit trail.",
    features: [
      "Residual-risk heat map and appetite monitoring",
      "Token-authenticated KRI ingestion API",
      "Basel-classified loss events and scheduled escalations",
      "Excel register import/export and a PDF board pack",
    ],
    tags: ["Laravel 13", "Vue 3", "REST API", "Audit trail"],
    hue: 4,
  },
  {
    slug: "workflowpro",
    title: "WorkFlow Pro",
    tagline: "No-code approval workflows for SMEs",
    description:
      "Admins define request processes, multi-step approval chains and SLAs; staff submit and track requests, with every step recorded.",
    features: [
      "Visual process builder with conditional routing",
      "SLA enforcement and escalation",
      "Approver inbox, reports and full audit trail",
    ],
    tags: ["Laravel 13", "Vue 3", "Inertia", "Sanctum"],
    hue: 280,
  },
]

export const experience = {
  company: "Efiko Management Consulting",
  role: "Senior Software & Cloud Solutions Engineer",
  period: "Dec 2025 — Present",
  location: "Nigeria · USA (hybrid/remote)",
  summary:
    "Lead engineer on Efiko's software portfolio — taking B2B products from client SRS to production, mostly as sole developer, and owning how they're deployed, secured and operated.",
  highlights: [
    "Built the Pro suite — SalesPro, CoachPro, TrainerPro, FeedbackPro, RiskPro, WorkFlow Pro — plus Efiko Daily on web and native mobile.",
    "Lead developer on the Efiko HRIS suite; built the Nigeria and USA corporate websites and the EfikoHub app launcher.",
    "Own deployments and operations: production hosting behind Cloudflare, GitHub Actions CI, realtime and push infrastructure, encrypted off-server backups and DR documentation.",
    "Security hardening and incident response across company platforms; AI features on the Claude API.",
  ],
}

export const allThumbnailTargets = () => [
  ...workProducts.map((p) => ({ slug: p.slug, title: p.title, group: "Efiko" as const })),
  ...projects.map((p) => ({ slug: p.slug, title: p.title, group: "Projects" as const })),
]
