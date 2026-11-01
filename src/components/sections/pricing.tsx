import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { CheckIcon, MinusIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/section-label";
import { site, type AddonId, type PackageId } from "@/config/site";
import type { Dictionary } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { cn, pad, whatsappUrl } from "@/lib/utils";
import { CurrencyProvider, CurrencyToggle, Price } from "./currency";
import { Estimate } from "./estimate";

const order: PackageId[] = ["launch", "growth", "custom"];

const tone: Record<PackageId, { card: string; muted: string; button: "ink" | "kiln" | "bone"; rule: string; bar: string[] }> = {
  launch: { card: "bg-paper text-ink border border-line", muted: "text-smoke", button: "ink", rule: "border-line", bar: ["bg-ink", "bg-ink/70", "bg-ink/40", "bg-kiln"] },
  growth: { card: "bg-ink text-bone lg:-mt-10 lg:pb-14", muted: "text-ash", button: "kiln", rule: "border-line-light", bar: ["bg-bone", "bg-bone/70", "bg-bone/40", "bg-kiln"] },
  custom: { card: "bg-nile text-bone", muted: "text-bone/75", button: "bone", rule: "border-line-light", bar: ["bg-bone", "bg-bone/70", "bg-bone/40", "bg-kiln"] },
};

const addonOrder: AddonId[] = ["extraPage", "secondLanguage", "onlinePayments", "aiAssistant", "adLanding", "brandKit"];
const includedIn: Partial<Record<AddonId, PackageId[]>> = {
  secondLanguage: ["growth", "custom"],
  onlinePayments: ["growth", "custom"],
};

const Verdict = ({ value, label, strong }: { value: string; label: string; strong?: boolean }) => (
  <span className={cn("inline-flex items-center gap-2", strong ? "text-ink" : "text-smoke")}>
    <span
      aria-hidden
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full",
        value === "yes" && (strong ? "bg-ink text-kiln" : "bg-ink/10 text-ink"),
        value === "partial" && "border border-dashed border-ink/40",
        value === "no" && "text-ink/40",
      )}
    >
      {value === "yes" ? <CheckIcon size={13} /> : value === "partial" ? <span className="size-1.5 rounded-full bg-ink/50" /> : <MinusIcon size={14} />}
    </span>
    <span className="hidden text-[0.9rem] md:inline">{label}</span>
    <span className="sr-only md:hidden">{label}</span>
  </span>
);

export const Pricing = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const p = t.pricing;
  const delivery = (id: PackageId) => {
    const d = site.pricing.packages[id].deliveryDays;
    return d ? p.days(d[0], d[1]) : p.scoped;
  };
  const split = (id: PackageId, share: number) => ({
    EGP: Math.round(site.pricing.packages[id].EGP * share),
    USD: Math.round(site.pricing.packages[id].USD * share),
  });

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="cv-auto relative scroll-mt-16 py-24 md:py-36">
      <CurrencyProvider initial={site.pricing.defaultCurrency}>
        <div className="shell">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionLabel index={4}>{p.label}</SectionLabel>
              <SplitText id="pricing-title" lines={p.title} className="display mt-6 text-[clamp(3rem,8.5vw,8.5rem)]" />
            </div>
            <Reveal className="flex flex-col items-start gap-6 self-end md:col-span-4 md:col-start-9" delay={120}>
              <p className="text-[1.08rem] leading-relaxed text-smoke">{p.intro}</p>
              <CurrencyToggle label={p.currency} />
            </Reveal>
          </div>

          {/* Packages */}
          <div className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-3 lg:items-start lg:gap-5">
            {order.map((id, i) => {
              const pkg = site.pricing.packages[id];
              const copy = p.packages[id];
              const s = tone[id];
              const bd = site.pricing.breakdown[id];
              const parts = [
                { key: "design", label: p.breakdown.design, v: bd.design },
                { key: "build", label: p.breakdown.build, v: bd.build },
                { key: "launch", label: p.breakdown.launch, v: bd.launch },
                { key: "support", label: p.breakdown.support, v: bd.support },
              ];
              return (
                <Reveal key={id} delay={i * 110} className={cn("relative flex flex-col p-7 md:p-9", s.card)}>
                  {id === "growth" ? <span className="label absolute -top-3 start-7 bg-kiln px-2.5 py-1.5 text-ink md:start-9">{p.recommended}</span> : null}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="headline text-[clamp(2rem,3vw,2.6rem)]">{copy.name}</h3>
                    <span className="label tabular">{pad(i + 1)}</span>
                  </div>
                  <p className={cn("mt-3 min-h-[3.2em] leading-snug", s.muted)}>{copy.for}</p>

                  <div className={cn("mt-8 border-t pt-6", s.rule)}>
                    <p className={cn("label", s.muted)}>{p.from}</p>
                    <p className="headline mt-2 text-[clamp(2.4rem,4vw,3.4rem)] leading-none">
                      <Price amounts={{ EGP: pkg.EGP, USD: pkg.USD }} locale={locale} />
                    </p>
                    <p className={cn("mt-3 text-[0.92rem]", s.muted)}>
                      <span className="label me-2">{p.delivery}</span>
                      {delivery(id)}
                    </p>
                  </div>

                  {/* Payment split */}
                  <div className={cn("mt-6 grid grid-cols-2 border-t pt-4", s.rule)}>
                    {[
                      { label: p.deposit, share: site.pricing.deposit },
                      { label: p.balance, share: 1 - site.pricing.deposit },
                    ].map((row, ri) => (
                      <div key={row.label} className={cn(ri === 1 && "border-s ps-4", s.rule)}>
                        <p className={cn("label", s.muted)}>
                          {row.label} · {Math.round(row.share * 100)}%
                        </p>
                        <p className="mt-1 text-[1.05rem] font-medium">
                          <Price amounts={split(id, row.share)} locale={locale} />
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Where the money goes */}
                  <div className={cn("mt-6 border-t pt-5", s.rule)}>
                    <p className={cn("label mb-3", s.muted)}>{p.breakdownTitle}</p>
                    <div className="flex h-2.5 w-full gap-0.5" aria-hidden>
                      {parts.map((part, pi) => (
                        <span key={part.key} className={cn("h-full", s.bar[pi])} style={{ width: `${part.v}%` }} />
                      ))}
                    </div>
                    <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.85rem]">
                      {parts.map((part, pi) => (
                        <li key={part.key} className="flex items-center gap-2">
                          <span aria-hidden className={cn("size-2 shrink-0", s.bar[pi])} />
                          <span className={s.muted}>{part.label}</span>
                          <span className="tabular ms-auto">{part.v}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={cn("mt-6 border-t pt-6", s.rule)}>
                    <p className={cn("label mb-4", s.muted)}>{p.includes}</p>
                    <ul className="space-y-2.5">
                      {copy.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.98rem]">
                          <CheckIcon className={cn("mt-1 shrink-0", id === "launch" ? "text-ink" : "text-kiln")} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={cn("mt-7 border-t pt-6", s.rule)}>
                    <p className={cn("label mb-4", s.muted)}>{p.needs}</p>
                    <ul className={cn("space-y-1.5 text-[0.95rem]", s.muted)}>
                      {copy.needs.map((item) => (
                        <li key={item}>— {item}</li>
                      ))}
                    </ul>
                  </div>

                  <ButtonLink href={whatsappUrl(copy.message)} variant={s.button} icon="whatsapp" className="mt-9 w-full" magnetic={false} newTabLabel={t.common.newTab}>
                    {p.cta}
                  </ButtonLink>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-8 max-w-2xl text-[0.95rem] text-smoke">{p.note}</p>

          {/* Why this price */}
          <div className="mt-24 grid gap-12 border-t border-ink pt-12 md:mt-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label text-smoke">{p.whyLabel}</p>
              <h3 className="display mt-5 text-[clamp(2.2rem,3.4vw,3.4rem)]">
                {p.whyTitle.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>
            <ol className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-8">
              {p.why.map((w, i) => (
                <Reveal as="li" key={w.title} delay={i * 80} className="bg-bone p-6 md:p-7">
                  <span className="display tabular block text-[2.6rem] leading-none text-kiln">{pad(i + 1)}</span>
                  <h4 className="headline mt-5 text-[1.35rem]">{w.title}</h4>
                  <p className="mt-2 leading-relaxed text-smoke">{w.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Comparison */}
          <div className="mt-20 md:mt-28">
            <h3 className="headline text-[clamp(1.6rem,2.6vw,2.4rem)]">{p.compareTitle}</h3>
            <div className="mt-8 overflow-hidden border border-ink">
              <table className="w-full border-collapse text-start">
                <thead>
                  <tr className="border-b border-ink">
                    <th scope="col" className="w-[40%] p-3 md:p-5">
                      <span className="sr-only">{p.compareTitle}</span>
                    </th>
                    {p.compareCols.map((col, ci) => (
                      <th key={col} scope="col" className={cn("label p-3 text-start align-bottom md:p-5", ci === 2 ? "bg-kiln text-ink" : "text-smoke")}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.compareRows.map((row) => (
                    <tr key={row.label} className="border-b border-ink/15 last:border-0">
                      <th scope="row" className="p-3 text-start text-[0.95rem] font-medium md:p-5 md:text-[1.02rem]">
                        {row.label}
                      </th>
                      {row.values.map((v, vi) => (
                        <td key={vi} className={cn("p-3 md:p-5", vi === 2 && "bg-kiln/12")}>
                          <Verdict value={v} label={p.compareLegend[v as keyof typeof p.compareLegend]} strong={vi === 2} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Estimate builder */}
          <div className="mt-20 md:mt-28">
            <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="label text-smoke">{p.estimateLabel}</p>
                <h3 className="display mt-5 text-[clamp(2.6rem,5.5vw,5.5rem)]">
                  {p.estimateTitle.map((line, li) => (
                    <span key={line} className={cn("block", li === 1 && "md:ps-[8vw]")}>
                      {line}
                    </span>
                  ))}
                </h3>
              </div>
              <p className="text-[1.05rem] leading-relaxed text-smoke md:col-span-4 md:col-start-9">{p.estimateIntro}</p>
            </div>
            <Estimate
              locale={locale}
              packages={order.map((id) => ({ id, name: p.packages[id].name, price: { EGP: site.pricing.packages[id].EGP, USD: site.pricing.packages[id].USD }, delivery: delivery(id) }))}
              addons={addonOrder.map((id) => ({ id, name: p.addons[id], price: site.pricing.addons[id], includedIn: includedIn[id] ?? [] }))}
              carePlan={site.pricing.carePlan}
              deposit={site.pricing.deposit}
              copy={{
                pickPackage: p.pickPackage,
                addonsLabel: p.addonsLabel,
                included: p.included,
                perPage: p.perPage,
                carePlan: p.carePlan,
                carePlanText: p.carePlanText,
                perMonth: p.perMonth,
                total: p.total,
                deposit: p.deposit,
                balance: p.balance,
                delivery: p.delivery,
                from: p.from,
                sendEstimate: p.sendEstimate,
                estimateNote: p.estimateNote,
                estimateMessage: p.estimateMessage,
              }}
            />
          </div>
        </div>
      </CurrencyProvider>
    </section>
  );
};
