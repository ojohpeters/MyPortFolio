import { ImageResponse } from "next/og"

// Generated favicon: a gradient rounded square with the "OP" monogram.
export const runtime = "edge"
export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg,#7c3aed,#e879f9,#06b6d4)",
          color: "#ffffff",
          fontSize: 38,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        OP
      </div>
    ),
    { ...size }
  )
}
