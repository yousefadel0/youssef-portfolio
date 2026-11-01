"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Candle } from "@/components/case-study/mockups/ember";
import { cn } from "@/lib/utils";
import { useStored } from "./use-stored";

const C = { linen: "#F6F1E9", charcoal: "#1E1B18", ember: "#A3441F", sand: "#D9C7AE", smoke: "#5E564C", card: "#EDE5D8" };
const serif = { fontFamily: "var(--font-fraunces, ui-serif), Georgia, 'Times New Roman', serif" };

type Product = { id: string; name: string; collection: string; price: number; notes: [string, string, string]; hours: number; jar: string; wax: string };

const products: Product[] = [
  { id: "cedar", name: "Cedar & Smoke", collection: "Woods", price: 48, notes: ["Bergamot", "Cedarwood", "Smoked vetiver"], hours: 60, jar: "#2A2420", wax: "#E9DFD0" },
  { id: "fig", name: "Fig Leaf Noir", collection: "Florals", price: 52, notes: ["Green fig", "Blackcurrant", "Cashmere wood"], hours: 60, jar: "#C9B79C", wax: "#F3EBDD" },
  { id: "amber", name: "Amber Hour", collection: "Ambers", price: 48, notes: ["Saffron", "Amber", "Tonka"], hours: 55, jar: "#B5532E", wax: "#F1E2CC" },
  { id: "salt", name: "Salt Linen", collection: "Citrus", price: 44, notes: ["Sea salt", "Neroli", "White musk"], hours: 50, jar: "#E4DCCD", wax: "#FBF7F0" },
  { id: "oud", name: "Midnight Oud", collection: "Woods", price: 64, notes: ["Pink pepper", "Oud", "Leather"], hours: 70, jar: "#1E1B18", wax: "#D9C7AE" },
  { id: "jasmine", name: "Night Jasmine", collection: "Florals", price: 52, notes: ["Pear", "Jasmine sambac", "Sandalwood"], hours: 60, jar: "#8C9A84", wax: "#F4EEE2" },
  { id: "yuzu", name: "Yuzu Morning", collection: "Citrus", price: 42, notes: ["Yuzu", "Petitgrain", "Cedar"], hours: 45, jar: "#D9B44A", wax: "#FBF4E0" },
  { id: "tobacco", name: "Tobacco Vanilla", collection: "Ambers", price: 58, notes: ["Cardamom", "Tobacco leaf", "Vanilla"], hours: 65, jar: "#6B3A22", wax: "#EADCC6" },
];

const collections = ["All", "Woods", "Florals", "Ambers", "Citrus"];
const sizes = [
  { id: "200", label: "200 g", add: 0 },
  { id: "400", label: "400 g", add: 24 },
];
const FREE_SHIPPING = 100;

type Line = { id: string; size: string; qty: number };
type View = "shop" | "checkout" | "success";

const money = (n: number) => `$${n.toFixed(0)}`;

export const EmberDemo = () => {
  const [cart, setCart] = useStored<Line[]>("demo:maison-ember:cart", []);
  const [collection, setCollection] = useState("All");
  const [sort, setSort] = useState("featured");
  const [open, setOpen] = useState<Product | null>(null);
  const [size, setSize] = useState("200");
  const [qty, setQty] = useState(1);
  const [bagOpen, setBagOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [view, setView] = useState<View>("shop");
  const [order, setOrder] = useState<{ id: string; total: number; name: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visible = useMemo(() => {
    const list = products.filter((p) => collection === "All" || p.collection === collection);
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [collection, sort]);

  const lineTotal = (l: Line) => {
    const p = products.find((x) => x.id === l.id)!;
    return (p.price + (sizes.find((s) => s.id === l.size)?.add ?? 0)) * l.qty;
  };
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const subtotal = cart.reduce((s, l) => s + lineTotal(l), 0);
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : 8;

  const openProduct = (p: Product) => {
    setOpen(p);
    setSize("200");
    setQty(1);
  };

  const add = () => {
    if (!open) return;
    setCart((c) => {
      const i = c.findIndex((l) => l.id === open.id && l.size === size);
      if (i === -1) return [...c, { id: open.id, size, qty }];
      return c.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
    });
    setOpen(null);
    setBump((b) => b + 1);
    setBagOpen(true);
  };

  const setLineQty = (i: number, q: number) => setCart((c) => (q <= 0 ? c.filter((_, j) => j !== i) : c.map((l, j) => (j === i ? { ...l, qty: q } : l))));

  const placeOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (name.length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email doesn't look right.";
    if (String(data.get("address") ?? "").trim().length < 6) next.address = "Add a delivery address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setOrder({ id: `ME-${Math.floor(10000 + Math.random() * 89999)}`, total: subtotal + shipping, name: name.split(" ")[0] });
    setCart([]);
    setView("success");
  };

  const productById = (id: string) => products.find((p) => p.id === id)!;

  return (
    <div className="min-h-full" style={{ background: C.linen, color: C.charcoal }}>
      {/* Nav */}
      <div className="sticky top-[var(--demo-top,0px)] z-20 flex items-center justify-between border-b px-4 py-3 backdrop-blur @3xl:px-10" style={{ borderColor: "rgb(30 27 24 / 0.1)", background: "rgb(246 241 233 / 0.92)" }}>
        <button type="button" onClick={() => setView("shop")} className="text-[1.2rem] tracking-[0.3em] @3xl:text-[1.5rem]" style={serif}>
          MAISON EMBER
        </button>
        <button type="button" onClick={() => setBagOpen(true)} className="relative flex items-center gap-2 text-[0.9rem]">
          Bag
          <span key={bump} className="grid size-6 place-items-center rounded-full text-[0.75rem] text-white motion-safe:animate-[bag-bump_0.5s_ease]" style={{ background: C.charcoal }}>
            {count}
          </span>
          <span className="sr-only">items</span>
        </button>
      </div>

      {view === "shop" ? (
        <>
          <section className="grid items-end gap-6 px-4 pt-10 pb-8 @3xl:grid-cols-2 @3xl:px-10 @3xl:pt-16">
            <div>
              <p className="text-[0.72rem] tracking-[0.3em]" style={{ color: C.smoke }}>
                HAND-POURED IN SMALL BATCHES
              </p>
              <h1 className="mt-3 text-[2.6rem] leading-[0.95] font-light @3xl:text-[4.5rem]" style={serif}>
                Light something <em style={{ color: C.ember }}>worth keeping.</em>
              </h1>
            </div>
            <p className="max-w-md text-[0.98rem] leading-relaxed @3xl:justify-self-end" style={{ color: C.smoke }}>
              Coconut and rapeseed wax, cotton wicks, fragrance blended in our studio. Free shipping over {money(FREE_SHIPPING)}.
            </p>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 border-y px-4 py-3 @3xl:px-10" style={{ borderColor: "rgb(30 27 24 / 0.1)" }}>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Collection">
              {collections.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={collection === c}
                  onClick={() => setCollection(c)}
                  className="rounded-full border px-3.5 py-1.5 text-[0.85rem] transition-colors"
                  style={collection === c ? { background: C.charcoal, color: C.linen, borderColor: C.charcoal } : { borderColor: "rgb(30 27 24 / 0.2)" }}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-[0.85rem]">
              <span style={{ color: C.smoke }}>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-none border bg-transparent px-2 py-1.5" style={{ borderColor: "rgb(30 27 24 / 0.2)" }}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>

          <section className="grid grid-cols-2 gap-x-3 gap-y-8 px-4 py-8 @3xl:grid-cols-4 @3xl:gap-x-6 @3xl:px-10" aria-label="Products">
            {visible.map((p) => (
              <button key={p.id} type="button" onClick={() => openProduct(p)} className="group text-start">
                <div className="flex aspect-[4/5] items-end justify-center overflow-hidden pb-6 transition-colors" style={{ background: C.card }}>
                  <div className="transition-transform duration-700 ease-expo group-hover:-translate-y-2" style={{ fontSize: "clamp(9px, 2.6cqw, 14px)" }}>
                    <Candle jar={p.jar} wax={p.wax} size={1.4} label={false} />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="text-[1.05rem] leading-tight @3xl:text-[1.2rem]" style={serif}>
                    {p.name}
                  </span>
                  <span className="tabular-nums">{money(p.price)}</span>
                </div>
                <span className="text-[0.82rem]" style={{ color: C.smoke }}>
                  {p.notes[0]} · {p.notes[2]}
                </span>
              </button>
            ))}
          </section>
        </>
      ) : null}

      {view === "checkout" ? (
        <section className="grid gap-8 px-4 py-10 @3xl:grid-cols-[1.3fr_1fr] @3xl:px-10">
          <form onSubmit={placeOrder} noValidate className="space-y-5">
            <h1 className="text-[2.2rem] leading-none" style={serif}>
              Checkout
            </h1>
            {[
              { name: "name", label: "Full name", type: "text", auto: "name" },
              { name: "email", label: "Email", type: "email", auto: "email" },
              { name: "address", label: "Delivery address", type: "text", auto: "street-address" },
            ].map((f) => (
              <div key={f.name}>
                <label htmlFor={`me-${f.name}`} className="text-[0.8rem] tracking-[0.15em]" style={{ color: C.smoke }}>
                  {f.label.toUpperCase()}
                </label>
                <input
                  id={`me-${f.name}`}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.auto}
                  aria-invalid={Boolean(errors[f.name])}
                  className="mt-1 w-full border-b-2 bg-transparent py-2 text-[1rem] outline-none focus:border-[#A3441F]"
                  style={{ borderColor: errors[f.name] ? "#B42318" : "rgb(30 27 24 / 0.25)" }}
                />
                {errors[f.name] ? (
                  <p className="mt-1 text-[0.85rem] text-[#B42318]" role="alert">
                    {errors[f.name]}
                  </p>
                ) : null}
              </div>
            ))}
            <fieldset>
              <legend className="text-[0.8rem] tracking-[0.15em]" style={{ color: C.smoke }}>
                PAYMENT
              </legend>
              <div className="mt-2 grid gap-2 @md:grid-cols-2">
                {["Card (Stripe test mode)", "Cash on delivery"].map((m, i) => (
                  <label key={m} className="flex cursor-pointer items-center gap-2 border p-3 text-[0.92rem]" style={{ borderColor: "rgb(30 27 24 / 0.2)" }}>
                    <input type="radio" name="pay" defaultChecked={i === 0} className="accent-[#1E1B18]" />
                    {m}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="w-full py-4 text-[0.9rem] tracking-[0.15em] text-[#F6F1E9]" style={{ background: C.charcoal }}>
              PLACE ORDER · {money(subtotal + shipping)}
            </button>
          </form>
          <aside className="h-fit p-5" style={{ background: C.card }}>
            <p className="text-[0.8rem] tracking-[0.15em]" style={{ color: C.smoke }}>
              ORDER SUMMARY
            </p>
            <ul className="mt-3 space-y-3">
              {cart.map((l) => (
                <li key={`${l.id}-${l.size}`} className="flex justify-between gap-3 text-[0.95rem]">
                  <span>
                    {productById(l.id).name} <span style={{ color: C.smoke }}>· {l.size} g ×{l.qty}</span>
                  </span>
                  <span className="tabular-nums">{money(lineTotal(l))}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 border-t pt-3 text-[0.95rem]" style={{ borderColor: "rgb(30 27 24 / 0.15)" }}>
              <p className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping ? money(shipping) : "Free"}</span>
              </p>
              <p className="flex justify-between text-[1.1rem] font-medium">
                <span>Total</span>
                <span>{money(subtotal + shipping)}</span>
              </p>
            </div>
          </aside>
        </section>
      ) : null}

      {view === "success" && order ? (
        <section className="mx-auto max-w-xl px-4 py-16 text-center">
          <div className="mx-auto w-fit" style={{ fontSize: 12 }}>
            <Candle jar="#2A2420" wax="#E9DFD0" size={1.3} />
          </div>
          <h1 className="mt-6 text-[2.4rem] leading-none" style={serif}>
            Thank you, {order.name}.
          </h1>
          <p className="mt-3" style={{ color: C.smoke }}>
            Order <strong className="text-[#1E1B18]">{order.id}</strong> is confirmed · {money(order.total)}. We pour and ship within 48 hours.
          </p>
          <button type="button" onClick={() => setView("shop")} className="mt-8 px-8 py-3.5 text-[0.85rem] tracking-[0.15em] text-[#F6F1E9]" style={{ background: C.charcoal }}>
            CONTINUE SHOPPING
          </button>
        </section>
      ) : null}

      {/* Product sheet */}
      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-40 flex items-end justify-center bg-black/40 @3xl:items-center" onClick={() => setOpen(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={open.name}
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-full w-full overflow-y-auto motion-safe:animate-[sheet-up_0.5s_cubic-bezier(0.16,1,0.3,1)] @3xl:max-w-4xl @3xl:grid-cols-2"
            style={{ background: C.linen }}
          >
            <div className="flex items-end justify-center pt-8 pb-8 @3xl:pt-16" style={{ background: C.sand }}>
              <div style={{ fontSize: "clamp(10px, 2.8cqw, 15px)" }}>
                <Candle jar={open.jar} wax={open.wax} size={1.8} />
              </div>
            </div>
            <div className="p-5 @3xl:p-8">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[2rem] leading-none" style={serif}>
                  {open.name}
                </h2>
                <button type="button" onClick={() => setOpen(null)} className="text-[0.85rem] underline" aria-label="Close">
                  Close
                </button>
              </div>
              <p className="mt-2" style={{ color: C.smoke }}>
                {open.collection} · {open.hours} hour burn
              </p>
              <p className="mt-5 text-[0.72rem] tracking-[0.25em]" style={{ color: C.smoke }}>
                SCENT PYRAMID
              </p>
              <div className="mt-2 space-y-1.5">
                {(["Top", "Heart", "Base"] as const).map((tier, i) => (
                  <div key={tier} className="flex items-center gap-3">
                    <span className="w-12 text-[0.8rem]" style={{ color: C.smoke }}>
                      {tier}
                    </span>
                    <span className="flex h-8 items-center px-3 text-[0.82rem] text-[#F6F1E9]" style={{ width: `${55 + i * 22}%`, background: C.ember }}>
                      {open.notes[i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Size">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={size === s.id}
                    onClick={() => setSize(s.id)}
                    className="border py-2.5 text-[0.9rem]"
                    style={{ borderColor: size === s.id ? C.charcoal : "rgb(30 27 24 / 0.2)", background: size === s.id ? "rgb(30 27 24 / 0.05)" : "transparent" }}
                  >
                    {s.label} · {money(open.price + s.add)}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <div className="flex items-center border" style={{ borderColor: "rgb(30 27 24 / 0.2)" }}>
                  <button type="button" className="size-12" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                    −
                  </button>
                  <span className="w-6 text-center tabular-nums" aria-live="polite">
                    {qty}
                  </span>
                  <button type="button" className="size-12" onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <button type="button" onClick={add} className="flex-1 text-[0.85rem] tracking-[0.15em] text-[#F6F1E9]" style={{ background: C.charcoal }}>
                  ADD TO BAG · {money((open.price + (sizes.find((s) => s.id === size)?.add ?? 0)) * qty)}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Bag drawer */}
      <div
        className={cn("fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-50 transition-[visibility] duration-500", bagOpen ? "visible" : "invisible")}
        aria-hidden={!bagOpen}
      >
        <div className={cn("absolute inset-0 bg-black/40 transition-opacity duration-500", bagOpen ? "opacity-100" : "opacity-0")} onClick={() => setBagOpen(false)} />
        <aside
          role="dialog"
          aria-label="Bag"
          className={cn("absolute inset-y-0 end-0 flex w-full max-w-sm flex-col transition-transform duration-500 ease-expo", bagOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full")}
          style={{ background: C.linen }}
        >
          <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "rgb(30 27 24 / 0.1)" }}>
            <p className="text-[1.4rem]" style={serif}>
              Your bag
            </p>
            <button type="button" onClick={() => setBagOpen(false)} className="text-[0.85rem] underline">
              Close
            </button>
          </div>
          <div className="px-5 pt-4">
            <p className="text-[0.85rem]" style={{ color: C.smoke }}>
              {subtotal >= FREE_SHIPPING ? "You've unlocked free shipping." : `${money(FREE_SHIPPING - subtotal)} away from free shipping.`}
            </p>
            <div className="mt-2 h-1.5" style={{ background: "rgb(30 27 24 / 0.1)" }}>
              <div className="h-full transition-[width] duration-700 ease-expo" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%`, background: C.ember }} />
            </div>
          </div>
          <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {cart.length === 0 ? (
              <li className="pt-10 text-center" style={{ color: C.smoke }}>
                Your bag is empty. The candles are waiting.
              </li>
            ) : null}
            {cart.map((l, i) => {
              const p = productById(l.id);
              return (
                <li key={`${l.id}-${l.size}`} className="flex gap-3">
                  <div className="flex h-20 w-16 shrink-0 items-end justify-center pb-2" style={{ background: C.card, fontSize: 5 }}>
                    <Candle jar={p.jar} wax={p.wax} size={1} label={false} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <span style={serif} className="text-[1.05rem]">
                        {p.name}
                      </span>
                      <span className="tabular-nums">{money(lineTotal(l))}</span>
                    </div>
                    <p className="text-[0.82rem]" style={{ color: C.smoke }}>
                      {l.size} g
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-[0.9rem]">
                      <button type="button" onClick={() => setLineQty(i, l.qty - 1)} className="grid size-7 place-items-center border" style={{ borderColor: "rgb(30 27 24 / 0.2)" }} aria-label="Decrease">
                        −
                      </button>
                      <span className="tabular-nums">{l.qty}</span>
                      <button type="button" onClick={() => setLineQty(i, l.qty + 1)} className="grid size-7 place-items-center border" style={{ borderColor: "rgb(30 27 24 / 0.2)" }} aria-label="Increase">
                        +
                      </button>
                      <button type="button" onClick={() => setLineQty(i, 0)} className="ms-auto text-[0.8rem] underline" style={{ color: C.smoke }}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t px-5 py-4" style={{ borderColor: "rgb(30 27 24 / 0.1)" }}>
            <p className="flex justify-between text-[1.05rem]">
              <span>Subtotal</span>
              <span className="tabular-nums">{money(subtotal)}</span>
            </p>
            <button
              type="button"
              disabled={!cart.length}
              onClick={() => {
                setBagOpen(false);
                setView("checkout");
              }}
              className="mt-3 w-full py-4 text-[0.85rem] tracking-[0.15em] text-[#F6F1E9] disabled:opacity-40"
              style={{ background: C.charcoal }}
            >
              CHECKOUT
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
