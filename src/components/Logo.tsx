/**
 * The Ma Revia Marine logo.
 *
 * `MARK_PATH` is a vector trace of the official logo mark from the brand
 * identity sheet — the abstract compass needle, boat silhouette and waves
 * enclosed by a broken ring. Do not hand-edit the path data.
 */

import { MARK_PATH, MARK_VIEWBOX } from "./logo-path";

type MarkProps = {
  className?: string;
  /** Unique per-document id so multiple marks do not share a gradient. */
  gradientId?: string;
  title?: string;
};

export function LogoMark({
  className,
  gradientId = "mrm-gold",
  title,
}: MarkProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={gradientId} x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#F0D89B" />
          <stop offset="28%" stopColor="#D4AF37" />
          <stop offset="55%" stopColor="#C8912E" />
          <stop offset="78%" stopColor="#E3C468" />
          <stop offset="100%" stopColor="#A67C23" />
        </linearGradient>
      </defs>
      <path d={MARK_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  /** Tailwind text size for the primary "MA REVIA" line. */
  primaryClassName?: string;
  secondaryClassName?: string;
};

export function Wordmark({
  className,
  primaryClassName = "text-4xl sm:text-5xl md:text-6xl",
  secondaryClassName = "text-[0.6rem] sm:text-xs",
}: WordmarkProps) {
  return (
    <div className={className}>
      <h1
        className={`gold-metal font-display font-medium uppercase leading-none tracking-[0.14em] ${primaryClassName}`}
      >
        Ma&nbsp;Revia
      </h1>

      {/* "— M A R I N E —" : rule, letterspaced sans, rule */}
      <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
        <span aria-hidden className="hairline h-px w-8 sm:w-12" />
        <span
          className={`font-sans font-light uppercase tracking-[0.52em] text-gold/90 ${secondaryClassName}`}
        >
          <span className="ml-[0.52em]">Marine</span>
        </span>
        <span aria-hidden className="hairline h-px w-8 sm:w-12" />
      </div>
    </div>
  );
}

/** Mark stacked above the wordmark — the primary vertical lockup. */
export function Lockup({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`}>
      <LogoMark
        className="w-28 sm:w-36 md:w-44 drop-shadow-[0_6px_28px_rgba(212,175,55,0.28)]"
        title="Ma Revia Marine"
      />
      <Wordmark className="mt-7 text-center sm:mt-9" />
    </div>
  );
}
