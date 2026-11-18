import { clsx, type ClassValue } from "clsx";
import { site } from "@/config/site";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${site.person.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mailtoUrl = (subject?: string) =>
  `mailto:${site.person.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const pad = (n: number) => String(n).padStart(2, "0");
