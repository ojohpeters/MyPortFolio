import { ImageResponse } from "next/og"

// Branded social-share thumbnail (1200×630). Rendered at build time and reused
// for both Open Graph and Twitter cards. Mirrors the site's dark + gradient look.
export const runtime = "edge"
export const alt = "Ojoh Peters — Full-Stack Developer | Web2, Web3, AI & DFIR"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08080d",
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
            background: "#7c3aed",
            opacity: 0.45,
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
            background: "#06b6d4",
            opacity: 0.4,
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* Availability pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            alignSelf: "flex-start",
            padding: "10px 22px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)",
            color: "#d4d4d8",
            fontSize: 24,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#22c55e",
              display: "flex",
            }}
          />
          Available for freelance &amp; collaborations
        </div>

        {/* Name */}
        <div
          style={{
            marginTop: 36,
            fontSize: 84,
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
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(90deg,#a78bfa,#e879f9,#22d3ee)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Ojochegbe
        </div>

        {/* Roles */}
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#a1a1aa",
            display: "flex",
          }}
        >
          Full-Stack Developer · Web2 &amp; Web3 · AI &amp; Automation · DFIR
        </div>

        {/* Footer brand */}
        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 80,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.15em",
            backgroundImage: "linear-gradient(90deg,#a78bfa,#22d3ee)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          OJOCHEGBE
        </div>
      </div>
    ),
    { ...size }
  )
}
