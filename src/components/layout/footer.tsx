import Link from "next/link";
import { Wordmark } from "@/components/ui/logo";
import { ArrowUpRightIcon, socialIcons, socialNames } from "@/components/ui/icons";
import { Year } from "@/components/layout/year";
import { activeSocials, site } from "@/config/site";
import type { Dictionary } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { mailtoUrl, whatsappUrl } from "@/lib/utils";

export const Footer = ({ locale, t }: { locale: Locale; t: Dictionary }) => {
  const home = href(locale);
  const pages = [
    { label: t.nav.work, href: `${home}#work` },
    { label: t.nav.services, href: href(locale, "/services") },
    { label: t.nav.pricing, href: `${home}#pricing` },
    { label: t.nav.contact, href: href(locale, "/contact") },
    { label: t.nav.cv, href: href(locale, "/cv") },
    { label: t.meta.links, href: href(locale, "/links") },
  ];

  return (
    <footer className="cv-auto relative overflow-hidden bg-ink pb-24 text-bone md:pb-0">
      <div className="shell grid gap-12 pt-20 pb-12 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <p className="headline max-w-[14ch] text-[clamp(2rem,4vw,3.25rem)]">{t.footer.tagline}</p>
          <p className="mt-6 max-w-sm text-ash">{t.footer.builtNote}</p>
        </div>

        <nav aria-label={t.footer.navTitle} className="md:col-span-2 md:col-start-7">
          <p className="label mb-5 text-ash">{t.footer.navTitle}</p>
          <ul className="space-y-2.5">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="transition-colors hover:text-kiln">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label mb-5 text-ash">{t.footer.contactTitle}</p>
          <ul className="space-y-2.5">
            <li>
              <a href={whatsappUrl(t.fab.message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-kiln">
                WhatsApp <ArrowUpRightIcon size={14} />
              </a>
            </li>
            <li>
              <a href={mailtoUrl()} className="break-all transition-colors hover:text-kiln">
                {site.person.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.person.phone.replace(/\s/g, "")}`} dir="ltr" className="tabular transition-colors hover:text-kiln">
                {site.person.phone}
              </a>
            </li>
          </ul>
          {activeSocials.length > 0 ? (
            <>
              <p className="label mt-8 mb-4 text-ash">{t.footer.socialTitle}</p>
              <ul className="flex gap-3">
                {activeSocials.map(([name, url]) => {
                  const Icon = socialIcons[name];
                  return (
                    <li key={name}>
                      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={socialNames[name]} className="grid size-11 place-items-center border border-line-light transition-colors hover:border-kiln hover:text-kiln">
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>
      </div>

      <div className="shell" aria-hidden>
        <Wordmark locale={locale} className="block w-full text-[clamp(4rem,17.5vw,20rem)] leading-[0.8] text-bone/95" />
      </div>

      <div className="shell flex flex-col gap-3 border-t border-line-light py-6 text-sm text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <Year /> {locale === "ar" ? site.person.nameAr : site.person.name}. {t.footer.rights}
        </p>
        <p className="label">
          {site.person.city}, {site.person.country} · 30.04°N 31.24°E
        </p>
      </div>
    </footer>
  );
};
