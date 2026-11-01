"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useStored } from "./use-stored";

const C = { night: "#0E0F0C", chalk: "#F3F1EA", volt: "#C9F31D", graphite: "#22231F", line: "#34352F", mute: "#A3A49B" };
const display = { fontFamily: "var(--font-archivo, var(--font-bricolage)), system-ui, sans-serif" };
const body = { fontFamily: "var(--font-plex-arabic, var(--font-geist)), system-ui, sans-serif" };

type Lang = "en" | "ar";
const t = {
  en: {
    hi: "Hi, Mariam",
    plan: "Gold · Active",
    renews: "Renews 14 Jan · EGP 1,450/mo",
    tabs: { schedule: "Schedule", bookings: "My bookings", pass: "Pass", desk: "Front desk" },
    book: "Book",
    booked: "Booked · Cancel",
    waitlist: "Join waitlist",
    onWait: (n: number) => `Waitlist #${n} · Leave`,
    full: "Full",
    spots: (n: number) => `${n} spots left`,
    soon: "Starts in under 2 h",
    clash: (name: string, time: string) => `You already have ${name} at ${time}.`,
    bookedToast: (name: string) => `Booked: ${name}. See you there.`,
    joined: (n: number) => `On the waitlist, position ${n}. We'll move you in automatically.`,
    cancelled: "Cancelled. Your spot went to the next person on the waitlist.",
    cancelledFree: "Cancelled. No charge.",
    late: "This class starts in under 2 hours. Cancelling now counts as attended. Cancel anyway?",
    yes: "Cancel anyway",
    no: "Keep it",
    promoted: (name: string) => `You're in! A spot opened in ${name}.`,
    simulate: "Simulate another member cancelling",
    noBookings: "No bookings yet. Pick a class from the schedule.",
    showQr: "Show at the front desk to check in",
    checkIn: "Check in now",
    checkedIn: (time: string) => `Checked in at ${time}`,
    visits: "Visits this month",
    today: "Today's classes",
    occupancy: "Occupancy",
    expiring: "Memberships expiring this week",
    lang: "ع",
  },
  ar: {
    hi: "أهلاً، مريم",
    plan: "جولد · مفعّل",
    renews: "بيتجدد ١٤ يناير · ١٤٥٠ ج.م شهرياً",
    tabs: { schedule: "المواعيد", bookings: "حجوزاتي", pass: "الكارت", desk: "الريسبشن" },
    book: "احجز",
    booked: "محجوز · إلغاء",
    waitlist: "قايمة الانتظار",
    onWait: (n: number) => `انتظار #${n} · خروج`,
    full: "كامل",
    spots: (n: number) => `فاضل ${n} أماكن`,
    soon: "بيبدأ في أقل من ساعتين",
    clash: (name: string, time: string) => `إنت حاجز ${name} الساعة ${time} أصلاً.`,
    bookedToast: (name: string) => `اتحجز: ${name}. نشوفك هناك.`,
    joined: (n: number) => `إنت في قايمة الانتظار رقم ${n}. هندخلك أوتوماتيك.`,
    cancelled: "اتلغى. مكانك راح لأول واحد في قايمة الانتظار.",
    cancelledFree: "اتلغى. من غير أي رسوم.",
    late: "الكلاس ده بيبدأ في أقل من ساعتين. الإلغاء دلوقتي بيتحسب حضور. تلغي برضه؟",
    yes: "ألغي برضه",
    no: "خليه",
    promoted: (name: string) => `دخلت! مكان فضي في ${name}.`,
    simulate: "جرّب: عضو تاني لغى حجزه",
    noBookings: "لسه مفيش حجوزات. اختار كلاس من المواعيد.",
    showQr: "ورّيه في الريسبشن عشان تسجّل حضور",
    checkIn: "سجّل حضور",
    checkedIn: (time: string) => `اتسجّل حضورك الساعة ${time}`,
    visits: "زياراتك الشهر ده",
    today: "كلاسات النهارده",
    occupancy: "الإشغال",
    expiring: "اشتراكات بتخلص الأسبوع ده",
    lang: "EN",
  },
};

const days = [
  { id: 0, en: "Sat", ar: "السبت", date: 14 },
  { id: 1, en: "Sun", ar: "الحد", date: 15 },
  { id: 2, en: "Mon", ar: "الاتنين", date: 16 },
  { id: 3, en: "Tue", ar: "التلات", date: 17 },
  { id: 4, en: "Wed", ar: "الأربع", date: 18 },
  { id: 5, en: "Thu", ar: "الخميس", date: 19 },
];

type Klass = { id: string; day: number; time: string; name: string; coach: { en: string; ar: string }; cap: number; booked: number; wait: number; soon?: boolean };

const seed: Klass[] = [
  { id: "c1", day: 0, time: "07:00", name: "HIIT Burn", coach: { en: "Nour Hassan", ar: "نور حسن" }, cap: 20, booked: 18, wait: 0, soon: true },
  { id: "c2", day: 0, time: "09:00", name: "Mobility", coach: { en: "Omar Fathy", ar: "عمر فتحي" }, cap: 14, booked: 9, wait: 0 },
  { id: "c3", day: 0, time: "18:30", name: "Spin 45", coach: { en: "Mariam Adel", ar: "مريم عادل" }, cap: 20, booked: 20, wait: 2 },
  { id: "c4", day: 0, time: "18:30", name: "Yoga Flow", coach: { en: "Salma Ezz", ar: "سلمى عز" }, cap: 18, booked: 11, wait: 0 },
  { id: "c5", day: 0, time: "20:00", name: "Boxing", coach: { en: "Youssef Nabil", ar: "يوسف نبيل" }, cap: 16, booked: 10, wait: 0 },
  { id: "c6", day: 1, time: "07:00", name: "Strength Lab", coach: { en: "Karim Samir", ar: "كريم سمير" }, cap: 16, booked: 12, wait: 0 },
  { id: "c7", day: 1, time: "19:00", name: "Pilates", coach: { en: "Hana Mostafa", ar: "هنا مصطفى" }, cap: 12, booked: 12, wait: 1 },
  { id: "c8", day: 2, time: "07:00", name: "HIIT Burn", coach: { en: "Nour Hassan", ar: "نور حسن" }, cap: 20, booked: 7, wait: 0 },
  { id: "c9", day: 2, time: "18:00", name: "Boxing", coach: { en: "Youssef Nabil", ar: "يوسف نبيل" }, cap: 16, booked: 15, wait: 0 },
  { id: "c10", day: 3, time: "08:00", name: "Yoga Flow", coach: { en: "Salma Ezz", ar: "سلمى عز" }, cap: 18, booked: 4, wait: 0 },
  { id: "c11", day: 4, time: "18:30", name: "Spin 45", coach: { en: "Mariam Adel", ar: "مريم عادل" }, cap: 20, booked: 16, wait: 0 },
  { id: "c12", day: 5, time: "10:00", name: "Open Gym", coach: { en: "Staff", ar: "الطاقم" }, cap: 40, booked: 13, wait: 0 },
];

type Mine = { booked: string[]; waiting: string[] };

const QR = () => {
  const n = 21;
  const cells: boolean[] = [];
  let seedN = 11;
  for (let i = 0; i < n * n; i++) {
    seedN = (seedN * 9301 + 49297) % 233280;
    cells.push(seedN / 233280 > 0.5);
  }
  const inFinder = (x: number, y: number) => [[0, 0], [n - 7, 0], [0, n - 7]].find(([ox, oy]) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7);
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="h-full w-full" shapeRendering="crispEdges" aria-label="Membership QR code" role="img">
      {cells.map((on, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const f = inFinder(x, y);
        const fill = f ? (() => { const dx = x - f[0]; const dy = y - f[1]; return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4); })() : on;
        return fill ? <rect key={i} x={x} y={y} width="1" height="1" fill={C.night} /> : null;
      })}
    </svg>
  );
};

export const PulseDemo = ({ locale }: { locale: Locale }) => {
  const [lang, setLang] = useState<Lang>(locale);
  const L = t[lang];
  const [classes, setClasses] = useStored<Klass[]>("demo:pulse-club:classes", seed);
  const [mine, setMine] = useStored<Mine>("demo:pulse-club:mine", { booked: [], waiting: [] });
  const [checkIn, setCheckIn] = useStored<string | null>("demo:pulse-club:checkin", null);
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState<keyof typeof L.tabs>("schedule");
  const [toast, setToast] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<Klass | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  };
  const byId = (id: string) => classes.find((c) => c.id === id)!;
  const waitPos = (c: Klass) => c.wait;

  const book = (c: Klass) => {
    const clash = mine.booked.map(byId).find((b) => b.day === c.day && b.time === c.time);
    if (clash) return flash(L.clash(clash.name, clash.time));
    if (c.booked >= c.cap) {
      setClasses((list) => list.map((k) => (k.id === c.id ? { ...k, wait: k.wait + 1 } : k)));
      setMine((m) => ({ ...m, waiting: [...m.waiting, c.id] }));
      return flash(L.joined(c.wait + 1));
    }
    setClasses((list) => list.map((k) => (k.id === c.id ? { ...k, booked: k.booked + 1 } : k)));
    setMine((m) => ({ ...m, booked: [...m.booked, c.id] }));
    flash(L.bookedToast(c.name));
  };

  const cancel = (c: Klass, force = false) => {
    if (c.soon && !force) return setConfirm(c);
    setConfirm(null);
    setMine((m) => ({ ...m, booked: m.booked.filter((id) => id !== c.id) }));
    setClasses((list) => list.map((k) => (k.id === c.id ? (k.wait > 0 ? { ...k, wait: k.wait - 1 } : { ...k, booked: k.booked - 1 }) : k)));
    flash(c.wait > 0 ? L.cancelled : L.cancelledFree);
  };

  const leaveWait = (c: Klass) => {
    setMine((m) => ({ ...m, waiting: m.waiting.filter((id) => id !== c.id) }));
    setClasses((list) => list.map((k) => (k.id === c.id ? { ...k, wait: Math.max(0, k.wait - 1) } : k)));
  };

  /** Someone else cancels a full class: the first person waiting (the member, if waiting) moves in. */
  const simulate = () => {
    const target = mine.waiting.map(byId)[0] ?? classes.find((k) => k.booked >= k.cap);
    if (!target) return;
    if (mine.waiting.includes(target.id)) {
      setMine((m) => ({ booked: [...m.booked, target.id], waiting: m.waiting.filter((id) => id !== target.id) }));
      setClasses((list) => list.map((k) => (k.id === target.id ? { ...k, wait: Math.max(0, k.wait - 1) } : k)));
      flash(L.promoted(target.name));
    } else {
      setClasses((list) => list.map((k) => (k.id === target.id ? (k.wait > 0 ? { ...k, wait: k.wait - 1 } : { ...k, booked: k.booked - 1 }) : k)));
      flash(lang === "ar" ? `مكان فضي في ${target.name}.` : `A spot opened in ${target.name}.`);
    }
  };

  const renderCard = (c: Klass) => {
    const isBooked = mine.booked.includes(c.id);
    const isWaiting = mine.waiting.includes(c.id);
    const left = c.cap - c.booked;
    return (
      <li key={c.id} className="rounded-2xl p-4" style={{ background: isBooked ? C.volt : C.graphite, color: isBooked ? C.night : C.chalk }}>
        <div className="flex items-start gap-4">
          <span className="text-[1.15rem] font-extrabold tabular-nums" style={display} dir="ltr">
            {c.time}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[1.05rem] font-extrabold uppercase" style={display}>
              {c.name}
            </p>
            <p className="text-[0.82rem] opacity-75">
              {c.coach[lang]} · {c.booked >= c.cap ? L.full : L.spots(left)}
              {c.wait ? ` · ${lang === "ar" ? "انتظار" : "waitlist"} ${c.wait}` : ""}
            </p>
            {c.soon ? <p className="mt-1 text-[0.75rem] font-semibold" style={{ color: isBooked ? C.night : C.volt }}>{L.soon}</p> : null}
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full" style={{ background: isBooked ? "rgb(14 15 12 / 0.15)" : C.line }}>
              <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${(c.booked / c.cap) * 100}%`, background: isBooked ? C.night : c.booked >= c.cap ? "#FF6B5B" : C.volt }} />
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          {isBooked ? (
            <button type="button" onClick={() => cancel(c)} className="rounded-full px-4 py-2 text-[0.82rem] font-bold" style={{ background: C.night, color: C.volt }}>
              {L.booked}
            </button>
          ) : isWaiting ? (
            <button type="button" onClick={() => leaveWait(c)} className="rounded-full border px-4 py-2 text-[0.82rem] font-bold" style={{ borderColor: C.volt, color: C.volt }}>
              {L.onWait(waitPos(c))}
            </button>
          ) : (
            <button type="button" onClick={() => book(c)} className="rounded-full px-4 py-2 text-[0.82rem] font-bold" style={c.booked >= c.cap ? { border: `1px solid ${C.mute}`, color: C.chalk } : { background: C.volt, color: C.night }}>
              {c.booked >= c.cap ? L.waitlist : L.book}
            </button>
          )}
        </div>
      </li>
    );
  };

  const now = () => new Date().toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="min-h-full" style={{ background: C.night, color: C.chalk, ...body }}>
      <div className="mx-auto max-w-3xl px-4 pt-5 pb-24">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[1.3rem] font-extrabold tracking-tight uppercase" style={display}>
            <span className="size-3 rounded-full" style={{ background: C.volt }} />
            Pulse
          </span>
          <button type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="rounded-full px-3 py-1 text-[0.8rem] font-bold" style={{ background: C.graphite }}>
            {L.lang}
          </button>
        </div>

        <div className="mt-5 rounded-3xl p-5" style={{ background: C.volt, color: C.night }}>
          <p className="text-[0.85rem] font-semibold">{L.hi}</p>
          <p className="text-[1.7rem] leading-tight font-extrabold uppercase" style={display}>
            {L.plan}
          </p>
          <p className="text-[0.85rem]">{L.renews}</p>
        </div>

        <nav className="mt-5 grid grid-cols-4 gap-1 rounded-2xl p-1" style={{ background: C.graphite }} aria-label="Pulse">
          {(Object.keys(L.tabs) as (keyof typeof L.tabs)[]).map((k) => (
            <button key={k} type="button" onClick={() => setTab(k)} aria-current={tab === k} className="rounded-xl py-2 text-[0.8rem] font-bold" style={tab === k ? { background: C.chalk, color: C.night } : { color: C.mute }}>
              {L.tabs[k]}
            </button>
          ))}
        </nav>

        {tab === "schedule" ? (
          <>
            <div className="mt-5 grid grid-cols-6 gap-1.5" role="radiogroup" aria-label="Day">
              {days.map((d) => (
                <button key={d.id} type="button" role="radio" aria-checked={day === d.id} onClick={() => setDay(d.id)} className="rounded-2xl py-2.5 text-center" style={day === d.id ? { background: C.chalk, color: C.night } : { background: C.graphite }}>
                  <span className="block text-[0.72rem] font-semibold opacity-80">{d[lang]}</span>
                  <span className="block text-[1.1rem] font-extrabold" style={display}>
                    {d.date}
                  </span>
                </button>
              ))}
            </div>
            <ul className="mt-4 space-y-2.5">
              {classes
                .filter((c) => c.day === day)
                .map((c) => renderCard(c))}
            </ul>
            <button type="button" onClick={simulate} className="mt-5 w-full rounded-2xl border border-dashed py-3 text-[0.85rem] font-semibold" style={{ borderColor: C.line, color: C.mute }}>
              {L.simulate}
            </button>
          </>
        ) : null}

        {tab === "bookings" ? (
          <ul className="mt-5 space-y-2.5">
            {mine.booked.length + mine.waiting.length === 0 ? (
              <li className="rounded-2xl p-6 text-center text-[0.9rem]" style={{ background: C.graphite, color: C.mute }}>
                {L.noBookings}
              </li>
            ) : null}
            {[...mine.booked, ...mine.waiting].map((id) => renderCard(byId(id)))}
          </ul>
        ) : null}

        {tab === "pass" ? (
          <div className="mt-5 rounded-3xl p-6 text-center" style={{ background: C.volt, color: C.night }}>
            <p className="text-[0.75rem] font-bold tracking-[0.15em] uppercase">Pulse Club · Gold · #PC-2087</p>
            <div className="mx-auto mt-4 size-52 rounded-2xl bg-white p-3">
              <QR />
            </div>
            <p className="mt-3 text-[0.85rem] font-semibold">{L.showQr}</p>
            {checkIn ? (
              <p className="mt-4 rounded-2xl py-3 font-bold" style={{ background: C.night, color: C.volt }} role="status">
                {L.checkedIn(checkIn)}
              </p>
            ) : (
              <button type="button" onClick={() => setCheckIn(now())} className="mt-4 w-full rounded-2xl py-3 font-bold" style={{ background: C.night, color: C.volt }}>
                {L.checkIn}
              </button>
            )}
            <p className="mt-4 text-[0.85rem]">
              {L.visits}: <strong>{checkIn ? 9 : 8}</strong>
            </p>
          </div>
        ) : null}

        {tab === "desk" ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl p-5" style={{ background: C.graphite }}>
              <p className="text-[0.85rem] font-bold">{L.today}</p>
              <ul className="mt-3 space-y-3">
                {classes
                  .filter((c) => c.day === 0)
                  .map((c) => (
                    <li key={c.id}>
                      <div className="flex justify-between text-[0.85rem]">
                        <span>
                          <span dir="ltr" className="tabular-nums">{c.time}</span> · {c.name}
                        </span>
                        <span className="tabular-nums" dir="ltr">
                          {c.booked}/{c.cap}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full" style={{ background: C.line }}>
                        <div className="h-full rounded-full" style={{ width: `${(c.booked / c.cap) * 100}%`, background: c.booked >= c.cap ? "#FF6B5B" : C.volt }} />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl p-5" style={{ background: C.graphite }}>
                <p className="text-[0.8rem]" style={{ color: C.mute }}>
                  {L.occupancy}
                </p>
                <p className="text-[2rem] font-extrabold" style={display} dir="ltr">
                  {Math.round((classes.filter((c) => c.day === 0).reduce((s, c) => s + c.booked, 0) / classes.filter((c) => c.day === 0).reduce((s, c) => s + c.cap, 0)) * 100)}%
                </p>
              </div>
              <div className="rounded-3xl p-5" style={{ background: C.graphite }}>
                <p className="text-[0.8rem]" style={{ color: C.mute }}>
                  {L.expiring}
                </p>
                <p className="text-[2rem] font-extrabold" style={display}>
                  23
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {toast ? (
        <div role="status" className="fixed inset-x-4 bottom-6 z-30 mx-auto max-w-md rounded-2xl px-4 py-3 text-center text-[0.9rem] font-semibold shadow-xl motion-safe:animate-[toast-in_0.35s_ease]" style={{ background: C.chalk, color: C.night }}>
          {toast}
        </div>
      ) : null}

      {confirm ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-40 grid place-items-center bg-black/60 p-4">
          <div role="alertdialog" aria-modal="true" className="w-full max-w-sm rounded-3xl p-6" style={{ background: C.graphite }}>
            <p className="text-[1rem] leading-relaxed">{L.late}</p>
            <div className={cn("mt-5 grid grid-cols-2 gap-2")}>
              <button type="button" onClick={() => setConfirm(null)} className="rounded-2xl py-3 font-bold" style={{ background: C.chalk, color: C.night }}>
                {L.no}
              </button>
              <button type="button" onClick={() => cancel(confirm, true)} className="rounded-2xl border py-3 font-bold" style={{ borderColor: "#FF6B5B", color: "#FF6B5B" }}>
                {L.yes}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
