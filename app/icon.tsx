import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 64,
  height: 64
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #07101d 0%, #10203b 100%)",
          color: "#d3a56d",
          borderRadius: "16px",
          fontSize: 30,
          fontFamily: "Georgia, serif",
          border: "2px solid rgba(211,165,109,0.34)"
        }}
      >
        PO
      </div>
    ),
    {
      ...size
    }
  );
}
