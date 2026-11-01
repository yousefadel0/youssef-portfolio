"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logomark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  name: string;
  backHref: string;
  whatsappHref: string;
  copy: { back: string; badge: string; desktop: string; mobile: string; view: string; note: string; start: string; reset: string };
  children: ReactNode;
};

/**
 * Frame around every live demo: a slim build-sheet toolbar, a desktop / phone preview toggle
 * (on large screens) and a reset that clears the demo's saved state.
 */
export const DemoShell = ({ slug, name, backHref, whatsappHref, copy, children }: Props) => {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  const reset = () => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(`demo:${slug}:`))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
    window.location.reload();
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-ink">
      <header className="sticky top-0 z-[60] flex h-14 shrink-0 items-center gap-3 border-b border-line-light bg-ink px-3 text-bone sm:px-5">
        <Link href={backHref} className="group/back flex items-center gap-2 text-[0.9rem]" data-cursor="open">
          <ArrowIcon size={16} className="rotate-180 transition-transform duration-500 ease-expo group-hover/back:-translate-x-1 rtl:group-hover/back:translate-x-1" />
          <span className="sr-only sm:not-sr-only">{copy.back}</span>
        </Link>
        <span aria-hidden className="h-5 w-px bg-line-light" />
        <Logomark size={24} />
        <p className="min-w-0 truncate">
          <span className="font-medium">{name}</span>
          <span className="label ms-3 hidden text-ash md:inline">{copy.badge}</span>
        </p>

        <div className="ms-auto flex items-center gap-2">
          <div role="radiogroup" aria-label={copy.view} className="hidden border border-line-light p-0.5 lg:flex">
            {(["desktop", "mobile"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={cn("label h-8 px-3 transition-colors", mode === m ? "bg-bone text-ink" : "text-ash hover:text-bone")}
              >
                {m === "desktop" ? copy.desktop : copy.mobile}
              </button>
            ))}
          </div>
          <button type="button" onClick={reset} className="label hidden h-9 px-3 text-ash transition-colors hover:text-bone sm:block">
            {copy.reset}
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-2 bg-kiln px-3 text-[0.88rem] font-medium text-ink transition-colors hover:bg-bone"
          >
            <WhatsAppIcon size={17} />
            <span className="sr-only sm:not-sr-only">{copy.start}</span>
          </a>
        </div>
      </header>

      {mode === "mobile" ? (
        <div className="flex flex-1 items-start justify-center overflow-hidden bg-[#0d0c0b] px-4 py-8">
          <div className="rounded-[3rem] bg-[#050505] p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/10">
            {/* transform makes fixed-position UI inside the demo (drawers, sheets) stay inside the phone */}
            <div
              data-lenis-prevent
              className="@container relative h-[min(780px,calc(100svh-9rem))] w-[390px] overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:none] rounded-[2.4rem] bg-white [transform:translateZ(0)]"
              style={{ "--demo-top": "0px" } as CSSProperties}
            >
              {children}
            </div>
          </div>
        </div>
      ) : (
        <main className="@container relative flex-1 bg-white" style={{ "--demo-top": "3.5rem" } as CSSProperties}>
          {children}
        </main>
      )}

      <p className="label border-t border-line-light bg-ink px-4 py-3 text-center text-ash">{copy.note}</p>
    </div>
  );
};
