import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Device frames sized in `em`, where 1em is a fixed fraction of the frame's own width
 * (container query units). Mockups inside are drawn on an 80em-wide (browser) or
 * 24em-wide (phone) canvas and scale perfectly at any size.
 */

export const BrowserFrame = ({
  url,
  children,
  className,
  tone = "dark",
  scroll,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  /** Distance the screen scrolls on hover, e.g. "-38%". */
  scroll?: string;
}) => (
  <div className={cn("@container w-full", className)}>
    <div
      className={cn(
        "overflow-hidden rounded-[0.6em] shadow-[0_2.5em_5em_-1.5em_rgb(0_0_0/0.45)] ring-1",
        tone === "dark" ? "bg-[#111] ring-white/10" : "bg-[#ddd8cf] ring-black/10",
      )}
      style={{ fontSize: "calc(100cqw / 80)" }}
    >
      <div className={cn("flex h-[2.6em] items-center gap-[0.5em] px-[1em]", tone === "dark" ? "bg-[#1b1b1b]" : "bg-[#e8e3da]")}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn("size-[0.7em] rounded-full", tone === "dark" ? "bg-white/20" : "bg-black/15")} />
        ))}
        <span
          className={cn(
            "mx-auto flex h-[1.6em] w-[34%] items-center justify-center rounded-[0.4em] text-[0.8em]",
            tone === "dark" ? "bg-white/8 text-white/75" : "bg-black/6 text-black/75",
          )}
          dir="ltr"
        >
          {url}
        </span>
        <span className="w-[3em]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="screen-scroll" style={scroll ? ({ "--scroll-to": scroll } as CSSProperties) : undefined}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const PhoneFrame = ({ children, className, scroll }: { children: ReactNode; className?: string; scroll?: string }) => (
  <div className={cn("@container w-full", className)}>
    <div
      className="relative rounded-[3.4em] bg-[#0b0b0b] p-[0.75em] shadow-[0_2.5em_5em_-1.5em_rgb(0_0_0/0.5)] ring-1 ring-white/10"
      style={{ fontSize: "calc(100cqw / 25.5)" }}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.7em]">
        <div className="screen-scroll" style={scroll ? ({ "--scroll-to": scroll } as CSSProperties) : undefined}>
          {children}
        </div>
        <span aria-hidden className="absolute top-[0.7em] left-1/2 z-10 h-[1.9em] w-[6.4em] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  </div>
);

/** Status bar for phone screens. */
export const StatusBar = ({ color = "currentColor" }: { color?: string }) => (
  <div className="flex h-[3.2em] items-end justify-between px-[1.6em] pb-[0.4em] text-[0.82em] font-semibold" style={{ color }} dir="ltr">
    <span>9:41</span>
    <span className="flex items-center gap-[0.35em]">
      <span className="flex items-end gap-[0.12em]">
        {[0.45, 0.65, 0.85, 1].map((h) => (
          <span key={h} className="w-[0.22em] rounded-[0.05em] bg-current" style={{ height: `${h * 0.8}em` }} />
        ))}
      </span>
      <span className="ms-[0.2em] h-[0.75em] w-[1.5em] rounded-[0.2em] border border-current p-[0.08em]">
        <span className="block h-full w-[78%] rounded-[0.1em] bg-current" />
      </span>
    </span>
  </div>
);
