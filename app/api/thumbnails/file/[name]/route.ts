import { readLocalFile } from "@/lib/thumbnails"

/** Serves thumbnails from local disk when Vercel Blob isn't configured. */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const file = await readLocalFile((await params).name)
  if (!file) return new Response("Not found", { status: 404 })
  return new Response(new Uint8Array(file.buf), {
    headers: { "Content-Type": file.type, "Cache-Control": "public, max-age=31536000, immutable" },
  })
}
