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
          background: "#100e0c",
          color: "#f6f1e8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#f0b429", letterSpacing: "0.18em" }}>
          {site.domain}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            Vishal Kumar
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#f0b429",
              fontStyle: "italic",
            }}
          >
            Thakur
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#cbbba8" }}>{site.title}</div>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(246,241,232,0.14)",
            paddingTop: 28,
            fontSize: 22,
            color: "#a89480",
          }}
        >
          BCA Cybersecurity, LPU · Benipatti, Bihar
        </div>
      </div>
    ),
    size,
  );
}
