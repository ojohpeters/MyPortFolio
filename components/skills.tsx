"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Update the skills categories to match your tech stack
const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "PHP", "JavaScript", "Rust (learning)", "Solidity"],
  },
  {
    title: "Frameworks",
    skills: ["Laravel", "Django", "Flask", "Next.js", "Express.js"],
  },
  {
    title: "Web3 Tools",
    skills: ["Solidity", "ethers.py", "Solana CLI", "Metamask integration", "IPFS"],
  },
  {
    title: "AI & ML",
    skills: ["Model Training", "Machine Learning", "Data Analysis", "AI Integration", "Python ML Libraries"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Git", "Vercel", "Render"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-primary">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
