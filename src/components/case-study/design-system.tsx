import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/content/copy";
import type { Project } from "@/content/projects";

/** Relative luminance → picks readable text for a swatch. */
const textOn = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const channel = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const l = 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
  // Pick whichever of ink (L≈0.006) or paper (L≈0.90) contrasts more.
  return (l + 0.05) / 0.056 >= 0.95 / (l + 0.05) ? "#131210" : "#F8F4EC";
};

export const DesignSystem = ({ project, t }: { project: Project; t: Dictionary }) => {
  const { palette, fonts, theme } = project;
  const display: CSSProperties = { fontFamily: `var(${fonts.display.cssVar}), system-ui, sans-serif` };
  const body: CSSProperties = { fontFamily: `var(${fonts.body.cssVar}), system-ui, sans-serif` };
  const surface = palette.find((p) => textOn(p.hex) === "#131210")?.hex ?? "#F8F4EC";
  const dark = palette.find((p) => textOn(p.hex) === "#F8F4EC")?.hex ?? "#131210";

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Color */}
      <div>
        <p className="label mb-6 text-smoke">{t.caseStudy.colors}</p>
        <div className="grid grid-cols-2 gap-2 md:flex md:h-[22rem] md:gap-0">
          {palette.map((c, i) => (
            <Reveal
              key={c.hex}
              variant="wipe"
              delay={i * 80}
              className="relative isolate flex min-h-40 flex-col justify-between p-5 transition-[flex-grow] duration-700 ease-expo md:min-h-0 md:flex-1 md:hover:flex-[2]"
            >
              <div className="absolute inset-0 -z-10" style={{ background: c.hex }} />
              <span className="label" style={{ color: textOn(c.hex) }}>
                0{i + 1}
              </span>
              <span style={{ color: textOn(c.hex) }}>
                <span className="block text-[1.05rem] font-medium">{c.name}</span>
                <span className="label mt-1 block" dir="ltr">
                  {c.hex}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="label mb-6 text-smoke">{t.caseStudy.type}</p>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2" dir="ltr">
          {[
            { role: "Display", font: fonts.display, style: display, sample: "Aa", weight: 700 },
            { role: "Text", font: fonts.body, style: body, sample: fonts.body.name.includes("Arabic") ? "Aa ع" : "Aa", weight: 400 },
          ].map((f) => (
            <div key={f.role} className="bg-paper p-6 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="label text-smoke">{f.role}</span>
                <span className="label">{f.font.name}</span>
              </div>
              <p className="mt-6 text-[clamp(5rem,12vw,10rem)] leading-none" style={{ ...f.style, fontWeight: f.weight }}>
                {f.sample}
              </p>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-smoke" style={f.style}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Components */}
      <div>
        <p className="label mb-6 text-smoke">{t.caseStudy.components}</p>
        <div className="grid gap-px border border-line bg-line md:grid-cols-3" dir="ltr">
          <div className="flex flex-col items-start gap-4 p-8" style={{ background: surface }}>
            <span className="px-5 py-3 text-[0.95rem] font-semibold" style={{ ...body, background: dark, color: surface }}>
              Primary action
            </span>
            <span className="border px-5 py-3 text-[0.95rem]" style={{ ...body, borderColor: dark, color: dark }}>
              Secondary
            </span>
            <span className="px-5 py-3 text-[0.95rem] font-semibold" style={{ ...body, background: theme.accent, color: theme.onAccent }}>
              Accent
            </span>
          </div>
          <div className="flex flex-col gap-3 p-8" style={{ background: dark, color: surface }}>
            <span className="text-[0.8em] opacity-70" style={body}>
              Email
            </span>
            <span className="flex h-12 items-center border px-4 text-[0.95rem] opacity-80" style={{ ...body, borderColor: `${surface}55` }}>
              salma@studio.eg
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Active", "Pending", "New"].map((chip, i) => (
                <span key={chip} className="rounded-full px-3 py-1 text-[0.8rem]" style={{ ...body, background: i === 0 ? theme.accent : `${surface}1f`, color: i === 0 ? theme.onAccent : surface }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="p-8" style={{ background: surface, color: dark }}>
            <div className="border p-5" style={{ borderColor: `${dark}26` }}>
              <span className="text-[0.8rem] opacity-70" style={body}>
                {project.name}
              </span>
              <p className="mt-2 text-[1.8rem] leading-tight font-bold" style={display}>
                {project.copy.en.tagline}
              </p>
              <div className="mt-4 h-1.5 w-full" style={{ background: `${dark}1a` }}>
                <div className="h-full w-2/3" style={{ background: dark }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
