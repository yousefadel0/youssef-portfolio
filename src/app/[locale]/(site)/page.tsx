import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Marquee } from "@/components/ui/marquee";
import { getDictionary } from "@/content/copy";
import { isLocale, type Locale } from "@/lib/i18n";
import { homeJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[locale]">): Promise<Metadata> => {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return { ...pageMetadata({ locale: locale as Locale, title: t.meta.homeTitle, description: t.meta.homeDescription }), title: { absolute: t.meta.homeTitle } };
};

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd data={homeJsonLd(locale, t)} />
      <Hero locale={locale} t={t} />
      <Marquee items={t.marquee} className="bg-kiln text-ink" />
      <Services locale={locale} t={t} />
      <Work locale={locale} t={t} />
      <Process
        label={t.process.label}
        title={t.process.title}
        intro={t.process.intro}
        youGet={t.process.youGet}
        steps={t.process.steps}
        rtl={locale === "ar"}
      />
      <Pricing locale={locale} t={t} />
      <About locale={locale} t={t} />
      <Faq locale={locale} t={t} />
      <FinalCta locale={locale} t={t} />
    </>
  );
}
