"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setStatus("done");
      setMessage(site.notify.success);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  if (status === "done") {
    return (
      <p
        role="status"
        className="flex items-center justify-center gap-2.5 font-sans text-sm text-sand"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-gold" aria-hidden>
          <path
            d="M4 10.5l4 4 8-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="notify-email" className="sr-only">
          Email address
        </label>
        <input
          id="notify-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder={site.notify.placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          aria-invalid={status === "error"}
          aria-describedby={message ? "notify-message" : undefined}
          disabled={status === "sending"}
          className="h-12 min-w-0 flex-1 rounded-sm border border-sand/25 bg-navy/50 px-4 font-sans text-sm text-sand tracking-wide outline-none transition placeholder:text-sage focus:border-gold/70 focus:ring-1 focus:ring-gold/40 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-12 shrink-0 cursor-pointer rounded-sm border border-gold/70 bg-gold/10 px-7 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : site.notify.cta}
        </button>
      </div>

      <p
        id="notify-message"
        role={status === "error" ? "alert" : "status"}
        className={`mt-3 min-h-5 font-sans text-xs ${
          status === "error" ? "text-[#E2A0A0]" : "text-sage"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
