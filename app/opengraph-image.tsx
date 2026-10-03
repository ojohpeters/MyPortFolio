import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

// Branded social-share thumbnail (1200×630). Features the round avatar so the
// preview on WhatsApp / X / LinkedIn shows the profile image. Reused for both
// Open Graph and Twitter cards.
export const runtime = "nodejs"
export const alt = "Ojoh Peters Ojochegbe — Senior Software & Cloud Solutions Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Read the colocated avatar and inline it as a data URI (Satori needs the
// bytes). app/avatar.png is force-included into this function via
// outputFileTracingIncludes in next.config.mjs.
const avatarSrc =
  "data:image/png;base64," +
  readFileSync(join(process.cwd(), "app", "avatar.png")).toString("base64")

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 70,
          padding: "0 90px",
          background: "linear-gradient(135deg,#0c0a08 0%,#17120d 55%,#0c0a08 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Aurora blobs */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "#2a2724",
            opacity: 0.4,
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "#ffb25c",
            opacity: 0.35,
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* Round avatar with gradient ring */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 372,
            height: 372,
            flexShrink: 0,
            borderRadius: 9999,
            background: "linear-gradient(135deg,#ffc9a3,#ff8a3d,#ffb25c)",
            boxShadow: "0 25px 70px rgba(255,90,20,0.45)",
          }}
        >
          <img
            src={avatarSrc}
            width={344}
            height={344}
            style={{
              borderRadius: 9999,
              objectFit: "cover",
              background: "#ffffff",
              border: "7px solid #0c0a08",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              color: "#d4d4d8",
              fontSize: 22,
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 9999,
                background: "#22c55e",
                display: "flex",
              }}
            />
            Available for freelance &amp; collaborations
          </div>

          <div
            style={{
              marginTop: 26,
              fontSize: 70,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fafafa",
              display: "flex",
            }}
          >
            Ojoh Peters
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              backgroundImage: "linear-gradient(90deg,#ffc9a3,#ff8a3d,#ffb25c)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            Ojochegbe
          </div>

          <div
            style={{
              marginTop: 22,
              fontSize: 28,
              color: "#a1a1aa",
              display: "flex",
            }}
          >
            Senior Software &amp; Cloud Solutions Engineer
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.04em",
              backgroundImage: "linear-gradient(90deg,#ffc9a3,#ffb25c)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            ojohpeters.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
