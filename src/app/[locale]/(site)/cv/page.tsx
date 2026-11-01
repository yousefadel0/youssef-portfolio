import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Logomark } from "@/components/ui/logo";
import { CropMarks, SectionLabel } from "@/components/ui/section-label";
import { site } from "@/config/site";
import { getDictionary } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/cv">): Promise<Metadata> => {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return pageMetadata({ locale: locale as Locale, path: "/cv", title: t.meta.cv, description: t.meta.cvDescription });
};

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = t.cvPage;

  return (
    <section className="shell pt-[calc(var(--header-h)+4rem)] pb-28 md:pt-[calc(var(--header-h)+6rem)] md:pb-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index={0}>{c.label}</SectionLabel>
          <SplitText as="h1" lines={c.title} className="display mt-6 text-[clamp(3.4rem,9vw,8rem)]" />
          <Reveal delay={150}>
            <p className="mt-8 max-w-md text-[1.1rem] leading-relaxed text-smoke">{c.intro}</p>
          </Reveal>
          <Reveal delay={250} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={site.cv.file} download={site.cv.fileName} variant="kiln" icon="download" size="lg">
              {c.download}
            </ButtonLink>
            <ButtonLink href={site.cv.file} variant="line" icon="external" size="lg" newTabLabel={t.common.newTab}>
              {c.view}
            </ButtonLink>
          </Reveal>
          <p className="label mt-6 text-smoke">
            PDF · {c.updated} {site.cv.updated}
          </p>
        </div>

        {/* The document, drawn as a sheet of paper */}
        <Reveal variant="clip" className="lg:col-span-7">
          <div className="relative rotate-[-1.2deg] bg-paper p-7 shadow-[0_40px_80px_-30px_rgb(19_18_16/0.35)] ring-1 ring-line md:p-12">
            <CropMarks />
            <div className="flex items-start justify-between gap-6 border-b-2 border-ink pb-6">
              <div>
                <p className="headline text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[0.95]" dir="ltr">
                  {site.person.fullName}
                </p>
                <p className="mt-3 text-smoke">{locale === "ar" ? "مطوّر Full-Stack · مطوّر AI / LLM · شبكات وأمن معلومات" : "Full-Stack Developer · AI / LLM Developer · Cybersecurity & Networking"}</p>
                <p className="label mt-3 text-smoke" dir="ltr">
                  {site.person.city}, {site.person.country} · {site.person.phone} · {site.person.email}
                </p>
              </div>
              <Logomark size={48} className="shrink-0" />
            </div>

            <div className="mt-8">
              <p className="label text-smoke">{c.summaryTitle}</p>
              <p className="mt-3 leading-relaxed">{c.summary}</p>
            </div>

            <div className="mt-8">
              <p className="label text-smoke">{c.experienceTitle}</p>
              <ul className="mt-3">
                {c.roles.map((r) => (
                  <li key={r.title} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[9rem_1fr]">
                    <span className="label tabular pt-1 text-smoke">{r.years}</span>
                    <span>
                      <span className="block font-medium">{r.title}</span>
                      <span className="block text-[0.92rem] text-smoke">{r.place}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="label text-smoke">{c.educationTitle}</p>
                <p className="mt-3 font-medium">{c.education.title}</p>
                <p className="text-[0.92rem] text-smoke">{c.education.place}</p>
                <p className="label tabular mt-1 text-smoke">{c.education.years}</p>
              </div>
              <div>
                <p className="label text-smoke">{c.languagesTitle}</p>
                <p className="mt-3">{c.languages}</p>
                <p className="label mt-6 text-smoke">{c.availabilityTitle}</p>
                <p className="mt-2">{c.availability}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
