"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  "Full-Stack Developer",
  "Web2 & Web3 Builder",
  "AI & Automation Engineer",
  "DFIR & Security Researcher",
  "Electronics & RE Enthusiast",
];

const socials = [
  { icon: Github, href: "https://github.com/ojohpeters", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/_smok3scr33n", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ojoh-peter-549a371b8",
    label: "LinkedIn",
  },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for freelance & collaborations
          </motion.div>

          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient">Ojoh Peters Ojochegbe</span>
          </h1>

          {/* Rotating role */}
          <div className="mt-6 flex h-9 items-center justify-center md:h-10">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="text-xl font-medium text-muted-foreground md:text-2xl"
            >
              {roles[roleIndex]}
            </motion.span>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Turning ideas into secure, scalable products — fast. Blending code,
            AI, and DFIR to build, break, and innovate.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group gap-2 glow">
              <a href="#projects">
                View Projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-border/60 bg-card/40 backdrop-blur"
            >
              <a href="/resume.pdf" download>
                Download Resume <Download size={16} />
              </a>
            </Button>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/40 text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/40 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-muted-foreground/70"
          />
        </div>
      </motion.a>
    </section>
  );
}
