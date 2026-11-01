import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { getDictionary } from "@/content/copy";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function SiteLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <a href="#main" className="fixed start-3 top-3 z-[70] -translate-y-24 bg-ink px-4 py-3 text-bone transition-transform focus:translate-y-0">
        {t.nav.skip}
      </a>
      <Header locale={locale} t={{ nav: t.nav, fab: t.fab }} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} t={t} />
      <WhatsAppFab t={t} />
    </>
  );
}
