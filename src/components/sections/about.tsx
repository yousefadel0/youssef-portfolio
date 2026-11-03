import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Ticker } from "@/components/motion/ticker";
import { ButtonLink } from "@/components/ui/button";
import { Logomark } from "@/components/ui/logo";
import { SectionLabel } from "@/components/ui/section-label";
import type { Dictionary } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

export const About = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section id="about" aria-labelledby="about-title" className="cv-auto relative scroll-mt-16 overflow-hidden bg-nile py-24 text-bone md:py-36">
    <div className="shell">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel index={5} className="text-bone/70">
            {t.about.label}
          </SectionLabel>
          <SplitText id="about-title" lines={t.about.title} className="display mt-6 text-[clamp(3.4rem,10vw,10rem)]" lineClassNames={[undefined, "text-kiln"]} />
        </div>
        <Reveal className="self-end lg:col-span-5" delay={100}>
          <div className="flex items-start gap-5">
            <Logomark size={56} inverse className="shrink-0" />
            <p className="headline text-[clamp(1.4rem,2.2vw,2rem)] ar:leading-[1.5]">{t.about.lead}</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-10">
        {t.about.story.map((p, i) => (
          <Reveal key={i} delay={i * 100}>
            <p className="label mb-4 text-bone/70">§{i + 1}</p>
            <p className="text-[1.05rem] leading-relaxed text-bone/85">{p}</p>
          </Reveal>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-20 md:mt-28">
        <p className="label mb-8 text-bone/70">{t.about.timelineLabel}</p>
        <ol className="relative grid gap-0 border-t border-line-light sm:grid-cols-2 lg:grid-cols-5">
          {t.about.timeline.map((m, i) => (
            <Reveal as="li" key={m.year} delay={i * 70} className="relative border-b border-line-light py-6 pe-6 lg:border-e lg:border-b-0 lg:last:border-e-0">
              <span aria-hidden className={cn("absolute -top-[5px] start-0 size-2.5", i === t.about.timeline.length - 1 ? "bg-kiln" : "bg-bone")} />
              <p className={cn("headline tabular text-[clamp(2rem,3vw,2.75rem)]", i === t.about.timeline.length - 1 && "text-kiln")}>{m.year}</p>
              <p className="mt-3 font-medium">{m.title}</p>
              <p className="mt-1.5 text-[0.92rem] leading-snug text-bone/70">{m.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Layers: the skills from the CV drawn as a cross-section */}
      <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-bone/70">{t.about.layersLabel}</p>
          <p className="mt-4 max-w-sm text-bone/85">{t.about.layersNote}</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {t.about.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="label order-2 mt-2 text-bone/70">{s.label}</dt>
                <dd className="display tabular order-1 text-[clamp(2.6rem,4vw,3.6rem)] leading-none">
                  {"plain" in s && s.plain ? s.value : <Ticker value={s.value} />}
                </dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={href(locale, "/cv")} variant="line-light" icon="download" className="mt-10">
            {t.about.cvLink}
          </ButtonLink>
        </div>

        <ol className="space-y-2 lg:col-span-8" aria-label={t.about.layersLabel}>
          {t.about.layers.map((layer, i) => (
            <Reveal as="li" key={layer.name} variant="wipe" delay={i * 90}>
              <div
                className={cn(
                  "group/layer relative grid grid-cols-[3rem_1fr] items-center gap-4 px-5 py-5 transition-colors duration-500 md:grid-cols-[3.5rem_minmax(12rem,auto)_1fr] md:px-7 md:py-6",
                  i === 0 ? "bg-kiln text-ink" : i % 2 === 1 ? "bg-bone text-ink" : "bg-nile-2 text-bone",
                )}
                style={{ marginInlineStart: `${i * 4}%` }}
              >
                <span className="label tabular">L{pad(5 - i)}</span>
                <span className="headline text-[clamp(1.5rem,2.4vw,2.1rem)]">{layer.name}</span>
                <span className="col-span-2 text-[0.95rem] opacity-80 md:col-span-1">{layer.text}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
