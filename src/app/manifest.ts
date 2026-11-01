import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.person.name} — Websites & apps`,
    short_name: site.person.name,
    start_url: "/",
    display: "standalone",
    background_color: "#F1EADC",
    theme_color: "#131210",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
