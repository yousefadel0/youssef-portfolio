import { Building } from "@/components/demos/art";
import { districts, egpShort, listings, monthly } from "@/components/demos/maskan-data";
import { BrowserFrame, PhoneFrame, StatusBar } from "../frames";

const C = { lime: "#EDE7DC", sand: "#C9B79A", basalt: "#1C1A16", brick: "#9A4A2F", palm: "#3E5B45", mute: "#5E5547" };
const serif = { fontFamily: "var(--font-instrument-serif, ui-serif), Georgia, serif" };
const sans = { fontFamily: "var(--font-inter, var(--font-geist)), system-ui, sans-serif" };

export const MaskanDesktop = () => (
  <BrowserFrame url="maskan.homes/search" tone="light" scroll="-24%">
    <div className="w-[80em]" style={{ background: C.lime, color: C.basalt, ...sans }}>
      <div className="flex items-center justify-between border-b px-[2.4em] py-[1.2em]" style={{ borderColor: "rgb(28 26 22 / 0.12)" }}>
        <span className="text-[2em] italic" style={serif}>
          Maskan
        </span>
        <div className="flex gap-[2em] text-[0.9em]">
          <span>Buy</span>
          <span>New launches</span>
          <span>Developers</span>
          <span>Saved (3)</span>
        </div>
        <span className="rounded-full px-[1.2em] py-[0.6em] text-[0.85em]" style={{ background: C.basalt, color: C.lime }}>
          Book a viewing
        </span>
      </div>

      <div className="px-[2.4em] pt-[2em]">
        <h3 className="text-[3.6em] leading-[0.95]" style={serif}>
          Homes in <em style={{ color: C.brick }}>New Cairo</em>
          <br />
          under EGP 15M
        </h3>
        <div className="mt-[1.4em] flex flex-wrap gap-[0.5em] text-[0.85em]">
          {["New Cairo", "Apartment", "3+ beds", "EGP 4M – 15M", "Ready to move"].map((f, i) => (
            <span key={f} className="rounded-full border px-[1em] py-[0.5em]" style={i === 0 ? { background: C.basalt, color: C.lime, borderColor: C.basalt } : { borderColor: "rgb(28 26 22 / 0.2)" }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1.35fr_1fr] gap-[1.6em] p-[2.4em]">
        <div className="grid grid-cols-2 gap-[1.2em]">
          {listings.slice(0, 4).map((l) => (
            <div key={l.id} className="overflow-hidden rounded-[0.8em] bg-white">
              <div className="relative h-[10em]">
                <Building art={l.art} className="absolute inset-0 h-full w-full" />
                <span className="absolute top-[0.6em] left-[0.6em] rounded-full px-[0.7em] py-[0.25em] text-[0.7em]" style={{ background: C.lime }}>
                  {l.delivery}
                </span>
              </div>
              <div className="p-[0.9em]">
                <p className="text-[1.4em]" style={serif}>
                  {egpShort(l.price)}
                </p>
                <p className="text-[0.8em]" style={{ color: C.mute }}>
                  {l.beds} bd · {l.baths} ba · {l.size} m² · {l.area}
                </p>
                <p className="mt-[0.4em] text-[0.78em]" style={{ color: C.palm }}>
                  {egpShort(Math.round(monthly(l.price, 10, 8)))}/mo over 8 yrs
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-[0.8em]" style={{ background: "#E2D6C0" }}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M0 26C20 20 40 24 60 18S90 12 100 16V0H0Z" fill="#A9C7C9" />
            <path d="M44 100C48 70 52 40 50 26" stroke="#8FB3C9" strokeWidth="2.4" fill="none" />
            {districts.map((d) => (
              <rect key={d.area} x={d.x} y={d.y} width={d.w} height={d.h} rx="3" fill={d.area === "New Cairo" ? C.sand : "#D4C6AD"} stroke={C.basalt} strokeOpacity="0.15" />
            ))}
          </svg>
          {districts.map((d) => (
            <span key={d.area} className="absolute text-[0.7em] font-medium" style={{ left: `${d.x + 1.5}%`, top: `${d.y + 1.5}%`, color: C.mute }}>
              {d.area}
            </span>
          ))}
          {listings.map((l, i) => (
            <span
              key={l.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-[0.55em] py-[0.2em] text-[0.65em] font-semibold whitespace-nowrap shadow"
              style={{ left: `${l.pin.x}%`, top: `${l.pin.y}%`, background: i === 0 ? C.brick : C.basalt, color: C.lime }}
            >
              {egpShort(l.price)}
            </span>
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

export const MaskanMobile = () => {
  const l = listings[0];
  const pay = monthly(l.price, 10, 8);
  return (
    <PhoneFrame scroll="-20%">
      <div className="w-[24em]" style={{ background: C.lime, color: C.basalt, ...sans }}>
        <div className="relative h-[17em]">
          <Building art={l.art} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-x-0 top-0">
            <StatusBar color={C.basalt} />
          </div>
          <span className="absolute right-[1em] bottom-[1em] rounded-full px-[0.8em] py-[0.3em] text-[0.7em]" style={{ background: C.lime }}>
            1 / 12
          </span>
        </div>
        <div className="px-[1.3em] pt-[1.1em]">
          <p className="text-[0.72em]" style={{ color: C.mute }}>
            {l.compound} · {l.area}
          </p>
          <p className="mt-[0.2em] text-[1.6em] leading-[1.05]" style={serif}>
            {l.title}
          </p>
          <p className="mt-[0.4em] text-[1.25em]" style={serif}>
            {egpShort(l.price)}
          </p>
          <div className="mt-[0.8em] grid grid-cols-3 gap-[0.4em] text-center text-[0.72em]">
            {[`${l.beds} beds`, `${l.baths} baths`, `${l.size} m²`].map((s) => (
              <span key={s} className="rounded-[0.6em] bg-white py-[0.6em]">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-[1em] rounded-[1em] p-[1em]" style={{ background: C.basalt, color: C.lime }}>
            <p className="text-[0.7em] opacity-80">Installment calculator</p>
            <div className="mt-[0.5em] flex justify-between text-[0.75em]">
              <span>Down payment 10%</span>
              <span>8 years</span>
            </div>
            <div className="mt-[0.4em] h-[0.3em] rounded-full bg-white/20">
              <div className="h-full w-[30%] rounded-full" style={{ background: C.sand }} />
            </div>
            <p className="mt-[0.8em] text-[1.7em] leading-none" style={serif}>
              {egpShort(Math.round(pay))}
              <span className="text-[0.45em]"> / month</span>
            </p>
          </div>
          <p className="mt-[1em] text-[0.75em] font-semibold">Book a viewing</p>
          <div className="mt-[0.4em] grid grid-cols-4 gap-[0.35em] text-center text-[0.7em]">
            {["Sat 14", "Sun 15", "Mon 16", "Tue 17"].map((d, i) => (
              <span key={d} className="rounded-[0.6em] py-[0.6em]" style={i === 1 ? { background: C.brick, color: C.lime } : { background: "#fff" }}>
                {d}
              </span>
            ))}
          </div>
          <div className="mt-[0.9em] mb-[1.6em] rounded-[0.9em] py-[0.9em] text-center text-[0.85em] font-semibold" style={{ background: C.basalt, color: C.lime }}>
            Confirm Sun 15 · 11:00
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
};
