/**
 * Single source of truth for every editable string on the coming-soon page.
 *
 * ⚠️  PLACEHOLDERS: `contact` and `social` are taken from the mockups on the
 * brand sheet and have NOT been confirmed. Replace them with the real details
 * before launch — anything left blank is simply not rendered.
 */

export const site = {
  name: "Ma Revia",
  legalName: "Ma Revia Marine",
  wordmark: { primary: "Ma Revia", secondary: "Marine" },

  domain: "mareviauae.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mareviauae.com",

  eyebrow: "Coming Soon",

  /* "OUR ESSENCE" from the brand sheet */
  tagline: "We live for the sea and everything it connects.",

  intro:
    "A new standard in premium marine services is being prepared. Ma Revia Marine is charting its course — precision, reliability and craft, from the first mooring to the open water.",

  /* "OUR VALUES" from the brand sheet */
  values: ["Safety", "Integrity", "Innovation", "Passion", "Excellence"],

  /* The three brand pillars, verbatim from the brand sheet */
  pillars: [
    {
      label: "Our Mission",
      body: "To deliver premium marine solutions with precision and reliability.",
    },
    {
      label: "Our Vision",
      body: "To be a trusted global leader in the marine industry.",
    },
    {
      label: "Beyond Limits",
      body: "We navigate today for a better tomorrow.",
    },
  ],

  notify: {
    heading: "Be the first to come aboard",
    body: "Leave your email and we will let you know the moment we launch.",
    placeholder: "you@company.com",
    cta: "Notify Me",
    success: "You are on the list. We will be in touch.",
  },

  /**
   * Launch date for the countdown, as an ISO 8601 string.
   * Set to `null` to hide the countdown entirely (the default).
   * Example: "2026-10-01T09:00:00+04:00"
   */
  launchDate: (process.env.NEXT_PUBLIC_LAUNCH_DATE ?? null) as string | null,

  /* ⚠️ Placeholders — confirm before launch. Blank values are not rendered. */
  contact: {
    email: "info@mareviauae.com",
    phone: "",
    location: "United Arab Emirates",
  } as { email: string; phone: string; location: string },

  /* ⚠️ Placeholders — add real profile URLs, or leave blank to hide. */
  social: [
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
  ] as { label: string; href: string }[],
} as const;

export type Site = typeof site;
