import { site, type ProjectSlug } from "@/config/site";
import { atlasConsole } from "./atlas-console";
import { halcyon } from "./halcyon";
import { maisonEmber } from "./maison-ember";
import { maskan } from "./maskan";
import { pulseClub } from "./pulse-club";
import { sufra } from "./sufra";
import { tidal } from "./tidal";
import type { Project } from "./types";

export const projects: Project[] = [maisonEmber, sufra, halcyon, pulseClub, maskan, atlasConsole, tidal];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: ProjectSlug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const projectLinks = (slug: ProjectSlug) => site.projects[slug];

export type { Project, ProjectCopy } from "./types";
