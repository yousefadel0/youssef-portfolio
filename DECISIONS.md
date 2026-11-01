# DECISIONS

Every call I made without asking, and why. Edit anything here through `src/config/site.ts` or the content files.

## Facts and truth

1. **Public name:** "Youssef Adel" (first + father's name, as in the CV file name). Full legal name appears on the CV page and in JSON-LD `alternateName`.
2. **Years:** "Building since 2020" is taken from the CV. I never print a computed "X years" figure in copy except as "since 2020".
3. **No GitHub / LinkedIn / TikTok / Instagram links** exist in the CV. The config has empty strings for them; empty socials are hidden automatically everywhere (footer, /links, JSON-LD `sameAs`).
4. **WhatsApp number** defaults to the phone number in the CV (`201004662467`). Confirm it is the number you use on WhatsApp, or change `whatsapp` in `site.ts`.
5. **Framework names** (Next.js, Flutter, etc.) are not in the CV. They appear only as "the stack of this build" on each case study, taken from the project briefs. The About section uses only the disciplines the CV lists.
6. **The five projects** are labeled "Portfolio build" everywhere. Results are framed as build targets from the briefs (e.g. "Lighthouse 90+ target", "WCAG AA"), not as measured client outcomes, because the builds were not finished when this site was made.
7. **Case-study design systems** (palettes, typefaces) are the planned direction I derived from each brief. Codex may make different choices; update `src/content/projects/<slug>.ts` to match each final build.
8. **No testimonials section.** The CV has none and inventing them is not allowed. The slot is replaced by an honest "how I work" process and the FAQ.

## Business placeholders (edit these)

9. **Prices are placeholders** in `site.ts → pricing`: Launch from EGP 15,000 / USD 450, Growth from EGP 38,000 / USD 1,100, Custom from EGP 75,000 / USD 2,200. Delivery windows (7–10 days, 3–5 weeks, scoped) are also placeholders.
10. **Payment terms** in the FAQ ("50% to start, 50% before launch") and **response time** ("within one working day") are sensible defaults, not facts from the CV. Change them in `src/content/faq/index.ts` and the copy files.
11. **Site URL** defaults to `https://youssefadel.dev` (placeholder). Set `NEXT_PUBLIC_SITE_URL` in Vercel; sitemap, canonical URLs and OG images use it.
12. **Live demo and GitHub URLs** for the five projects are empty, so the site shows "Demo coming soon" / "Code on request" states instead of dead links.

## Technical

13. **Next.js 16.4** (what `create-next-app@latest` installed). I turned **off** `cacheComponents` / `partialPrefetching` from the template: this is a fully static marketing site, and classic `generateStaticParams` + `dynamicParams = false` gives clean 404s with less complexity.
14. **i18n routing:** `/en/...` and `/ar/...`. `src/proxy.ts` sends `/` (and any path without a locale) to Arabic when the browser's first language is Arabic, otherwise English. No i18n library; dictionaries are typed TypeScript objects so a missing Arabic string is a type error.
15. **Root layout lives in `app/[locale]/layout.tsx`** so `<html lang dir>` is correct on the server. Unmatched URLs use `app/global-not-found.tsx` (bilingual, branded).
16. **Fonts:** Bricolage Grotesque (display), Geist (body), Geist Mono (labels), Alexandria (Arabic). Alexandria loads only where Arabic text renders. Case-study pages additionally load each project's own typefaces (`preload: false`), so specimens are real; home-page mockups use fallbacks to stay light.
17. **Digits:** Western digits in Arabic for prices, years and stats (how most Egyptian businesses write prices online); running Arabic prose uses Arabic-Indic digits where it reads more naturally.
18. **Arabic copy** is written in friendly professional Egyptian Arabic (e.g. "عايز تبدأ؟"), not Modern Standard Arabic and not a literal translation.
19. **Loader:** pure CSS (no JS needed), shown once per browser session, skipped with reduced motion. Keeps it from hurting performance or trapping users without JS.
20. **Contact form:** zod on client and server, honeypot field, simple in-memory rate limit, Resend when `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set, otherwise logs the brief to the server console. Every step also offers "send this on WhatsApp instead".
21. **OG images** are generated per page with `next/og`. They are English-only because Satori's Arabic shaping is unreliable; Arabic pages get the same image with the Arabic page title in metadata.
22. **CV download** serves a copy of your CV at `public/cv/youssef-adel-cv.pdf`. The original in `/cv` is untouched; replace the copy when you update the CV.
23. **Custom cursor** only on fine pointers and when reduced motion is off; the native cursor stays on form fields.
24. **No Three.js/WebGL.** It would cost load time on TikTok's in-app browser and the art direction does not need it.

## Performance trade-offs (measured with Lighthouse 12 on the production build)

25. **GSAP and Lenis load after the first scroll, touch, pointer or key event** (`src/lib/gsap.ts`). Every scroll-driven effect needs the visitor to move first, so ~110 KB of animation code never competes with first paint. Cursor and hover-follow effects use small rAF loops instead of GSAP.
26. **Framer Motion is only used by the contact form.** Route transitions and the mobile menu are pure CSS.
27. **Offscreen sections use `content-visibility: auto`**, and ScrollTrigger refreshes when the page height settles.
28. **Only the display font is preloaded**; the loader shows the drawn monogram (not live text) so the intro never waits for fonts. The hero words start their rise already partly visible so the headline paints on the first frame.
29. **Work-index hover previews are typographic posters in each build's colors**, not extra mockups, to keep the HTML payload down. The full code-built mockups appear in the showcase panels and case studies.
30. Results on this machine, from a fresh clone of the repo: desktop Performance 98–100 on every page, Accessibility 100, Best Practices 100, SEO 100. Mobile (simulated slow 4G + 4× CPU): Accessibility / SEO 100, Performance 88–92 on home, Arabic home and /links, ~80 on case studies; observed LCP equals first paint. Device mockups are decorative and hidden from screen readers (`aria-hidden`); the text around them describes each build. The remaining gap is the size of the home page (five code-built device mockups). Re-measure on the deployed Vercel URL with PageSpeed Insights, which is less noisy than a local laptop.

## Repository

31. Pushed to `github.com/yousefadel0/Youssef-portfolio` on top of its existing history. The previous static site (`index.html`, `script.js`, `style.css`, `assets/`) is removed in its own commit, so it can be restored any time from history (`git checkout c31a719 -- .`).
