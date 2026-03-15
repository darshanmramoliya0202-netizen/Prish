import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(160deg, #08101d 0%, #10203b 60%, #a95c3a 100%)",
          color: "#f5f0e7",
          padding: "56px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(8, 16, 29, 0.5)",
            padding: "42px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: 840 }}>
            <div style={{ color: "#d3a56d", fontSize: 24, letterSpacing: "0.28em", textTransform: "uppercase" }}>Prish Overseas</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 74, lineHeight: 1.02 }}>
              India, structured for serious global ingredient buyers.
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.45, color: "rgba(245,240,231,0.82)" }}>
              Export-focused botanical powders, dehydrated ingredients, rice, quality systems, and inquiry-first buyer conversion.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "14px" }}>
              {[
                "Products",
                "Quality",
                "Inquiry"
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: "999px",
                    border: "1px solid rgba(211,165,109,0.32)",
                    padding: "10px 18px",
                    fontSize: 22,
                    color: "#d3a56d"
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 24 }}>Rajkot, Gujarat, India</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
