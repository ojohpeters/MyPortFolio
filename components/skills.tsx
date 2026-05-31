"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";
import { Code2, Boxes, Link2, BrainCircuit, Server } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "PHP", "JavaScript", "TypeScript", "Rust (learning)"],
  },
  {
    title: "Frameworks",
    icon: Boxes,
    skills: ["Laravel", "Django", "Flask", "Next.js", "Vue / Inertia", "Axum"],
  },
  {
    title: "Web3 Tools",
    icon: Link2,
    skills: [
      "Solana / web3.js",
      "ethers",
      "Solana CLI",
      "Metamask",
      "IPFS",
      "spl",
    ],
  },
  {
    title: "AI & ML",
    icon: BrainCircuit,
    skills: [
      "Model Training",
      "Machine Learning",
      "Data Analysis",
      "AI Integration",
      "IBM SPSS",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Server,
    skills: ["Docker", "Git", "Vercel", "Render", "Fly.io", "cPanel"],
  },
];

const marquee = [
  "Laravel",
  "Next.js",
  "Django",
  "Vue",
  "React",
  "Rust",
  "Solana",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "TailwindCSS",
  "TypeScript",
  "OpenAI",
  "Flask",
  "Inertia.js",
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Tech Stack"
          description="The tools I reach for to build, secure and ship."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="gradient-border h-full rounded-2xl bg-card/50 p-6 backdrop-blur"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-lg font-bold">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border/60 bg-background/60 px-2.5 py-1 text-sm text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Infinite tech marquee */}
      <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {[...marquee, ...marquee].map((tech, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-border/60 bg-card/40 px-5 py-2 text-sm font-medium text-muted-foreground backdrop-blur"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
