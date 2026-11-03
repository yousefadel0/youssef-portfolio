import { z } from "zod";

/** Arabic-Indic digits (٠١٢…) to Latin, so "٠١٠٠…" validates like "0100…". */
const latinDigits = (v: string) => v.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));

const isPhone = (v: string) => /^\+?[\d\s()-]+$/.test(v) && v.replace(/\D/g, "").length >= 8 && v.replace(/\D/g, "").length <= 15;

/** Shared by the brief form (per-step checks) and the API route (full check). */
export const briefSchema = z.object({
  projectTypes: z.array(z.string().min(1).max(40)).min(1).max(7),
  budget: z.string().min(1).max(40),
  timeline: z.string().min(1).max(40),
  name: z.string().trim().min(2).max(80),
  business: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().transform(latinDigits).refine(isPhone),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    .optional()
    .default(""),
  details: z.string().trim().min(20).max(3000),
  locale: z.enum(["en", "ar"]),
  /** Honeypot: humans never see this field. */
  website: z.string().max(0).optional().default(""),
});

export type Brief = z.infer<typeof briefSchema>;

export const stepFields = [["projectTypes"], ["budget", "timeline"], ["name", "phone", "email", "details"]] as const;

export type BriefField = (typeof stepFields)[number][number];
