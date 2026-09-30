import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import {
  UploadError,
  deleteThumbnail,
  isAuthorized,
  isKnownSlug,
  saveThumbnail,
} from "@/lib/thumbnails"

export const dynamic = "force-dynamic"

type Ctx = { params: Promise<{ slug: string }> }

async function guard(req: Request, slug: string) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!isKnownSlug(slug)) return NextResponse.json({ error: "Unknown project" }, { status: 404 })
  return null
}

/** Upload (or replace) a project's thumbnail. Body: multipart form with `file`. */
export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params
  const denied = await guard(req, slug)
  if (denied) return denied

  const form = await req.formData().catch(() => null)
  const file = form?.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Expected a `file` field" }, { status: 400 })
  }

  try {
    const url = await saveThumbnail(slug, file)
    revalidatePath("/")
    return NextResponse.json({ slug, url })
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("[thumbnails] upload failed", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

/** Remove a project's thumbnail so the card falls back to its generated cover. */
export async function DELETE(req: Request, { params }: Ctx) {
  const { slug } = await params
  const denied = await guard(req, slug)
  if (denied) return denied
  await deleteThumbnail(slug)
  revalidatePath("/")
  return NextResponse.json({ slug, deleted: true })
}
