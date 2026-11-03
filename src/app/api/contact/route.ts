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

/** wa.me link; local Egyptian numbers (01…) get the 20 country code, "00" prefixes are dropped. */
const whatsapp = (phone: string) => {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  else if (/^01\d{9}$/.test(d)) d = `2${d}`;
  return `https://wa.me/${d}`;
};

const render = (b: Brief) => {
  const wa = whatsapp(b.phone);
  const rows: [string, string][] = [
    ["Project", b.projectTypes.join(", ")],
    ["Budget", b.budget],
    ["Timeline", b.timeline],
    ["Name", b.name],
    ["Business", b.business || "—"],
    ["Phone", b.phone],
    ["Email", b.email || "—"],
    ["Language", b.locale],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\nWhatsApp: ${wa}\n\n${b.details}`;
  const table = rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v)}</td></tr>`).join("");
  const html = `<h2>New project brief</h2><table>${table}<tr><td><b>WhatsApp</b></td><td><a href="${wa}">Chat on WhatsApp</a></td></tr></table><p style="white-space:pre-wrap">${escape(b.details)}</p>`;
  // Telegram's HTML mode: bold labels, no tables.
  const telegram = `<b>New project brief</b>\n\n${rows.map(([k, v]) => `<b>${k}:</b> ${escape(v)}`).join("\n")}\n\n${escape(b.details)}`;
  return { text, html, telegram, wa };
};

type Rendered = ReturnType<typeof render>;

const sendEmail = async (key: string, to: string, brief: Brief, { text, html }: Rendered) => {
  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to: [to],
    replyTo: brief.email || undefined,
    subject: `New brief: ${brief.projectTypes.join(", ")} — ${brief.name}`,
    text,
    html,
  });
  if (error) throw new Error(error.message);
};

/** Instant phone notification through a Telegram bot, with a button that opens the client's WhatsApp. */
const sendTelegram = async (token: string, chatId: string, { telegram, wa }: Rendered) => {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegram,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
      reply_markup: { inline_keyboard: [[{ text: "💬 WhatsApp", url: wa }]] },
    }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
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

  const rendered = render(brief);
  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, TELEGRAM_BOT_TOKEN: tgToken, TELEGRAM_CHAT_ID: tgChat } = process.env;

  const channels: [string, () => Promise<void>][] = [];
  if (key && to) channels.push(["email", () => sendEmail(key, to, brief, rendered)]);
  if (tgToken && tgChat) channels.push(["telegram", () => sendTelegram(tgToken, tgChat, rendered)]);

  if (!channels.length) {
    console.info(`[contact] New brief (no email or Telegram configured, logging instead)\n${rendered.text}`);
    return NextResponse.json({ ok: true, delivered: ["console"] });
  }

  const results = await Promise.allSettled(channels.map(([, send]) => send()));
  const delivered = channels.filter((_, i) => results[i].status === "fulfilled").map(([name]) => name);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[contact] ${channels[i][0]} failed`, r.reason);
  });

  if (!delivered.length) {
    // Every channel failed: keep the brief in the logs so it isn't lost, and let the visitor try WhatsApp.
    console.info(`[contact] Undelivered brief\n${rendered.text}`);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered });
}
