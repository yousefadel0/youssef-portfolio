import type { ProjectSlug } from "@/config/site";
import type { Localized } from "@/lib/i18n";

export type ProjectCopy = {
  type: string;
  tagline: string;
  client: string;
  platform: string;
  summary: string;
  problem: string;
  approach: { title: string; text: string }[];
  features: { title: string; text: string }[];
  results: { value: string; label: string }[];
};

export type ProjectTheme = {
  /** Showcase panel background. */
  bg: string;
  /** Text on the panel. Must pass AA on bg. */
  fg: string;
  accent: string;
  /** Text on the accent color. */
  onAccent: string;
  muted: string;
};

export type Project = {
  slug: ProjectSlug;
  index: number;
  name: string;
  year: string;
  theme: ProjectTheme;
  palette: { name: string; hex: string }[];
  fonts: {
    display: { name: string; cssVar: string };
    body: { name: string; cssVar: string };
  };
  stack: string[];
  copy: Localized<ProjectCopy>;
};
