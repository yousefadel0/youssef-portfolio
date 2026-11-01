import type { CSSProperties } from "react";
import type { DishArt } from "./sufra-data";

/**
 * Small illustration kit used by the Sufra and Maskan mockups and demos.
 * Drawn with CSS/SVG so there are no stock photos and nothing to download.
 */

/** A top-down plate: rim, base food, sauce swirl and garnish dots. */
export const Plate = ({ art, className, style }: { art: DishArt; className?: string; style?: CSSProperties }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
    <circle cx="50" cy="50" r="48" fill={art.plate} />
    <circle cx="50" cy="50" r="40" fill="none" stroke="#000" strokeOpacity="0.06" strokeWidth="1.5" />
    <circle cx="50" cy="51" r="31" fill={art.base} />
    <path d="M30 52c6-12 26-16 38-6 4 4 2 12-6 14-10 3-22 2-30-2-3-2-3-4-2-6Z" fill={art.top} opacity="0.92" />
    {[
      [38, 38, 2.6],
      [58, 36, 2],
      [64, 58, 2.4],
      [44, 64, 1.8],
      [52, 46, 1.6],
      [36, 56, 2],
    ].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={art.garnish} />
    ))}
    <ellipse cx="38" cy="34" rx="10" ry="4" fill="#fff" opacity="0.18" transform="rotate(-30 38 34)" />
  </svg>
);

export type BuildingArt = { sky: string; wall: string; trim: string; window: string; floors: number; cols: number; kind: "tower" | "villa" | "chalet" };

/** A flat architectural elevation: facade grid, balconies, a palm or two. */
export const Building = ({ art, className }: { art: BuildingArt; className?: string }) => {
  const w = art.kind === "tower" ? 46 : 70;
  const h = art.kind === "tower" ? 70 : 38;
  const x0 = (100 - w) / 2;
  const y0 = 86 - h;
  const cellW = w / art.cols;
  const cellH = h / art.floors;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <rect width="100" height="100" fill={art.sky} />
      <circle cx="78" cy="22" r="9" fill="#fff" opacity="0.35" />
      <rect x={x0} y={y0} width={w} height={h} fill={art.wall} />
      {art.kind !== "tower" ? <path d={`M${x0 - 3} ${y0}h${w + 6}l-4 -5h${-(w - 2)}Z`} fill={art.trim} /> : null}
      {Array.from({ length: art.floors }).flatMap((_, f) =>
        Array.from({ length: art.cols }).map((__, c) => (
          <rect
            key={`${f}-${c}`}
            x={x0 + c * cellW + cellW * 0.18}
            y={y0 + f * cellH + cellH * 0.2}
            width={cellW * 0.64}
            height={cellH * 0.55}
            fill={art.window}
            opacity={(f + c) % 3 === 0 ? 0.95 : 0.75}
          />
        )),
      )}
      {Array.from({ length: art.floors }).map((_, f) => (
        <rect key={f} x={x0 - 1} y={y0 + (f + 1) * cellH - 1.2} width={w + 2} height="1.2" fill={art.trim} />
      ))}
      <rect x="0" y="86" width="100" height="14" fill={art.trim} opacity="0.55" />
      <g fill="#3E5B45">
        <rect x={x0 - 8} y="62" width="1.6" height="24" fill="#6B4E2E" />
        <path d={`M${x0 - 7} 62c-6-1-9 2-11 5 4-2 7-2 11-1-4 1-7 4-8 7 3-3 6-4 8-5 1 3 4 5 7 6-2-3-3-5-4-7 3 0 6 1 8 3-1-4-5-6-9-6 2-2 5-3 8-2-3-3-7-2-10 0Z`} />
      </g>
    </svg>
  );
};
