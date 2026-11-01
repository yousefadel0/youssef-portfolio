import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";
import { ArrowIcon, ArrowUpRightIcon, DownloadIcon, WhatsAppIcon } from "./icons";

type Variant = "kiln" | "ink" | "bone" | "line" | "line-light";
type IconName = "arrow" | "external" | "whatsapp" | "download" | "none";

const variants: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  kiln: { base: "bg-kiln text-ink", fill: "bg-ink", hoverText: "group-hover/btn:text-bone group-focus-visible/btn:text-bone" },
  ink: { base: "bg-ink text-bone", fill: "bg-kiln", hoverText: "group-hover/btn:text-ink group-focus-visible/btn:text-ink" },
  bone: { base: "bg-bone text-ink", fill: "bg-kiln", hoverText: "" },
  line: { base: "border border-ink/80 text-ink", fill: "bg-ink", hoverText: "group-hover/btn:text-bone group-focus-visible/btn:text-bone" },
  "line-light": { base: "border border-bone/70 text-bone", fill: "bg-bone", hoverText: "group-hover/btn:text-ink group-focus-visible/btn:text-ink" },
};

const icons = {
  arrow: ArrowIcon,
  external: ArrowUpRightIcon,
  whatsapp: WhatsAppIcon,
  download: DownloadIcon,
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: IconName;
  size?: "md" | "lg";
  download?: string;
  magnetic?: boolean;
  cursor?: string;
  className?: string;
  newTabLabel?: string;
};

/** The one button. A color panel rises on hover; the icon slides out and back in. */
export const ButtonLink = ({
  href,
  children,
  variant = "ink",
  icon = "arrow",
  size = "md",
  download,
  magnetic = true,
  cursor = "open",
  className,
  newTabLabel,
}: Props) => {
  const v = variants[variant];
  const Icon = icon === "none" ? null : icons[icon];
  const isExternal = /^(https?:|mailto:|tel:)/.test(href) || Boolean(download);
  const opensTab = href.startsWith("http");

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] transition-transform duration-500 ease-expo group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0",
          v.fill,
        )}
      />
      <span className={cn("relative z-10 flex items-center gap-3 transition-colors duration-300", v.hoverText)}>
        {icon === "whatsapp" && Icon ? <Icon size={20} /> : null}
        <span>{children}</span>
        {icon !== "whatsapp" && Icon ? (
          <span className="relative block overflow-hidden">
            <Icon className="transition-transform duration-500 ease-expo group-hover/btn:translate-x-[160%] rtl:group-hover/btn:-translate-x-[160%]" />
            <Icon className="absolute inset-0 -translate-x-[160%] transition-transform duration-500 ease-expo group-hover/btn:translate-x-0 rtl:translate-x-[160%] rtl:group-hover/btn:translate-x-0" />
          </span>
        ) : null}
      </span>
      {opensTab && newTabLabel ? <span className="sr-only"> {newTabLabel}</span> : null}
    </>
  );

  const classes = cn(
    "group/btn relative inline-flex select-none items-center justify-center overflow-hidden font-medium whitespace-nowrap",
    size === "lg" ? "h-14 px-7 text-[1.02rem] md:h-16 md:px-8" : "h-12 px-5 text-[0.95rem]",
    v.base,
    className,
  );

  const link = isExternal ? (
    <a
      href={href}
      className={classes}
      data-cursor={cursor}
      {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download } : {})}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes} data-cursor={cursor}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
};
