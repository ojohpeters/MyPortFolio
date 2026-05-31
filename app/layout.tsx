import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/toaster"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedBackground from "@/components/animated-background"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Ojoh Peters | Full-Stack Developer",
  description:
    "Portfolio of Ojoh Peters Ojochegbe — Full-Stack Developer specializing in Web2, Web3, AI integration, and DFIR / cybersecurity.",
  generator: "peters",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          <AnimatedBackground />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
