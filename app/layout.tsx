import type React from "react"
import type { Metadata } from "next"
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import Grain from "@/components/motion/grain"
import MotionProvider from "@/components/motion/providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-display" })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://ojohpeters.vercel.app")

const description =
  "Ojoh Peters Ojochegbe — Senior Software & Cloud Solutions Engineer at Efiko Management Consulting. I take B2B products from spec to production: multi-tenant SaaS, cloud deployments, AI features and hardened infrastructure. Laravel, Vue, Next.js, Django, Flutter and Rust."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ojoh Peters | Senior Software & Cloud Solutions Engineer",
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
    "Senior Software Engineer",
    "Cloud Solutions Engineer",
    "Efiko Management Consulting",
    "Full-Stack Developer",
    "SaaS Developer",
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
    title: "Ojoh Peters | Senior Software & Cloud Solutions Engineer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojoh Peters | Senior Software & Cloud Solutions Engineer",
    description,
    creator: "@_smok3scr33n",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ojoh Peters Ojochegbe",
  jobTitle: "Senior Software & Cloud Solutions Engineer",
  worksFor: { "@type": "Organization", name: "Efiko Management Consulting" },
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Kaduna", addressCountry: "NG" },
  sameAs: [
    "https://github.com/ojohpeters",
    "https://x.com/_smok3scr33n",
    "https://www.linkedin.com/in/ojoh-peter-ojochegbe-79b0603b6",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <MotionProvider>
            <Grain />
            {children}
            <Toaster />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
