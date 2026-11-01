export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "ar" : "en");

/** Prefix an internal path with the locale: href("ar", "/work/tidal") -> "/ar/work/tidal". */
export const href = (locale: Locale, path = "/") => `/${locale}${path === "/" ? "" : path}`;

/** Swap the locale segment of a pathname. */
export const switchLocalePath = (pathname: string, to: Locale) => {
  const parts = pathname.split("/");
  if (parts[1] && isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
};

export type Localized<T> = Record<Locale, T>;
