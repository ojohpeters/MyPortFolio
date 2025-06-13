"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Hi, I'm <span className="text-primary">Peters Ojoh</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-8">
            Full-Stack Developer | Web2 & Web3 Builder | AI Integrator
          </h2>
          <p className="text-lg md:text-xl mb-10">Turning ideas into products — fast.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="gap-2">
              <a href="#projects">
                View Projects <ArrowRight size={16} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="/resume.pdf" download>
                Download Resume <Download size={16} />
              </a>
            </Button>
          </div>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/ojohpeters" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://x.com/_smok3scr33n" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/ojoh-peter-549a371b8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowRight size={24} className="rotate-90" />
        </a>
      </div>
    </section>
  )
}
