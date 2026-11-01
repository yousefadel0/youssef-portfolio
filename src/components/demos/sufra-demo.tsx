"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Plate } from "./art";
import { categories, dishes, restaurant, tagLabel, type Dish, type Lang } from "./sufra-data";
import { useStored } from "./use-stored";

const C = { saffron: "#F2B33D", tahini: "#F6EBD9", molokhia: "#2F5D3A", tomato: "#C2331F", coffee: "#2A160C", mute: "#6A4A35", card: "#FFFDF8" };
const display = { fontFamily: "var(--font-reem-kufi, var(--font-alexandria)), var(--font-plex-arabic), system-ui, sans-serif" };
const body = { fontFamily: "var(--font-plex-arabic, var(--font-alexandria)), system-ui, sans-serif" };

type Line = { key: string; id: string; size?: string; extras: string[]; qty: number; note: string };

const ui = {
  en: {
    table: "Table 7",
    add: "Add",
    soldOut: "Sold out",
    size: "Size",
    extras: "Extras",
    note: "Note for the kitchen",
    notePh: "No onions, extra crispy…",
    addToOrder: "Add to order",
    order: "Your order",
    items: (n: number) => `${n} item${n === 1 ? "" : "s"}`,
    view: "View order",
    empty: "Nothing here yet. Pick something good.",
    dineIn: "Dine-in",
    delivery: "Delivery",
    address: "Address",
    addressPh: "Street, building, floor",
    subtotal: "Subtotal",
    deliveryFee: "Delivery",
    total: "Total",
    send: "Send order on WhatsApp",
    sent: "This opens WhatsApp with the order already written. In a real build it goes to the restaurant's number.",
    close: "Close",
    special: "Today's dish",
    currency: "EGP",
    search: "Search the menu",
  },
  ar: {
    table: "ترابيزة ٧",
    add: "أضف",
    soldOut: "خلصان",
    size: "الحجم",
    extras: "إضافات",
    note: "ملاحظة للمطبخ",
    notePh: "من غير بصل، مقرمش زيادة…",
    addToOrder: "أضف للأوردر",
    order: "أوردرك",
    items: (n: number) => `${n} ${n === 1 ? "صنف" : "أصناف"}`,
    view: "شوف الأوردر",
    empty: "لسه مفيش حاجة. اختار حاجة حلوة.",
    dineIn: "في المطعم",
    delivery: "توصيل",
    address: "العنوان",
    addressPh: "الشارع، العمارة، الدور",
    subtotal: "المجموع",
    deliveryFee: "التوصيل",
    total: "الإجمالي",
    send: "ابعت الأوردر على واتساب",
    sent: "ده بيفتح واتساب والأوردر مكتوب جاهز. في المشروع الحقيقي بيروح على رقم المطعم.",
    close: "اقفل",
    special: "طبق النهارده",
    currency: "ج.م",
    search: "دوّر في المنيو",
  },
};

const unitPrice = (d: Dish, size: string | undefined, extras: string[]) =>
  d.price + (d.sizes?.find((s) => s.id === size)?.add ?? 0) + extras.reduce((s, id) => s + (d.extras?.find((x) => x.id === id)?.add ?? 0), 0);

export const SufraDemo = ({ locale }: { locale: Locale }) => {
  const [lang, setLang] = useState<Lang>(locale);
  const t = ui[lang];
  const [cart, setCart] = useStored<Line[]>("demo:sufra:cart", []);
  const [active, setActive] = useState(categories[0].id);
  const [dish, setDish] = useState<Dish | null>(null);
  const [size, setSize] = useState<string | undefined>();
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [orderOpen, setOrderOpen] = useState(false);
  const [mode, setMode] = useState<"dine" | "delivery">("dine");
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  const sections = useRef<Record<string, HTMLElement | null>>({});

  const fmt = (n: number) => `${n} ${t.currency}`;
  const name = (d: Dish) => d.name[lang];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? dishes.filter((d) => d.name.en.toLowerCase().includes(q) || d.name.ar.includes(q)) : dishes;
  }, [query]);

  // Highlight the category whose section is on screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.getAttribute("data-cat") ?? categories[0].id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    Object.values(sections.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  const openDish = (d: Dish) => {
    if (d.soldOut) return;
    setDish(d);
    setSize(d.sizes?.[0].id);
    setExtras([]);
    setQty(1);
    setNote("");
  };

  const addLine = () => {
    if (!dish) return;
    const key = `${dish.id}|${size ?? ""}|${[...extras].sort().join(",")}|${note}`;
    setCart((c) => {
      const i = c.findIndex((l) => l.key === key);
      return i === -1 ? [...c, { key, id: dish.id, size, extras, qty, note }] : c.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
    });
    setDish(null);
  };

  const lines = cart.map((l) => {
    const d = dishes.find((x) => x.id === l.id)!;
    return { ...l, dish: d, total: unitPrice(d, l.size, l.extras) * l.qty };
  });
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const fee = mode === "delivery" && subtotal > 0 ? restaurant.deliveryFee : 0;

  const message = [
    `${restaurant.name[lang]} · ${mode === "dine" ? t.table : `${t.delivery}: ${address || "—"}`}`,
    "",
    ...lines.map((l, i) => {
      const parts = [l.dish.sizes?.find((s) => s.id === l.size)?.label[lang], ...l.extras.map((id) => l.dish.extras?.find((x) => x.id === id)?.label[lang])].filter(Boolean);
      return `${i + 1}. ${name(l.dish)} ×${l.qty}${parts.length ? ` (${parts.join("، ")})` : ""}${l.note ? ` — ${l.note}` : ""} = ${fmt(l.total)}`;
    }),
    "",
    fee ? `${t.deliveryFee}: ${fmt(fee)}` : "",
    `${t.total}: ${fmt(subtotal + fee)}`,
  ]
    .filter((x) => x !== undefined)
    .join("\n");

  const scrollTo = (id: string) => sections.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="min-h-full pb-28" style={{ background: C.tahini, color: C.coffee, ...body }}>
      {/* Header */}
      <div style={{ background: C.saffron }}>
        <div className="mx-auto max-w-3xl px-4 pt-5 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[1.9rem] leading-tight font-bold" style={display}>
                {restaurant.name[lang]}
              </p>
              <p className="text-[0.85rem]">
                {t.table} · {restaurant.area[lang]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="rounded-full px-3 py-1.5 text-[0.85rem] font-semibold"
              style={{ background: C.coffee, color: C.saffron }}
              lang={lang === "ar" ? "en" : "ar"}
            >
              {lang === "ar" ? "English" : "عربي"}
            </button>
          </div>
          <label className="mt-4 flex items-center gap-2 rounded-full bg-white/60 px-4 py-2.5">
            <span className="sr-only">{t.search}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} className="w-full bg-transparent text-[0.95rem] outline-none placeholder:text-[#6A4A35]" />
          </label>
        </div>
      </div>

      {/* Sticky category tabs */}
      <nav className="sticky top-[var(--demo-top,0px)] z-20 border-b" style={{ background: C.saffron, borderColor: "rgb(42 22 12 / 0.12)" }} aria-label="Menu categories">
        <div className="mx-auto flex max-w-3xl gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none]">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollTo(c.id)}
              aria-current={active === c.id}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-[0.88rem] font-semibold whitespace-nowrap transition-colors"
              style={active === c.id ? { background: C.coffee, color: C.tahini } : { background: "rgb(42 22 12 / 0.07)" }}
            >
              {c.label[lang]}
            </button>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-4">
        {categories.map((c) => {
          const list = filtered.filter((d) => d.cat === c.id);
          if (!list.length) return null;
          return (
            <section key={c.id} data-cat={c.id} ref={(el) => void (sections.current[c.id] = el)} className="scroll-mt-16 pt-7">
              <h2 className="text-[1.35rem] font-bold" style={display}>
                {c.id === "specials" ? t.special : c.label[lang]}
              </h2>
              <div className={cn("mt-3 grid gap-3", c.id === "specials" ? "" : "@xl:grid-cols-2")}>
                {list.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => openDish(d)}
                    disabled={d.soldOut}
                    className={cn("flex items-center gap-3 rounded-2xl p-3 text-start transition-transform active:scale-[0.98] disabled:opacity-55", c.id === "specials" && "p-4")}
                    style={c.id === "specials" ? { background: C.molokhia, color: C.tahini } : { background: C.card }}
                  >
                    <Plate art={d.art} className={cn("shrink-0", c.id === "specials" ? "size-24" : "size-[4.5rem]")} />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold" style={display}>
                          {name(d)}
                        </span>
                        {d.tag ? (
                          <span className="rounded-full px-2 py-0.5 text-[0.68rem] font-semibold text-white" style={{ background: d.tag === "spicy" ? C.tomato : C.molokhia }}>
                            {tagLabel[d.tag][lang]}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[0.82rem]" style={{ color: c.id === "specials" ? "rgb(246 235 217 / 0.85)" : C.mute }}>
                        {d.desc[lang]}
                      </span>
                      <span className="mt-1 block text-[0.92rem] font-semibold">{d.soldOut ? t.soldOut : fmt(d.price)}</span>
                    </span>
                    {!d.soldOut ? (
                      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full text-[1.2rem] font-bold" style={{ background: C.coffee, color: C.saffron }}>
                        +
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Order bar */}
      {count > 0 && !orderOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-30 p-3 motion-safe:animate-[toast-in_0.4s_ease]">
          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            className="mx-auto flex w-full max-w-3xl items-center justify-between rounded-2xl px-5 py-4 font-semibold shadow-xl"
            style={{ background: C.coffee, color: C.tahini }}
          >
            <span>
              {t.view} · {t.items(count)}
            </span>
            <span>{fmt(subtotal)}</span>
          </button>
        </div>
      ) : null}

      {/* Dish sheet */}
      {dish ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-40 flex items-end justify-center bg-black/45" onClick={() => setDish(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={name(dish)}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92%] w-full max-w-lg overflow-y-auto rounded-t-3xl motion-safe:animate-[sheet-up_0.45s_cubic-bezier(0.16,1,0.3,1)]"
            style={{ background: C.tahini }}
          >
            <div className="flex justify-center pt-6 pb-2" style={{ background: C.saffron }}>
              <Plate art={dish.art} className="size-44 drop-shadow-[0_16px_18px_rgb(42_22_12/0.3)]" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[1.6rem] leading-tight font-bold" style={display}>
                  {name(dish)}
                </h3>
                <button type="button" onClick={() => setDish(null)} className="text-[0.85rem] underline">
                  {t.close}
                </button>
              </div>
              <p className="mt-1 text-[0.9rem]" style={{ color: C.mute }}>
                {dish.desc[lang]}
              </p>

              {dish.sizes ? (
                <fieldset className="mt-5">
                  <legend className="text-[0.85rem] font-bold">{t.size}</legend>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {dish.sizes.map((s) => (
                      <label key={s.id} className="cursor-pointer rounded-xl border py-2.5 text-center text-[0.88rem] font-semibold has-[:checked]:border-[#2A160C] has-[:checked]:bg-[#2A160C] has-[:checked]:text-[#F6EBD9]" style={{ borderColor: "rgb(42 22 12 / 0.2)" }}>
                        <input type="radio" name="size" className="sr-only" checked={size === s.id} onChange={() => setSize(s.id)} />
                        {s.label[lang]}
                        {s.add ? <span className="block text-[0.75rem] font-normal">+{s.add}</span> : null}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {dish.extras ? (
                <fieldset className="mt-5">
                  <legend className="text-[0.85rem] font-bold">{t.extras}</legend>
                  <div className="mt-1">
                    {dish.extras.map((x) => (
                      <label key={x.id} className="flex cursor-pointer items-center justify-between gap-3 border-b py-3 text-[0.92rem]" style={{ borderColor: "rgb(42 22 12 / 0.1)" }}>
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            className="size-4 accent-[#2F5D3A]"
                            checked={extras.includes(x.id)}
                            onChange={(e) => setExtras((cur) => (e.target.checked ? [...cur, x.id] : cur.filter((y) => y !== x.id)))}
                          />
                          {x.label[lang]}
                        </span>
                        <span>+{fmt(x.add)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              <label className="mt-5 block">
                <span className="text-[0.85rem] font-bold">{t.note}</span>
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.notePh} className="mt-2 w-full rounded-xl border bg-white/70 px-3 py-2.5 text-[0.92rem] outline-none focus:border-[#2A160C]" style={{ borderColor: "rgb(42 22 12 / 0.2)" }} />
              </label>

              <div className="mt-6 flex gap-2">
                <div className="flex items-center rounded-xl border" style={{ borderColor: "rgb(42 22 12 / 0.2)" }}>
                  <button type="button" className="size-12 text-[1.2rem]" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−">
                    −
                  </button>
                  <span className="w-6 text-center font-bold" aria-live="polite">
                    {qty}
                  </span>
                  <button type="button" className="size-12 text-[1.2rem]" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="+">
                    +
                  </button>
                </div>
                <button type="button" onClick={addLine} className="flex-1 rounded-xl font-bold" style={{ background: C.coffee, color: C.saffron }}>
                  {t.addToOrder} · {fmt(unitPrice(dish, size, extras) * qty)}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Order sheet */}
      {orderOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-40 flex items-end justify-center bg-black/45" onClick={() => setOrderOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.order}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92%] w-full max-w-lg overflow-y-auto rounded-t-3xl p-5 motion-safe:animate-[sheet-up_0.45s_cubic-bezier(0.16,1,0.3,1)]"
            style={{ background: C.tahini }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[1.5rem] font-bold" style={display}>
                {t.order}
              </h3>
              <button type="button" onClick={() => setOrderOpen(false)} className="text-[0.85rem] underline">
                {t.close}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl p-1" style={{ background: "rgb(42 22 12 / 0.07)" }} role="radiogroup">
              {(["dine", "delivery"] as const).map((m) => (
                <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)} className="rounded-lg py-2 text-[0.9rem] font-semibold" style={mode === m ? { background: C.coffee, color: C.tahini } : {}}>
                  {m === "dine" ? t.dineIn : t.delivery}
                </button>
              ))}
            </div>
            {mode === "delivery" ? (
              <label className="mt-3 block">
                <span className="text-[0.85rem] font-bold">{t.address}</span>
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t.addressPh} className="mt-1.5 w-full rounded-xl border bg-white/70 px-3 py-2.5 outline-none" style={{ borderColor: "rgb(42 22 12 / 0.2)" }} />
              </label>
            ) : null}

            <ul className="mt-4 divide-y" style={{ borderColor: "rgb(42 22 12 / 0.1)" }}>
              {lines.length === 0 ? <li className="py-6 text-center" style={{ color: C.mute }}>{t.empty}</li> : null}
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3 py-3">
                  <Plate art={l.dish.art} className="size-12 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{name(l.dish)}</p>
                    <p className="truncate text-[0.78rem]" style={{ color: C.mute }}>
                      {[l.dish.sizes?.find((s) => s.id === l.size)?.label[lang], ...l.extras.map((id) => l.dish.extras?.find((x) => x.id === id)?.label[lang]), l.note].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[0.9rem]">
                    <button type="button" aria-label="−" onClick={() => setCart((c) => c.flatMap((x) => (x.key === l.key ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x])))} className="grid size-7 place-items-center rounded-full border" style={{ borderColor: "rgb(42 22 12 / 0.25)" }}>
                      −
                    </button>
                    <span className="w-4 text-center font-bold">{l.qty}</span>
                    <button type="button" aria-label="+" onClick={() => setCart((c) => c.map((x) => (x.key === l.key ? { ...x, qty: x.qty + 1 } : x)))} className="grid size-7 place-items-center rounded-full border" style={{ borderColor: "rgb(42 22 12 / 0.25)" }}>
                      +
                    </button>
                  </div>
                  <span className="w-20 text-end text-[0.9rem] font-semibold">{fmt(l.total)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 space-y-1 border-t pt-3 text-[0.95rem]" style={{ borderColor: "rgb(42 22 12 / 0.15)" }}>
              <p className="flex justify-between">
                <span>{t.subtotal}</span>
                <span>{fmt(subtotal)}</span>
              </p>
              {fee ? (
                <p className="flex justify-between">
                  <span>{t.deliveryFee}</span>
                  <span>{fmt(fee)}</span>
                </p>
              ) : null}
              <p className="flex justify-between text-[1.15rem] font-bold">
                <span>{t.total}</span>
                <span>{fmt(subtotal + fee)}</span>
              </p>
            </div>

            <a
              href={lines.length ? `https://wa.me/?text=${encodeURIComponent(message)}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!lines.length}
              className={cn("mt-4 flex items-center justify-center gap-2 rounded-xl py-4 font-bold", !lines.length && "pointer-events-none opacity-40")}
              style={{ background: C.molokhia, color: "#fff" }}
            >
              {t.send}
            </a>
            <p className="mt-3 text-center text-[0.78rem]" style={{ color: C.mute }}>
              {t.sent}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
