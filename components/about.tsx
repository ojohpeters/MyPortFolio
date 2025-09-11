"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary">
                <Image
                  src="/image.png?height=192&width=192"
                  alt="Peters Ojoh"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-lg mb-6">
                <p className="text-lg mb-6">
                  I am a self-taught and hands-on Full-Stack Developer,
                  Cybersecurity Enthusiast with a focus on Digital Forensics and
                  Incident Response, and an Electronics Hobbyist exploring
                  embedded systems and RF technologies. I have experience
                  building modern web applications, AI-integrated tools, and
                  blockchain-based solutions. My technical stack spans Laravel,
                  Django, Flask, Node.js, and Solidity, with growing expertise
                  in Rust for Web2 and Web3 development. Beyond software, I have
                  a background in networking and electronics repair, and I am
                  pursuing Electrical Engineering at Air Force Institute Of Technology, Kaduna Nigeria(AFIT),  to deepen my expertise
                  in embedded systems, IoT, and digital security. I’ve
                  contributed to both Web2 platforms and Web3 projects, trained
                  AI models, and implemented machine learning solutions. I enjoy
                  working with startups to quickly ship secure and scalable
                  MVPs, and I am passionate about bridging the gap between
                  hardware and software in real-world problem-solving.
                </p>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">
                    Experience
                  </span>
                  <span className="font-medium">5+ Years</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">
                    Projects
                  </span>
                  <span className="font-medium">20+ Completed</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">
                    Location
                  </span>
                  <span className="font-medium">Remote</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
