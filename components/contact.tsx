"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Twitter, Send, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import SectionHeading from "@/components/section-heading";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "petersojochegbe@gmail.com",
    href: "mailto:petersojochegbe@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ojohpeters",
    href: "https://github.com/ojohpeters",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "ojoh-peter",
    href: "https://www.linkedin.com/in/ojoh-peter-549a371b8",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@_smok3scr33n",
    href: "https://x.com/_smok3scr33n",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reliable, backend-free delivery: open the visitor's mail client
    // pre-filled and addressed to me.
    const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:petersojochegbe@gmail.com?subject=${subject}&body=${body}`;
    toast({
      title: "Opening your email client…",
      description: "Your message is pre-filled — just hit send. Thanks!",
    });
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Have a project, a role, or just want to say hi? My inbox is always open."
        />

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gradient-border rounded-2xl bg-card/50 p-6 backdrop-blur sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background/60"
              />
              <Input
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background/60"
              />
              <Textarea
                placeholder="Tell me about your project…"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="bg-background/60"
              />
              <Button type="submit" className="w-full gap-2 glow">
                Send Message <Send size={16} />
              </Button>
            </form>
          </motion.div>

          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-3"
          >
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur transition-colors hover:border-primary/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-sm text-muted-foreground">{value}</div>
                </div>
              </a>
            ))}
            <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-medium">Location</div>
                <div className="text-sm text-muted-foreground">
                  Kaduna, Nigeria · Remote worldwide
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
