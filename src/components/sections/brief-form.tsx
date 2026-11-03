"use client";

import { track } from "@vercel/analytics";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/copy";
import { briefSchema, stepFields, type BriefField } from "@/lib/contact-schema";
import { href, type Locale } from "@/lib/i18n";
import { cn, whatsappUrl } from "@/lib/utils";

/** `?type=` values for links that open the form with a project type picked; same order as `copy.projectTypes`. */
const typeSlugs = ["menu", "website", "store", "booking", "dashboard", "app", "unsure"] as const;

/** Read by the /contact/sent page to pre-write the WhatsApp follow-up. */
export const sentKey = "brief-sent";

const noSubscribe = () => () => {};

type Copy = Dictionary["contactPage"];
type State = {
  projectTypes: string[];
  budget: string;
  timeline: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  details: string;
  website: string;
};

const empty: State = { projectTypes: [], budget: "", timeline: "", name: "", business: "", phone: "", email: "", details: "", website: "" };

const fieldError: Record<BriefField, keyof Copy["errors"]> = {
  projectTypes: "projectType",
  budget: "budget",
  timeline: "timeline",
  name: "name",
  phone: "phone",
  email: "email",
  details: "details",
};

/** Four-step project brief with progress, per-step zod validation, honeypot and a WhatsApp escape hatch. */
export const BriefForm = ({ copy, locale }: { copy: Copy; locale: Locale }) => {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<State>(empty);
  const [errors, setErrors] = useState<Partial<Record<BriefField, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const reduce = useReducedMotion();
  const router = useRouter();
  const uid = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const total = copy.steps.length;

  // A link like /ar/contact?type=menu picks the project type and opens on the budget step.
  // Read after hydration (the page is static), then applied once while rendering.
  const typeParam = useSyncExternalStore(
    noSubscribe,
    () => new URLSearchParams(window.location.search).get("type") ?? "",
    () => "",
  );
  const [appliedType, setAppliedType] = useState("");
  if (typeParam !== appliedType) {
    setAppliedType(typeParam);
    const picked = copy.projectTypes[typeSlugs.indexOf(typeParam as (typeof typeSlugs)[number])];
    if (picked) {
      setData((d) => ({ ...d, projectTypes: [picked] }));
      setStep(1);
    }
  }

  const set = <K extends keyof State>(key: K, value: State[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (s: number) => {
    if (s >= stepFields.length) return true;
    const result = briefSchema.safeParse({ ...data, locale });
    const next: Partial<Record<BriefField, string>> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as BriefField;
        if ((stepFields[s] as readonly string[]).includes(key)) next[key] = copy.errors[fieldError[key]];
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    requestAnimationFrame(() => heading.current?.focus());
  };

  const next = () => {
    if (validate(step)) go(step + 1);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < total - 1) return next();
    for (let s = 0; s < stepFields.length; s++) {
      if (!validate(s)) return go(s);
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) return setStatus("error");
      const project = data.projectTypes.join(" · ");
      try {
        sessionStorage.setItem(sentKey, JSON.stringify({ name: data.name.trim(), project }));
      } catch {}
      track("Brief sent", { project });
      router.push(href(locale, "/contact/sent"));
    } catch {
      setStatus("error");
    }
  };

  const whatsappBrief = () =>
    whatsappUrl(
      [
        copy.whatsappIntro,
        data.projectTypes.length ? `• ${copy.steps[0]}: ${data.projectTypes.join(", ")}` : "",
        data.budget ? `• ${copy.steps[1]}: ${data.budget}` : "",
        data.timeline ? `• ${copy.timelineQ} ${data.timeline}` : "",
        data.name ? `• ${copy.name}: ${data.name}${data.business ? ` (${data.business})` : ""}` : "",
        data.details ? `\n${data.details}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * (locale === "ar" ? -48 : 48) }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * (locale === "ar" ? 48 : -48) }),
  };

  const chip = (selected: boolean) =>
    cn(
      "inline-flex min-h-12 items-center gap-2 border px-4 py-2.5 text-start text-[0.98rem] transition-[background-color,color,border-color] duration-300",
      selected ? "border-ink bg-ink text-bone" : "border-ink/30 hover:border-ink",
    );

  const input = (invalid: boolean) =>
    cn(
      "w-full border-b-2 bg-transparent py-3 text-[1.1rem] outline-none transition-colors placeholder:text-smoke/60 focus:border-kiln",
      invalid ? "border-[#B42318]" : "border-ink/25",
    );

  const err = (key: BriefField) =>
    errors[key] ? (
      <p id={`${uid}-${key}-err`} className="mt-2 text-[0.92rem] text-[#B42318]" role="alert">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="relative border border-ink bg-paper">
      {/* Progress */}
      <div className="border-b border-ink p-5 md:px-8">
        <div className="flex items-center justify-between">
          <p className="label">
            {copy.step} {step + 1} {copy.of} {total}
          </p>
          <ol className="hidden gap-4 sm:flex">
            {copy.steps.map((s, i) => (
              <li key={s} className={cn("label transition-colors", i === step ? "text-ink underline decoration-kiln decoration-2 underline-offset-4" : "text-smoke")} aria-current={i === step ? "step" : undefined}>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-4 h-1 bg-ink/10" aria-hidden>
          <motion.div
            className="h-full origin-left bg-kiln rtl:origin-right"
            initial={false}
            animate={{ scaleX: (step + 1) / total }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="sr-only">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} name="website" />
        </label>
      </div>

      <div className="relative overflow-hidden p-5 md:p-8">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            {step === 0 ? (
              <fieldset aria-describedby={errors.projectTypes ? `${uid}-projectTypes-err` : undefined}>
                <legend>
                  <h2 ref={heading} tabIndex={-1} className="headline text-[clamp(1.8rem,3vw,2.6rem)] outline-none">
                    {copy.projectQ}
                  </h2>
                </legend>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {copy.projectTypes.map((p) => {
                    const on = data.projectTypes.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={on}
                        onClick={() => set("projectTypes", on ? data.projectTypes.filter((x) => x !== p) : [...data.projectTypes, p])}
                        className={chip(on)}
                      >
                        <span aria-hidden className={cn("grid size-4 place-items-center border", on ? "border-kiln bg-kiln text-ink" : "border-current")}>
                          {on ? <CheckIcon size={12} /> : null}
                        </span>
                        {p}
                      </button>
                    );
                  })}
                </div>
                {err("projectTypes")}
              </fieldset>
            ) : null}

            {step === 1 ? (
              <div className="space-y-10">
                <fieldset aria-describedby={errors.budget ? `${uid}-budget-err` : undefined}>
                  <legend>
                    <h2 ref={heading} tabIndex={-1} className="headline text-[clamp(1.8rem,3vw,2.6rem)] outline-none">
                      {copy.budgetQ}
                    </h2>
                  </legend>
                  <div className="mt-6 flex flex-wrap gap-2.5" role="radiogroup">
                    {copy.budgets.map((b) => (
                      <button key={b} type="button" role="radio" aria-checked={data.budget === b} onClick={() => set("budget", b)} className={chip(data.budget === b)}>
                        {b}
                      </button>
                    ))}
                  </div>
                  {err("budget")}
                </fieldset>
                <fieldset aria-describedby={errors.timeline ? `${uid}-timeline-err` : undefined}>
                  <legend className="headline text-[clamp(1.4rem,2.2vw,1.9rem)]">{copy.timelineQ}</legend>
                  <div className="mt-5 flex flex-wrap gap-2.5" role="radiogroup">
                    {copy.timelines.map((b) => (
                      <button key={b} type="button" role="radio" aria-checked={data.timeline === b} onClick={() => set("timeline", b)} className={chip(data.timeline === b)}>
                        {b}
                      </button>
                    ))}
                  </div>
                  {err("timeline")}
                </fieldset>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <h2 ref={heading} tabIndex={-1} className="headline text-[clamp(1.8rem,3vw,2.6rem)] outline-none">
                  {copy.steps[2]}
                </h2>
                <div className="mt-6 grid gap-7 md:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-name`} className="label text-smoke">
                      {copy.name}
                    </label>
                    <input
                      id={`${uid}-name`}
                      value={data.name}
                      onChange={(e) => set("name", e.target.value)}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      className={input(Boolean(errors.name))}
                    />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-business`} className="label text-smoke">
                      {copy.business}
                    </label>
                    <input id={`${uid}-business`} value={data.business} onChange={(e) => set("business", e.target.value)} autoComplete="organization" className={input(false)} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-phone`} className="label text-smoke">
                      {copy.phone}
                    </label>
                    <input
                      id={`${uid}-phone`}
                      type="tel"
                      value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="01xx xxx xxxx"
                      dir="ltr"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                      className={cn(input(Boolean(errors.phone)), "rtl:text-right")}
                    />
                    {err("phone")}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-email`} className="label text-smoke">
                      {copy.email}
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                      autoComplete="email"
                      inputMode="email"
                      dir="ltr"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                      className={cn(input(Boolean(errors.email)), "rtl:text-right")}
                    />
                    {err("email")}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor={`${uid}-details`} className="label text-smoke">
                      {copy.details}
                    </label>
                    <textarea
                      id={`${uid}-details`}
                      value={data.details}
                      onChange={(e) => set("details", e.target.value)}
                      rows={5}
                      placeholder={copy.detailsHint}
                      aria-invalid={Boolean(errors.details)}
                      aria-describedby={errors.details ? `${uid}-details-err` : undefined}
                      className={cn(input(Boolean(errors.details)), "resize-y leading-relaxed")}
                    />
                    {err("details")}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <h2 ref={heading} tabIndex={-1} className="headline text-[clamp(1.8rem,3vw,2.6rem)] outline-none">
                  {copy.reviewTitle}
                </h2>
                <dl className="mt-6 border-t border-ink">
                  {[
                    { k: copy.steps[0], v: data.projectTypes.join(" · "), s: 0 },
                    { k: copy.steps[1], v: `${data.budget} · ${data.timeline}`, s: 1 },
                    { k: copy.name, v: [data.name, data.business].filter(Boolean).join(" · "), s: 2 },
                    { k: copy.phone, v: data.phone, s: 2 },
                    { k: copy.email, v: data.email, s: 2 },
                    { k: copy.details, v: data.details, s: 2 },
                  ]
                    .filter((row) => row.v)
                    .map((row) => (
                      <div key={row.k} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-ink/20 py-4 sm:grid-cols-[10rem_1fr_auto]">
                        <dt className="label pt-1 text-smoke">{row.k}</dt>
                        <dd className="col-span-2 row-start-2 mt-1 whitespace-pre-line sm:col-span-1 sm:row-start-auto sm:mt-0">{row.v}</dd>
                        <dd className="col-start-2 row-start-1 sm:col-start-auto">
                          <button type="button" onClick={() => go(row.s)} className="label underline underline-offset-4 hover:text-kiln">
                            {copy.edit}
                          </button>
                        </dd>
                      </div>
                    ))}
                </dl>
                {status === "error" ? (
                  <p className="mt-5 text-[#B42318]" role="alert">
                    {copy.errorText}
                  </p>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col-reverse gap-4 border-t border-ink p-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <a href={whatsappBrief()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.95rem] font-medium underline-offset-4 hover:underline">
          <WhatsAppIcon size={18} />
          {copy.viaWhatsapp}
        </a>
        <div className="flex gap-2">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="h-12 border border-ink px-5 font-medium transition-colors hover:bg-ink hover:text-bone">
              {copy.back}
            </button>
          ) : null}
          <button
            type="submit"
            disabled={status === "sending"}
            className="group/next inline-flex h-12 flex-1 items-center justify-center gap-3 bg-kiln px-6 font-medium text-ink transition-colors hover:bg-ink hover:text-bone disabled:opacity-60 sm:flex-none"
          >
            {step < total - 1 ? copy.next : status === "sending" ? copy.sending : copy.submit}
            <ArrowIcon size={17} className="transition-transform duration-500 ease-expo group-hover/next:translate-x-1 rtl:group-hover/next:-translate-x-1" />
          </button>
        </div>
      </div>
    </form>
  );
};
