import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import SmoothScroll from "@/components/motion/smooth-scroll"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <div className="relative flex min-h-screen flex-col overflow-x-clip">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  )
}
