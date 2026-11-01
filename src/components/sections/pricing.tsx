import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/section-label";
import { site, type PackageId } from "@/config/site";
import type { Dictionary } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { cn, whatsappUrl } from "@/lib/utils";
import { CurrencyProvider, CurrencyToggle, Price } from "./currency";

const order: PackageId[] = ["launch", "growth", "custom"];

const tone: Record<PackageId, { card: string; muted: string; button: "ink" | "kiln" | "bone"; rule: string }> = {
  launch: { card: "bg-paper text-ink border border-line", muted: "text-smoke", button: "ink", rule: "border-line" },
  growth: { card: "bg-ink text-bone lg:-mt-10 lg:pb-14", muted: "text-ash", button: "kiln", rule: "border-line-light" },
  custom: { card: "bg-nile text-bone", muted: "text-bone/70", button: "bone", rule: "border-line-light" },
};

export const Pricing = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section id="pricing" aria-labelledby="pricing-title" className="cv-auto relative scroll-mt-16 py-24 md:py-36">
    <CurrencyProvider initial={site.pricing.defaultCurrency}>
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel index={4}>{t.pricing.label}</SectionLabel>
            <SplitText id="pricing-title" lines={t.pricing.title} className="display mt-6 text-[clamp(3rem,8.5vw,8.5rem)]" />
          </div>
          <Reveal className="flex flex-col items-start gap-6 self-end md:col-span-4 md:col-start-9" delay={120}>
            <p className="text-[1.08rem] leading-relaxed text-smoke">{t.pricing.intro}</p>
            <CurrencyToggle label={t.pricing.currency} />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-3 lg:items-start lg:gap-5">
          {order.map((id, i) => {
            const pkg = site.pricing.packages[id];
            const copy = t.pricing.packages[id];
            const s = tone[id];
            return (
              <Reveal key={id} delay={i * 110} className={cn("relative flex flex-col p-7 md:p-9", s.card)}>
                {id === "growth" ? <span className="label absolute -top-3 start-7 bg-kiln px-2.5 py-1.5 text-ink md:start-9">{t.pricing.recommended}</span> : null}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="headline text-[clamp(2.2rem,3.4vw,3rem)]">{copy.name}</h3>
                  <span className="label tabular opacity-70">0{i + 1}</span>
                </div>
                <p className={cn("mt-3 min-h-[3.2em] leading-snug", s.muted)}>{copy.for}</p>

                <div className={cn("mt-8 border-t pt-6", s.rule)}>
                  <p className={cn("label", s.muted)}>{t.pricing.from}</p>
                  <p className="headline mt-2 text-[clamp(2.4rem,4vw,3.4rem)] leading-none">
                    <Price amounts={{ EGP: pkg.EGP, USD: pkg.USD }} locale={locale} />
                  </p>
                  <p className={cn("mt-3 text-[0.92rem]", s.muted)}>
                    <span className="label me-2">{t.pricing.delivery}</span>
                    {pkg.deliveryDays ? t.pricing.days(pkg.deliveryDays[0], pkg.deliveryDays[1]) : t.pricing.scoped}
                  </p>
                </div>

                <div className={cn("mt-7 border-t pt-6", s.rule)}>
                  <p className={cn("label mb-4", s.muted)}>{t.pricing.includes}</p>
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
                  <p className={cn("label mb-4", s.muted)}>{t.pricing.needs}</p>
                  <ul className={cn("space-y-1.5 text-[0.95rem]", s.muted)}>
                    {copy.needs.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <ButtonLink href={whatsappUrl(copy.message)} variant={s.button} icon="whatsapp" className="mt-9 w-full" magnetic={false} newTabLabel={t.common.newTab}>
                  {t.pricing.cta}
                </ButtonLink>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-[0.95rem] text-smoke">{t.pricing.note}</p>
      </div>
    </CurrencyProvider>
  </section>
);
