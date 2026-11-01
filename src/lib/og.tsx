import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fonts = Promise.all([
  readFile(join(process.cwd(), "public/fonts/bricolage-grotesque-latin-800-normal.woff")),
  readFile(join(process.cwd(), "public/fonts/bricolage-grotesque-latin-500-normal.woff")),
]);

type OgOptions = {
  kicker: string;
  title: string;
  footer?: string;
  bg?: string;
  fg?: string;
  accent?: string;
  /** Text color on the accent block. */
  onAccent?: string;
};

const Mark = ({ bg, fg, dot }: { bg: string; fg: string; dot: string }) => (
  <svg width="72" height="72" viewBox="0 0 64 64">
    <rect width="64" height="64" fill={bg} />
    <path d="M15 13 L31 33 L47 13" fill="none" stroke={fg} strokeWidth="7.5" strokeLinecap="square" />
    <path d="M31 31 V52" fill="none" stroke={fg} strokeWidth="7.5" strokeLinecap="square" />
    <rect x="41" y="44" width="9" height="9" fill={dot} />
  </svg>
);

/** Shared OG artwork: build-sheet frame, oversized title, kiln full stop. English only (see DECISIONS.md). */
export const renderOg = async ({ kicker, title, footer = "youssefadel.dev", bg = "#F1EADC", fg = "#131210", accent = "#FF5A1F", onAccent = "#131210" }: OgOptions) => {
  const [bold, medium] = await fonts;
  const size = title.length > 34 ? 92 : title.length > 22 ? 112 : 136;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: bg, color: fg, padding: 64, position: "relative", fontFamily: "Bricolage" }}>
        {[
          { top: 28, left: 28, borderTop: `2px solid ${fg}`, borderLeft: `2px solid ${fg}` },
          { top: 28, right: 28, borderTop: `2px solid ${fg}`, borderRight: `2px solid ${fg}` },
          { bottom: 28, left: 28, borderBottom: `2px solid ${fg}`, borderLeft: `2px solid ${fg}` },
          { bottom: 28, right: 28, borderBottom: `2px solid ${fg}`, borderRight: `2px solid ${fg}` },
        ].map((pos, i) => (
          <div key={i} style={{ position: "absolute", width: 18, height: 18, opacity: 0.5, ...pos }} />
        ))}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Mark bg={fg} fg={bg} dot={accent} />
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", opacity: 0.75 }}>{kicker}</div>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: size, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4, maxWidth: 1060 }}>
            {title}
            <div style={{ width: size * 0.2, height: size * 0.2, background: accent, marginLeft: 10, alignSelf: "flex-end", marginBottom: size * 0.1 }} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, fontWeight: 500 }}>
          <div style={{ display: "flex", fontWeight: 800, fontSize: 34, letterSpacing: -1 }}>youssef adel</div>
          <div style={{ display: "flex", background: accent, color: onAccent, padding: "10px 18px" }}>{footer}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: bold, weight: 800, style: "normal" },
        { name: "Bricolage", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
};
