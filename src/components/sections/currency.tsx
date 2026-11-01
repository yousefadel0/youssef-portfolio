"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Currency } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { cn, formatPrice } from "@/lib/utils";

const CurrencyContext = createContext<{ currency: Currency; setCurrency: (c: Currency) => void }>({
  currency: "EGP",
  setCurrency: () => {},
});

export const CurrencyProvider = ({ initial, children }: { initial: Currency; children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>(initial);
  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>;
};

/** Segmented EGP / USD switch with a sliding thumb. */
export const CurrencyToggle = ({ label, tone = "ink" }: { label: string; tone?: "ink" | "bone" }) => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const options: Currency[] = ["EGP", "USD"];
  return (
    <div role="radiogroup" aria-label={label} className={cn("relative inline-grid grid-cols-2 border p-1", tone === "ink" ? "border-ink" : "border-bone")} dir="ltr">
      <span
        aria-hidden
        className={cn("absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] transition-transform duration-500 ease-expo", tone === "ink" ? "bg-ink" : "bg-bone")}
        style={{ transform: currency === "USD" ? "translateX(100%)" : "none" }}
      />
      {options.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={currency === c}
          onClick={() => setCurrency(c)}
          className={cn(
            "label relative z-10 h-9 px-5 transition-colors duration-300",
            currency === c ? (tone === "ink" ? "text-bone" : "text-ink") : "",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

/** Price in the selected currency; counts to the new amount when the currency changes. */
export const Price = ({ amounts, locale, className }: { amounts: Record<Currency, number>; locale: Locale; className?: string }) => {
  const { currency } = useContext(CurrencyContext);
  const target = amounts[currency];
  const [shown, setShown] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = target;
    if (from === target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span className={cn("tabular", className)} aria-live="polite">
      {formatPrice(shown, currency, locale)}
    </span>
  );
};
