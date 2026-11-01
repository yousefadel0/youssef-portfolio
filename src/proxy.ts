import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"];

/** Sends any path without a locale to /ar or /en, based on the browser's first language. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const first = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  const locale = first.startsWith("ar") ? "ar" : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|icon|apple-icon|manifest|robots|sitemap|cv/|fonts/|images/|og/|videos/|.*\..*).*)"],
};
