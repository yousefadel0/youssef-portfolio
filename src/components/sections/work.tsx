import Link from "next/link";
import { ProjectLinks } from "@/components/case-study/project-links";
import { ProjectComposite } from "@/components/case-study/project-mockup";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { SectionLabel } from "@/components/ui/section-label";
import type { Dictionary } from "@/content/copy";
import { projects } from "@/content/projects";
import { href, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";
import { WorkIndex } from "./work-index";

export const Work = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section id="work" aria-labelledby="work-title" className="relative scroll-mt-16">
    <div className="shell py-24 md:py-36">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel index={2}>{t.work.label}</SectionLabel>
          <SplitText id="work-title" lines={t.work.title} className="display mt-6 text-[clamp(3rem,8.5vw,8.5rem)]" />
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-[1.08rem] leading-relaxed text-smoke">{t.work.note}</p>
          </Reveal>
        </div>
        <div className="hidden md:col-span-5 md:block md:self-end">
          <WorkIndex
            label={locale === "ar" ? "الفهرس" : "Index"}
            items={projects.map((p) => ({
              slug: p.slug,
              name: p.name,
              type: p.copy[locale].type,
              href: href(locale, `/work/${p.slug}`),
              tagline: p.copy[locale].tagline,
              theme: p.theme,
            }))}
          />
        </div>
      </div>
    </div>

    <ol>
      {projects.map((p, i) => {
        const c = p.copy[locale];
        return (
          <li
            key={p.slug}
            className="cv-auto relative [contain-intrinsic-size:auto_100svh] lg:sticky lg:top-0 lg:min-h-[100svh]"
            style={{ background: p.theme.bg, color: p.theme.fg, zIndex: i + 1 }}
          >
            <article aria-labelledby={`work-${p.slug}`} className="group shell grid gap-10 py-16 md:py-24 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="label tabular" style={{ color: p.theme.muted }}>
                    WO—{pad(p.index)} · {c.type}
                  </span>
                  <span className="label border px-2 py-1" style={{ borderColor: `${p.theme.fg}55` }}>
                    {t.work.portfolioBuild}
                  </span>
                </div>
                <h3 id={`work-${p.slug}`} className="display mt-8 text-[clamp(3.2rem,8vw,7.5rem)] ar:leading-[1]" dir="ltr">
                  <span className="block w-fit max-w-full rtl:ms-auto">{p.name}</span>
                </h3>
                <p className="headline mt-5 max-w-[18ch] text-[clamp(1.5rem,2.6vw,2.25rem)] ar:leading-[1.35]">{c.tagline}</p>
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed" style={{ color: p.theme.muted }}>
                  {c.summary}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2" aria-label={t.work.stack}>
                  {p.stack.slice(0, 5).map((s) => (
                    <li key={s} className="label border px-2.5 py-1.5" style={{ borderColor: `${p.theme.fg}33` }}>
                      {s}
                    </li>
                  ))}
                </ul>
                <ProjectLinks project={p} locale={locale} t={t} className="mt-9" />
              </div>

              <Link
                href={href(locale, `/work/${p.slug}`)}
                data-cursor="view"
                tabIndex={-1}
                aria-hidden
                className="relative block lg:col-span-7"
              >
                <span aria-hidden className="display pointer-events-none absolute -top-[0.3em] end-0 text-[clamp(8rem,22vw,22rem)] leading-none opacity-[0.07] select-none">
                  {pad(p.index)}
                </span>
                <Reveal variant="clip">
                  <Parallax speed={10}>
                    <ProjectComposite slug={p.slug} className={p.slug === "tidal" ? "mx-auto max-w-[34rem]" : undefined} />
                  </Parallax>
                </Reveal>
              </Link>
            </article>
          </li>
        );
      })}
    </ol>
  </section>
);
