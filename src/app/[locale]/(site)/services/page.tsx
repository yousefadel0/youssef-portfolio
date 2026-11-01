import type { Metadata } from "next";
import Link from "next/link";
import { ProjectComposite, ProjectScreen } from "@/components/case-study/project-mockup";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { FinalCta } from "@/components/sections/final-cta";
import { WorkIndex } from "@/components/sections/work-index";
import { ArrowIcon, CheckIcon, ServiceGlyph } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/config/site";
import { getDictionary } from "@/content/copy";
import { getProject, projects } from "@/content/projects";
import { services } from "@/content/services";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { cn, formatPrice, pad } from "@/lib/utils";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/services">): Promise<Metadata> => {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return pageMetadata({ locale: locale as Locale, path: "/services", title: t.meta.services, description: t.meta.servicesDescription });
};

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <section className="shell pt-[calc(var(--header-h)+4rem)] pb-16 md:pt-[calc(var(--header-h)+6rem)] md:pb-24">
        <SectionLabel index={0}>{t.servicesPage.label}</SectionLabel>
        <SplitText as="h1" lines={t.servicesPage.title} className="display mt-6 text-[clamp(3.4rem,11vw,11rem)]" lineClassNames={[undefined, "ps-[10vw]"]} />
        <Reveal className="mt-10 grid md:grid-cols-12" delay={200}>
          <p className="text-[1.15rem] leading-relaxed text-smoke md:col-span-6 md:col-start-7">{t.servicesPage.intro}</p>
        </Reveal>
        <nav aria-label={t.servicesPage.label} className="mt-12 flex flex-wrap gap-2">
          {services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="label border border-ink px-3 py-2 transition-colors hover:bg-ink hover:text-bone">
              {pad(i + 1)} {s.copy[locale].name}
            </a>
          ))}
        </nav>
      </section>

      {services.map((s, i) => {
        const c = s.copy[locale];
        const example = getProject(s.example)!;
        const pkg = site.pricing.packages[s.startsWith];
        const dark = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn("scroll-mt-16 py-20 md:py-28", dark ? "bg-ink text-bone" : "border-t border-line")}
          >
            <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className={cn("lg:col-span-6", dark && "lg:order-2")}>
                <div className="flex items-center gap-4">
                  <span className="label tabular">{pad(i + 1)}</span>
                  <ServiceGlyph icon={s.icon} size={40} className={dark ? "text-kiln" : "text-ink"} />
                </div>
                <h2 id={`${s.id}-title`} className="display mt-6 text-[clamp(3rem,7vw,6.5rem)]">
                  {c.name}
                </h2>
                <p className={cn("headline mt-5 max-w-[24ch] text-[clamp(1.35rem,2vw,1.8rem)] ar:leading-[1.5]", dark ? "text-bone" : "text-ink")}>{c.short}</p>

                <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <dt className={cn("label mb-3", dark ? "text-ash" : "text-smoke")}>{t.servicesPage.whoFor}</dt>
                    <dd className="leading-relaxed">{c.for}</dd>
                  </div>
                  <div>
                    <dt className={cn("label mb-3", dark ? "text-ash" : "text-smoke")}>{t.servicesPage.whatYouGet}</dt>
                    <dd>
                      <ul className="space-y-2">
                        {c.get.map((g) => (
                          <li key={g} className="flex gap-2.5">
                            <CheckIcon className="mt-1 shrink-0 text-kiln" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className={cn("label mb-3", dark ? "text-ash" : "text-smoke")}>{t.servicesPage.timeline}</dt>
                    <dd className="headline text-[1.6rem]">{c.timeline}</dd>
                  </div>
                  <div>
                    <dt className={cn("label mb-3", dark ? "text-ash" : "text-smoke")}>{t.servicesPage.startsWith}</dt>
                    <dd>
                      <a href={`${href(locale)}#pricing`} className="headline text-[1.6rem] underline decoration-kiln decoration-2 underline-offset-[6px]">
                        {t.pricing.packages[s.startsWith].name}
                      </a>
                      <span className={cn("ms-3 text-[0.95rem]", dark ? "text-ash" : "text-smoke")}>
                        {t.pricing.from} {formatPrice(pkg.EGP, "EGP", locale)}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className={cn("lg:col-span-6", dark && "lg:order-1")}>
                <Link
                  href={href(locale, `/work/${example.slug}`)}
                  data-cursor="view"
                  className="group block p-6 md:p-10"
                  style={{ background: example.theme.bg, color: example.theme.fg }}
                >
                  <Reveal variant="clip">
                    {example.slug === "tidal" ? (
                      <ProjectScreen slug="tidal" view="primary" className="mx-auto max-w-[16rem]" />
                    ) : (
                      <ProjectComposite slug={example.slug} />
                    )}
                  </Reveal>
                  <span className="mt-6 flex items-center justify-between gap-4">
                    <span>
                      <span className="label block" style={{ color: example.theme.muted }}>
                        {t.servicesPage.example}
                      </span>
                      <span className="headline mt-1 block text-[1.8rem]">{example.name}</span>
                    </span>
                    <ArrowIcon size={24} className="transition-transform duration-500 ease-expo group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
                  </span>
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-nile py-24 text-bone md:py-32" aria-labelledby="addons-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index={6} className="text-bone/70">
              {t.servicesPage.addonsLabel}
            </SectionLabel>
            <h2 id="addons-title" className="display mt-6 text-[clamp(2.6rem,5vw,5rem)]">
              {t.servicesPage.addonsTitle}
            </h2>
          </div>
          <ol className="grid gap-px bg-line-light sm:grid-cols-2 lg:col-span-7">
            {t.servicesPage.addons.map((a, i) => (
              <Reveal as="li" key={a.name} delay={i * 80} className={cn("bg-nile p-7", i === 0 && "sm:col-span-2 bg-nile-2")}>
                <span className="label tabular text-kiln">+{pad(i + 1)}</span>
                <h3 className="headline mt-4 text-[1.8rem]">{a.name}</h3>
                <p className="mt-2 leading-relaxed text-bone/80">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-24 md:py-32">
        <WorkIndex
          label={t.servicesPage.buildsLabel}
          items={projects.map((p) => ({
            slug: p.slug,
            name: p.name,
            type: p.copy[locale].type,
            href: href(locale, `/work/${p.slug}`),
            tagline: p.copy[locale].tagline,
            theme: p.theme,
          }))}
        />
      </section>

      <FinalCta locale={locale} t={t} index={7} />
    </>
  );
}
