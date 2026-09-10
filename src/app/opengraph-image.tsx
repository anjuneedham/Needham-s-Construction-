import { ImageResponse } from "next/og";

import { company } from "@/data/company";

export const alt = `${company.name} — construction and home services in Jamaica`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social sharing card. It is typographic on purpose — no stock imagery
 * standing in for company work. Once real photography exists, an
 * `opengraph-image.jpg` file placed in this folder replaces it.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090b",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              backgroundColor: "#e29a2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#08090b",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>
              NEEDHAM&apos;S
            </div>
            <div style={{ color: "#e29a2e", fontSize: 16, letterSpacing: 6, fontWeight: 700 }}>
              CONSTRUCTION
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Quality Construction.
          </div>
          <div
            style={{
              color: "#f0b45c",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Reliable Workmanship.
          </div>
          <div style={{ color: "#bdb8ac", fontSize: 26, marginTop: 28 }}>
            Tiling · Plumbing · Masonry · General Construction
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 28,
            color: "#948e81",
            fontSize: 22,
          }}
        >
          <span>Construction &amp; home services across Jamaica</span>
        </div>
      </div>
    ),
    size,
  );
}
