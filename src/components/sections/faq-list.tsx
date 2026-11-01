"use client";

import { useId, useState } from "react";
import { PlusIcon } from "@/components/ui/icons";
import { cn, pad } from "@/lib/utils";

/** Accessible accordion: buttons with aria-expanded, panels animate height with a grid-rows trick. */
export const FaqList = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="border-t border-ink">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <li key={item.q} className="border-b border-ink">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group/q flex w-full items-start gap-4 py-6 text-start md:gap-6 md:py-7"
              >
                <span className="label tabular pt-2 text-smoke">{pad(i + 1)}</span>
                <span className="headline flex-1 text-[clamp(1.35rem,2.4vw,2.1rem)] transition-transform duration-500 ease-expo group-hover/q:translate-x-2 rtl:group-hover/q:-translate-x-2 ar:leading-[1.45]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-10 shrink-0 place-items-center border border-ink transition-[transform,background-color,color] duration-500 ease-expo",
                    isOpen ? "rotate-45 bg-ink text-bone" : "group-hover/q:bg-kiln",
                  )}
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn("grid transition-[grid-template-rows] duration-500 ease-expo", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-2xl pb-7 ps-10 text-[1.05rem] leading-relaxed text-smoke md:ps-14">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
