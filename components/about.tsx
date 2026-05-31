"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/section-heading";

const stats = [
  { value: 5, suffix: "+", label: "Years Building" },
  { value: 25, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Remote Ready" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const highlights = [
  "Web2 & Web3 Development",
  "AI / ML Integration",
  "Digital Forensics (DFIR)",
  "Embedded & IoT Systems",
];

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="About Me"
          title="The person behind the code"
          description="Self-taught, hands-on, and obsessed with shipping secure, scalable products."
        />

        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[300px_1fr]">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-3 animate-spin-slow rounded-full bg-gradient-to-tr from-primary via-fuchsia-500 to-accent opacity-70 blur-md" />
              <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-background">
                <Image
                  src="/image.png"
                  alt="Ojoh Peters"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              I&apos;m a Full-Stack Developer, Cybersecurity enthusiast focused
              on Digital Forensics &amp; Incident Response, and an electronics
              hobbyist exploring embedded systems and RF. I build modern web
              apps, AI-integrated tools, and blockchain solutions across Laravel,
              Django, Flask, Node.js and Solidity — with growing Rust expertise
              for Web2 and Web3. Alongside software, I bring a background in
              networking and electronics repair, and I&apos;m pursuing Electrical
              Engineering at the Air Force Institute of Technology (AFIT),
              Kaduna. I love partnering with startups to ship secure, scalable
              MVPs fast.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border/60 bg-card/50 px-3 py-1 text-sm text-foreground/80 backdrop-blur"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gradient-border rounded-2xl bg-card/40 p-6 text-center backdrop-blur"
            >
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
