/**
 * The one file to edit. Everything personal, every link, every price.
 * Empty strings are treated as "not set" and hidden or replaced by a tasteful placeholder state.
 */

export type ProjectSlug = "maison-ember" | "halcyon" | "pulse-club" | "atlas-console" | "tidal" | "sufra" | "maskan";
export type Currency = "EGP" | "USD";
export type PackageId = "launch" | "growth" | "custom";
export type AddonId = "extraPage" | "secondLanguage" | "onlinePayments" | "aiAssistant" | "adLanding" | "brandKit";

type Money = Record<Currency, number>;

export const site = {
  /** Production URL, used for canonical links, sitemap and OG images. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://youssef-portfolio-pi.vercel.app",

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

  /**
   * Every build has a working demo inside this site at /demo/<slug>.
   * When a build is deployed on its own, put its URL in `liveUrl` and the "Live demo" button
   * points there instead. `githubUrl` shows a "Code" link when filled.
   */
  projects: {
    "maison-ember": { liveUrl: "", githubUrl: "" },
    halcyon: { liveUrl: "", githubUrl: "" },
    "pulse-club": { liveUrl: "", githubUrl: "" },
    "atlas-console": { liveUrl: "", githubUrl: "" },
    tidal: { liveUrl: "", githubUrl: "" },
    sufra: { liveUrl: "", githubUrl: "" },
    maskan: { liveUrl: "", githubUrl: "" },
  } satisfies Record<ProjectSlug, { liveUrl: string; githubUrl: string }>,

  /** Placeholder prices. See DECISIONS.md. */
  pricing: {
    defaultCurrency: "EGP" as Currency,
    packages: {
      launch: { EGP: 12000, USD: 350, deliveryDays: [7, 10] as [number, number] },
      growth: { EGP: 30000, USD: 900, deliveryDays: [21, 30] as [number, number] },
      custom: { EGP: 60000, USD: 1800, deliveryDays: null },
    } satisfies Record<PackageId, Money & { deliveryDays: [number, number] | null }>,
    /** Where the money goes, in percent. Must add up to 100. */
    breakdown: {
      launch: { design: 30, build: 45, launch: 15, support: 10 },
      growth: { design: 25, build: 50, launch: 15, support: 10 },
      custom: { design: 20, build: 55, launch: 15, support: 10 },
    } satisfies Record<PackageId, { design: number; build: number; launch: number; support: number }>,
    /** Share paid up front; the rest is paid before launch. */
    deposit: 0.5,
    carePlan: { EGP: 1500, USD: 45 } satisfies Money,
    addons: {
      extraPage: { EGP: 1500, USD: 45 },
      secondLanguage: { EGP: 4000, USD: 120 },
      onlinePayments: { EGP: 5000, USD: 150 },
      aiAssistant: { EGP: 8000, USD: 240 },
      adLanding: { EGP: 4500, USD: 135 },
      brandKit: { EGP: 3000, USD: 90 },
    } satisfies Record<AddonId, Money>,
  },
} as const;

export const activeSocials = (Object.entries(site.socials) as [keyof typeof site.socials, string][]).filter(
  ([, url]) => url.length > 0,
);
