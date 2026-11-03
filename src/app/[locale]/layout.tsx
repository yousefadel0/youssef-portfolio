import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/analytics";
import { Cursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Logomark } from "@/components/ui/logo";
import { site } from "@/config/site";
import { getDictionary } from "@/content/copy";
import { fontVariables } from "@/lib/fonts";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import "@/styles/globals.css";

export const dynamicParams = false;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({ params }: LayoutProps<"/[locale]">): Promise<Metadata> => {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.homeTitle, template: `%s — ${t.meta.siteName}` },
    description: t.meta.homeDescription,
    applicationName: t.meta.siteName,
    authors: [{ name: site.person.name }],
    creator: site.person.name,
    formatDetection: { telephone: false },
  };
};

export const viewport: Viewport = {
  themeColor: "#F1EADC",
  width: "device-width",
  initialScale: 1,
};

/** Runs before first paint: marks JS as available and skips the intro after the first visit this session. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ya-intro'))d.classList.add('intro-seen');sessionStorage.setItem('ya-intro','1')}catch(e){}})();`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dirOf(locale)} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="grain">
        <div className="loader" aria-hidden>
          <div className="flex items-center justify-between">
            <span className="label">{locale === "ar" ? "بنجهّز" : "Loading build"}</span>
            <span className="label tabular">
              <span className="loader-count" />%
            </span>
          </div>
          <div>
            {/* Drawn mark, not live text: the intro paints instantly without waiting for fonts. */}
            <Logomark size={160} inverse className="size-[clamp(6rem,22vw,13rem)]" />
            <div className="mt-6 h-[3px] w-full bg-bone/15">
              <div className="loader-bar h-full bg-kiln" />
            </div>
          </div>
        </div>
        <SmoothScroll />
        <Cursor locale={locale} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
