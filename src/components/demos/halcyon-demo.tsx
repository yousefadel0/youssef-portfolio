"use client";

import { useMemo, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const C = { ink: "#0C0E14", panel: "#141822", line: "#232836", bone: "#EDEAE2", mint: "#39E58C", slate: "#9AA0B0" };
const display = { fontFamily: "var(--font-space-grotesk, var(--font-bricolage)), system-ui, sans-serif" };
const sans = { fontFamily: "var(--font-inter, var(--font-geist)), system-ui, sans-serif" };

const segments = {
  all: { label: "All accounts", base: 22, slope: 2.3, activation: 42.8, retention: 31.4 },
  teams: { label: "Teams (5+ seats)", base: 30, slope: 2.9, activation: 58.1, retention: 47.2 },
  solo: { label: "Solo", base: 16, slope: 1.4, activation: 29.5, retention: 18.9 },
};
type Seg = keyof typeof segments;

const questions = [
  { q: "Which onboarding step loses the most teams?", a: "“Invite a teammate” — 31% of new workspaces stop here. Workspaces that invite someone in week 1 activate 2.4× more often." },
  { q: "What do retained accounts do in their first week?", a: "Retained accounts connect a data source within 48 hours and save their first dashboard by day 4." },
  { q: "Did the new pricing page change sign-ups?", a: "Trial starts rose from 412 to 503 per week (+22%) in the 3 weeks after launch, with no drop in activation." },
];

const features = {
  funnels: { title: "Funnels", text: "See where people drop off, step by step, and which segment drops first.", rows: [["Signed up", 100], ["Created project", 74], ["Invited teammate", 52], ["Shipped first event", 43]] as [string, number][] },
  retention: { title: "Retention", text: "Weekly cohorts that show whether this month's users stick better than last month's.", rows: [["Week 1", 100], ["Week 2", 61], ["Week 4", 44], ["Week 8", 31]] as [string, number][] },
  paths: { title: "Paths", text: "The real routes users take before they convert, ranked by how often they lead somewhere.", rows: [["Docs → Install → Invite", 38], ["Pricing → Trial → Invite", 27], ["Blog → Docs → Install", 19], ["Direct → Trial", 16]] as [string, number][] },
};
type Feature = keyof typeof features;

const tiers = [
  { name: "Starter", monthly: 49, blurb: "For a product team getting serious about data.", items: ["1M events / month", "Funnels & retention", "3 seats"] },
  { name: "Growth", monthly: 199, blurb: "For growth teams running weekly experiments.", items: ["10M events / month", "Paths & cohorts", "Unlimited seats", "Warehouse sync"], hot: true },
  { name: "Scale", monthly: 699, blurb: "For companies with many products and teams.", items: ["Custom volume", "SSO & audit log", "Dedicated support"] },
];

export const HalcyonDemo = () => {
  const [seg, setSeg] = useState<Seg>("all");
  const [hover, setHover] = useState<number | null>(null);
  const [asked, setAsked] = useState<number | null>(null);
  const [feature, setFeature] = useState<Feature>("funnels");
  const [yearly, setYearly] = useState(true);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ email: "", size: "", goal: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const data = useMemo(() => {
    const s = segments[seg];
    return Array.from({ length: 22 }, (_, i) => Math.round(s.base + i * s.slope + Math.sin(i * 1.3) * 4));
  }, [seg]);
  const max = 80;
  const w = 600;
  const h = 200;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - (v / max) * h] as const);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  const next = (e: FormEvent) => {
    e.preventDefault();
    if (step === 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Use your work email.");
    if (step === 1 && !form.size) return setError("Pick a team size.");
    if (step === 2 && form.goal.trim().length < 8) return setError("A sentence about what you want to learn helps.");
    setError("");
    if (step < 2) setStep(step + 1);
    else setDone(true);
  };

  return (
    <div className="min-h-full" style={{ background: C.ink, color: C.bone, ...sans }}>
      <div className="sticky top-[var(--demo-top,0px)] z-20 flex items-center justify-between border-b px-5 py-3.5 backdrop-blur" style={{ borderColor: C.line, background: "rgb(12 14 20 / 0.85)" }}>
        <span className="flex items-center gap-2 text-[1.1rem] font-medium" style={display}>
          <span className="size-4 rounded-full border-[3px]" style={{ borderColor: C.mint }} />
          halcyon
        </span>
        <button type="button" onClick={() => document.getElementById("halcyon-book")?.scrollIntoView({ behavior: "smooth" })} className="rounded-md px-3.5 py-1.5 text-[0.85rem] font-semibold" style={{ background: C.mint, color: C.ink }}>
          Book a demo
        </button>
      </div>

      {/* Hero with live product */}
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-10 @3xl:pt-20">
        <p className="w-fit rounded-full border px-3 py-1 text-[0.75rem]" style={{ borderColor: C.line, color: C.slate }}>
          Product analytics for growth teams
        </p>
        <h1 className="mt-5 max-w-3xl text-[2.6rem] leading-[1] font-medium tracking-[-0.03em] @3xl:text-[4.6rem]" style={display}>
          Know why users <span style={{ color: C.mint }}>stay.</span>
        </h1>
        <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed" style={{ color: C.slate }}>
          Halcyon turns raw events into answers your team can act on this week. Try it: switch the segment, hover the chart, ask a question.
        </p>

        <div className="mt-10 rounded-2xl border p-4 @3xl:p-6" style={{ background: C.panel, borderColor: C.line }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1" role="radiogroup" aria-label="Segment">
              {(Object.keys(segments) as Seg[]).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={seg === k} onClick={() => setSeg(k)} className="rounded-md px-3 py-1.5 text-[0.82rem]" style={seg === k ? { background: C.bone, color: C.ink } : { color: C.slate, background: C.ink }}>
                  {segments[k].label}
                </button>
              ))}
            </div>
            <p className="text-[0.8rem]" style={{ color: C.slate }}>
              Activated accounts · last 22 days
            </p>
          </div>
          <div className="mt-4 grid gap-3 @3xl:grid-cols-[1fr_15rem]">
            <div className="relative h-52 @3xl:h-64" onPointerLeave={() => setHover(null)}>
              <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-label={`Chart of activated accounts for ${segments[seg].label}`} role="img">
                {[0.25, 0.5, 0.75].map((y) => (
                  <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke={C.line} vectorEffect="non-scaling-stroke" />
                ))}
                <path d={`${path} L${w},${h} L0,${h} Z`} fill={C.mint} opacity="0.12" />
                <path key={seg} d={path} fill="none" stroke={C.mint} strokeWidth="2.5" vectorEffect="non-scaling-stroke" pathLength={1} className="draw-line" />
              </svg>
              <div className="absolute inset-0 flex">
                {data.map((v, i) => (
                  <div key={i} className="h-full flex-1" onPointerEnter={() => setHover(i)} />
                ))}
              </div>
              {hover !== null ? (
                <>
                  <span className="pointer-events-none absolute top-0 bottom-0 w-px" style={{ left: `${(hover / (data.length - 1)) * 100}%`, background: C.slate }} />
                  <span className="pointer-events-none absolute -translate-x-1/2 rounded-md px-2.5 py-1.5 text-[0.75rem] whitespace-nowrap shadow" style={{ left: `${Math.min(88, Math.max(12, (hover / (data.length - 1)) * 100))}%`, top: 4, background: C.bone, color: C.ink }}>
                    Day {hover + 1}: <strong>{data[hover] * 18}</strong> accounts
                  </span>
                </>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-2 @3xl:grid-cols-1">
              <div className="rounded-xl border p-3" style={{ borderColor: C.line }}>
                <p className="text-[0.75rem]" style={{ color: C.slate }}>
                  Activation rate
                </p>
                <p className="text-[1.6rem] font-medium tabular-nums" style={display}>
                  {segments[seg].activation}%
                </p>
              </div>
              <div className="rounded-xl border p-3" style={{ borderColor: C.line }}>
                <p className="text-[0.75rem]" style={{ color: C.slate }}>
                  D30 retention
                </p>
                <p className="text-[1.6rem] font-medium tabular-nums" style={display}>
                  {segments[seg].retention}%
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t pt-4" style={{ borderColor: C.line }}>
            <p className="text-[0.8rem]" style={{ color: C.slate }}>
              Ask a question
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {questions.map((q, i) => (
                <button key={q.q} type="button" onClick={() => setAsked(i)} className="rounded-full border px-3 py-1.5 text-start text-[0.82rem] transition-colors" style={asked === i ? { borderColor: C.mint, color: C.mint } : { borderColor: C.line }}>
                  {q.q}
                </button>
              ))}
            </div>
            {asked !== null ? (
              <p key={asked} className="mt-3 rounded-xl p-4 text-[0.92rem] leading-relaxed motion-safe:animate-[toast-in_0.4s_ease]" style={{ background: C.ink }} role="status">
                {questions[asked].a}
                <span className="mt-2 block text-[0.75rem]" style={{ color: C.slate }}>
                  Computed from sample event data.
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Feature explorer */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-[2rem] font-medium tracking-tight @3xl:text-[2.8rem]" style={display}>
          One question, three views.
        </h2>
        <div className="mt-6 grid gap-4 @3xl:grid-cols-[16rem_1fr]">
          <div className="flex gap-1 @3xl:flex-col" role="tablist" aria-label="Features">
            {(Object.keys(features) as Feature[]).map((k) => (
              <button key={k} type="button" role="tab" aria-selected={feature === k} onClick={() => setFeature(k)} className="flex-1 rounded-lg border px-4 py-3 text-start @3xl:flex-none" style={feature === k ? { borderColor: C.mint, background: C.panel } : { borderColor: C.line }}>
                <span className="block font-medium">{features[k].title}</span>
                <span className="mt-1 hidden text-[0.8rem] @3xl:block" style={{ color: C.slate }}>
                  {features[k].text}
                </span>
              </button>
            ))}
          </div>
          <div role="tabpanel" className="rounded-2xl border p-5" style={{ background: C.panel, borderColor: C.line }}>
            <p className="text-[0.9rem] @3xl:hidden" style={{ color: C.slate }}>
              {features[feature].text}
            </p>
            <ul key={feature} className="mt-2 space-y-3">
              {features[feature].rows.map(([label, v], i) => (
                <li key={label}>
                  <div className="flex justify-between text-[0.85rem]">
                    <span>{label}</span>
                    <span className="tabular-nums" style={{ color: C.slate }}>
                      {v}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 rounded-full" style={{ background: C.line }}>
                    <div className="grow-x h-full rounded-full" style={{ width: `${v}%`, background: i === features[feature].rows.length - 1 ? C.mint : C.bone, animationDelay: `${i * 80}ms` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[2rem] font-medium tracking-tight @3xl:text-[2.8rem]" style={display}>
            Pricing that scales calmly.
          </h2>
          <button type="button" role="switch" aria-checked={yearly} onClick={() => setYearly((y) => !y)} className="flex items-center gap-3 text-[0.85rem]">
            <span style={{ color: yearly ? C.slate : C.bone }}>Monthly</span>
            <span className="relative h-6 w-11 rounded-full transition-colors" style={{ background: yearly ? C.mint : C.line }}>
              <span className="absolute top-0.5 size-5 rounded-full bg-white transition-[left] duration-300" style={{ left: yearly ? 22 : 2 }} />
            </span>
            <span style={{ color: yearly ? C.bone : C.slate }}>Yearly · 2 months free</span>
          </button>
        </div>
        <div className="mt-6 grid gap-3 @3xl:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className={cn("rounded-2xl border p-5")} style={{ background: tier.hot ? C.bone : C.panel, color: tier.hot ? C.ink : C.bone, borderColor: tier.hot ? C.bone : C.line }}>
              <p className="font-medium">{tier.name}</p>
              <p className="mt-3 text-[2.4rem] leading-none font-medium tabular-nums" style={display}>
                ${yearly ? Math.round((tier.monthly * 10) / 12) : tier.monthly}
                <span className="text-[0.9rem] font-normal"> / mo</span>
              </p>
              <p className="mt-2 text-[0.85rem] opacity-75">{tier.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-[0.88rem]">
                {tier.items.map((it) => (
                  <li key={it}>— {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Book a demo */}
      <section id="halcyon-book" className="mx-auto max-w-2xl scroll-mt-24 px-5 pt-8 pb-20">
        <div className="rounded-2xl border p-6" style={{ background: C.panel, borderColor: C.line }}>
          {done ? (
            <div role="status">
              <p className="text-[1.6rem] font-medium" style={display}>
                You&apos;re booked.
              </p>
              <p className="mt-2" style={{ color: C.slate }}>
                A calendar invite is on its way to {form.email}. We&apos;ll come with a demo built on your use case.
              </p>
            </div>
          ) : (
            <form onSubmit={next} noValidate>
              <p className="text-[0.8rem]" style={{ color: C.slate }}>
                Book a demo · step {step + 1} of 3
              </p>
              <div className="mt-2 h-1 rounded-full" style={{ background: C.line }}>
                <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${((step + 1) / 3) * 100}%`, background: C.mint }} />
              </div>
              {step === 0 ? (
                <label className="mt-5 block">
                  <span className="text-[1.1rem] font-medium">Your work email</span>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2.5 outline-none focus:border-[#39E58C]" style={{ borderColor: C.line }} placeholder="you@company.com" />
                </label>
              ) : null}
              {step === 1 ? (
                <fieldset className="mt-5">
                  <legend className="text-[1.1rem] font-medium">Team size</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 @md:grid-cols-4">
                    {["1–10", "11–50", "51–200", "200+"].map((s) => (
                      <button key={s} type="button" onClick={() => setForm({ ...form, size: s })} className="rounded-lg border py-2.5 text-[0.9rem]" style={form.size === s ? { borderColor: C.mint, color: C.mint } : { borderColor: C.line }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}
              {step === 2 ? (
                <label className="mt-5 block">
                  <span className="text-[1.1rem] font-medium">What do you want to learn about your users?</span>
                  <textarea value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} rows={3} className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2.5 outline-none focus:border-[#39E58C]" style={{ borderColor: C.line }} />
                </label>
              ) : null}
              {error ? (
                <p className="mt-2 text-[0.85rem]" style={{ color: "#FF8A80" }} role="alert">
                  {error}
                </p>
              ) : null}
              <div className="mt-5 flex justify-between">
                <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-[0.9rem] disabled:opacity-30" style={{ color: C.slate }}>
                  Back
                </button>
                <button type="submit" className="rounded-md px-5 py-2.5 text-[0.9rem] font-semibold" style={{ background: C.mint, color: C.ink }}>
                  {step < 2 ? "Continue" : "Book my demo"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
