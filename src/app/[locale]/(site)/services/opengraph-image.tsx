import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Services — Youssef Adel";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Services", title: "Stores, booking systems, dashboards & apps", bg: "#131210", fg: "#F1EADC" });
}
