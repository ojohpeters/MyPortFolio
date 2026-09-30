"use client"
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ImagePlus, KeyRound, Loader2, LogOut, Trash2, UploadCloud } from "lucide-react"
import ProjectCover from "@/components/project-cover"
import { projects, workProducts } from "@/lib/projects"
import { cn } from "@/lib/utils"

const TOKEN_KEY = "thumbnail-admin-token"
const MAX_W = 1600

type Item = { slug: string; title: string; hue: number; fallback?: string }
type Status = { busy?: boolean; error?: string }

const groups: { name: string; items: Item[] }[] = [
  { name: "Efiko products", items: workProducts.map((p) => ({ slug: p.slug, title: p.title, hue: p.hue })) },
  { name: "Projects", items: projects.map((p) => ({ slug: p.slug, title: p.title, hue: 250, fallback: p.image })) },
]

/** Downscale to ≤1600px wide and re-encode as WebP (JPEG fallback) so uploads
 *  stay small and well under the 4 MB server limit. */
async function prepare(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_W / bitmap.width)
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const encode = (type: string, q: number) =>
    new Promise<Blob | null>((res) => canvas.toBlob(res, type, q))
  const webp = await encode("image/webp", 0.86)
  if (webp && webp.type === "image/webp" && webp.size < 3.5e6) return webp
  const jpeg = await encode("image/jpeg", 0.82)
  if (!jpeg) throw new Error("Could not encode image")
  return jpeg
}

export default function ThumbnailManager() {
  const [token, setToken] = useState("")
  const [authed, setAuthed] = useState(false)
  const [storage, setStorage] = useState("")
  const [thumbs, setThumbs] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Record<string, Status>>({})
  const [checking, setChecking] = useState(false)
  const [loginError, setLoginError] = useState("")

  const verify = useCallback(async (t: string) => {
    setChecking(true)
    setLoginError("")
    try {
      const res = await fetch("/api/thumbnails", { headers: { Authorization: `Bearer ${t}` }, cache: "no-store" })
      const data = await res.json()
      if (data.authorized) {
        setAuthed(true)
        setStorage(data.storage)
        setThumbs(data.thumbnails)
        try {
          sessionStorage.setItem(TOKEN_KEY, t)
        } catch {}
      } else {
        setLoginError("That token wasn't accepted.")
      }
    } catch {
      setLoginError("Couldn't reach the server.")
    } finally {
      setChecking(false)
    }
  }, [])

  useEffect(() => {
    let saved = ""
    try {
      saved = sessionStorage.getItem(TOKEN_KEY) ?? ""
    } catch {}
    if (saved) {
      setToken(saved)
      verify(saved)
    }
  }, [verify])

  async function upload(slug: string, file: File) {
    setStatus((s) => ({ ...s, [slug]: { busy: true } }))
    try {
      const blob = await prepare(file)
      const body = new FormData()
      body.append("file", blob, `${slug}.${blob.type === "image/webp" ? "webp" : "jpg"}`)
      const res = await fetch(`/api/thumbnails/${slug}`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload failed")
      setThumbs((t) => ({ ...t, [slug]: data.url }))
      setStatus((s) => ({ ...s, [slug]: {} }))
    } catch (e) {
      setStatus((s) => ({ ...s, [slug]: { error: e instanceof Error ? e.message : "Upload failed" } }))
    }
  }

  async function remove(slug: string) {
    setStatus((s) => ({ ...s, [slug]: { busy: true } }))
    const res = await fetch(`/api/thumbnails/${slug}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    if (res.ok) {
      setThumbs(({ [slug]: _gone, ...rest }) => rest)
      setStatus((s) => ({ ...s, [slug]: {} }))
    } else {
      setStatus((s) => ({ ...s, [slug]: { error: "Couldn't remove" } }))
    }
  }

  function logout() {
    try {
      sessionStorage.removeItem(TOKEN_KEY)
    } catch {}
    setAuthed(false)
    setToken("")
  }

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            verify(token)
          }}
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-xl"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
            <KeyRound size={20} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">Project thumbnails</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Enter the admin token (THUMBNAIL_ADMIN_TOKEN) to manage card images.</p>
          <label htmlFor="token" className="sr-only">Admin token</label>
          <input
            id="token"
            type="password"
            autoComplete="current-password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            className="mt-6 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {loginError && <p className="mt-2 text-sm text-destructive">{loginError}</p>}
          <button
            disabled={!token || checking}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-all duration-300 ease-standard hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {checking && <Loader2 size={15} className="animate-spin" />} Unlock
          </button>
          <a href="/" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={14} /> Back to site
          </a>
        </form>
      </main>
    )
  }

  return (
    <main className="container px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={14} /> Back to site
          </a>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">Project thumbnails</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Drop an image on a card or click Upload. Images are resized to {MAX_W}px wide; 16:10 screenshots look best.
            Storage: <span className="font-medium text-foreground">{storage === "vercel-blob" ? "Vercel Blob" : "local disk (.data/)"}</span>
          </p>
        </div>
        <button onClick={logout} className="flex items-center gap-1.5 self-start rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted sm:self-auto">
          <LogOut size={14} /> Lock
        </button>
      </div>

      {groups.map((g) => (
        <section key={g.name} className="mt-10">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{g.name}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {g.items.map((it) => (
              <ThumbCard
                key={it.slug}
                item={it}
                src={thumbs[it.slug]}
                status={status[it.slug] ?? {}}
                onFile={(f) => upload(it.slug, f)}
                onRemove={() => remove(it.slug)}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

function ThumbCard({
  item,
  src,
  status,
  onFile,
  onRemove,
}: {
  item: Item
  src?: string
  status: Status
  onFile: (f: File) => void
  onRemove: () => void
}) {
  const input = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        const f = e.dataTransfer.files[0]
        if (f) onFile(f)
      }}
      className={cn(
        "group overflow-hidden rounded-2xl border bg-card transition-all duration-300 ease-standard",
        over ? "border-primary ring-4 ring-primary/15" : "border-border",
      )}
    >
      <div className="relative">
        <ProjectCover title={item.title} hue={item.hue} src={src ?? item.fallback} size="sm" className="aspect-[16/10]" />
        {status.busy && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
            <Loader2 className="animate-spin text-primary" />
          </div>
        )}
        {over && (
          <div className="absolute inset-0 grid place-items-center bg-primary/20 text-sm font-medium text-white backdrop-blur-sm">
            <UploadCloud />
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white">
          {src ? "Uploaded" : item.fallback ? "Bundled screenshot" : "Generated cover"}
        </span>
      </div>
      <div className="p-4">
        <div className="font-medium">{item.title}</div>
        <div className="font-mono text-xs text-muted-foreground">{item.slug}</div>
        {status.error && <p className="mt-2 text-xs text-destructive">{status.error}</p>}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => input.current?.click()}
            disabled={status.busy}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background transition-all duration-300 ease-standard hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            <ImagePlus size={14} /> {src ? "Replace" : "Upload"}
          </button>
          {src && (
            <button
              onClick={onRemove}
              disabled={status.busy}
              aria-label={`Remove ${item.title} thumbnail`}
              className="grid w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive disabled:opacity-50"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
        <input
          ref={input}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onFile(f)
            e.target.value = ""
          }}
        />
      </div>
    </div>
  )
}
