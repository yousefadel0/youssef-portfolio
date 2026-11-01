# BRAND — youssef adel.

A one-person build studio from Cairo. The brand is a name with a full stop: the work is done, it shipped.

## Marks

| Asset | File | Notes |
| --- | --- | --- |
| Logomark | `brand/logomark.svg` | A "Y" drawn as three square-capped strokes on an ink tile, with a kiln-orange square as the full stop. Used as favicon (`src/app/icon.svg`) and avatar. |
| Logomark (kiln) | `brand/logomark-kiln.svg` | Inverse for orange backgrounds. |
| Wordmark | `brand/wordmark.svg` | `youssef adel` in Bricolage Grotesque 800, lowercase, tight tracking, kiln square period. In the site it is live text (`src/components/ui/logo.tsx`) so it stays sharp and translatable. |
| Arabic wordmark | live text | `يوسف عادل` in Alexandria 800 with the same kiln square. |
| OG / social image | generated | `src/lib/og.tsx` renders every page's preview with `next/og` (1200×630). |
| Apple touch icon | generated | `src/app/apple-icon.tsx`. |

Clear space: one full-stop square on every side. Minimum logomark size: 20px.

## Palette

| Name | Hex | Role |
| --- | --- | --- |
| Ink | `#131210` | Text, dark blocks |
| Bone | `#F1EADC` | Paper background |
| Paper | `#F8F4EC` | Raised surfaces |
| Kiln | `#FF5A1F` | Signal: CTAs, highlights, the full stop |
| Nile | `#0E3A34` | Deep green blocks |
| Smoke | `#5B554C` | Secondary text |

Ink text on kiln, never bone on kiln.

## Type

- Bricolage Grotesque (display, Latin) · Geist (body) · Geist Mono (labels)
- Alexandria (Arabic display and body). Chosen because it is a beautiful variable Arabic face with a matching Latin, and it carries an Egyptian name.

## Voice

**Who's talking:** one builder, first person, plain words. Confident because the work is visible, not because of adjectives.

- Short sentences. One idea each.
- Talk about the customer's business, not about technology.
- Specific beats impressive: "Your menu, prices and booking on one page" beats "cutting-edge digital solutions".
- Never claim clients, numbers or awards that are not in the CV.
- Arabic is Egyptian-friendly and professional: "خليني أبنيهولك" not "دعني أقوم ببنائه لك".

| Say | Don't say |
| --- | --- |
| I build websites and apps that sell. | Revolutionary digital experiences. |
| You'll know the price before we start. | Competitive pricing available. |
| Portfolio build. | Client project (unless it was one). |
| عايز تبدأ؟ كلمني واتساب. | تواصل معنا للاستفسار. |

## Taglines

- EN: "Websites and apps for people starting something."
- AR: "مواقع وتطبيقات لكل حد بيبدأ حاجة جديدة."
