import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Youssef Adel — links";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Link in bio", title: "Websites & apps, one tap away" });
}
