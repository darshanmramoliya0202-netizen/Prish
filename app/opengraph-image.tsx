import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #07101d 0%, #0f1d36 55%, #1c7b63 100%)",
          color: "#f5f0e7",
          padding: "56px",
          position: "relative",
          fontFamily: "Georgia, serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 18%, rgba(211,165,109,0.28), transparent 26%), radial-gradient(circle at 80% 78%, rgba(169,92,58,0.22), transparent 30%)"
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "28px",
            padding: "44px",
            background: "rgba(7, 16, 29, 0.52)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                border: "1px solid rgba(211,165,109,0.28)",
                borderRadius: "999px",
                padding: "10px 18px",
                color: "#d3a56d",
                fontSize: 24,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif"
              }}
            >
              Prish Overseas
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: 760 }}>
              <div style={{ fontSize: 72, lineHeight: 1.02 }}>Indian-origin ingredients for global formulations.</div>
              <div style={{ fontSize: 30, lineHeight: 1.4, color: "rgba(245,240,231,0.82)", fontFamily: "Arial, sans-serif" }}>
                Botanical powders, dehydrated ingredients, rice, and export-ready sourcing systems from Rajkot, Gujarat.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: "14px", fontFamily: "Arial, sans-serif" }}>
              {[
                "Traceable sourcing",
                "Controlled processing",
                "Export readiness"
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "10px 16px",
                    fontSize: 22,
                    color: "rgba(245,240,231,0.78)"
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div style={{ color: "#d3a56d", fontSize: 28, fontFamily: "Arial, sans-serif" }}>prishoverseas9@gmail.com</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
