import { z } from "zod";

const emailOrPhone = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^\+?[\d\s()-]{7,20}$/.test(v);

/** Shared by the brief form (per-step checks) and the API route (full check). */
export const briefSchema = z.object({
  projectTypes: z.array(z.string().min(1).max(40)).min(1).max(6),
  budget: z.string().min(1).max(40),
  timeline: z.string().min(1).max(40),
  name: z.string().trim().min(2).max(80),
  business: z.string().trim().max(120).optional().default(""),
  contact: z.string().trim().min(5).max(120).refine(emailOrPhone),
  details: z.string().trim().min(20).max(3000),
  locale: z.enum(["en", "ar"]),
  /** Honeypot: humans never see this field. */
  website: z.string().max(0).optional().default(""),
});

export type Brief = z.infer<typeof briefSchema>;

export const stepFields = [["projectTypes"], ["budget", "timeline"], ["name", "contact", "details"]] as const;

export type BriefField = (typeof stepFields)[number][number];
