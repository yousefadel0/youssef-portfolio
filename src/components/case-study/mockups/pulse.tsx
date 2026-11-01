import { BrowserFrame, PhoneFrame, StatusBar } from "../frames";

const C = { night: "#0E0F0C", chalk: "#F3F1EA", volt: "#C9F31D", graphite: "#2A2B27", mute: "#62635C" };
const display = { fontFamily: "var(--font-archivo, var(--font-bricolage)), system-ui, sans-serif" };
const sans = { fontFamily: "var(--font-plex-arabic, var(--font-geist)), system-ui, sans-serif" };

const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
const classes = [
  { day: 0, start: 0, len: 1, name: "HIIT Burn", coach: "Nour Hassan", cap: "18/20", hot: true },
  { day: 0, start: 3, len: 1.5, name: "Mobility", coach: "Omar Fathy", cap: "9/14" },
  { day: 1, start: 1, len: 1, name: "Spin 45", coach: "Mariam Adel", cap: "20/20", full: true },
  { day: 2, start: 0, len: 1.5, name: "Strength Lab", coach: "Karim Samir", cap: "11/16" },
  { day: 2, start: 2.5, len: 1, name: "Boxing", coach: "Youssef Nabil", cap: "14/16", hot: true },
  { day: 3, start: 1.5, len: 1, name: "Yoga Flow", coach: "Salma Ezz", cap: "8/18" },
  { day: 4, start: 0, len: 1, name: "HIIT Burn", coach: "Nour Hassan", cap: "16/20", hot: true },
  { day: 4, start: 2, len: 1.5, name: "Pilates", coach: "Hana Mostafa", cap: "12/12", full: true },
  { day: 5, start: 1, len: 1, name: "Open Gym", coach: "Staff", cap: "—" },
];
const hours = ["07:00", "08:00", "09:00", "10:00", "11:00"];

export const PulseDesktop = () => (
  <BrowserFrame url="pulseclub.app/admin/schedule" tone="light" scroll="-12%">
    <div className="flex w-[80em]" style={{ background: C.chalk, color: C.night, ...sans }}>
      <aside className="flex w-[15em] shrink-0 flex-col gap-[0.4em] p-[1.6em] text-[0.9em]" style={{ background: C.night, color: C.chalk }}>
        <span className="mb-[1.4em] flex items-center gap-[0.5em] text-[1.4em] font-extrabold tracking-[-0.03em] uppercase" style={display}>
          <span className="size-[0.8em] rounded-full" style={{ background: C.volt }} />
          Pulse
        </span>
        {["Overview", "Members", "Schedule", "Check-in", "Plans", "Revenue", "Announcements"].map((item) => (
          <span key={item} className="rounded-[0.4em] px-[0.8em] py-[0.55em]" style={item === "Schedule" ? { background: C.volt, color: C.night } : { opacity: 0.7 }}>
            {item}
          </span>
        ))}
        <div className="mt-auto rounded-[0.6em] p-[1em]" style={{ background: C.graphite }}>
          <p className="text-[0.8em] opacity-70">Expiring this week</p>
          <p className="text-[1.8em] font-extrabold" style={display}>
            23
          </p>
        </div>
      </aside>
      <div className="flex-1 p-[2em]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[0.85em]" style={{ color: C.mute }}>
              Week of 14 Dec · Zamalek branch
            </p>
            <p className="text-[2.6em] leading-[1] font-extrabold tracking-[-0.03em] uppercase" style={display}>
              Class schedule
            </p>
          </div>
          <span className="rounded-full px-[1.2em] py-[0.7em] text-[0.85em] font-semibold" style={{ background: C.night, color: C.volt }}>
            + New class
          </span>
        </div>

        <div className="mt-[1.6em] grid grid-cols-[4em_repeat(6,1fr)] gap-x-[0.5em]">
          <span />
          {days.map((d) => (
            <span key={d} className="pb-[0.6em] text-[0.8em] font-semibold uppercase" style={{ color: C.mute }}>
              {d}
            </span>
          ))}
          <div className="relative col-span-7 grid grid-cols-[4em_repeat(6,1fr)] gap-x-[0.5em]" style={{ height: "24em" }}>
            <div className="relative">
              {hours.map((h, i) => (
                <span key={h} className="absolute text-[0.75em] tabular-nums" style={{ top: `${i * 25}%`, color: C.mute }}>
                  {h}
                </span>
              ))}
            </div>
            {days.map((d, di) => (
              <div key={d} className="relative rounded-[0.5em]" style={{ background: "rgb(14 15 12 / 0.04)" }}>
                {classes
                  .filter((c) => c.day === di)
                  .map((c) => (
                    <div
                      key={c.name + c.start}
                      className="absolute inset-x-[0.3em] flex flex-col justify-between rounded-[0.45em] p-[0.6em] text-[0.75em]"
                      style={{
                        top: `${(c.start / 4) * 100}%`,
                        height: `calc(${(c.len / 4) * 100}% - 0.4em)`,
                        background: c.hot ? C.volt : c.full ? C.night : "#fff",
                        color: c.full ? C.chalk : C.night,
                        border: c.hot || c.full ? "none" : "1px solid rgb(14 15 12 / 0.1)",
                      }}
                    >
                      <span className="font-bold">{c.name}</span>
                      <span className="flex justify-between opacity-75">
                        <span>{c.coach.split(" ")[0]}</span>
                        <span className="tabular-nums">{c.full ? "Full" : c.cap}</span>
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[1.6em] grid grid-cols-3 gap-[1em]">
          {[
            ["Active members", "1,248"],
            ["Bookings today", "186"],
            ["Revenue · Dec", "EGP 412,600"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[0.6em] border p-[1em]" style={{ borderColor: "rgb(14 15 12 / 0.1)", background: "#fff" }}>
              <p className="text-[0.8em]" style={{ color: C.mute }}>
                {k}
              </p>
              <p className="text-[1.6em] font-extrabold tabular-nums" style={display}>
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

/** Deterministic QR-like pattern: a real code needs a payload; this is a visual stand-in. */
const QR = () => {
  const n = 21;
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < n * n; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.52);
  }
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    for (const [ox, oy] of [[0, 0], [n - 7, 0], [0, n - 7]] as const) {
      if (inBox(ox, oy)) {
        const dx = x - ox;
        const dy = y - oy;
        return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
      }
    }
    return -1;
  };
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="h-full w-full" shapeRendering="crispEdges" aria-hidden>
      {cells.map((on, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const f = finder(x, y);
        const fill = f === -1 ? on : f === 1;
        return fill ? <rect key={i} x={x} y={y} width="1" height="1" fill={C.night} /> : null;
      })}
    </svg>
  );
};

export const PulseMobile = () => (
  <PhoneFrame scroll="-16%">
    <div className="w-[24em]" style={{ background: C.night, color: C.chalk, ...sans }}>
      <StatusBar color={C.chalk} />
      <div className="flex items-center justify-between px-[1.4em] py-[0.6em]">
        <span className="text-[0.85em] opacity-70">Hi, Mariam</span>
        <span className="rounded-full px-[0.7em] py-[0.25em] text-[0.7em] font-semibold" style={{ background: C.graphite }}>
          EN · ع
        </span>
      </div>
      <div className="mx-[1.4em] rounded-[1.4em] p-[1.3em]" style={{ background: C.volt, color: C.night }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[0.7em] font-semibold tracking-[0.15em] uppercase">Pulse Club · Gold</p>
            <p className="mt-[0.2em] text-[1.6em] leading-[1] font-extrabold uppercase" style={display}>
              Active
            </p>
            <p className="mt-[0.4em] text-[0.75em]">Renews 14 Jan · EGP 1,450/mo</p>
          </div>
          <span className="rounded-full px-[0.6em] py-[0.2em] text-[0.65em] font-bold" style={{ background: C.night, color: C.volt }}>
            #PC-2087
          </span>
        </div>
        <div className="mx-auto mt-[1em] size-[10em] rounded-[0.6em] bg-white p-[0.6em]">
          <QR />
        </div>
        <p className="mt-[0.6em] text-center text-[0.7em] font-semibold">Show at the front desk to check in</p>
      </div>

      <div className="px-[1.4em] pt-[1.4em]">
        <div className="flex items-end justify-between">
          <p className="text-[1.15em] font-extrabold uppercase" style={display}>
            Next up
          </p>
          <span className="text-[0.75em] opacity-60">See all</span>
        </div>
        {[
          { t: "07:00", n: "HIIT Burn", c: "Coach Nour", s: "2 spots left", b: true },
          { t: "18:30", n: "Spin 45", c: "Coach Mariam", s: "Waitlist · #3" },
          { t: "20:00", n: "Boxing", c: "Coach Youssef", s: "6 spots left" },
        ].map((k) => (
          <div key={k.n} className="mt-[0.7em] flex items-center gap-[0.9em] rounded-[0.9em] p-[0.9em]" style={{ background: C.graphite }}>
            <span className="text-[0.95em] font-bold tabular-nums">{k.t}</span>
            <span className="flex-1">
              <span className="block text-[0.9em] font-semibold">{k.n}</span>
              <span className="block text-[0.72em] opacity-60">
                {k.c} · {k.s}
              </span>
            </span>
            <span
              className="rounded-full px-[0.8em] py-[0.35em] text-[0.7em] font-bold"
              style={k.b ? { background: C.volt, color: C.night } : { border: `1px solid ${C.mute}` }}
            >
              {k.b ? "Booked" : "Book"}
            </span>
          </div>
        ))}
        <div className="h-[2em]" />
      </div>
    </div>
  </PhoneFrame>
);
