"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, switchLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = { locale: Locale; label: string; ariaLabel: string; className?: string };

/** Same page, other language. Keeps the current path. */
export const LangSwitch = ({ locale, label, ariaLabel, className }: Props) => {
  const pathname = usePathname();
  const to = otherLocale(locale);

  return (
    <Link
      href={switchLocalePath(pathname, to)}
      hrefLang={to}
      lang={to}
      title={ariaLabel}
      data-cursor="open"
      scroll={false}
      className={cn(
        "group/lang relative inline-flex h-10 items-center gap-2 overflow-hidden px-1 text-[0.95rem] font-medium",
        to === "ar" ? "font-[family-name:var(--font-alexandria)]" : "font-[family-name:var(--font-geist)]",
        className,
      )}
    >
      <span aria-hidden className="label opacity-75">
        {locale.toUpperCase()}
      </span>
      <span aria-hidden className="h-3 w-px bg-current opacity-30" />
      <span className="relative">
        {label}
        <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-px origin-left rtl:origin-right scale-x-0 bg-current transition-transform duration-500 ease-expo group-hover/lang:scale-x-100" />
      </span>
    </Link>
  );
};
