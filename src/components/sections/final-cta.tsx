import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CropMarks, SectionLabel } from "@/components/ui/section-label";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { mailtoUrl, whatsappUrl } from "@/lib/utils";

export const FinalCta = ({ locale, t, index = 7 }: { locale: Locale; t: Dictionary; index?: number }) => (
  <section aria-labelledby="cta-title" className="cv-auto relative overflow-hidden bg-kiln py-24 text-ink md:py-36">
    <CropMarks />
    <div className="shell">
      <SectionLabel index={index}>{t.cta.label}</SectionLabel>
      <SplitText id="cta-title" lines={t.cta.title} className="display mt-8 text-[clamp(3.4rem,12vw,13rem)]" lineClassNames={[undefined, "md:ps-[14vw]"]} />
      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-5">
          <p className="text-[1.15rem] leading-relaxed">{t.cta.text}</p>
        </Reveal>
        <Reveal className="flex flex-col items-start gap-4 md:col-span-6 md:col-start-7 md:items-end" delay={120}>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <ButtonLink href={whatsappUrl(t.fab.message)} variant="ink" icon="whatsapp" size="lg" newTabLabel={t.common.newTab}>
              {t.cta.primary}
            </ButtonLink>
            <ButtonLink href={href(locale, "/contact")} variant="line" size="lg">
              {t.cta.secondary}
            </ButtonLink>
          </div>
          <p className="text-[0.95rem]">
            {t.cta.email}{" "}
            <a href={mailtoUrl()} className="font-medium underline decoration-1 underline-offset-4 hover:decoration-2">
              {site.person.email}
            </a>
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);
