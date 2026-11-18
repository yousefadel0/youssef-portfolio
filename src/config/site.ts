/**
 * The one file to edit. Everything personal and every link.
 * Empty strings are treated as "not set" and hidden or replaced by a tasteful placeholder state.
 */

export type ProjectSlug = "maison-ember" | "halcyon" | "pulse-club" | "atlas-console" | "tidal" | "sufra" | "maskan";

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
    instagram: "https://www.instagram.com/y0ousef_adell/",
    github: "",
    linkedin: "https://www.linkedin.com/in/youssef-adel-dev/",
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
} as const;

export const activeSocials = (Object.entries(site.socials) as [keyof typeof site.socials, string][]).filter(
  ([, url]) => url.length > 0,
);
