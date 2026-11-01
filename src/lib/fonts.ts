import { Alexandria, Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

/** Display face: the only preloaded font, since the hero headline is the LCP element. */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: false,
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

/** Arabic face. Not preloaded: it only downloads where Arabic text renders. */
export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
  preload: false,
});

export const fontVariables = [bricolage.variable, geist.variable, geistMono.variable, alexandria.variable].join(" ");
