import { PhoneFrame, StatusBar, BrowserFrame } from "../frames";

const serif = { fontFamily: "var(--font-fraunces, ui-serif), Georgia, 'Times New Roman', serif" };
const sans = { fontFamily: "var(--font-inter, var(--font-geist)), system-ui, sans-serif" };

const C = { linen: "#F6F1E9", charcoal: "#1E1B18", ember: "#A3441F", sand: "#D9C7AE", smoke: "#6E655B" };

const products = [
  { name: "Cedar & Smoke", notes: "Cedarwood · vetiver", price: 48, jar: "#2A2420", wax: "#E9DFD0" },
  { name: "Fig Leaf Noir", notes: "Fig · blackcurrant", price: 52, jar: "#C9B79C", wax: "#F3EBDD" },
  { name: "Amber Hour", notes: "Amber · tonka", price: 48, jar: "#B5532E", wax: "#F1E2CC" },
  { name: "Salt Linen", notes: "Sea salt · neroli", price: 44, jar: "#E4DCCD", wax: "#FBF7F0" },
];

/** A candle drawn in CSS: glass jar, wax, wick and a flickering flame. */
const Candle = ({ jar, wax, size = 1, label = true }: { jar: string; wax: string; size?: number; label?: boolean }) => (
  <div className="relative flex flex-col items-center" style={{ fontSize: `${size}em` }}>
    <div className="relative h-[3.2em] w-[1em]">
      <span className="absolute bottom-0 left-1/2 h-[3em] w-[1.2em] -translate-x-1/2 rounded-[50%_50%_45%_45%/60%_60%_40%_40%] bg-[radial-gradient(ellipse_at_50%_70%,#FFE7B0_0%,#FFB45A_35%,#E2652B_70%,transparent_72%)] motion-safe:animate-[flicker_2.4s_ease-in-out_infinite]" />
      <span className="absolute -bottom-[0.6em] left-1/2 h-[5em] w-[5em] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_180_90/0.35),transparent_65%)]" />
    </div>
    <span className="h-[0.5em] w-[0.12em] bg-[#2a2420]" />
    <div className="relative h-[7.5em] w-[6.5em] overflow-hidden rounded-[0.5em_0.5em_0.9em_0.9em]" style={{ background: jar }}>
      <span className="absolute inset-x-0 top-0 h-[1.2em]" style={{ background: wax }} />
      <span className="absolute inset-y-0 left-[12%] w-[10%] bg-white/15" />
      {label ? (
        <span className="absolute inset-x-[16%] top-[42%] flex flex-col items-center bg-[#F6F1E9] py-[0.4em] text-[0.55em] tracking-[0.2em] text-[#1E1B18]" style={serif}>
          MAISON
          <span className="text-[0.75em] tracking-[0.3em]">EMBER</span>
        </span>
      ) : null}
    </div>
  </div>
);

export const EmberDesktop = () => (
  <BrowserFrame url="maisonember.com" tone="light" scroll="-42%">
    <div style={{ background: C.linen, color: C.charcoal, ...sans }} className="w-[80em]">
      <div className="flex items-center justify-between border-b border-black/10 px-[3em] py-[1.4em] text-[0.95em]">
        <div className="flex gap-[2em] text-black/70">
          <span>Shop</span>
          <span>Collections</span>
          <span>Journal</span>
        </div>
        <span className="text-[1.7em] tracking-[0.32em]" style={serif}>
          MAISON EMBER
        </span>
        <div className="flex gap-[2em] text-black/70">
          <span>Craft</span>
          <span>Search</span>
          <span className="text-black">Bag (2)</span>
        </div>
      </div>

      <div className="grid grid-cols-[1.1fr_1fr] items-center gap-[3em] px-[3em] py-[3.5em]">
        <div>
          <p className="text-[0.85em] tracking-[0.3em] text-black/70">AUTUMN COLLECTION · HAND-POURED IN SMALL BATCHES</p>
          <p className="mt-[0.6em] text-[5.4em] leading-[0.95] font-light" style={serif}>
            Light something
            <br />
            <em className="font-normal" style={{ color: C.ember }}>
              worth keeping.
            </em>
          </p>
          <p className="mt-[1.4em] max-w-[30em] text-[1.1em] leading-[1.6] text-black/65">
            Coconut and rapeseed wax, cotton wicks, fragrance blended in our studio. Each candle burns for sixty slow hours.
          </p>
          <div className="mt-[2em] flex items-center gap-[1.5em]">
            <span className="px-[2em] py-[1em] text-[0.95em] tracking-[0.12em] text-[#F6F1E9]" style={{ background: C.charcoal }}>
              SHOP THE COLLECTION
            </span>
            <span className="border-b border-black/40 pb-[0.2em] text-[0.95em]">Our craft</span>
          </div>
        </div>
        <div className="relative flex h-[30em] items-end justify-center overflow-hidden" style={{ background: C.sand }}>
          <span className="absolute top-[2em] right-[2em] text-[0.8em] tracking-[0.25em] text-black/70">N°07</span>
          <div className="mb-[3em]">
            <Candle jar="#2A2420" wax="#E9DFD0" size={2.4} />
          </div>
          <span className="absolute bottom-0 h-[3em] w-full bg-[#CDB89C]" />
        </div>
      </div>

      <div className="px-[3em] pb-[3em]">
        <div className="mb-[1.6em] flex items-end justify-between">
          <p className="text-[2.4em]" style={serif}>
            Best loved
          </p>
          <span className="text-[0.9em] text-black/70">View all 16 candles →</span>
        </div>
        <div className="grid grid-cols-4 gap-[1.5em]">
          {products.map((p) => (
            <div key={p.name}>
              <div className="flex h-[18em] items-end justify-center pb-[2em]" style={{ background: "#EDE5D8" }}>
                <Candle jar={p.jar} wax={p.wax} size={1.3} label={false} />
              </div>
              <div className="mt-[1em] flex justify-between">
                <span className="text-[1.25em]" style={serif}>
                  {p.name}
                </span>
                <span className="tabular-nums">${p.price}</span>
              </div>
              <span className="text-[0.9em] text-black/70">{p.notes}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[3em] px-[3em] py-[4em] text-[#F6F1E9]" style={{ background: C.charcoal }}>
        <p className="text-[3.4em] leading-[1]" style={serif}>
          Poured by hand,
          <br />
          <em style={{ color: C.sand }}>never rushed.</em>
        </p>
        <p className="text-[1.1em] leading-[1.7] text-white/65">
          Every batch cures for two weeks before it leaves the studio, so the scent throws evenly from the first light to the last.
        </p>
      </div>
    </div>
  </BrowserFrame>
);

const notes = [
  { tier: "Top", value: "Bergamot · pink pepper", w: "58%" },
  { tier: "Heart", value: "Cedarwood · iris", w: "78%" },
  { tier: "Base", value: "Smoked vetiver · amber", w: "100%" },
];

export const EmberMobile = () => (
  <PhoneFrame scroll="-18%">
    <div className="w-[24em]" style={{ background: C.linen, color: C.charcoal, ...sans }}>
      <StatusBar />
      <div className="flex items-center justify-between px-[1.4em] py-[0.8em] text-[0.85em]">
        <span>←</span>
        <span className="tracking-[0.3em]" style={serif}>
          MAISON EMBER
        </span>
        <span>Bag 2</span>
      </div>
      <div className="mx-[1.4em] flex h-[17em] items-end justify-center pb-[1.5em]" style={{ background: C.sand }}>
        <Candle jar="#2A2420" wax="#E9DFD0" size={1.5} />
      </div>
      <div className="px-[1.4em] pt-[1.2em]">
        <div className="flex items-baseline justify-between">
          <p className="text-[1.9em]" style={serif}>
            Cedar &amp; Smoke
          </p>
          <span className="text-[1.1em] tabular-nums">$48</span>
        </div>
        <p className="mt-[0.3em] text-[0.85em] text-black/70">Woody · smoky · 60 hour burn</p>

        <p className="mt-[1.3em] text-[0.7em] tracking-[0.25em] text-black/70">SCENT PYRAMID</p>
        <div className="mt-[0.6em] space-y-[0.45em]">
          {notes.map((n) => (
            <div key={n.tier} className="flex items-center gap-[0.8em]">
              <span className="w-[3.4em] text-[0.75em] text-black/70">{n.tier}</span>
              <span className="relative h-[1.8em] flex-1">
                <span className="absolute inset-y-0 start-0 flex items-center px-[0.7em] text-[0.72em] text-[#F6F1E9]" style={{ width: n.w, background: C.ember }}>
                  {n.value}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-[1.3em] flex gap-[0.6em]">
          {["200 g", "400 g"].map((s, i) => (
            <span key={s} className="flex-1 border py-[0.7em] text-center text-[0.85em]" style={{ borderColor: i === 0 ? C.charcoal : "rgb(0 0 0 / 0.15)" }}>
              {s}
            </span>
          ))}
        </div>
        <div className="mt-[0.9em] py-[1em] text-center text-[0.85em] tracking-[0.15em] text-[#F6F1E9]" style={{ background: C.charcoal }}>
          ADD TO BAG — $48
        </div>
        <p className="mt-[1.4em] pb-[2em] text-[0.85em] leading-[1.6] text-black/70">
          A slow burn of cedar and smoked vetiver, lifted by bergamot. Hand-poured in 200 g amber glass.
        </p>
      </div>
    </div>
  </PhoneFrame>
);
