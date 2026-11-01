import type { Metadata } from "next";
import Link from "next/link";
import { Logomark } from "@/components/ui/logo";
import ar from "@/content/copy/ar";
import en from "@/content/copy/en";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "404 — Youssef Adel",
  description: en.notFound.text,
};

/** Unmatched URLs have no locale, so this page speaks both languages. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="grain bg-bone text-ink">
        <main className="shell flex min-h-[100svh] flex-col justify-between py-8">
          <Link href="/en" className="flex items-center gap-3" aria-label={en.nav.home}>
            <Logomark size={36} />
          </Link>

          <div className="grid gap-12 py-16 lg:grid-cols-12 lg:items-end">
            <p className="display text-[clamp(8rem,34vw,30rem)] leading-[0.75] lg:col-span-7" aria-hidden>
              4<span className="text-kiln">0</span>4
            </p>
            <div className="space-y-10 lg:col-span-5">
              <section>
                <h1 className="headline text-[clamp(2rem,4vw,3.4rem)]">{en.notFound.title}</h1>
                <p className="mt-3 max-w-md text-smoke">{en.notFound.text}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/en" className="inline-flex h-12 items-center bg-ink px-5 font-medium text-bone hover:bg-kiln hover:text-ink">
                    {en.notFound.home}
                  </Link>
                  <Link href="/en#work" className="inline-flex h-12 items-center border border-ink px-5 font-medium hover:bg-ink hover:text-bone">
                    {en.notFound.work}
                  </Link>
                </div>
              </section>
              <section lang="ar" dir="rtl" className="border-t border-ink pt-8 font-[family-name:var(--font-alexandria)]">
                <h2 className="text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.25] font-extrabold">{ar.notFound.title}</h2>
                <p className="mt-3 max-w-md leading-[1.8] text-smoke">{ar.notFound.text}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/ar" className="inline-flex h-12 items-center bg-ink px-5 font-medium text-bone hover:bg-kiln hover:text-ink">
                    {ar.notFound.home}
                  </Link>
                  <Link href="/ar#work" className="inline-flex h-12 items-center border border-ink px-5 font-medium hover:bg-ink hover:text-bone">
                    {ar.notFound.work}
                  </Link>
                </div>
              </section>
            </div>
          </div>

          <p className="label text-smoke">WO—404 · This page didn&apos;t ship · الصفحة دي متشحنتش</p>
        </main>
      </body>
    </html>
  );
}
