/**
 * The one file to edit. Everything personal, every link, every price.
 * Empty strings are treated as "not set" and hidden or replaced by a tasteful placeholder state.
 */

export type ProjectSlug = "maison-ember" | "halcyon" | "pulse-club" | "atlas-console" | "tidal";
export type Currency = "EGP" | "USD";
export type PackageId = "launch" | "growth" | "custom";

export const site = {
  /** Production URL, used for canonical links, sitemap and OG images. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://youssefadel.dev",

  person: {
    name: "Youssef Adel",
    nameAr: "يوسف عادل",
    fullName: "Youssef Adel Elsayed Ali Arafat",
    jobTitle: "Full-Stack & AI Developer",
    city: "Cairo",
    country: "Egypt",
    email: "yjou811@gmail.com",
    phone: "+20 100 466 2467",
    /** International format, digits only. Used for wa.me links. */
    whatsapp: "201004662467",
    buildingSince: 2020,
  },

  /** Leave empty to hide. */
  socials: {
    tiktok: "",
    instagram: "",
    github: "",
    linkedin: "",
  },

  cv: {
    file: "/cv/youssef-adel-cv.pdf",
    fileName: "Youssef-Adel-CV.pdf",
    updated: "2026-11",
  },

  /** Add the live demo and repository URLs as each build is deployed. */
  projects: {
    "maison-ember": { liveUrl: "", githubUrl: "" },
    halcyon: { liveUrl: "", githubUrl: "" },
    "pulse-club": { liveUrl: "", githubUrl: "" },
    "atlas-console": { liveUrl: "", githubUrl: "" },
    tidal: { liveUrl: "", githubUrl: "" },
  } satisfies Record<ProjectSlug, { liveUrl: string; githubUrl: string }>,

  /** Placeholder starting prices. See DECISIONS.md. */
  pricing: {
    defaultCurrency: "EGP" as Currency,
    packages: {
      launch: { EGP: 15000, USD: 450, deliveryDays: [7, 10] as [number, number] },
      growth: { EGP: 38000, USD: 1100, deliveryDays: [21, 35] as [number, number] },
      custom: { EGP: 75000, USD: 2200, deliveryDays: null },
    } satisfies Record<PackageId, { EGP: number; USD: number; deliveryDays: [number, number] | null }>,
  },
} as const;

export const activeSocials = (Object.entries(site.socials) as [keyof typeof site.socials, string][]).filter(
  ([, url]) => url.length > 0,
);
