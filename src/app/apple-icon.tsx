import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#131210" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M15 13 L31 33 L47 13" fill="none" stroke="#F1EADC" strokeWidth="7.5" strokeLinecap="square" />
          <path d="M31 31 V52" fill="none" stroke="#F1EADC" strokeWidth="7.5" strokeLinecap="square" />
          <rect x="41" y="44" width="9" height="9" fill="#FF5A1F" />
        </svg>
      </div>
    ),
    size,
  );
}
