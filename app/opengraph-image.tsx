import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#09090b",
          color: "#fafafa",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#a5b4fc" }}>{site.domain}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: "-0.04em",
            }}
          >
            Vishal Kumar Thakur
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#a1a1aa" }}>
            {site.title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 28,
            fontSize: 22,
            color: "#8d8d98",
          }}
        >
          BCA Cybersecurity, LPU · Benipatti, Bihar
        </div>
      </div>
    ),
    size,
  );
}
