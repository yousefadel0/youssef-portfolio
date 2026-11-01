import { site } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** The Y monogram with its kiln full stop. */
export const Logomark = ({ size = 36, className, inverse }: { size?: number; className?: string; inverse?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden focusable={false} className={className}>
    <rect width="64" height="64" fill={inverse ? "#FF5A1F" : "#131210"} />
    <path d="M15 13 L31 33 L47 13" fill="none" stroke={inverse ? "#131210" : "#F1EADC"} strokeWidth="7.5" strokeLinecap="square" />
    <path d="M31 31 V52" fill="none" stroke={inverse ? "#131210" : "#F1EADC"} strokeWidth="7.5" strokeLinecap="square" />
    <rect x="41" y="44" width="9" height="9" fill={inverse ? "#131210" : "#FF5A1F"} />
  </svg>
);

/** Live-text wordmark: "youssef adel" + a square full stop. */
export const Wordmark = ({ locale, className }: { locale: Locale; className?: string }) => (
  <span className={cn("display inline-flex items-baseline whitespace-nowrap lowercase", className)}>
    {locale === "ar" ? site.person.nameAr : site.person.name}
    <span aria-hidden className="ms-[0.08em] inline-block size-[0.22em] translate-y-[-0.02em] bg-kiln" />
  </span>
);
