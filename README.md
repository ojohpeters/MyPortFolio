# Ojoh Peters — Portfolio

Next.js 15 · Tailwind CSS 3 · Framer Motion · React Three Fiber · cobe · Lenis

```bash
npm install --legacy-peer-deps
npm run dev
```

## Content

- **Projects & Efiko products:** `lib/projects.ts` (single source of truth; links stay private by design).
- **CV:** edit `resume/resume.html`, then `npm run resume` to regenerate `public/resume.pdf` (needs Chromium; set `CHROME_PATH` if it isn't `/usr/bin/chromium`).

## Project thumbnails

Card images are uploaded at **`/admin/thumbnails`** (not linked from the site, `noindex`). Until a project has one, its card shows a bundled screenshot or a generated cover.

1. Set `THUMBNAIL_ADMIN_TOKEN` (e.g. `openssl rand -hex 32`) in Vercel → Settings → Environment Variables, and in `.env.local` for local use.
2. In Vercel → Storage, create a **Blob** store and connect it to the project — this adds `BLOB_READ_WRITE_TOKEN`. Without it, uploads go to `.data/thumbnails/` (local dev only; Vercel's filesystem is read-only).
3. Open `/admin/thumbnails`, enter the token, and drop an image on a card. Images are resized to 1600px wide in the browser; 16:10 screenshots look best.

API (Bearer token required for writes):

| Method | Route | |
| --- | --- | --- |
| `GET` | `/api/thumbnails` | `{ thumbnails: { [slug]: url } }` |
| `POST` | `/api/thumbnails/:slug` | multipart `file` (JPEG/PNG/WebP/AVIF, ≤ 4 MB) |
| `DELETE` | `/api/thumbnails/:slug` | revert to the default cover |

Uploads revalidate `/` immediately. A slug is the project's `slug` in `lib/projects.ts`.
