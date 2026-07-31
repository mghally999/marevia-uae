/**
 * Ambient background: deep-water gradient, a compass-rose motif echoing the
 * logo construction grid, and three drifting wave layers.
 *
 * Everything here is decorative and animation is CSS-only, so the whole
 * component renders on the server with no client JS.
 */

/** One 1200-unit wave period, repeated twice across a 2400-unit viewBox so a
 *  -50% translate loops seamlessly. */
function wavePath(baseline: number, amplitude: number, filled: boolean) {
  const a = amplitude;
  const y = baseline;
  const curve =
    `M0 ${y}` +
    `C150 ${y - a} 450 ${y - a} 600 ${y}` +
    `C750 ${y + a} 1050 ${y + a} 1200 ${y}` +
    `C1350 ${y - a} 1650 ${y - a} 1800 ${y}` +
    `C1950 ${y + a} 2250 ${y + a} 2400 ${y}`;
  return filled ? `${curve}L2400 320L0 320Z` : curve;
}

type WaveLayerProps = {
  baseline: number;
  amplitude: number;
  fill: string;
  opacity: number;
  animation: string;
  crest?: boolean;
};

function WaveLayer({
  baseline,
  amplitude,
  fill,
  opacity,
  animation,
  crest,
}: WaveLayerProps) {
  return (
    <div className={`absolute inset-x-0 bottom-0 w-[200%] ${animation}`}>
      <svg
        viewBox="0 0 2400 320"
        preserveAspectRatio="none"
        className="h-[30vh] min-h-48 w-full"
      >
        <path d={wavePath(baseline, amplitude, true)} fill={fill} opacity={opacity} />
        {crest ? (
          <path
            d={wavePath(baseline, amplitude, false)}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.2"
            opacity="0.35"
          />
        ) : null}
      </svg>
    </div>
  );
}

export default function SeaBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep-water vertical gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#061320_0%,#0A1D2F_42%,#13323F_100%)]" />

      {/* Warm gold light bloom behind the lockup */}
      <div
        className="absolute left-1/2 top-[30%] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.20) 0%, rgba(212,175,55,0.07) 42%, transparent 70%)",
          animation: "glow-pulse 9s ease-in-out infinite",
        }}
      />

      {/* Compass-rose rings — the logo construction grid, very faint */}
      <svg
        viewBox="0 0 400 400"
        className="absolute left-1/2 top-[30%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] sm:h-[44rem] sm:w-[44rem]"
      >
        <g fill="none" stroke="#C8B69A" strokeWidth="0.5">
          <circle cx="200" cy="200" r="196" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="104" strokeDasharray="1 5" />
          <line x1="200" y1="4" x2="200" y2="396" />
          <line x1="4" y1="200" x2="396" y2="200" />
          <line x1="61" y1="61" x2="339" y2="339" strokeDasharray="1 7" />
          <line x1="339" y1="61" x2="61" y2="339" strokeDasharray="1 7" />
        </g>
      </svg>

      {/* Drifting sea. Baselines sit low in the viewBox so the waterline
          breaks near the bottom of the screen and never crosses the content. */}
      <WaveLayer
        baseline={210}
        amplitude={24}
        fill="#54797A"
        opacity={0.14}
        animation="animate-drift-slow"
      />
      <WaveLayer
        baseline={246}
        amplitude={20}
        fill="#13323F"
        opacity={0.7}
        animation="animate-drift-mid"
        crest
      />
      <WaveLayer
        baseline={276}
        amplitude={16}
        fill="#061320"
        opacity={0.9}
        animation="animate-drift-fast"
      />

      {/* Vignette to settle the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,19,32,0.75)_100%)]" />
    </div>
  );
}
