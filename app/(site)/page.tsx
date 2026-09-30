import Hero from "@/components/sections/hero"
import Marquee from "@/components/sections/marquee"
import About from "@/components/sections/about"
import Work from "@/components/sections/work"
import Film from "@/components/sections/film"
import Projects from "@/components/sections/projects"
import Capabilities from "@/components/sections/capabilities"
import Reach from "@/components/sections/reach"
import Faq from "@/components/sections/faq"
import Finale from "@/components/sections/finale"
import { getThumbnailMap } from "@/lib/thumbnails"

// Re-render at most every 5 minutes; uploads also revalidate "/" immediately.
export const revalidate = 300

export default async function Home() {
  const thumbnails = await getThumbnailMap()
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Work thumbnails={thumbnails} />
      <Film />
      <Projects thumbnails={thumbnails} />
      <Capabilities />
      <Reach />
      <Faq />
      <Finale />
    </main>
  )
}
