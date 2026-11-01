import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { locales } from "@/lib/i18n";

const paths = ["", "/services", "/contact", "/cv", "/links", ...projects.map((p) => `/work/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/work") ? 0.8 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
    })),
  );
}
