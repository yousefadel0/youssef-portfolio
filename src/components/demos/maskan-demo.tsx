"use client";

import { useMemo, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Building } from "./art";
import { areas, districts, egp, egpShort, listings, monthly, types, type Area, type Listing, type UnitType } from "./maskan-data";
import { useStored } from "./use-stored";

const C = { lime: "#EDE7DC", sand: "#C9B79A", basalt: "#1C1A16", brick: "#8E4229", palm: "#3E5B45", mute: "#5A5244", card: "#FBF8F2", map: "#E2D6C0" };
const serif = { fontFamily: "var(--font-instrument-serif, ui-serif), Georgia, serif" };
const sans = { fontFamily: "var(--font-inter, var(--font-geist)), system-ui, sans-serif" };

const dayNames = ["Sat 14", "Sun 15", "Mon 16", "Tue 17", "Wed 18"];
const slots = ["10:00", "11:30", "13:00", "16:00", "18:30"];
type Booking = { id: string; listing: string; day: string; slot: string; name: string };

const Heart = ({ on }: { on: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? C.brick : "none"} stroke={on ? C.brick : C.basalt} strokeWidth="1.8" aria-hidden>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </svg>
);

export const MaskanDemo = () => {
  const [area, setArea] = useState<Area | "Any">("Any");
  const [type, setType] = useState<UnitType | "Any">("Any");
  const [beds, setBeds] = useState(0);
  const [budget, setBudget] = useState(35_000_000);
  const [savedOnly, setSavedOnly] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");
  const [saved, setSaved] = useStored<string[]>("demo:maskan:saved", ["mk-103"]);
  const [bookings, setBookings] = useStored<Booking[]>("demo:maskan:bookings", []);
  const [open, setOpen] = useState<Listing | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [down, setDown] = useState(10);
  const [years, setYears] = useState(8);
  const [day, setDay] = useState(dayNames[1]);
  const [slot, setSlot] = useState(slots[1]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const results = useMemo(
    () =>
      listings.filter(
        (l) => (area === "Any" || l.area === area) && (type === "Any" || l.type === type) && l.beds >= beds && l.price <= budget && (!savedOnly || saved.includes(l.id)),
      ),
    [area, type, beds, budget, savedOnly, saved],
  );

  const toggleSave = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const openListing = (l: Listing) => {
    setOpen(l);
    setDown(10);
    setYears(8);
    setConfirmed(null);
    setError("");
  };

  const book = (e: FormEvent) => {
    e.preventDefault();
    if (!open) return;
    if (name.trim().length < 2) return setError("Please add your name.");
    if (!/^(\+?20)?0?1[0125]\d{8}$/.test(phone.replace(/[\s-]/g, ""))) return setError("Add an Egyptian mobile number, e.g. 010 1234 5678.");
    const b = { id: `V-${Math.floor(1000 + Math.random() * 8999)}`, listing: open.id, day, slot, name: name.trim() };
    setBookings((list) => [b, ...list]);
    setConfirmed(b);
    setError("");
  };

  const Card = (l: Listing) => (
    <li
      key={l.id}
      className={cn("overflow-hidden rounded-2xl transition-shadow", focus === l.id && "ring-2 ring-[#8E4229]")}
      style={{ background: C.card }}
      onPointerEnter={() => setFocus(l.id)}
      onPointerLeave={() => setFocus(null)}
    >
      <div className="relative">
        <button type="button" onClick={() => openListing(l)} className="block w-full text-start" aria-label={`Open ${l.title}`}>
          <Building art={l.art} className="aspect-[4/3] w-full" />
        </button>
        <span className="absolute top-3 start-3 rounded-full px-2.5 py-1 text-[0.72rem]" style={{ background: C.lime }}>
          {l.delivery}
        </span>
        <button type="button" onClick={() => toggleSave(l.id)} className="absolute top-2.5 end-2.5 grid size-9 place-items-center rounded-full" style={{ background: C.lime }} aria-pressed={saved.includes(l.id)} aria-label={saved.includes(l.id) ? "Remove from saved" : "Save"}>
          <Heart on={saved.includes(l.id)} />
        </button>
      </div>
      <button type="button" onClick={() => openListing(l)} className="block w-full p-4 text-start">
        <span className="block text-[1.55rem] leading-none" style={serif}>
          {egpShort(l.price)}
        </span>
        <span className="mt-1.5 block text-[0.9rem] font-medium">{l.title}</span>
        <span className="mt-0.5 block text-[0.8rem]" style={{ color: C.mute }}>
          {l.beds} bd · {l.baths} ba · {l.size} m² · {l.compound}, {l.area}
        </span>
        <span className="mt-2 block text-[0.8rem] font-medium" style={{ color: C.palm }}>
          {egp(monthly(l.price, 10, 8))}/month · 10% down, 8 years
        </span>
      </button>
    </li>
  );

  const MapView = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl @4xl:sticky @4xl:top-[calc(var(--demo-top,0px)+5rem)] @4xl:aspect-auto @4xl:h-[calc(100svh-12rem)]" style={{ background: C.map }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M0 26C20 20 40 24 60 18S90 12 100 16V0H0Z" fill="#A9C7C9" />
        <path d="M44 100C48 70 52 40 50 26" stroke="#8FB3C9" strokeWidth="2" fill="none" />
        {districts.map((d) => (
          <rect key={d.area} x={d.x} y={d.y} width={d.w} height={d.h} rx="3" fill={area === d.area ? C.sand : "#D4C6AD"} stroke={C.basalt} strokeOpacity="0.15" />
        ))}
      </svg>
      {districts.map((d) => (
        <button key={d.area} type="button" onClick={() => setArea(area === d.area ? "Any" : d.area)} className="absolute text-[0.72rem] font-medium underline-offset-2 hover:underline" style={{ left: `${d.x + 1.5}%`, top: `${d.y + 1.5}%`, color: C.mute }}>
          {d.area}
        </button>
      ))}
      {results.map((l) => (
        <button
          key={l.id}
          type="button"
          onClick={() => openListing(l)}
          onPointerEnter={() => setFocus(l.id)}
          onPointerLeave={() => setFocus(null)}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold whitespace-nowrap shadow-md transition-transform hover:scale-110"
          style={{ left: `${l.pin.x}%`, top: `${l.pin.y}%`, background: focus === l.id ? C.brick : C.basalt, color: C.lime, zIndex: focus === l.id ? 2 : 1 }}
        >
          {egpShort(l.price)}
        </button>
      ))}
    </div>
  );

  const pay = open ? monthly(open.price, down, years) : 0;

  return (
    <div className="min-h-full" style={{ background: C.lime, color: C.basalt, ...sans }}>
      <div className="sticky top-[var(--demo-top,0px)] z-20 flex items-center justify-between border-b px-4 py-3 @3xl:px-8" style={{ background: C.lime, borderColor: "rgb(28 26 22 / 0.12)" }}>
        <span className="text-[1.8rem] leading-none italic" style={serif}>
          Maskan
        </span>
        <div className="flex items-center gap-2 text-[0.85rem]">
          <button type="button" onClick={() => setSavedOnly((v) => !v)} aria-pressed={savedOnly} className="flex items-center gap-1.5 rounded-full border px-3 py-1.5" style={savedOnly ? { background: C.basalt, color: C.lime, borderColor: C.basalt } : { borderColor: "rgb(28 26 22 / 0.2)" }}>
            Saved {saved.length}
          </button>
          {bookings.length ? (
            <span className="hidden rounded-full px-3 py-1.5 @xl:inline" style={{ background: C.palm, color: C.lime }}>
              {bookings.length} viewing{bookings.length > 1 ? "s" : ""} booked
            </span>
          ) : null}
        </div>
      </div>

      <section className="px-4 pt-8 pb-5 @3xl:px-8">
        <h1 className="text-[2.6rem] leading-[0.95] @3xl:text-[4rem]" style={serif}>
          Homes {area === "Any" ? "across Cairo" : <>in <em style={{ color: C.brick }}>{area}</em></>}
          <br />
          under {egpShort(budget)}
        </h1>

        <div className="mt-6 grid gap-3 @3xl:grid-cols-[1fr_1fr_auto_1.3fr] @3xl:items-end">
          <label className="block text-[0.8rem]" style={{ color: C.mute }}>
            Area
            <select value={area} onChange={(e) => setArea(e.target.value as Area | "Any")} className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[0.95rem] text-[#1C1A16]" style={{ borderColor: "rgb(28 26 22 / 0.15)" }}>
              <option>Any</option>
              {areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="block text-[0.8rem]" style={{ color: C.mute }}>
            Type
            <select value={type} onChange={(e) => setType(e.target.value as UnitType | "Any")} className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[0.95rem] text-[#1C1A16]" style={{ borderColor: "rgb(28 26 22 / 0.15)" }}>
              <option>Any</option>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <div>
            <p className="text-[0.8rem]" style={{ color: C.mute }}>
              Bedrooms
            </p>
            <div className="mt-1 flex gap-1" role="radiogroup" aria-label="Bedrooms">
              {[0, 2, 3, 4].map((b) => (
                <button key={b} type="button" role="radio" aria-checked={beds === b} onClick={() => setBeds(b)} className="h-[2.85rem] min-w-11 rounded-xl border px-3 text-[0.9rem]" style={beds === b ? { background: C.basalt, color: C.lime, borderColor: C.basalt } : { borderColor: "rgb(28 26 22 / 0.15)", background: "#fff" }}>
                  {b === 0 ? "Any" : `${b}+`}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-[0.8rem]" style={{ color: C.mute }}>
            Max budget · <strong className="text-[#1C1A16]">{egpShort(budget)}</strong>
            <input type="range" min={4_000_000} max={35_000_000} step={250_000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-3 w-full accent-[#8E4229]" />
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-[0.9rem]" style={{ color: C.mute }}>
            {results.length} home{results.length === 1 ? "" : "s"} found
          </p>
          <div className="flex gap-1 rounded-full border p-1 @4xl:hidden" style={{ borderColor: "rgb(28 26 22 / 0.15)" }} role="radiogroup" aria-label="View">
            {(["list", "map"] as const).map((v) => (
              <button key={v} type="button" role="radio" aria-checked={view === v} onClick={() => setView(v)} className="rounded-full px-3.5 py-1 text-[0.85rem] capitalize" style={view === v ? { background: C.basalt, color: C.lime } : {}}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-5 px-4 pb-16 @3xl:px-8 @4xl:grid-cols-[1.4fr_1fr]">
        <div className={cn(view === "map" && "hidden @4xl:block")}>
          {results.length === 0 ? (
            <p className="rounded-2xl p-8 text-center" style={{ background: C.card, color: C.mute }}>
              Nothing matches yet. Try a bigger budget or another area.
            </p>
          ) : (
            <ul className="grid gap-4 @xl:grid-cols-2">{results.map((l) => Card(l))}</ul>
          )}
        </div>
        <div className={cn(view === "list" && "hidden @4xl:block")}>{MapView}</div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-40 flex items-end justify-center bg-black/45 @3xl:items-center @3xl:p-6" onClick={() => setOpen(null)}>
          <div role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()} className="max-h-full w-full max-w-4xl overflow-y-auto rounded-t-3xl motion-safe:animate-[sheet-up_0.45s_cubic-bezier(0.16,1,0.3,1)] @3xl:rounded-3xl" style={{ background: C.lime }}>
            <div className="relative">
              <Building art={open.art} className="aspect-[16/8] w-full" />
              <button type="button" onClick={() => setOpen(null)} className="absolute top-3 end-3 rounded-full px-3 py-1.5 text-[0.85rem]" style={{ background: C.lime }}>
                Close
              </button>
            </div>
            <div className="grid gap-6 p-5 @3xl:grid-cols-[1.2fr_1fr] @3xl:p-8">
              <div>
                <p className="text-[0.82rem]" style={{ color: C.mute }}>
                  {open.compound} · {open.area}
                </p>
                <h2 className="mt-1 text-[2.1rem] leading-none" style={serif}>
                  {open.title}
                </h2>
                <p className="mt-2 text-[1.6rem]" style={serif}>
                  {egp(open.price)}
                </p>
                <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.82rem]">
                  {[
                    ["Beds", open.beds],
                    ["Baths", open.baths],
                    ["Area", `${open.size} m²`],
                    ["Type", open.type],
                    ["Finishing", open.finishing],
                    ["Delivery", open.delivery],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl py-2.5" style={{ background: C.card }}>
                      <dt style={{ color: C.mute }}>{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 rounded-2xl p-5" style={{ background: C.basalt, color: C.lime }}>
                  <p className="text-[0.85rem] opacity-80">Installment calculator</p>
                  <label className="mt-3 block text-[0.85rem]">
                    Down payment · <strong>{down}%</strong> ({egpShort((open.price * down) / 100)})
                    <input type="range" min={5} max={50} step={5} value={down} onChange={(e) => setDown(Number(e.target.value))} className="mt-2 w-full accent-[#C9B79A]" />
                  </label>
                  <label className="mt-3 block text-[0.85rem]">
                    Years · <strong>{years}</strong>
                    <input type="range" min={1} max={10} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-2 w-full accent-[#C9B79A]" />
                  </label>
                  <p className="mt-4 text-[2.2rem] leading-none" style={serif} aria-live="polite">
                    {egp(pay)}
                    <span className="text-[0.9rem]"> / month</span>
                  </p>
                  <p className="mt-1 text-[0.75rem] opacity-70">Equal monthly installments, no interest, as in most developer payment plans.</p>
                </div>
              </div>

              <div>
                {confirmed ? (
                  <div className="rounded-2xl p-5" style={{ background: C.palm, color: C.lime }} role="status">
                    <p className="text-[1.8rem] leading-none" style={serif}>
                      Viewing booked.
                    </p>
                    <p className="mt-3 text-[0.95rem]">
                      {confirmed.day} at {confirmed.slot}, {open.compound}. Reference {confirmed.id}. The sales team will call {confirmed.name} to confirm.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={book} noValidate className="rounded-2xl p-5" style={{ background: C.card }}>
                    <p className="text-[1.4rem] leading-none" style={serif}>
                      Book a viewing
                    </p>
                    <p className="mt-4 text-[0.8rem]" style={{ color: C.mute }}>
                      Day
                    </p>
                    <div className="mt-1.5 grid grid-cols-5 gap-1" role="radiogroup" aria-label="Day">
                      {dayNames.map((d) => (
                        <button key={d} type="button" role="radio" aria-checked={day === d} onClick={() => setDay(d)} className="rounded-lg py-2 text-[0.75rem]" style={day === d ? { background: C.brick, color: C.lime } : { background: C.lime }}>
                          {d}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-[0.8rem]" style={{ color: C.mute }}>
                      Time
                    </p>
                    <div className="mt-1.5 grid grid-cols-5 gap-1" role="radiogroup" aria-label="Time">
                      {slots.map((s) => (
                        <button key={s} type="button" role="radio" aria-checked={slot === s} onClick={() => setSlot(s)} className="rounded-lg py-2 text-[0.75rem]" style={slot === s ? { background: C.basalt, color: C.lime } : { background: C.lime }}>
                          {s}
                        </button>
                      ))}
                    </div>
                    <label className="mt-4 block text-[0.8rem]" style={{ color: C.mute }}>
                      Name
                      <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[0.95rem] text-[#1C1A16]" style={{ borderColor: "rgb(28 26 22 / 0.15)" }} />
                    </label>
                    <label className="mt-3 block text-[0.8rem]" style={{ color: C.mute }}>
                      Mobile
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="010 1234 5678" className="mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-[0.95rem] text-[#1C1A16]" style={{ borderColor: "rgb(28 26 22 / 0.15)" }} dir="ltr" />
                    </label>
                    {error ? (
                      <p className="mt-2 text-[0.82rem] text-[#B42318]" role="alert">
                        {error}
                      </p>
                    ) : null}
                    <button type="submit" className="mt-4 w-full rounded-xl py-3.5 text-[0.95rem] font-medium" style={{ background: C.basalt, color: C.lime }}>
                      Confirm {day} · {slot}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
