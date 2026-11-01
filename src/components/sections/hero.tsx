import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ArrowDownIcon } from "@/components/ui/icons";
import { CropMarks } from "@/components/ui/section-label";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/utils";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export const Hero = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const [l1, l2, l3] = t.hero.lines;
  const lastSpace = l3.lastIndexOf(" ");
  const l3Lead = lastSpace > 0 ? l3.slice(0, lastSpace) : "";
  const l3Mark = lastSpace > 0 ? l3.slice(lastSpace + 1) : l3;

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[calc(var(--header-h)+1.5rem)]">
      <CropMarks className="top-[calc(var(--header-h)+0.75rem)]" />

      <div className="shell flex items-center justify-between gap-4 pt-4">
        <p className="label fade-in" style={d(0)}>
          {t.hero.kicker}
        </p>
        <p className="label fade-in flex items-center gap-2" style={d(80)}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-[#2f9e5b] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-[#2f9e5b]" />
          </span>
          {t.hero.status}
        </p>
      </div>

      <div className="shell flex flex-1 flex-col justify-center py-10 md:py-14">
        <h1 id="hero-title" className="display text-[17vw] md:text-[clamp(3.1rem,12.2vw,14.5rem)] ar:text-[13vw] md:ar:text-[clamp(2.7rem,10.5vw,12rem)]">
          <span className="rise-line">
            <span style={d(0)}>{l1}</span>
          </span>
          <span className="rise-line ps-[2vw] md:ps-[16vw]">
            <span style={d(90)} className="text-[0.52em] md:text-[0.72em]">
              {l2}
            </span>
          </span>
          <span className="rise-line">
            <span style={d(180)}>
              {l3Lead ? `${l3Lead} ` : null}
              <span className="relative inline-block">
                <span aria-hidden className="absolute inset-x-[-0.06em] top-[0.12em] bottom-[0.02em] -z-10 bg-kiln" />
                {l3Mark}
              </span>
            </span>
          </span>
        </h1>
      </div>

      <div className="shell grid gap-8 pb-28 md:grid-cols-12 md:items-end md:pb-14">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="fade-in max-w-[34rem] text-[1.08rem] leading-relaxed text-smoke md:text-[1.18rem]" style={d(380)}>
            {t.hero.sub}
          </p>
          <div className="fade-in mt-7 flex flex-wrap items-center gap-3" style={d(480)}>
            <ButtonLink href={whatsappUrl(t.fab.message)} variant="kiln" icon="whatsapp" size="lg" newTabLabel={t.common.newTab}>
              {t.hero.primary}
            </ButtonLink>
            <ButtonLink href="#work" variant="line" size="lg">
              {t.hero.secondary}
            </ButtonLink>
          </div>
        </div>

        <div className="fade-in hidden md:col-span-5 md:col-start-8 md:block lg:col-span-4 lg:col-start-9" style={d(560)}>
          <dl className="relative border-t border-ink pt-4 text-[0.92rem]">
            <span aria-hidden className="absolute -top-[5px] start-0 size-2.5 bg-ink" />
            <span aria-hidden className="absolute -top-[5px] end-0 size-2.5 bg-ink" />
            {(
              [
                [t.nav.services, t.marquee.slice(0, 5).join(" · ")],
                [locale === "ar" ? "اللغات" : "Languages", locale === "ar" ? "عربي · English" : "English · العربية"],
                [locale === "ar" ? "المكان" : "Based", locale === "ar" ? "القاهرة · ريموت" : `${site.person.city} · remote`],
                [t.hero.annotation, locale === "ar" ? "بناء Full-Stack" : "Full-stack builds"],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-line py-2.5">
                <dt className="label pt-0.5 text-smoke">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#services"
        className="fade-in label absolute end-[var(--gutter)] bottom-6 hidden items-center gap-2 md:flex"
        style={d(700)}
        data-cursor="open"
      >
        {t.hero.scroll}
        <ArrowDownIcon size={14} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
};
