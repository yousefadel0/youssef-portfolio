import { WhatsAppIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/copy";
import { whatsappUrl } from "@/lib/utils";

/**
 * Always one thumb-tap away. Phones get a full-width bar at the bottom edge;
 * larger screens get a round button that unfolds its label on hover.
 */
export const WhatsAppFab = ({ t }: { t: Dictionary }) => {
  const url = whatsappUrl(t.fab.message);
  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center justify-center gap-3 bg-kiln font-medium text-ink shadow-[0_10px_30px_-10px_rgb(19_18_16/0.5)] active:scale-[0.98] md:hidden"
      >
        <WhatsAppIcon size={22} />
        {t.fab.label}
        <span className="sr-only">{t.common.newTab}</span>
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="open"
        aria-label={`${t.fab.label} ${t.common.newTab}`}
        className="group/fab fixed end-6 bottom-6 z-40 hidden h-16 items-center overflow-hidden rounded-full bg-ink text-bone ring-1 ring-bone/25 shadow-[0_14px_40px_-12px_rgb(19_18_16/0.6)] transition-colors duration-300 hover:bg-kiln hover:text-ink md:flex"
      >
        <span className="grid size-16 shrink-0 place-items-center">
          <WhatsAppIcon size={26} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-medium transition-[max-width,padding] duration-500 ease-expo group-hover/fab:max-w-60 group-hover/fab:pe-6 group-focus-visible/fab:max-w-60 group-focus-visible/fab:pe-6">
          {t.fab.label}
        </span>
      </a>
    </>
  );
};
