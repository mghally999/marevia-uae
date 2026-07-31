# Ma Revia Marine — Coming Soon

The holding page for **Ma Revia Marine**, built to the official brand identity:
navy and gold palette, Cinzel and Montserrat typography, and the logo mark
rendered as scalable vector artwork.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

---

## Editing the content

**Nearly everything you would want to change lives in one file:
[`src/lib/site.ts`](src/lib/site.ts)** — the tagline, the intro paragraph, the
mission/vision/beyond-limits pillars, the values list, the notify-form copy and
the contact details.

> ⚠️ **Before launch:** the `contact` and `social` values are placeholders taken
> from the mockups on the brand sheet and have **not** been confirmed. Replace
> them with the real email, phone and profile URLs. Any field left as an empty
> string is simply not rendered, so blank one out to hide it.

### Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. All are optional
except the site URL, which should be set in production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, Open Graph tags, `sitemap.xml` and `robots.txt`. |
| `NEXT_PUBLIC_LAUNCH_DATE` | ISO 8601 date. When set, a live countdown appears above the signup form. Leave unset to hide it. |
| `NOTIFY_WEBHOOK_URL` | Where email signups are forwarded. See below. |

### Collecting email signups

`POST /api/notify` validates the address, applies a light per-IP rate limit,
then forwards `{ email, source, submittedAt }` as JSON to `NOTIFY_WEBHOOK_URL`.

That can be any endpoint accepting a JSON POST — Zapier, Make, an Airtable
automation, a Slack incoming webhook, or your own CRM. **With no webhook set,
signups are written to the server console instead**, so the form still works in
development but nothing is stored. Set the webhook before launch or the
addresses will be lost.

---

## The logo

`src/components/logo-path.ts` holds a vector trace of the official logo mark
taken from `brand/marevia-brand-identity.jpeg`. It is generated artwork —
**do not hand-edit the path data.** If the designer provides a proper vector
file (`.svg`, `.ai`, `.eps`), replace `MARK_PATH` with the path from that file
instead; it will be cleaner than a trace.

The wordmark is set in live text, not an image, so it stays crisp and
selectable: "Ma Revia" in Cinzel and the rule-flanked "Marine" in Montserrat,
matching the brand lockup.

`src/components/Logo.tsx` exports three pieces:

- `LogoMark` — the mark on its own, with the metallic gold gradient
- `Wordmark` — the two-line type lockup
- `Lockup` — the mark stacked above the wordmark (used on the page)

---

## Brand reference

| Token | Hex | Tailwind class |
| --- | --- | --- |
| Navy | `#0A1D2F` | `navy` |
| Deep teal | `#13323F` | `deep` |
| Sage | `#54797A` | `sage` |
| Sand | `#C8B69A` | `sand` |
| Gold | `#D4AF37` | `gold` |

Typography: **Cinzel** (primary, `font-display`) and **Montserrat**
(secondary, `font-sans`), both loaded via `next/font`.

The palette and font tokens are defined in the `@theme` block at the top of
[`src/app/globals.css`](src/app/globals.css). The original brand sheet is kept
in [`brand/`](brand/) for reference.

---

## Project layout

```
src/
  app/
    page.tsx              the coming-soon page
    layout.tsx            fonts + site metadata
    globals.css           brand tokens, keyframes, utilities
    icon.svg              favicon (generated from the mark)
    apple-icon.png        touch icon
    opengraph-image.tsx   social share image, rendered at build time
    robots.ts, sitemap.ts
    api/notify/route.ts   email signup endpoint
  components/
    Logo.tsx              mark, wordmark and lockup
    logo-path.ts          traced vector path (generated)
    SeaBackdrop.tsx       gradient, compass rings and drifting waves
    NotifyForm.tsx        email capture
    Countdown.tsx         optional launch countdown
  lib/site.ts             <- all editable copy
  assets/fonts/           TTFs used to render the Open Graph image
brand/                    original brand identity artwork
```

---

## Notes

- The page is fully static apart from `/api/notify`, so it is cheap to host
  anywhere that runs Next.js. Deploying to Vercel needs no extra configuration —
  set the environment variables in the project settings.
- All animation is CSS-only and honours `prefers-reduced-motion`.
- The Open Graph image is generated at build time from the real brand fonts in
  `src/assets/fonts/` — check it at `/opengraph-image`.
