import { Archivo, Fraunces, IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

/**
 * Typefaces of the five builds, used only on case-study pages so the specimens are real.
 * None are preloaded; the browser fetches only the ones a page actually renders.
 */
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap", preload: false });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", preload: false });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", preload: false });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap", preload: false });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

export const projectFontVariables = [fraunces, inter, spaceGrotesk, archivo, jetbrains, jakarta, plexArabic]
  .map((f) => f.variable)
  .join(" ");
