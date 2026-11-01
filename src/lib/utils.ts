import { clsx, type ClassValue } from "clsx";
import { site, type Currency } from "@/config/site";
import type { Locale } from "@/lib/i18n";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatPrice = (amount: number, currency: Currency, locale: Locale) => {
  const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  if (currency === "USD") return `$${n}`;
  return locale === "ar" ? `${n} ج.م` : `EGP ${n}`;
};

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${site.person.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mailtoUrl = (subject?: string) =>
  `mailto:${site.person.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const pad = (n: number) => String(n).padStart(2, "0");
