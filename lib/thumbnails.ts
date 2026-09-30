import { promises as fs } from "node:fs"
import path from "node:path"
import { createHash, timingSafeEqual } from "node:crypto"
import { del, list, put } from "@vercel/blob"
import { allThumbnailTargets } from "@/lib/projects"

/**
 * Thumbnail storage for project cards.
 *
 * - Production (Vercel): Vercel Blob, enabled by BLOB_READ_WRITE_TOKEN.
 *   Each upload is stored at `thumbnails/<slug>/<timestamp>.<ext>` and older
 *   files for that slug are deleted, so the URL changes on every upload and
 *   CDN caches never serve a stale image.
 * - Local dev (no Blob token): files are written to `.data/thumbnails/` and
 *   served by /api/thumbnails/file/[name].
 */

export type ThumbnailMap = Record<string, string>

export const MAX_BYTES = 4 * 1024 * 1024 // Vercel functions cap bodies at 4.5 MB

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
}

const LOCAL_DIR = path.join(process.cwd(), ".data", "thumbnails")
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

export const storageMode = (): "vercel-blob" | "local" => (useBlob() ? "vercel-blob" : "local")

export function isKnownSlug(slug: string) {
  return allThumbnailTargets().some((t) => t.slug === slug)
}

/** Constant-time bearer-token check against THUMBNAIL_ADMIN_TOKEN. */
export function isAuthorized(req: Request) {
  const expected = process.env.THUMBNAIL_ADMIN_TOKEN
  if (!expected) return false
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? ""
  const a = createHash("sha256").update(given).digest()
  const b = createHash("sha256").update(expected).digest()
  return timingSafeEqual(a, b)
}

/** Check the file's magic bytes rather than trusting the declared type. */
function sniff(buf: Buffer): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg"
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return "image/png"
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP")
    return "image/webp"
  if (buf.subarray(4, 12).toString() === "ftypavif") return "image/avif"
  return null
}

export async function getThumbnailMap(): Promise<ThumbnailMap> {
  try {
    return useBlob() ? await blobMap() : await localMap()
  } catch (err) {
    console.error("[thumbnails] failed to list thumbnails", err)
    return {}
  }
}

async function blobMap(): Promise<ThumbnailMap> {
  const latest: Record<string, { url: string; at: number }> = {}
  let cursor: string | undefined
  do {
    const page = await list({ prefix: "thumbnails/", cursor, limit: 1000 })
    for (const b of page.blobs) {
      const slug = b.pathname.split("/")[1]
      const at = new Date(b.uploadedAt).getTime()
      if (slug && (!latest[slug] || latest[slug].at < at)) latest[slug] = { url: b.url, at }
    }
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  return Object.fromEntries(Object.entries(latest).map(([s, v]) => [s, v.url]))
}

async function localMap(): Promise<ThumbnailMap> {
  const files = await fs.readdir(LOCAL_DIR).catch(() => [] as string[])
  const map: ThumbnailMap = {}
  for (const file of files) {
    const slug = file.replace(/\.[a-z]+$/, "")
    const { mtimeMs } = await fs.stat(path.join(LOCAL_DIR, file))
    map[slug] = `/api/thumbnails/file/${file}?v=${Math.round(mtimeMs)}`
  }
  return map
}

export class UploadError extends Error {
  constructor(message: string, public status = 400) {
    super(message)
  }
}

export async function saveThumbnail(slug: string, file: File): Promise<string> {
  if (file.size > MAX_BYTES) throw new UploadError("Image must be 4 MB or smaller", 413)
  const buf = Buffer.from(await file.arrayBuffer())
  const type = sniff(buf)
  if (!type) throw new UploadError("Only JPEG, PNG, WebP or AVIF images are accepted", 415)
  const ext = TYPES[type]

  if (useBlob()) {
    const { blobs } = await list({ prefix: `thumbnails/${slug}/` })
    const blob = await put(`thumbnails/${slug}/${Date.now()}.${ext}`, buf, {
      access: "public",
      contentType: type,
      addRandomSuffix: false,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    })
    if (blobs.length) await del(blobs.map((b) => b.url))
    return blob.url
  }

  await fs.mkdir(LOCAL_DIR, { recursive: true })
  await removeLocal(slug)
  await fs.writeFile(path.join(LOCAL_DIR, `${slug}.${ext}`), buf)
  return (await localMap())[slug]
}

export async function deleteThumbnail(slug: string) {
  if (useBlob()) {
    const { blobs } = await list({ prefix: `thumbnails/${slug}/` })
    if (blobs.length) await del(blobs.map((b) => b.url))
    return
  }
  await removeLocal(slug)
}

async function removeLocal(slug: string) {
  const files = await fs.readdir(LOCAL_DIR).catch(() => [] as string[])
  await Promise.all(
    files
      .filter((f) => f.replace(/\.[a-z]+$/, "") === slug)
      .map((f) => fs.unlink(path.join(LOCAL_DIR, f))),
  )
}

export async function readLocalFile(name: string) {
  // Only plain "<slug>.<ext>" names — no path traversal.
  if (!/^[a-z0-9-]+\.(jpg|png|webp|avif)$/.test(name)) return null
  const buf = await fs.readFile(path.join(LOCAL_DIR, name)).catch(() => null)
  if (!buf) return null
  const type = Object.entries(TYPES).find(([, e]) => name.endsWith(`.${e}`))![0]
  return { buf, type }
}
