"use client";

import { useSyncExternalStore } from "react";

/**
 * A one-second clock exposed as an external store. Using
 * `useSyncExternalStore` keeps the server and client markup in agreement
 * without setting state from inside an effect.
 */
let cachedNow = typeof window === "undefined" ? 0 : Date.now();

function subscribe(onChange: () => void) {
  cachedNow = Date.now();
  const id = setInterval(() => {
    cachedNow = Date.now();
    onChange();
  }, 1000);
  return () => clearInterval(id);
}

const getSnapshot = () => cachedNow;
const getServerSnapshot = () => 0;

export default function Countdown({ launchDate }: { launchDate: string }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const target = new Date(launchDate).getTime();

  // Nothing to show before hydration, for an unparseable date, or once the
  // launch moment has passed.
  const ms = target - now;
  if (now === 0 || Number.isNaN(target) || ms <= 0) return null;

  const total = Math.floor(ms / 1000);
  const cells: [number, string][] = [
    [Math.floor(total / 86400), "Days"],
    [Math.floor(total / 3600) % 24, "Hours"],
    [Math.floor(total / 60) % 60, "Minutes"],
    [total % 60, "Seconds"],
  ];

  return (
    <div className="flex items-start justify-center gap-5 sm:gap-8">
      {cells.map(([value, label]) => (
        <div key={label} className="flex w-16 flex-col items-center sm:w-20">
          <span className="font-display text-3xl tabular-nums text-sand sm:text-4xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-2 font-sans text-[0.55rem] uppercase tracking-[0.28em] text-sage sm:text-[0.65rem]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
