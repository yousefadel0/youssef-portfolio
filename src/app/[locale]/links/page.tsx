import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, ArrowUpRightIcon, DownloadIcon, MailIcon, socialIcons, WhatsAppIcon } from "@/components/ui/icons";
import { LangSwitch } from "@/components/ui/lang-switch";
import { Logomark, Wordmark } from "@/components/ui/logo";
import { activeSocials, site } from "@/config/site";
import { getDictionary } from "@/content/copy";
import { projects } from "@/content/projects";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { cn, mailtoUrl, pad, whatsappUrl } from "@/lib/utils";

export const generateMetadata = async ({ params }: PageProps<"/[locale]/links">): Promise<Metadata> => {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return pageMetadata({ locale: locale as Locale, path: "/links", title: t.meta.links, description: t.meta.linksDescription });
};

/** Link-in-bio hub for the TikTok profile: big thumb targets, the work in a swipeable strip. */
export default async function LinksPage({ params }: PageProps<"/[locale]/links">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const l = t.linksPage;

  const rows = [
    { label: l.brief, href: href(locale, "/contact"), icon: ArrowIcon, tone: "ink" },
    { label: l.work, href: `${href(locale)}#work`, icon: ArrowIcon, tone: "line" },
    { label: l.pricing, href: `${href(locale)}#pricing`, icon: ArrowIcon, tone: "line" },
    { label: l.services, href: href(locale, "/services"), icon: ArrowIcon, tone: "line" },
    { label: l.cv, href: site.cv.file, icon: DownloadIcon, tone: "line", download: site.cv.fileName },
    { label: l.email, href: mailtoUrl(), icon: MailIcon, tone: "line" },
  ] as const;

  return (
    <main id="main" className="relative min-h-[100svh] overflow-hidden">
      <div className="mx-auto flex max-w-lg flex-col px-4 pt-6 pb-14 sm:px-6">
        <div className="flex items-center justify-between">
          <span className="label">{locale === "ar" ? "القاهرة · مصر" : `${site.person.city} · ${site.person.country}`}</span>
          <LangSwitch locale={locale} label={t.nav.switchTo} ariaLabel={t.nav.switchLabel} />
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <div className="relative">
            <Logomark size={96} />
            <span aria-hidden className="absolute -end-2 -bottom-2 flex size-5 items-center justify-center rounded-full bg-bone">
              <span className="size-3 rounded-full bg-[#2f9e5b] motion-safe:animate-pulse" />
            </span>
          </div>
          <h1 className="mt-6">
            <Wordmark locale={locale} className="text-[clamp(2.6rem,12vw,3.6rem)]" />
          </h1>
          <p className="mt-3 max-w-xs text-[1.05rem] text-smoke">{l.hello}</p>
          <p className="label mt-3 flex items-center gap-2 text-smoke">
            {t.hero.kicker}
          </p>
        </div>

        <a
          href={whatsappUrl(t.fab.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 flex h-[4.5rem] items-center justify-between gap-4 bg-kiln px-6 text-[1.08rem] font-semibold text-ink transition-transform active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <WhatsAppIcon size={24} />
            {l.whatsapp}
          </span>
          <ArrowUpRightIcon className="transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          <span className="sr-only">{t.common.newTab}</span>
        </a>

        <ul className="mt-3 space-y-3">
          {rows.map((r) => {
            const Icon = r.icon;
            const cls = cn(
              "group flex h-16 items-center justify-between gap-4 px-6 text-[1.02rem] font-medium transition-[background-color,color,transform] duration-300 active:scale-[0.98]",
              r.tone === "ink" ? "bg-ink text-bone hover:bg-nile" : "border border-ink hover:bg-ink hover:text-bone",
            );
            const inner = (
              <>
                {r.label}
                <Icon size={18} className="transition-transform duration-500 ease-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </>
            );
            return (
              <li key={r.label}>
                {r.href.startsWith("/") && !("download" in r) ? (
                  <Link href={r.href} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <a href={r.href} className={cls} {...("download" in r ? { download: r.download } : {})}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <section aria-labelledby="links-work" className="mt-12">
          <h2 id="links-work" className="label mb-4 text-smoke">
            {l.workTitle}
          </h2>
          <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6" dir={locale === "ar" ? "rtl" : "ltr"}>
            {projects.map((p) => (
              <li key={p.slug} className="w-[72%] shrink-0 snap-start">
                <Link href={site.projects[p.slug].liveUrl || href(locale, `/demo/${p.slug}`)} className="block h-44 p-5" style={{ background: p.theme.bg, color: p.theme.fg }}>
                  <span className="label tabular flex items-center justify-between gap-2" style={{ color: p.theme.muted }}>
                    <span>
                      {pad(p.index)} · {p.copy[locale].type}
                    </span>
                    <span className="shrink-0 px-1.5 py-0.5" style={{ background: p.theme.accent, color: p.theme.onAccent }}>
                      {t.work.liveBadge}
                    </span>
                  </span>
                  <span className="headline mt-12 block text-[2.1rem]" dir="ltr">
                    <span className="block w-fit max-w-full rtl:ms-auto">{p.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {activeSocials.length > 0 ? (
          <ul className="mt-8 flex justify-center gap-3">
            {activeSocials.map(([name, url]) => {
              const Icon = socialIcons[name];
              return (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="grid size-12 place-items-center border border-ink hover:bg-ink hover:text-bone">
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}

        <Link href={href(locale)} className="label mx-auto mt-12 inline-flex items-center gap-2 border-b border-ink pb-1">
          {l.site}
          <ArrowIcon size={14} />
        </Link>
      </div>
    </main>
  );
}
