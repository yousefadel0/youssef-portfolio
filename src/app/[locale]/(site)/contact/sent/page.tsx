import type { Metadata } from "next";
import { SplitText } from "@/components/motion/split-text";
import { BriefSent } from "@/components/sections/brief-sent";
import { SectionLabel } from "@/components/ui/section-label";
import { getDictionary } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

// Its own URL so a sent brief shows up as a page view in analytics on any Vercel plan.
export const generateMetadata = async ({ params }: PageProps<"/[locale]/contact/sent">): Promise<Metadata> => {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return { title: t.meta.sent, robots: { index: false, follow: false } };
};

export default async function BriefSentPage({ params }: PageProps<"/[locale]/contact/sent">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const c = t.contactPage;

  return (
    <section className="shell pt-[calc(var(--header-h)+4rem)] pb-28 md:pt-[calc(var(--header-h)+6rem)] md:pb-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index={0}>{c.sentLabel}</SectionLabel>
          <SplitText as="h1" lines={c.sentTitle} className="display mt-6 text-[clamp(3.2rem,8vw,7rem)]" />
        </div>
        <div className="lg:col-span-7">
          <BriefSent copy={c} locale={locale} newTabLabel={t.common.newTab} />
        </div>
      </div>
    </section>
  );
}
