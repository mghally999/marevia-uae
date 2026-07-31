import Countdown from "@/components/Countdown";
import { Lockup } from "@/components/Logo";
import NotifyForm from "@/components/NotifyForm";
import SeaBackdrop from "@/components/SeaBackdrop";
import { site } from "@/lib/site";

/** Small helper so each block fades up in sequence. */
const rise = (delay: number) => ({ animationDelay: `${delay}ms` });

export default function Home() {
  const year = new Date().getFullYear();
  const socials = site.social.filter((s) => s.href);

  return (
    <main className="relative min-h-dvh">
      {/* ---------------------------------------------------------------
          Hero — the backdrop is scoped here so the waves break along the
          bottom of the first screen rather than the bottom of the document.
      --------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-32 pt-20 sm:pb-36">
        <SeaBackdrop />

        <div className="relative z-10 rise" style={rise(0)}>
          <Lockup />
        </div>

        <p
          className="relative z-10 rise mt-12 font-sans text-[0.7rem] font-medium uppercase tracking-[0.42em] text-gold sm:mt-14 sm:text-xs"
          style={rise(200)}
        >
          <span className="ml-[0.42em]">{site.eyebrow}</span>
        </p>

        <h2
          className="relative z-10 rise mt-8 max-w-2xl text-balance text-center font-display text-lg leading-relaxed text-sand sm:text-2xl"
          style={rise(320)}
        >
          {site.tagline}
        </h2>

        <p
          className="relative z-10 rise mt-6 max-w-xl text-pretty text-center font-sans text-sm font-light leading-relaxed text-sage"
          style={rise(420)}
        >
          {site.intro}
        </p>

        {site.launchDate ? (
          <div className="relative z-10 rise mt-12" style={rise(520)}>
            <Countdown launchDate={site.launchDate} />
          </div>
        ) : null}

        <div className="relative z-10 rise mt-12 w-full max-w-md" style={rise(600)}>
          <p className="mb-4 text-center font-sans text-xs uppercase tracking-[0.22em] text-sand/80">
            {site.notify.heading}
          </p>
          <NotifyForm />
        </div>

        {/* Scroll cue */}
        <a
          href="#about"
          aria-label="Read more about Ma Revia Marine"
          className="rise absolute bottom-8 left-1/2 z-10 -translate-x-1/2 p-2 text-sage transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          style={rise(900)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            style={{ animation: "swell 2.6s ease-in-out infinite" }}
            aria-hidden
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      {/* ---------------------------------------------------------------
          Pillars
      --------------------------------------------------------------- */}
      <section
        id="about"
        className="relative z-10 border-t border-sand/10 bg-abyss/70 px-6 py-16 backdrop-blur-sm sm:py-20"
      >
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3 sm:gap-8">
          {site.pillars.map((pillar) => (
            <div key={pillar.label} className="text-center sm:text-left">
              <h3 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-gold">
                {pillar.label}
              </h3>
              <span
                aria-hidden
                className="hairline mx-auto mt-4 block h-px w-10 sm:mx-0"
              />
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-sand/85">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Footer
      --------------------------------------------------------------- */}
      <footer className="relative z-10 border-t border-sand/10 bg-abyss px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-[0.6rem] uppercase tracking-[0.28em] text-sage sm:gap-x-6">
            {site.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>

          <span aria-hidden className="hairline h-px w-full max-w-xs" />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-sans text-sm font-light text-sand/85">
            {site.contact.email ? (
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-gold"
              >
                {site.contact.email}
              </a>
            ) : null}
            {site.contact.phone ? (
              <a
                href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                className="transition-colors hover:text-gold"
              >
                {site.contact.phone}
              </a>
            ) : null}
            {site.contact.location ? (
              <span className="text-sage">{site.contact.location}</span>
            ) : null}
          </div>

          {socials.length ? (
            <div className="flex items-center gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.6rem] uppercase tracking-[0.28em] text-sage transition-colors hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          ) : null}

          <p className="font-sans text-[0.65rem] tracking-wider text-sage/70">
            © {year} {site.legalName}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
