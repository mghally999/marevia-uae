import { NextResponse } from "next/server";

/**
 * Collects "notify me at launch" signups.
 *
 * Delivery is intentionally provider-agnostic: set `NOTIFY_WEBHOOK_URL` to any
 * endpoint that accepts JSON (Zapier, Make, Airtable, a Slack incoming webhook,
 * your own CRM) and each signup is forwarded there. With no webhook configured
 * the address is logged to the server console so the form still works locally.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Best-effort per-instance throttle. Serverless instances do not share this
 *  map, so treat it as spam friction rather than a hard guarantee. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let email: unknown;
  try {
    ({ email } = (await request.json()) as { email?: unknown });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const payload = {
    email: email.trim().toLowerCase(),
    source: "coming-soon",
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.NOTIFY_WEBHOOK_URL;

  if (!webhook) {
    console.info("[notify] signup (no NOTIFY_WEBHOOK_URL set):", payload);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[notify] failed to forward signup:", error);
    return NextResponse.json(
      { error: "We could not save that just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
