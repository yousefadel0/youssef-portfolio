"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ProjectTheme } from "@/content/projects/types";
import { cn, pad } from "@/lib/utils";

type Item = { slug: string; name: string; type: string; tagline: string; href: string; theme: ProjectTheme };

/**
 * Hover list of all five builds. On fine pointers a poster of the hovered build, set in its
 * own colors, follows the cursor (fixed-positioned, so it never widens the page) and swaps
 * with a vertical mask. Elsewhere it is a plain list of links.
 */
export const WorkIndex = ({ items, label }: { items: Item[]; label: string }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = float.current;
    const box = wrap.current;
    if (!el || !box || !window.matchMedia("(pointer: fine)").matches) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!frame) {
        pos.x = target.x;
        pos.y = target.y;
        frame = requestAnimationFrame(tick);
      }
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", leave);
    return () => {
      leave();
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={wrap} className="relative" onPointerLeave={() => setActive(null)}>
      <p className="label mb-4 text-smoke">{label}</p>
      <ul className="border-t border-ink">
        {items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              data-cursor="view"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={cn(
                "group/row grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-b border-ink py-5 transition-[padding,opacity] duration-500 ease-expo md:py-6",
                active !== null && active !== i && "opacity-35",
                active === i && "ps-3",
              )}
            >
              <span className="label tabular">{pad(i + 1)}</span>
              <span className="display text-[clamp(1.8rem,3vw,3.25rem)] whitespace-nowrap">{item.name}</span>
              <span className="label hidden max-w-[13ch] text-end leading-snug text-smoke xl:block">{item.type}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={float}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-[min(24rem,30vw)] lg:block"
        style={{ opacity: active === null ? 0 : 1, transition: "opacity .35s" }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ clipPath: active === null ? "inset(50% 0 50% 0)" : "inset(0 0 0 0)", transition: "clip-path .7s cubic-bezier(.16,1,.3,1)" }}
        >
          <div className="relative aspect-[4/5]">
            {items.map((item, i) => (
              <div
                key={item.slug}
                className="absolute inset-0 flex flex-col justify-between p-6 transition-[clip-path] duration-700 ease-expo"
                style={{ background: item.theme.bg, color: item.theme.fg, clipPath: active === i ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
              >
                <span className="flex items-center justify-between">
                  <span className="label" style={{ color: item.theme.muted }}>
                    WO—{pad(i + 1)}
                  </span>
                  <span className="size-3" style={{ background: item.theme.accent }} />
                </span>
                <span className="display text-[clamp(4rem,9vw,8rem)] leading-[0.8] opacity-90" dir="ltr">
                  {pad(i + 1)}
                </span>
                <span>
                  <span className="display block text-[2.4rem]" dir="ltr">
                    {item.name}
                  </span>
                  <span className="headline mt-2 block text-[1.1rem]">{item.tagline}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
