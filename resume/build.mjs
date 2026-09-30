// Renders resume/resume.html to public/resume.pdf with headless Chromium.
// Usage: npm run resume   (set CHROME_PATH if Chromium isn't at /usr/bin/chromium)
import { chromium } from "playwright-core"
import path from "node:path"

const root = path.dirname(new URL(import.meta.url).pathname)
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/chromium" })
const page = await browser.newPage()
await page.goto("file://" + path.join(root, "resume.html"), { waitUntil: "load" })
await page.pdf({ path: path.join(root, "..", "public", "resume.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true })
await browser.close()
console.log("wrote public/resume.pdf")
