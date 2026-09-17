import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, generated at build time. Deliberately typographic: the same ink /
 * paper / red system as the site, no photography to go stale.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          padding: "72px",
          // Faint column grid, drawn with a repeating gradient.
          backgroundImage:
            "linear-gradient(90deg, rgba(242,239,232,0.05) 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.2em",
              color: "#8a877f",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Portfolio — 2026
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#ff4d6d", fontWeight: 600 }}>
            {site.domain}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 900,
              color: "#f2efe8",
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            Vishal Kumar
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 900,
              color: "#f2efe8",
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            Thakur
            <span style={{ color: "#e5123b" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              fontWeight: 700,
              color: "#a5a29b",
            }}
          >
            {site.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            borderTop: "1px solid rgba(242,239,232,0.14)",
            paddingTop: 28,
            fontSize: 22,
            color: "#8a877f",
          }}
        >
          <span style={{ display: "flex" }}>6 apps in production</span>
          <span style={{ display: "flex", width: 8, height: 8, background: "#e5123b" }} />
          <span style={{ display: "flex" }}>Security-hardened</span>
          <span style={{ display: "flex", width: 8, height: 8, background: "#e5123b" }} />
          <span style={{ display: "flex" }}>Founder, Mithila KritiKala Trust</span>
        </div>
      </div>
    ),
    size,
  );
}
