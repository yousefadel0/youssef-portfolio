import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Youssef Adel — CV";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Curriculum vitae", title: "Full-stack & AI developer since 2020", bg: "#0E3A34", fg: "#F1EADC" });
}
