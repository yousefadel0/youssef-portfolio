import type { Metadata } from "next";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { BriefForm } from "@/components/sections/brief-form";
import { ButtonLink } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/config/site";
import { getDictionary } from "@/content/copy";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { mailtoUrl, whatsappUrl } from "@/lib/utils";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> => {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return pageMetadata({ locale: locale as Locale, path: "/contact", title: t.meta.contact, description: t.meta.contactDescription });
};

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = t.contactPage;

  return (
    <section className="shell pt-[calc(var(--header-h)+4rem)] pb-28 md:pt-[calc(var(--header-h)+6rem)] md:pb-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index={0}>{c.label}</SectionLabel>
            <SplitText as="h1" lines={c.title} className="display mt-6 text-[clamp(3.2rem,8vw,7rem)]" />
            <Reveal delay={150}>
              <p className="mt-8 max-w-md text-[1.1rem] leading-relaxed text-smoke">{c.intro}</p>
            </Reveal>

            <Reveal delay={250} className="mt-12 bg-kiln p-6 md:p-8">
              <p className="headline text-[1.8rem]">{c.whatsappTitle}</p>
              <p className="mt-2">{c.whatsappText}</p>
              <ButtonLink href={whatsappUrl(t.fab.message)} variant="ink" icon="whatsapp" className="mt-6" newTabLabel={t.common.newTab}>
                {c.whatsappCta}
              </ButtonLink>
            </Reveal>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="border-t border-ink pt-3">
                <dt className="label text-smoke">{c.emailTitle}</dt>
                <dd className="mt-1.5">
                  <a href={mailtoUrl()} className="break-all underline-offset-4 hover:underline">
                    {site.person.email}
                  </a>
                </dd>
              </div>
              <div className="border-t border-ink pt-3">
                <dt className="label text-smoke">{c.responseTitle}</dt>
                <dd className="mt-1.5">{c.responseValue}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="lg:col-span-7">
          <BriefForm copy={c} locale={locale} />
        </div>
      </div>
    </section>
  );
}
