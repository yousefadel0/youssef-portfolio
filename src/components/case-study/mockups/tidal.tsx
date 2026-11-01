import { PhoneFrame, StatusBar } from "../frames";

const C = { abyss: "#0A1F2B", deep: "#12384A", foam: "#F1F5F4", sea: "#5BE3C4", coral: "#FF6B5B", mute: "#8FB0B8", sand: "#F2C879", lilac: "#B9A7FF" };
const ui = { fontFamily: "var(--font-jakarta, var(--font-geist)), var(--font-plex-arabic), system-ui, sans-serif" };

const segments = [
  { label: "Food", v: 2480, color: C.coral },
  { label: "Transport", v: 1320, color: C.sea },
  { label: "Bills", v: 1900, color: C.sand },
  { label: "Fun", v: 1220, color: C.lilac },
];
const total = segments.reduce((s, x) => s + x.v, 0);

const RADIUS = 42;
const CIRC = 2 * Math.PI * RADIUS;
/** Arc length and start offset of each segment, computed once. */
const arcs = segments.reduce<{ label: string; color: string; len: number; start: number }[]>((acc, s) => {
  const start = acc.length ? acc[acc.length - 1].start + acc[acc.length - 1].len : 0;
  return [...acc, { label: s.label, color: s.color, len: (s.v / 10000) * CIRC, start }];
}, []);

/** Spending ring: four arcs on one circle, drawn with stroke-dasharray. */
const Ring = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
    <circle cx="50" cy="50" r={RADIUS} fill="none" stroke={C.deep} strokeWidth="9" />
    {arcs.map((a) => (
      <circle
        key={a.label}
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke={a.color}
        strokeWidth="9"
        strokeDasharray={`${Math.max(a.len - 1.2, 0)} ${CIRC}`}
        strokeDashoffset={-a.start}
        className="ring-in"
      />
    ))}
  </svg>
);

const activity = [
  { n: "Talabat", c: "Food", a: -185, color: C.coral, t: "Today · 21:04" },
  { n: "Uber", c: "Transport", a: -92, color: C.sea, t: "Today · 18:40" },
  { n: "Salary", c: "Income", a: 18000, color: C.sea, t: "Dec 1" },
  { n: "Carrefour Maadi", c: "Groceries", a: -640, color: C.coral, t: "Nov 30" },
  { n: "WE Internet", c: "Bills", a: -450, color: C.sand, t: "Nov 29" },
];

const fmt = (n: number) => `${n < 0 ? "−" : "+"}${Math.abs(n).toLocaleString("en-US")}`;

export const TidalHome = () => (
  <PhoneFrame scroll="-16%">
    <div className="w-[24em]" style={{ background: C.abyss, color: C.foam, ...ui }}>
      <StatusBar color={C.foam} />
      <div className="flex items-center justify-between px-[1.4em] py-[0.6em]">
        <div>
          <p className="text-[0.75em]" style={{ color: C.mute }}>
            Good evening
          </p>
          <p className="text-[1.15em] font-bold">Salma</p>
        </div>
        <span className="grid size-[2.4em] place-items-center rounded-full text-[0.85em] font-bold" style={{ background: C.deep }}>
          S
        </span>
      </div>

      <div className="px-[1.4em] pt-[0.4em]">
        <p className="text-[0.75em]" style={{ color: C.mute }}>
          Balance
        </p>
        <p className="text-[2.6em] leading-[1.05] font-extrabold tracking-[-0.02em] tabular-nums">
          12,480<span className="ms-[0.25em] text-[0.4em] font-semibold" style={{ color: C.mute }}>EGP</span>
        </p>
      </div>

      <div className="relative mx-auto mt-[1em] size-[13em]">
        <Ring />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[0.7em]" style={{ color: C.mute }}>
            Spent in December
          </p>
          <p className="text-[1.7em] font-extrabold tabular-nums">{total.toLocaleString("en-US")}</p>
          <p className="text-[0.7em]" style={{ color: C.mute }}>
            of 10,000 budget
          </p>
        </div>
      </div>

      <div className="mt-[0.8em] flex flex-wrap justify-center gap-x-[1em] gap-y-[0.3em] px-[1.4em] text-[0.72em]">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-[0.35em]">
            <span className="size-[0.6em] rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      <div className="mt-[1.2em] rounded-t-[1.6em] px-[1.4em] pt-[1.2em] pb-[2em]" style={{ background: C.foam, color: C.abyss }}>
        <div className="flex justify-between">
          <p className="text-[0.95em] font-bold">Recent</p>
          <p className="text-[0.75em] opacity-75">See all</p>
        </div>
        {activity.map((a) => (
          <div key={a.n} className="mt-[0.8em] flex items-center gap-[0.8em]">
            <span className="grid size-[2.4em] place-items-center rounded-[0.8em]" style={{ background: `${a.color}33` }}>
              <span className="size-[0.8em] rounded-full" style={{ background: a.color }} />
            </span>
            <span className="flex-1">
              <span className="block text-[0.85em] font-semibold">{a.n}</span>
              <span className="block text-[0.68em] opacity-75">
                {a.c} · {a.t}
              </span>
            </span>
            <span className="text-[0.85em] font-bold tabular-nums" style={{ color: a.a > 0 ? "#0F7A62" : C.abyss }}>
              {fmt(a.a)}
            </span>
          </div>
        ))}
      </div>
    </div>
  </PhoneFrame>
);

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

export const TidalQuickAdd = () => (
  <PhoneFrame>
    <div className="flex h-full w-[24em] flex-col" style={{ background: C.deep, color: C.foam, ...ui }}>
      <StatusBar color={C.foam} />
      <div className="px-[1.4em] pt-[0.4em] opacity-75">
        <p className="text-[0.8em]">Add expense</p>
      </div>
      <div className="px-[1.4em] pt-[1.6em] text-center">
        <p className="text-[0.75em]" style={{ color: C.mute }}>
          Amount
        </p>
        <p className="text-[3.6em] leading-[1.05] font-extrabold tabular-nums">
          85<span className="ms-[0.2em] text-[0.35em] font-semibold opacity-75">EGP</span>
        </p>
        <span className="caret mx-auto mt-[0.2em] block h-[0.15em] w-[3em] rounded-full" style={{ background: C.sea }} />
      </div>
      <div className="mt-[1.4em] flex flex-wrap justify-center gap-[0.5em] px-[1.4em]">
        {[
          ["Coffee", true],
          ["Food", false],
          ["Transport", false],
          ["Bills", false],
          ["Fun", false],
        ].map(([label, on]) => (
          <span
            key={String(label)}
            className="rounded-full px-[0.9em] py-[0.45em] text-[0.75em] font-semibold"
            style={on ? { background: C.sea, color: C.abyss } : { background: "rgb(241 245 244 / 0.08)" }}
          >
            {label}
          </span>
        ))}
      </div>
      <p className="mt-[1em] text-center text-[0.75em]" style={{ color: C.mute }}>
        Note: flat white, Zamalek
      </p>
      <div className="mt-auto rounded-t-[1.6em] p-[1em] pb-[1.6em]" style={{ background: C.abyss }}>
        <div className="grid grid-cols-3 gap-[0.4em]">
          {keys.map((k) => (
            <span key={k} className="grid h-[3em] place-items-center rounded-[0.8em] text-[1.25em] font-semibold" style={{ background: "rgb(241 245 244 / 0.05)" }}>
              {k}
            </span>
          ))}
        </div>
        <div className="mt-[0.7em] rounded-[1em] py-[1em] text-center text-[0.95em] font-bold" style={{ background: C.sea, color: C.abyss }}>
          Save · 2.1s
        </div>
      </div>
    </div>
  </PhoneFrame>
);
