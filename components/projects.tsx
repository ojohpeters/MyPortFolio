"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"


const projects = [
  {
    title: "EcoCoin",
    description: "Smart contract-based token with airdrop and gamification system.",
    image: "/projects/ecocoin.jpg", 
    tags: ["Rust", "JavaScript", "Vercel", "solanacli"],
    demoUrl: "https://ecotp.org/",
    githubUrl: "#", 
  },
  {
    title: "Crowdsource Emergency Platform",
    description: "Real-time emergency response platform using crowdsourcing.",
    image: "/projects/emergency.jpg", 
    tags: ["NextJS", "PostgreSQL (Neon)", "Render", "Laravel"],
    demoUrl: "https://crowdsourced-phi.vercel.app",
    githubUrl: "#", 
  },
  {
    title: "AI-Powered WordPress Bot",
    description: "Flask app for generating AI content and posting to WordPress via REST API.",
    image: "/projects/wordpress-bot.jpg", 
    tags: ["Django", "OpenAI API", "TailwindCSS", "NextJS", "WordPress REST API"],
    demoUrl: "https://blogscribe.vercel.app/",
    githubUrl: "#", 
  },
 {
  title: "NDNB - Nigerian Digital National Biographies",
  description: "A Laravel + React-based platform for creating, curating, and publishing verified biographies of notable Nigerians, with contributor, editor, and admin workflows.",
  image: "/projects/ndnb.png", 
  tags: ["Laravel", "React", "TailwindCSS", "MySQL", "Spatie Roles & Permissions"],
  demoUrl: "https://ndnb.ng/", 
  githubUrl: "#", 
}
,
  {
    title: "Job Matcher MVP",
    description: "AI-powered job matching platform (similar to Upwork/Jobberman).",
    image: "placeholder-logo.png", 
    tags: ["Django REST Framework", "Next.js", "PostgreSQL", "Tailwind"],
    demoUrl: "#", // Coming soon
    githubUrl: "#", 
    inProgress: true,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image || "/placeholder.svg?height=300&width=600"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    {project.inProgress && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300">
                          In Progress
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button asChild variant="default" size="sm" className="gap-1" disabled={project.demoUrl === "#"}>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={project.demoUrl === "#" ? "cursor-not-allowed" : ""}
                      >
                        {project.demoUrl === "#" ? "Coming Soon" : "Live Demo"} <ExternalLink size={14} />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-1" disabled={project.githubUrl === "#"}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={project.githubUrl === "#" ? "cursor-not-allowed" : ""}
                      >
                        {project.githubUrl === "#" ? "On Request" : "Code"} <Github size={14} />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
