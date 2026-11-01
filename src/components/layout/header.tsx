"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logomark, Wordmark } from "@/components/ui/logo";
import { LangSwitch } from "@/components/ui/lang-switch";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { cn, whatsappUrl } from "@/lib/utils";

type Props = { locale: Locale; t: Pick<Dictionary, "nav" | "fab"> };

export const Header = ({ locale, t }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = href(locale);
  const solid = scrolled || pathname !== home;

  const links = [
    { label: t.nav.work, href: `${home}#work` },
    { label: t.nav.services, href: href(locale, "/services") },
    { label: t.nav.process, href: `${home}#process` },
    { label: t.nav.pricing, href: `${home}#pricing` },
    { label: t.nav.about, href: `${home}#about` },
    { label: t.nav.contact, href: href(locale, "/contact") },
  ];

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY + 4);
      if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-expo",
          solid && !open ? "border-b border-line bg-bone/92 backdrop-blur-md" : "border-b border-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={home} className="flex items-center gap-3" data-cursor="open">
            <Logomark size={34} />
            <Wordmark locale={locale} className="hidden text-[1.35rem] sm:inline-flex" />
            <span className="sr-only sm:hidden">{t.nav.home}</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group/nav relative px-2.5 py-2 text-[0.95rem] whitespace-nowrap xl:px-3" data-cursor="open">
                    {l.label}
                    <span aria-hidden className="absolute inset-x-3 bottom-1 h-px origin-left rtl:origin-right scale-x-0 bg-kiln transition-transform duration-500 ease-expo group-hover/nav:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <LangSwitch locale={locale} label={t.nav.switchTo} ariaLabel={t.nav.switchLabel} />
            <Link
              href={href(locale, "/contact")}
              className="group/cta hidden h-11 items-center gap-2 whitespace-nowrap bg-ink px-4 text-[0.92rem] font-medium text-bone transition-colors duration-300 hover:bg-kiln hover:text-ink md:inline-flex"
              data-cursor="open"
            >
              {t.nav.start}
              <ArrowIcon size={16} className="transition-transform duration-500 ease-expo group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1" />
            </Link>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn("relative z-[60] flex h-11 items-center gap-3 px-1 lg:hidden", open && "text-bone")}
            >
              <span className="label">{open ? t.nav.close : t.nav.menu}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-current transition-transform duration-500 ease-expo", open && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute inset-x-0 bottom-0 h-[2px] bg-current transition-transform duration-500 ease-expo", open && "-translate-y-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        data-open={open}
        inert={!open}
        className="menu-panel fixed inset-0 z-[55] flex flex-col bg-ink text-bone lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center pt-[var(--header-h)]">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <div className="menu-item" style={{ "--i": i } as CSSProperties}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="display flex items-baseline gap-4 py-1 text-[clamp(2.6rem,11vw,5rem)]">
                    <span className="label tabular text-kiln">0{i + 1}</span>
                    {l.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="shell pb-28">
          <a
            href={whatsappUrl(t.fab.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-3 bg-kiln font-medium text-ink"
          >
            <WhatsAppIcon />
            {t.fab.label}
          </a>
        </div>
      </div>
    </>
  );
};
