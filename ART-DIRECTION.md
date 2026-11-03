# ART DIRECTION — "The Build Sheet"

## The one idea

Every page is a **build sheet**: the paperwork an engineer pins to the wall while making something real. Work orders are numbered, dimensions are annotated, things get stamped **SHIPPED**. That language is set in huge, confident display type on warm paper, then interrupted by solid blocks of kiln orange and Nile green.

Why this idea:

- It is honest. Youssef builds things; the site looks like the workshop, not like a gallery of mood images.
- It fits the CV: engineering, shipping, systems thinking. Annotation lines and layered diagrams come naturally.
- It sells to business owners. Work orders, delivery times and "what I need from you" lists read as reliable, not arty.
- It is distinct on TikTok. Warm paper + orange + green does not look like any default template.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#131210` | Text, dark sections, frames |
| `bone` | `#F1EADC` | Page background ("paper") |
| `paper` | `#F8F4EC` | Raised surfaces on bone |
| `kiln` | `#FF5A1F` | Signal: primary CTAs, highlights, the big closing block |
| `nile` | `#0E3A34` | Deep green color blocks (about, services detail) |
| `smoke` | `#5B554C` | Secondary text on bone (6.1:1) |
| `line` | `rgba(19,18,16,.14)` | Rules, grid lines, annotation strokes |

Contrast rules (WCAG AA): ink on kiln 6.0:1, ink on bone 15:1, bone on nile 10.4:1, bone on ink 15:1. **Never bone text on kiln** (2.6:1). Kiln on nile only at 24px+.

## Type

- **Display (Latin):** Bricolage Grotesque, 700–800, tracking −0.045em, line-height 0.86–0.92. Used huge: 14–22vw on hero, 9–12vw section titles.
- **Body (Latin):** Geist, 400/500, 16–19px, line-height 1.55.
- **Labels:** Geist Mono, uppercase, 11–12px, tracking 0.08em. Work-order numbers, metadata, annotations.
- **Arabic (display + body):** Alexandria, a variable Arabic/Latin face named after the Egyptian city. 700–800 for display (line-height 1.2, no negative tracking), 400 for body (line-height 1.8).

## Motion principles

1. **Things are built, not faded.** Words rise out of a mask line by line; blocks wipe in like panels being placed.
2. **Easing:** `expo-out cubic-bezier(.16,1,.3,1)` for reveals, `quart-in-out cubic-bezier(.76,0,.24,1)` for curtains and route transitions, 180ms ease for micro-interactions.
3. **Durations:** 0.9–1.1s reveals, 0.6s route curtain, stagger 60ms per word.
4. **Scroll is the timeline:** pinned process track, stacked work orders, parallax mockups. Scroll position maps to progress, never to random decoration.
5. **Direction-aware:** horizontal motion mirrors in RTL.
6. **Reduced motion:** all transforms off, content visible instantly, Lenis disabled, loader skipped.
7. Only `transform` and `opacity` animate. 60fps or it does not ship.

## Layout rules

- 12-column grid on desktop, 4 on mobile; gutters `clamp(16px, 4vw, 56px)`.
- Every section starts with a work-order label (`WO—03 / Process`) pinned to the start edge.
- One element per section deliberately breaks the grid: an oversized number, a headline that bleeds off the edge, a mockup overlapping the next section.
- At least one color block per screen of scroll. Bone → ink → kiln → bone → nile → kiln.
- Asymmetry by default: text blocks sit on 7/12 or 5/12, never a centered column of three cards.
- Crop marks and dimension lines are the only ornaments.
- Mobile-first: the WhatsApp action is always one thumb-tap away (fixed bottom bar on phones).

## Do

- Write like a person: short sentences, specific nouns.
- Use real numbers only when the CV supports them (since 2020, 5 builds, 2 languages).
- Build device mockups in code, in each project's own palette.
- Give Arabic its own line-height and letter-spacing, not the Latin ones.

## Don't

- No gradient blobs, glassmorphism, emoji, stock photos, lorem ipsum, gray boxes.
- No three identical cards in a row.
- No skill-percentage bars or invented stats.
- No bone text on kiln.
- No letter-by-letter animation in Arabic (it breaks joining); animate by word.
