"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/copy";
import { href, type Locale } from "@/lib/i18n";
import { pad, whatsappUrl } from "@/lib/utils";
import { sentKey } from "./brief-form";

type Copy = Dictionary["contactPage"];

const noSubscribe = () => () => {};

const readSent = () => {
  try {
    return sessionStorage.getItem(sentKey);
  } catch {
    return null;
  }
};

/** Thank-you panel: a pre-written WhatsApp follow-up (named when the brief was just sent) and what happens next. */
export const BriefSent = ({ copy, locale, newTabLabel }: { copy: Copy; locale: Locale; newTabLabel: string }) => {
  const raw = useSyncExternalStore(noSubscribe, readSent, () => null);

  let message = copy.sentMessageAnon;
  try {
    const sent = raw ? (JSON.parse(raw) as { name?: string; project?: string }) : null;
    if (sent?.name && sent.project) message = copy.sentMessage.replace("{name}", sent.name).replace("{project}", sent.project);
  } catch {}

  return (
    <div>
      <div className="bg-ink p-6 text-bone sm:p-8 md:p-12" role="status">
        <span className="grid size-14 place-items-center bg-kiln text-ink">
          <CheckIcon size={26} />
        </span>
        <p className="mt-8 max-w-md text-[1.15rem] leading-relaxed">{copy.sentText}</p>
        {/* Plain link, not ButtonLink: the label has to wrap inside the panel on narrow phones. */}
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="open"
          className="mt-8 flex min-h-14 w-full items-center justify-center gap-3 bg-kiln px-6 py-3 text-center text-[1.02rem] font-medium text-ink transition-colors duration-300 hover:bg-bone sm:inline-flex sm:w-auto md:min-h-16 md:px-8"
        >
          <WhatsAppIcon size={20} className="shrink-0" />
          <span>{copy.sentWhatsapp}</span>
          <span className="sr-only"> {newTabLabel}</span>
        </a>
        <p className="mt-3 text-[0.92rem] text-ash">{copy.sentWhatsappHint}</p>
      </div>

      <div className="border border-t-0 border-ink bg-paper p-6 sm:p-8 md:p-12">
        <h2 className="headline text-[clamp(1.5rem,2.4vw,2rem)]">{copy.nextTitle}</h2>
        <ol className="mt-6 border-t border-ink">
          {copy.nextSteps.map((s, i) => (
            <li key={s} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-ink/20 py-4">
              <span className="label tabular pt-1 text-kiln">{pad(i + 1)}</span>
              <span className="leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          <Link href={href(locale, "/contact")} className="border-b border-ink pb-1 font-medium hover:text-kiln">
            {copy.successAgain}
          </Link>
          <Link href={href(locale)} className="border-b border-ink pb-1 font-medium hover:text-kiln">
            {copy.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
};
