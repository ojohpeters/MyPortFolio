"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";
import {
  Lock,
  ArrowUpRight,
  Building2,
  Globe,
  ShoppingCart,
  Coins,
  Bot,
  Wrench,
} from "lucide-react";

type Category =
  | "SaaS & Enterprise"
  | "Web Apps"
  | "E-Commerce"
  | "Web3"
  | "AI & Automation"
  | "Tools";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: Category;
  featured?: boolean;
  inProgress?: boolean;
}

const projects: Project[] = [
  {
    title: "CoachPro",
    description:
      "Coaching practice-management platform for executive & life coaches — intake, engagements, sessions, goals, multi-tenant firms with a branded client portal.",
    image: "/projects/coachpro.jpg",
    tags: ["Laravel 13", "Vue 3", "Inertia.js", "Tailwind 4", "Fortify"],
    category: "SaaS & Enterprise",
    featured: true,
  },
  {
    title: "Sales Pro",
    description:
      "Mobile-first sales pipeline & activity-management SaaS. 8-level reporting hierarchies, Kanban deal board, mandatory next-action enforcement and CentricPro handoff.",
    image: "/projects/salespro.jpg",
    tags: ["Laravel 13", "Vue 3", "TypeScript", "Inertia.js", "Multi-tenant"],
    category: "SaaS & Enterprise",
    featured: true,
  },
  {
    title: "Efiko HRIS",
    description:
      "Modular HR information system spanning performance appraisal, L&D planning, change management, grievance, mentoring, exit management and employee self-service.",
    image: "/projects/efikohr.jpg",
    tags: ["PHP", "CodeIgniter 4", "MySQL", "HRIS", "Multi-module"],
    category: "SaaS & Enterprise",
    featured: true,
  },
  {
    title: "The Green Seal",
    description:
      "Executive activity-tracking system for the Institute for Historical Studies (IHS-BiRD&L) — multi-role editorial workflow from contributor submission to publication.",
    image: "/projects/greenseal.jpg",
    tags: ["Laravel", "MySQL", "Editorial Workflow", "RBAC"],
    category: "Web Apps",
  },
  {
    title: "Public Records NG",
    description:
      "A central hub for Nigeria's public records and data, with role-based contributor, editor and admin workflows.",
    image: "/projects/publicrecords.png",
    tags: ["Laravel", "React", "TailwindCSS", "MySQL", "Spatie"],
    category: "Web Apps",
  },
  {
    title: "NDNB — Digital National Biographies",
    description:
      "Platform for creating, curating and publishing verified biographies of notable Nigerians, with contributor, editor and admin roles.",
    image: "/projects/ndnb.png",
    tags: ["Laravel", "React", "TailwindCSS", "MySQL", "Spatie"],
    category: "Web Apps",
  },
  {
    title: "Farmers Marketplace",
    description:
      "Final-year full-stack e-commerce platform connecting farmers with buyers — product management, cart, checkout, order tracking and analytics.",
    image: "/projects/farmers.png",
    tags: ["Next.js", "React", "TailwindCSS", "MongoDB"],
    category: "E-Commerce",
    featured: true,
  },
  {
    title: "AgriCom",
    description:
      "Agriculture e-commerce platform connecting producers, suppliers and consumers directly — fertilizers, machinery and agri-products, plus news & government schemes.",
    image: "/projects/agricom.jpg",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    category: "E-Commerce",
  },
  {
    title: "Gift Card Shop",
    description:
      "Production-ready gift-card marketplace with neo-brutalist UI, referrals, discount codes, support tickets and an analytics admin dashboard.",
    image: "/projects/giftcard.jpg",
    tags: ["Django REST", "Next.js", "JWT", "PostgreSQL"],
    category: "E-Commerce",
  },
  {
    title: "GameShop",
    description:
      "Sleek gaming storefront with genre sections, animated game cards and direct WhatsApp checkout integration.",
    image: "/projects/gameshop.jpg",
    tags: ["HTML", "CSS", "JavaScript", "WhatsApp API"],
    category: "E-Commerce",
  },
  {
    title: "EcoCoin",
    description:
      "Smart-contract token on Solana with an airdrop and gamification system.",
    image: "/projects/ecocoin.jpg",
    tags: ["Rust", "Solana CLI", "JavaScript", "spl"],
    category: "Web3",
  },
  {
    title: "BlogScribe — AI WordPress Bot",
    description:
      "AI content generator that writes and auto-publishes posts to WordPress via its REST API.",
    image: "/projects/wordpress-bot.jpg",
    tags: ["Django", "OpenAI API", "Next.js", "WordPress REST"],
    category: "AI & Automation",
  },
  {
    title: "Job Matcher MVP",
    description:
      "AI-powered job-matching platform (à la Upwork / Jobberman) pairing candidates with roles.",
    image: "/projects/jobs.png",
    tags: ["Django REST", "Next.js", "PostgreSQL", "Tailwind"],
    category: "AI & Automation",
    inProgress: true,
  },
  {
    title: "RoadRescue",
    description:
      "Real-time, location-based roadside-assistance platform connecting stranded drivers with nearby mechanics.",
    image: "/projects/roadrescue.jpg",
    tags: ["React", "TypeScript", "Firebase", "Gemini AI"],
    category: "Web Apps",
  },
  {
    title: "ServiceMan",
    description:
      "Three-sided service marketplace connecting clients, servicemen and admins — booking, emergency detection, price negotiation and Paystack payments.",
    image: "/projects/serviceman.jpg",
    tags: ["React", "Redux", "React Query", "Laravel", "Paystack"],
    category: "Web Apps",
  },
  {
    title: "Crowdsource Emergency",
    description:
      "Real-time emergency-response platform powered by crowdsourced reporting.",
    image: "/projects/emergency.jpg",
    tags: ["Next.js", "Laravel", "PostgreSQL (Neon)", "Render"],
    category: "Web Apps",
  },
  {
    title: "Efiko Education Platform",
    description:
      "Corporate education web platform — blog, podcast, resources, solutions, gallery and newsletter — across Nigeria and USA deployments.",
    image: "/projects/efikoedu.jpg",
    tags: ["CodeIgniter 4", "PHP", "MySQL", "Bootstrap"],
    category: "Web Apps",
  },
  {
    title: "Lumina Library System",
    description:
      "Web-based library-management system with book tracking, member management and real-time borrowing status.",
    image: "/projects/lumina.jpg",
    tags: ["TypeScript", "Vite", "Node.js", "REST API"],
    category: "Tools",
  },
  {
    title: "QR Streamer",
    description:
      "Real-time screen-streaming admin panel with live region cropping, viewer notifications and connected-unit monitoring.",
    image: "/projects/qrstreamer.jpg",
    tags: ["Node.js", "Screen Capture API", "WebSockets"],
    category: "Tools",
  },
];

const categoryMeta: Record<
  Category,
  { icon: typeof Globe; gradient: string }
> = {
  "SaaS & Enterprise": {
    icon: Building2,
    gradient: "from-violet-500 to-indigo-600",
  },
  "Web Apps": { icon: Globe, gradient: "from-blue-500 to-cyan-500" },
  "E-Commerce": { icon: ShoppingCart, gradient: "from-emerald-500 to-teal-600" },
  Web3: { icon: Coins, gradient: "from-amber-500 to-orange-600" },
  "AI & Automation": { icon: Bot, gradient: "from-fuchsia-500 to-pink-600" },
  Tools: { icon: Wrench, gradient: "from-slate-500 to-zinc-600" },
};

const filters: ("All" | Category)[] = [
  "All",
  "SaaS & Enterprise",
  "Web Apps",
  "E-Commerce",
  "Web3",
  "AI & Automation",
  "Tools",
];

function ProjectCard({ project }: { project: Project }) {
  const meta = categoryMeta[project.category];
  const Icon = meta.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur transition-colors hover:border-primary/40"
    >
      {/* Cover photo */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* category tint + legibility gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-25 mix-blend-multiply`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

        {/* category chip */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          <Icon size={12} />
          {project.category}
        </div>

        {/* shimmer sweep on hover */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {project.inProgress && (
          <Badge className="absolute right-3 top-3 border-0 bg-yellow-500/90 text-black">
            In Progress
          </Badge>
        )}
        {project.featured && !project.inProgress && (
          <Badge className="absolute right-3 top-3 border-0 bg-white/20 text-white backdrop-blur">
            Featured
          </Badge>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-secondary/60 text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock size={13} />
            Available on request
          </span>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="h-8 gap-1 text-primary hover:text-primary"
          >
            <a href="#contact">
              Request access
              <ArrowUpRight size={14} />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<"All" | Category>("All");
  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Projects"
          description="A cross-section of products I've built across SaaS, web, commerce, Web3 and AI. Source & live links are private — happy to share on request."
        />

        {/* Filter pills */}
        <div className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                active === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
