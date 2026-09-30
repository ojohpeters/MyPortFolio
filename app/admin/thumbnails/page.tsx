import type { Metadata } from "next"
import ThumbnailManager from "./manager"

export const metadata: Metadata = {
  title: "Thumbnails",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ThumbnailManager />
}
