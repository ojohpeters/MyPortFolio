import { NextResponse } from "next/server"
import { getThumbnailMap, isAuthorized, storageMode } from "@/lib/thumbnails"

export const dynamic = "force-dynamic"

/** Current thumbnail URL per project slug. Authorised callers also learn
 *  which storage backend is active (used by the admin page to verify a token). */
export async function GET(req: Request) {
  const thumbnails = await getThumbnailMap()
  const authed = isAuthorized(req)
  return NextResponse.json(
    { thumbnails, ...(authed && { authorized: true, storage: storageMode() }) },
    { headers: { "Cache-Control": "no-store" } },
  )
}
