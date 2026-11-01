import { BrowserFrame, PhoneFrame, StatusBar } from "../frames";

const C = { ink: "#0C0E14", panel: "#141822", line: "#232836", bone: "#EDEAE2", mint: "#39E58C", slate: "#8A90A0" };
const display = { fontFamily: "var(--font-space-grotesk, var(--font-bricolage)), system-ui, sans-serif" };
const sans = { fontFamily: "var(--font-inter, var(--font-geist)), system-ui, sans-serif" };

const series = [22, 26, 24, 31, 29, 35, 33, 38, 41, 39, 46, 44, 51, 49, 55, 58, 54, 61, 64, 62, 69, 72];
const toPath = (values: number[], w: number, h: number) =>
  values.map((v, i) => `${i === 0 ? "M" : "L"}${((i / (values.length - 1)) * w).toFixed(1)},${(h - (v / 80) * h).toFixed(1)}`).join(" ");

const LineChart = ({ w = 600, h = 200, gid }: { w?: number; h?: number; gid: string }) => {
  const d = toPath(series, w, h);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={C.mint} stopOpacity="0.28" />
          <stop offset="1" stopColor={C.mint} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke={C.line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${gid})`} />
      <path d={d} fill="none" stroke={C.mint} strokeWidth="2.5" vectorEffect="non-scaling-stroke" pathLength={1} className="draw-line" />
      <circle cx={w * (17 / 21)} cy={h - (61 / 80) * h} r="5" fill={C.ink} stroke={C.mint} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const kpis = [
  { label: "Weekly active users", value: "18,402", delta: "+6.2%" },
  { label: "Activation rate", value: "42.8%", delta: "+3.1 pts" },
  { label: "D30 retention", value: "31.4%", delta: "+1.8 pts" },
];

const funnel = [
  { step: "Signed up", v: 100 },
  { step: "Created project", v: 74 },
  { step: "Invited teammate", v: 52 },
  { step: "Shipped first event", v: 43 },
];

export const HalcyonDesktop = () => (
  <BrowserFrame url="app.halcyon.io" scroll="-30%">
    <div className="flex w-[80em]" style={{ background: C.ink, color: C.bone, ...sans }}>
      <aside className="flex w-[4.5em] shrink-0 flex-col items-center gap-[1.6em] border-e py-[1.6em]" style={{ borderColor: C.line }}>
        <span className="grid size-[2.2em] place-items-center rounded-[0.5em]" style={{ background: C.mint }}>
          <span className="size-[0.9em] rounded-full border-[0.2em]" style={{ borderColor: C.ink }} />
        </span>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="size-[1.3em] rounded-[0.3em]" style={{ background: i === 1 ? C.bone : C.line }} />
        ))}
      </aside>
      <div className="flex-1 p-[2.2em]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.85em]" style={{ color: C.slate }}>
              Growth · Activation
            </p>
            <p className="mt-[0.2em] text-[2.1em] font-medium tracking-[-0.02em]" style={display}>
              Why do teams stay?
            </p>
          </div>
          <div className="flex gap-[0.6em] text-[0.85em]">
            {["7d", "30d", "90d"].map((r) => (
              <span key={r} className="rounded-[0.4em] px-[0.9em] py-[0.45em]" style={{ background: r === "30d" ? C.bone : C.panel, color: r === "30d" ? C.ink : C.slate }}>
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-[1.8em] grid grid-cols-3 gap-[1em]">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-[0.7em] border p-[1.2em]" style={{ background: C.panel, borderColor: C.line }}>
              <p className="text-[0.82em]" style={{ color: C.slate }}>
                {k.label}
              </p>
              <p className="mt-[0.4em] text-[2.2em] font-medium tabular-nums tracking-[-0.02em]" style={display}>
                {k.value}
              </p>
              <p className="mt-[0.2em] text-[0.82em]" style={{ color: C.mint }}>
                ▲ {k.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[1em] grid grid-cols-[1.7fr_1fr] gap-[1em]">
          <div className="relative rounded-[0.7em] border p-[1.4em]" style={{ background: C.panel, borderColor: C.line }}>
            <div className="flex justify-between text-[0.85em]">
              <span>Activated accounts</span>
              <span style={{ color: C.slate }}>Last 30 days</span>
            </div>
            <div className="mt-[1em] h-[14em]">
              <LineChart gid="halcyon-fill-desktop" />
            </div>
            <div className="absolute top-[5.2em] left-[66%] rounded-[0.5em] px-[0.9em] py-[0.6em] text-[0.8em] shadow-lg" style={{ background: C.bone, color: C.ink }}>
              <p className="font-semibold tabular-nums">1,284 accounts</p>
              <p className="opacity-60">Oct 24 · +9% wow</p>
            </div>
          </div>
          <div className="rounded-[0.7em] border p-[1.4em]" style={{ background: C.panel, borderColor: C.line }}>
            <p className="text-[0.85em]">Onboarding funnel</p>
            <div className="mt-[1.2em] space-y-[0.9em]">
              {funnel.map((f) => (
                <div key={f.step}>
                  <div className="flex justify-between text-[0.8em]">
                    <span style={{ color: C.slate }}>{f.step}</span>
                    <span className="tabular-nums">{f.v}%</span>
                  </div>
                  <div className="mt-[0.35em] h-[0.55em] rounded-full" style={{ background: C.line }}>
                    <div className="h-full rounded-full" style={{ width: `${f.v}%`, background: f.v === 43 ? C.mint : C.bone }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[1em] rounded-[0.7em] border p-[1.4em]" style={{ background: C.panel, borderColor: C.line }}>
          <p className="text-[0.85em]">Top activation drivers</p>
          {[
            ["Invited a teammate in week 1", "2.4×"],
            ["Connected a data source", "1.9×"],
            ["Saved a dashboard", "1.6×"],
          ].map(([k, v]) => (
            <div key={k} className="mt-[0.8em] flex justify-between border-t pt-[0.8em] text-[0.9em]" style={{ borderColor: C.line }}>
              <span>{k}</span>
              <span className="tabular-nums" style={{ color: C.mint }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

export const HalcyonMobile = () => (
  <PhoneFrame scroll="-22%">
    <div className="w-[24em]" style={{ background: C.ink, color: C.bone, ...sans }}>
      <StatusBar color={C.bone} />
      <div className="flex items-center justify-between px-[1.4em] py-[0.8em]">
        <span className="flex items-center gap-[0.5em] text-[1.05em] font-medium" style={display}>
          <span className="size-[1em] rounded-full border-[0.22em]" style={{ borderColor: C.mint }} />
          halcyon
        </span>
        <span className="text-[0.8em]" style={{ color: C.slate }}>
          Menu
        </span>
      </div>
      <div className="px-[1.4em] pt-[1.6em]">
        <span className="rounded-full border px-[0.8em] py-[0.3em] text-[0.7em]" style={{ borderColor: C.line, color: C.slate }}>
          New · Retention cohorts →
        </span>
        <p className="mt-[1em] text-[2.6em] leading-[1.02] font-medium tracking-[-0.03em]" style={display}>
          Know why users <span style={{ color: C.mint }}>stay.</span>
        </p>
        <p className="mt-[0.9em] text-[0.9em] leading-[1.55]" style={{ color: C.slate }}>
          Product analytics for growth teams who want answers, not more charts.
        </p>
        <div className="mt-[1.3em] rounded-[0.5em] py-[0.95em] text-center text-[0.9em] font-semibold" style={{ background: C.mint, color: C.ink }}>
          Book a demo
        </div>
        <div className="mt-[0.6em] rounded-[0.5em] border py-[0.95em] text-center text-[0.9em]" style={{ borderColor: C.line }}>
          Start free
        </div>
        <div className="mt-[1.6em] rounded-[0.8em] border p-[1em]" style={{ background: C.panel, borderColor: C.line }}>
          <div className="flex justify-between text-[0.75em]">
            <span style={{ color: C.slate }}>Activation</span>
            <span style={{ color: C.mint }}>▲ 3.1 pts</span>
          </div>
          <p className="text-[1.8em] font-medium tabular-nums" style={display}>
            42.8%
          </p>
          <div className="mt-[0.4em] h-[6em]">
            <LineChart w={300} h={100} gid="halcyon-fill-mobile" />
          </div>
        </div>
        <p className="mt-[1.6em] text-center text-[0.7em] tracking-[0.15em]" style={{ color: C.slate }}>
          TRUSTED BY GROWTH TEAMS AT
        </p>
        <div className="mt-[0.8em] grid grid-cols-3 gap-[0.6em] pb-[2em]">
          {["Northwind", "Lumen", "Kestrel", "Parcel", "Orbit", "Fable"].map((n) => (
            <span key={n} className="py-[0.5em] text-center text-[0.8em] font-semibold opacity-50" style={display}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  </PhoneFrame>
);
