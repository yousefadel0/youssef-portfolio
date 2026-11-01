import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Youssef Adel — Websites & apps for people starting something";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ kicker: "Full-stack developer · Cairo", title: "Websites & apps for people starting something" });
}
