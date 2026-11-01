import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Start a project with Youssef Adel";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Start a project", title: "Tell me what you're building", bg: "#FF5A1F", accent: "#131210", onAccent: "#F1EADC" });
}
