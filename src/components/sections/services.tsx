import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { ArrowIcon, ServiceGlyph } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/section-label";
import type { Dictionary } from "@/content/copy";
import { services } from "@/content/services";
import { href, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

export const Services = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section id="services" aria-labelledby="services-title" className="cv-auto relative scroll-mt-16 bg-ink py-24 text-bone md:py-36">
    <div className="shell">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel index={1} className="text-ash">
            {t.services.label}
          </SectionLabel>
          <SplitText
            id="services-title"
            lines={t.services.title}
            className="display mt-6 text-[clamp(3rem,8.5vw,8.5rem)]"
            lineClassNames={[undefined, "text-kiln"]}
          />
        </div>
        <Reveal className="self-end md:col-span-4 md:col-start-9" delay={150}>
          <p className="text-[1.08rem] leading-relaxed text-ash">{t.services.intro}</p>
        </Reveal>
      </div>

      <ol className="mt-16 border-t border-line-light md:mt-24">
        {services.map((s, i) => {
          const c = s.copy[locale];
          return (
            <li key={s.id}>
              <Link
                href={href(locale, `/services#${s.id}`)}
                data-cursor="view"
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-3 overflow-hidden border-b border-line-light py-7 md:grid-cols-[4rem_minmax(0,5fr)_minmax(0,5fr)_auto] md:items-center md:gap-x-8 md:py-9"
              >
                <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-kiln transition-transform duration-700 ease-expo group-hover:scale-y-100 group-focus-visible:scale-y-100" />
                <span className="label tabular relative pt-2 text-ash transition-colors group-hover:text-ink md:pt-0">{pad(i + 1)}</span>
                <span className="relative">
                  <span className="display block text-[clamp(2.1rem,5.2vw,4.75rem)] transition-[color,transform] duration-500 ease-expo group-hover:translate-x-3 group-hover:text-ink rtl:group-hover:-translate-x-3">
                    {c.name}
                  </span>
                  <span className="mt-2 block max-w-md text-[0.98rem] text-ash transition-colors group-hover:text-ink md:hidden">{c.short}</span>
                </span>
                <span className="relative col-span-2 col-start-2 hidden transition-colors group-hover:text-ink md:col-span-1 md:col-start-auto md:block">
                  <span className="label mb-2 block text-ash transition-colors group-hover:text-ink/70">
                    {t.services.forLabel}
                  </span>
                  <span className="block text-[1.02rem] leading-snug">{c.for}</span>
                  <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.88rem] text-ash transition-colors group-hover:text-ink/80">
                    {c.get.slice(0, 3).map((g) => (
                      <span key={g}>+ {g}</span>
                    ))}
                  </span>
                </span>
                <span className="relative row-span-2 flex items-center gap-4 self-center text-ash transition-colors group-hover:text-ink md:row-span-1">
                  <ServiceGlyph icon={s.icon} size={52} className="hidden md:block" />
                  <ArrowIcon size={22} className="transition-transform duration-500 ease-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex justify-end">
        <ButtonLink href={href(locale, "/services")} variant="line-light">
          {t.services.more}
        </ButtonLink>
      </div>
    </div>
  </section>
);
