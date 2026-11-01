"use client";

import { useContext, useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { AddonId, Currency, PackageId } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { cn, formatPrice, whatsappUrl } from "@/lib/utils";
import { CurrencyContext, Price } from "./currency";

type Money = Record<Currency, number>;

type Props = {
  locale: Locale;
  packages: { id: PackageId; name: string; price: Money; delivery: string }[];
  addons: { id: AddonId; name: string; price: Money; includedIn: PackageId[] }[];
  carePlan: Money;
  deposit: number;
  copy: {
    pickPackage: string;
    addonsLabel: string;
    included: string;
    perPage: string;
    carePlan: string;
    carePlanText: string;
    perMonth: string;
    total: string;
    deposit: string;
    balance: string;
    delivery: string;
    from: string;
    sendEstimate: string;
    estimateNote: string;
    estimateMessage: string;
  };
};

/** Live estimate: package + add-ons + optional care plan, split into deposit and balance, sent to WhatsApp as text. */
export const Estimate = ({ locale, packages, addons, carePlan, deposit, copy }: Props) => {
  const { currency } = useContext(CurrencyContext);
  const [pkg, setPkg] = useState<PackageId>("growth");
  const [picked, setPicked] = useState<Set<AddonId>>(() => new Set());
  const [pages, setPages] = useState(2);
  const [care, setCare] = useState(false);

  const current = packages.find((p) => p.id === pkg)!;
  const isIncluded = (a: Props["addons"][number]) => a.includedIn.includes(pkg);
  const lines = addons
    .filter((a) => picked.has(a.id) && !isIncluded(a))
    .map((a) => ({ name: a.id === "extraPage" ? `${a.name} ×${pages}` : a.name, price: { EGP: a.price.EGP * (a.id === "extraPage" ? pages : 1), USD: a.price.USD * (a.id === "extraPage" ? pages : 1) } }));
  const total: Money = {
    EGP: current.price.EGP + lines.reduce((s, l) => s + l.price.EGP, 0),
    USD: current.price.USD + lines.reduce((s, l) => s + l.price.USD, 0),
  };
  const part = (share: number): Money => ({ EGP: Math.round(total.EGP * share), USD: Math.round(total.USD * share) });

  const toggle = (id: AddonId) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const message = [
    copy.estimateMessage,
    `• ${current.name}: ${formatPrice(current.price[currency], currency, locale)}`,
    ...lines.map((l) => `• ${l.name}: ${formatPrice(l.price[currency], currency, locale)}`),
    care ? `• ${copy.carePlan}: ${formatPrice(carePlan[currency], currency, locale)} ${copy.perMonth}` : "",
    `= ${copy.total}: ${formatPrice(total[currency], currency, locale)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="grid gap-px border border-ink bg-ink lg:grid-cols-12">
      <div className="bg-paper p-6 md:p-9 lg:col-span-7">
        <p className="label text-smoke">{copy.pickPackage}</p>
        <div role="radiogroup" aria-label={copy.pickPackage} className="mt-4 grid gap-2 sm:grid-cols-3">
          {packages.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={pkg === p.id}
              onClick={() => setPkg(p.id)}
              className={cn(
                "flex flex-col items-start gap-1 border p-4 text-start transition-colors duration-300",
                pkg === p.id ? "border-ink bg-ink text-bone" : "border-ink/25 hover:border-ink",
              )}
            >
              <span className="headline text-[1.35rem]">{p.name}</span>
              <span className={cn("text-[0.9rem]", pkg === p.id ? "text-ash" : "text-smoke")}>
                {copy.from} {formatPrice(p.price[currency], currency, locale)}
              </span>
              <span className={cn("label mt-1", pkg === p.id ? "text-kiln" : "text-smoke")}>{p.delivery}</span>
            </button>
          ))}
        </div>

        <p className="label mt-9 text-smoke">{copy.addonsLabel}</p>
        <ul className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
          {addons.map((a) => {
            const included = isIncluded(a);
            const on = included || picked.has(a.id);
            return (
              <li key={a.id} className="flex items-center gap-4 py-3.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  aria-disabled={included}
                  onClick={() => !included && toggle(a.id)}
                  className={cn("flex flex-1 items-center gap-3 text-start", included && "cursor-default")}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-5 shrink-0 place-items-center border transition-colors",
                      on ? "border-ink bg-ink text-bone" : "border-ink/40",
                      included && "border-nile bg-nile",
                    )}
                  >
                    {on ? <CheckIcon size={13} /> : null}
                  </span>
                  <span className="text-[0.98rem]">{a.name}</span>
                </button>
                {a.id === "extraPage" && picked.has("extraPage") ? (
                  <span className="flex items-center border border-ink/30">
                    <button type="button" aria-label="−" onClick={() => setPages((n) => Math.max(1, n - 1))} className="grid size-8 place-items-center hover:bg-ink/5">
                      <MinusIcon size={14} />
                    </button>
                    <span className="tabular w-7 text-center text-[0.95rem]" aria-live="polite">
                      {pages}
                    </span>
                    <button type="button" aria-label="+" onClick={() => setPages((n) => Math.min(20, n + 1))} className="grid size-8 place-items-center hover:bg-ink/5">
                      <PlusIcon size={14} />
                    </button>
                  </span>
                ) : null}
                <span className={cn("tabular shrink-0 text-end text-[0.92rem]", included ? "label text-nile" : "text-smoke")}>
                  {included ? copy.included : `+${formatPrice(a.price[currency], currency, locale)}${a.id === "extraPage" ? ` ${copy.perPage}` : ""}`}
                </span>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          role="checkbox"
          aria-checked={care}
          onClick={() => setCare((v) => !v)}
          className={cn("mt-6 flex w-full items-start gap-4 border p-4 text-start transition-colors", care ? "border-nile bg-nile text-bone" : "border-ink/25 hover:border-ink")}
        >
          <span aria-hidden className={cn("mt-0.5 grid size-5 shrink-0 place-items-center border", care ? "border-bone bg-bone text-nile" : "border-ink/40")}>
            {care ? <CheckIcon size={13} /> : null}
          </span>
          <span className="flex-1">
            <span className="block font-medium">{copy.carePlan}</span>
            <span className={cn("mt-1 block text-[0.92rem]", care ? "text-bone/80" : "text-smoke")}>{copy.carePlanText}</span>
          </span>
          <span className="tabular shrink-0 text-[0.92rem]">
            {formatPrice(carePlan[currency], currency, locale)} {copy.perMonth}
          </span>
        </button>
      </div>

      <div className="flex flex-col bg-ink p-6 text-bone md:p-9 lg:col-span-5">
        <p className="label text-ash">{copy.total}</p>
        <p className="display mt-3 text-[clamp(2.8rem,5vw,4.5rem)] leading-none">
          <Price amounts={total} locale={locale} />
        </p>
        {care ? (
          <p className="mt-3 text-[0.95rem] text-ash">
            + {formatPrice(carePlan[currency], currency, locale)} {copy.perMonth}
          </p>
        ) : null}

        <ul className="mt-8 space-y-2 border-t border-line-light pt-6 text-[0.95rem]">
          <li className="flex justify-between gap-4">
            <span>{current.name}</span>
            <span className="tabular text-ash">{formatPrice(current.price[currency], currency, locale)}</span>
          </li>
          {lines.map((l) => (
            <li key={l.name} className="flex justify-between gap-4">
              <span>{l.name}</span>
              <span className="tabular text-ash">{formatPrice(l.price[currency], currency, locale)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-px bg-line-light">
          {[
            { label: copy.deposit, share: deposit },
            { label: copy.balance, share: 1 - deposit },
          ].map((s) => (
            <div key={s.label} className="bg-ink py-3 pe-3">
              <p className="label text-ash">
                {s.label} · {Math.round(s.share * 100)}%
              </p>
              <p className="headline mt-1 text-[1.4rem]">
                <Price amounts={part(s.share)} locale={locale} />
              </p>
            </div>
          ))}
        </div>

        <div aria-hidden className="min-h-8 flex-1" />
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="open"
          className="flex min-h-14 items-center justify-center gap-3 bg-kiln px-5 py-3 text-center font-medium text-ink transition-colors hover:bg-bone"
        >
          <WhatsAppIcon size={20} />
          {copy.sendEstimate}
        </a>
        <p className="mt-4 text-[0.88rem] text-ash">{copy.estimateNote}</p>
      </div>
    </div>
  );
};
