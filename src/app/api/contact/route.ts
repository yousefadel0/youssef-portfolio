import { NextResponse } from "next/server";
import { Resend } from "resend";
import { briefSchema, type Brief } from "@/lib/contact-schema";

/** Best-effort per-instance rate limit: 5 briefs per IP per 10 minutes. */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
};

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const render = (b: Brief) => {
  const rows: [string, string][] = [
    ["Project", b.projectTypes.join(", ")],
    ["Budget", b.budget],
    ["Timeline", b.timeline],
    ["Name", b.name],
    ["Business", b.business || "—"],
    ["Contact", b.contact],
    ["Language", b.locale],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${b.details}`;
  const html = `<h2>New project brief</h2><table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${escape(b.details)}</p>`;
  return { text, html };
};

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = briefSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  const brief = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (brief.website) return NextResponse.json({ ok: true });

  const { text, html } = render(brief);
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    console.info(`[contact] New brief (Resend not configured, logging instead)\n${text}`);
    return NextResponse.json({ ok: true, delivered: "console" });
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: brief.contact.includes("@") ? brief.contact : undefined,
      subject: `New brief: ${brief.projectTypes.join(", ")} — ${brief.name}`,
      text,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, delivered: "email" });
  } catch (err) {
    console.error("[contact] Resend failed", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
