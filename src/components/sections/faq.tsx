import { SplitText } from "@/components/motion/split-text";
import { SectionLabel } from "@/components/ui/section-label";
import type { Dictionary } from "@/content/copy";
import { faq } from "@/content/faq";
import type { Locale } from "@/lib/i18n";
import { FaqList } from "./faq-list";

export const Faq = ({ locale, t }: { locale: Locale; t: Dictionary }) => (
  <section id="faq" aria-labelledby="faq-title" className="cv-auto relative scroll-mt-16 py-24 md:py-36">
    <div className="shell grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <SectionLabel index={6}>{t.faq.label}</SectionLabel>
          <SplitText id="faq-title" lines={t.faq.title} className="display mt-6 text-[clamp(2.6rem,5.5vw,5.5rem)]" />
        </div>
      </div>
      <div className="lg:col-span-7">
        <FaqList items={faq[locale]} />
      </div>
    </div>
  </section>
);
