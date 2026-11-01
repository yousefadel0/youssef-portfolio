"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

/** Counts up to `value` once visible. Renders the final number on the server so nothing jumps without JS. */
export const Ticker = ({ value, from = 0, duration = 1400, className }: { value: number; from?: number; duration?: number; className?: string }) => {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, from, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};
