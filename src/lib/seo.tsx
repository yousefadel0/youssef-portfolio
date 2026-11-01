import type { Metadata } from "next";
import { activeSocials, site } from "@/config/site";
import type { Dictionary } from "@/content/copy";
import { locales, type Locale } from "@/lib/i18n";

const abs = (path: string) => new URL(path, site.url).toString();

/** Canonical + hreflang + Open Graph for one page in one locale. */
export const pageMetadata = ({ locale, path = "", title, description }: { locale: Locale; path?: string; title: string; description: string }): Metadata => {
  const languages = Object.fromEntries(locales.map((l) => [l, abs(`/${l}${path}`)]));
  return {
    title,
    description,
    alternates: {
      canonical: abs(`/${locale}${path}`),
      languages: { ...languages, "x-default": abs(`/en${path}`) },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: abs(`/${locale}${path}`),
      siteName: site.person.name,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
    },
    twitter: { card: "summary_large_image", title, description },
  };
};

/** JSON-LD for the home page: the person and the service they sell, with the three packages as offers. */
export const homeJsonLd = (locale: Locale, t: Dictionary) => {
  const personId = abs("/#person");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.person.name,
        alternateName: [site.person.fullName, site.person.nameAr],
        jobTitle: site.person.jobTitle,
        email: `mailto:${site.person.email}`,
        telephone: site.person.phone,
        url: abs(`/${locale}`),
        image: abs("/images/logomark.svg"),
        address: { "@type": "PostalAddress", addressLocality: site.person.city, addressCountry: "EG" },
        knowsLanguage: ["ar", "en"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "Modern Academy" },
        knowsAbout: ["Full-stack web development", "AI and LLM integration", "Networking", "Cybersecurity", "Digital marketing"],
        ...(activeSocials.length ? { sameAs: activeSocials.map(([, url]) => url) } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": abs("/#service"),
        name: `${site.person.name} — ${locale === "ar" ? "تطوير مواقع وتطبيقات" : "Web & app development"}`,
        description: t.meta.homeDescription,
        url: abs(`/${locale}`),
        provider: { "@id": personId },
        areaServed: ["EG", "Worldwide"],
        telephone: site.person.phone,
        address: { "@type": "PostalAddress", addressLocality: site.person.city, addressCountry: "EG" },
        serviceType: ["Website development", "E-commerce development", "Booking systems", "Admin dashboards", "Mobile app development"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.pricing.label,
          itemListElement: (["launch", "growth", "custom"] as const).map((id) => ({
            "@type": "Offer",
            name: t.pricing.packages[id].name,
            description: t.pricing.packages[id].for,
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: site.pricing.packages[id].EGP,
              priceCurrency: "EGP",
            },
          })),
        },
      },
    ],
  };
};

export const JsonLd = ({ data }: { data: object }) => (
  // JSON-LD must be inline; content is our own static data, escaped for "<".
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
);
