import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesignSystem } from "@/components/case-study/design-system";
import { ProjectLinks } from "@/components/case-study/project-links";
import { ProjectComposite, ProjectScreen } from "@/components/case-study/project-mockup";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/section-label";
import { getDictionary } from "@/content/copy";
import { getNextProject, getProject, projects } from "@/content/projects";
import { href, locales, type Locale } from "@/lib/i18n";
import { projectFontVariables } from "@/lib/project-fonts";
import { pageMetadata } from "@/lib/seo";
import { cn, pad, whatsappUrl } from "@/lib/utils";

export const dynamicParams = false;

export const generateStaticParams = () => locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));

export const generateMetadata = async ({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> => {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const t = getDictionary(locale as Locale);
  const c = project.copy[locale as Locale];
  return pageMetadata({
    locale: locale as Locale,
    path: `/work/${slug}`,
    title: `${project.name} — ${c.type}`,
    description: t.meta.workDescription(project.name, c.type),
  });
};

export default async function CaseStudy({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale: raw, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = project.copy[locale];
  const next = getNextProject(project.slug);
  const { theme } = project;

  const meta = [
    [t.caseStudy.client, c.client],
    [t.caseStudy.role, t.caseStudy.roleValue],
    [t.caseStudy.platform, c.platform],
    [t.caseStudy.status, `${t.work.portfolioBuild} · ${project.year}`],
  ];

  return (
    <article className={projectFontVariables}>
      {/* Hero */}
      <header className="relative overflow-hidden pt-[calc(var(--header-h)+2rem)]" style={{ background: theme.bg, color: theme.fg }}>
        <div className="shell pb-14 md:pb-20">
          <Link href={`${href(locale)}#work`} className="label group/back inline-flex items-center gap-2 py-2" data-cursor="open">
            <ArrowIcon size={14} className="rotate-180 transition-transform duration-500 ease-expo group-hover/back:-translate-x-1 rtl:group-hover/back:translate-x-1" />
            {t.caseStudy.back}
          </Link>
          <p className="label mt-10" style={{ color: theme.muted }}>
            WO—{pad(project.index)} · {c.type}
          </p>
          <h1 className="display mt-4 text-[clamp(3.4rem,11.5vw,12rem)]" dir="ltr">
            <span className="block w-fit max-w-full rtl:ms-auto">{project.name}</span>
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <p className="headline text-[clamp(1.6rem,3vw,2.75rem)] lg:col-span-6 ar:leading-[1.4]">{c.tagline}</p>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
              {meta.map(([k, v]) => (
                <div key={k} className="border-t pt-3" style={{ borderColor: `${theme.fg}33` }}>
                  <dt className="label" style={{ color: theme.muted }}>
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[0.98rem] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ProjectLinks project={project} locale={locale} t={t} showCaseStudy={false} className="mt-10" />
        </div>
        <div className="group shell pb-16 md:pb-24" data-cursor="drag">
          <Reveal variant="clip">
            <ProjectComposite slug={project.slug} className={project.slug === "tidal" ? "mx-auto max-w-[44rem]" : undefined} />
          </Reveal>
        </div>
      </header>

      {/* Problem */}
      <section className="shell grid gap-8 py-24 md:py-32 lg:grid-cols-12" aria-labelledby="problem">
        <div className="lg:col-span-3">
          <SectionLabel index={1}>{t.caseStudy.problem}</SectionLabel>
        </div>
        <div className="lg:col-span-9">
          <h2 id="problem" className="sr-only">
            {t.caseStudy.problem}
          </h2>
          <Reveal>
            <p className="headline text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.1] ar:leading-[1.5]">{c.problem}</p>
          </Reveal>
          <p className="mt-10 max-w-xl text-smoke">
            <span className="label me-3">{t.caseStudy.client}</span>
            {c.client}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ink py-24 text-bone md:py-32" aria-labelledby="approach">
        <div className="shell">
          <SectionLabel index={2} className="text-ash">
            {t.caseStudy.approach}
          </SectionLabel>
          <h2 id="approach" className="sr-only">
            {t.caseStudy.approach}
          </h2>
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {c.approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 120} className={cn(i === 1 && "md:mt-24", i === 2 && "md:mt-48")}>
                <span className="display block text-[clamp(4rem,7vw,6.5rem)] leading-none text-kiln">{pad(i + 1)}</span>
                <h3 className="headline mt-6 text-[clamp(1.7rem,2.4vw,2.3rem)]">{a.title}</h3>
                <p className="mt-4 leading-relaxed text-ash">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Design system */}
      <section className="shell py-24 md:py-32" aria-labelledby="design-system">
        <SectionLabel index={3}>{t.caseStudy.designSystem}</SectionLabel>
        <SplitText id="design-system" lines={[t.caseStudy.designSystem]} className="display mt-6 mb-14 text-[clamp(2.6rem,6vw,6rem)] md:mb-20" />
        <DesignSystem project={project} t={t} />
      </section>

      {/* Screens */}
      <section className="overflow-hidden py-24 md:py-32" style={{ background: theme.bg, color: theme.fg }} aria-labelledby="screens">
        <div className="shell">
          <SectionLabel index={4}>{t.caseStudy.screens}</SectionLabel>
          <h2 id="screens" className="sr-only">
            {t.caseStudy.screens}
          </h2>
          <div className="mt-14 grid items-center gap-10 md:grid-cols-12">
            <div className="group md:col-span-4" data-cursor="drag">
              <Parallax speed={14}>
                <ProjectScreen slug={project.slug} view="secondary" className="mx-auto max-w-[20rem]" />
              </Parallax>
            </div>
            <div className="group md:col-span-8" data-cursor="drag">
              <Reveal variant="clip">
                <ProjectScreen slug={project.slug} view="primary" className={project.slug === "tidal" ? "mx-auto max-w-[22rem]" : undefined} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features + stack */}
      <section className="shell grid gap-16 py-24 md:py-32 lg:grid-cols-12" aria-labelledby="features">
        <div className="lg:col-span-8">
          <SectionLabel index={5}>{t.caseStudy.features}</SectionLabel>
          <h2 id="features" className="sr-only">
            {t.caseStudy.features}
          </h2>
          <ol className="mt-10 grid border-t border-ink sm:grid-cols-2">
            {c.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 2) * 90} className="border-b border-ink py-7 sm:odd:pe-8 sm:even:border-s sm:even:ps-8">
                <span className="label tabular text-smoke">{pad(i + 1)}</span>
                <h3 className="headline mt-3 text-[1.6rem]">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-smoke">{f.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-4">
          <SectionLabel index={6}>{t.caseStudy.stack}</SectionLabel>
          <ul className="mt-10 flex flex-wrap gap-2" dir="ltr">
            {project.stack.map((s) => (
              <li key={s} className="border border-ink px-3 py-2 text-[0.92rem]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Results */}
      <section className="overflow-hidden bg-nile py-24 text-bone md:py-32" aria-labelledby="results">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel index={7} className="text-bone/70">
                {t.caseStudy.results}
              </SectionLabel>
              <h2 id="results" className="display mt-6 text-[clamp(2.6rem,6vw,6rem)]">
                {t.caseStudy.results}
              </h2>
            </div>
            <p className="max-w-sm text-[0.95rem] text-bone/75">{t.caseStudy.resultsNote}</p>
          </div>
          <dl className="mt-14 grid grid-cols-2 border-t border-line-light lg:grid-cols-4">
            {c.results.map((r, i) => (
              <Reveal key={r.label} delay={i * 90} className="flex flex-col border-b border-line-light py-8 pe-6 lg:border-e lg:border-b-0 lg:ps-6 lg:first:ps-0 lg:last:border-e-0">
                <dt className="order-2 mt-3 text-[0.95rem] text-bone/75">{r.label}</dt>
                <dd className="display order-1 text-[clamp(2.2rem,3.8vw,3.75rem)] leading-none [overflow-wrap:anywhere]" dir="ltr">
                  <span className="block w-fit max-w-full rtl:ms-auto">{r.value}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Want this? */}
      <section className="shell grid gap-8 py-24 md:grid-cols-12 md:items-end md:py-32">
        <h2 className="display text-[clamp(2.6rem,6vw,6rem)] md:col-span-7">{t.caseStudy.startSimilar}</h2>
        <div className="md:col-span-5">
          <p className="text-[1.08rem] text-smoke">{t.caseStudy.startSimilarText}</p>
          <ButtonLink href={whatsappUrl(t.caseStudy.similarMessage(project.name))} variant="kiln" icon="whatsapp" size="lg" className="mt-6" newTabLabel={t.common.newTab}>
            {t.caseStudy.startSimilarCta}
          </ButtonLink>
        </div>
      </section>

      {/* Next project */}
      <Link
        href={href(locale, `/work/${next.slug}`)}
        data-cursor="view"
        className="group relative block overflow-hidden"
        style={{ background: next.theme.bg, color: next.theme.fg }}
      >
        <div className="shell flex flex-col gap-6 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <div>
            <p className="label" style={{ color: next.theme.muted }}>
              {t.caseStudy.next} · WO—{pad(next.index)}
            </p>
            <p className="display mt-4 text-[clamp(3.4rem,11vw,11rem)] transition-transform duration-700 ease-expo group-hover:translate-x-4 rtl:group-hover:-translate-x-4" dir="ltr">
              <span className="block w-fit max-w-full rtl:ms-auto">{next.name}</span>
            </p>
            <p className="mt-2 text-[1.05rem]" style={{ color: next.theme.muted }}>
              {next.copy[locale].type}
            </p>
          </div>
          <span className="grid size-20 shrink-0 place-items-center rounded-full border transition-colors duration-500 md:size-28" style={{ borderColor: next.theme.fg }}>
            <ArrowIcon size={32} />
          </span>
        </div>
      </Link>
    </article>
  );
}
