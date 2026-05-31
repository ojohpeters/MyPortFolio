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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://ojohpeters.vercel.app")

const description =
  "Ojoh Peters Ojochegbe — Full-Stack Developer building secure, scalable products across Web2, Web3, AI & automation. Laravel, Next.js, Django, Vue and Rust, with a focus on DFIR / cybersecurity. 25+ projects shipped, available for freelance & collaborations."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ojoh Peters | Full-Stack Developer (Web2, Web3, AI & DFIR)",
    template: "%s | Ojoh Peters",
  },
  description,
  generator: "peters",
  applicationName: "Ojoh Peters — Portfolio",
  authors: [{ name: "Ojoh Peters Ojochegbe" }],
  creator: "Ojoh Peters Ojochegbe",
  keywords: [
    "Ojoh Peters",
    "Ojochegbe",
    "Full-Stack Developer",
    "Web3 Developer",
    "Laravel Developer",
    "Next.js Developer",
    "AI Engineer",
    "DFIR",
    "Cybersecurity",
    "Solana",
    "Rust",
    "Portfolio",
    "Nigeria",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ojoh Peters — Portfolio",
    title: "Ojoh Peters | Full-Stack Developer (Web2, Web3, AI & DFIR)",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojoh Peters | Full-Stack Developer",
    description,
    creator: "@_smok3scr33n",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
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
