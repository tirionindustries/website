import { ImageResponse } from "next/og";

export const alt = "Tirion Industries — Archangel Multi-Domain Intelligence Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #000000 0%, #040810 30%, #0a1930 70%, #080f1e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(42,109,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(42,109,212,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            background: "#4a8fff",
            display: "flex",
          }}
        />

        {/* Tag */}
        <div
          style={{
            fontSize: 16,
            color: "#4a8fff",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          {"// AFRICA'S SOVEREIGN INTELLIGENCE INFRASTRUCTURE"}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#e8f0f8",
            lineHeight: 0.95,
            letterSpacing: "3px",
            marginBottom: 16,
            display: "flex",
          }}
        >
          TIRION INDUSTRIES
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "#a8bcd0",
            letterSpacing: "8px",
            marginBottom: 32,
            display: "flex",
          }}
        >
          ARCHANGEL
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "#5a7090",
            lineHeight: 1.6,
            maxWidth: 700,
            display: "flex",
          }}
        >
          Multi-domain situational intelligence. Air, maritime, ground, space &
          signals — fused into one operational picture across 54 nations.
        </div>

        {/* Bottom stats */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 80,
            display: "flex",
            gap: 48,
          }}
        >
          {[
            { num: "5", label: "DOMAINS" },
            { num: "54", label: "NATIONS" },
            { num: "24/7", label: "OPERATIONS" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                borderLeft: "1px solid rgba(42,109,212,0.4)",
                paddingLeft: 16,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  color: "#4a8fff",
                  fontWeight: 700,
                }}
              >
                {stat.num}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#5a7090",
                  letterSpacing: "3px",
                  fontFamily: "monospace",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom right tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            fontSize: 12,
            color: "#2a6dd4",
            letterSpacing: "3px",
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          ALL OTHERS WE MONITOR
        </div>
      </div>
    ),
    { ...size }
  );
}
