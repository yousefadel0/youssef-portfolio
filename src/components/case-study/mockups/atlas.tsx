import { BrowserFrame, PhoneFrame, StatusBar } from "../frames";

const C = { bg: "#16181B", panel: "#1E2125", line: "#2C3035", mist: "#E7E9EC", mute: "#8C939C", amber: "#F5A524", pos: "#3DBE7A", neg: "#EF5F63" };
const ui = { fontFamily: "var(--font-inter, var(--font-geist)), system-ui, sans-serif" };
const mono = { fontFamily: "var(--font-jetbrains, var(--font-geist-mono)), ui-monospace, monospace" };

const months = [3.1, 3.4, 3.2, 3.6, 3.9, 3.7, 4.1, 4.0, 4.3, 4.5, 4.4, 4.82];
const monthLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const branches = [
  { name: "Zamalek", v: 1.42 },
  { name: "New Cairo", v: 1.18 },
  { name: "Maadi", v: 0.96 },
  { name: "Alexandria", v: 0.74 },
  { name: "Heliopolis", v: 0.52 },
];
const orders = [
  { id: "A-10482", who: "Mariam Ali", branch: "Zamalek", amt: "1,240", status: "Paid" },
  { id: "A-10481", who: "Ahmed Kamal", branch: "Maadi", amt: "386", status: "Refunded" },
  { id: "A-10480", who: "Laila Mansour", branch: "New Cairo", amt: "2,915", status: "Paid" },
  { id: "A-10479", who: "Omar Hegazy", branch: "Alexandria", amt: "742", status: "Pending" },
  { id: "A-10478", who: "Nada Farouk", branch: "Zamalek", amt: "1,068", status: "Paid" },
];
const statusColor = (s: string) => (s === "Paid" ? C.pos : s === "Refunded" ? C.neg : C.amber);

const Spark = ({ up = true }: { up?: boolean }) => (
  <svg viewBox="0 0 60 20" className="h-[1.6em] w-[4.5em]" aria-hidden>
    <polyline
      points={up ? "0,16 8,14 16,15 24,10 32,11 40,7 48,8 60,3" : "0,5 8,7 16,6 24,10 32,9 40,13 48,12 60,15"}
      fill="none"
      stroke={up ? C.pos : C.neg}
      strokeWidth="1.6"
    />
  </svg>
);

const kpis = [
  { k: "Revenue", v: "EGP 4.82M", d: "+12.4%", up: true },
  { k: "Orders", v: "18,240", d: "+8.1%", up: true },
  { k: "Avg. basket", v: "EGP 264", d: "+3.9%", up: true },
  { k: "Low-stock SKUs", v: "23", d: "+5", up: false },
];

export const AtlasDesktop = () => (
  <BrowserFrame url="console.atlas-retail.com" scroll="-26%">
    <div className="flex w-[80em]" style={{ background: C.bg, color: C.mist, ...ui }}>
      <aside className="w-[14em] shrink-0 border-e p-[1.4em] text-[0.88em]" style={{ borderColor: C.line }}>
        <span className="mb-[1.6em] flex items-center gap-[0.6em] text-[1.15em] font-semibold">
          <span className="grid size-[1.6em] place-items-center rounded-[0.35em]" style={{ background: C.amber }}>
            <span className="size-0 border-x-[0.4em] border-b-[0.7em] border-x-transparent" style={{ borderBottomColor: C.bg }} />
          </span>
          Atlas
        </span>
        {["Overview", "Orders", "Products", "Inventory", "Customers", "Staff", "Reports", "Settings"].map((item) => (
          <span key={item} className="flex items-center justify-between rounded-[0.35em] px-[0.7em] py-[0.5em]" style={item === "Overview" ? { background: C.panel } : { color: C.mute }}>
            {item}
            {item === "Inventory" ? (
              <span className="rounded-[0.3em] px-[0.4em] text-[0.8em]" style={{ background: C.amber, color: C.bg, ...mono }}>
                23
              </span>
            ) : null}
          </span>
        ))}
        <div className="mt-[2em] rounded-[0.4em] border px-[0.7em] py-[0.5em] text-[0.85em]" style={{ borderColor: C.line, color: C.mute, ...mono }}>
          ⌘K Search or jump…
        </div>
      </aside>

      <div className="flex-1 p-[1.8em]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[1.6em] font-semibold tracking-[-0.01em]">Overview</p>
            <p className="text-[0.82em]" style={{ color: C.mute }}>
              All branches · Jan 1 – Dec 14
            </p>
          </div>
          <div className="flex gap-[0.5em] text-[0.8em]" style={mono}>
            {["MTD", "QTD", "YTD"].map((r) => (
              <span key={r} className="rounded-[0.35em] border px-[0.8em] py-[0.4em]" style={r === "YTD" ? { background: C.mist, color: C.bg, borderColor: C.mist } : { borderColor: C.line, color: C.mute }}>
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-[1.4em] grid grid-cols-4 gap-[0.8em]">
          {kpis.map((k) => (
            <div key={k.k} className="rounded-[0.5em] border p-[1em]" style={{ background: C.panel, borderColor: C.line }}>
              <p className="text-[0.78em]" style={{ color: C.mute }}>
                {k.k}
              </p>
              <div className="mt-[0.3em] flex items-end justify-between">
                <p className="text-[1.55em] font-semibold tabular-nums" style={mono}>
                  {k.v}
                </p>
                <Spark up={k.up} />
              </div>
              <p className="mt-[0.2em] text-[0.75em]" style={{ color: k.up ? C.pos : C.neg, ...mono }}>
                {k.d} vs last year
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[0.8em] grid grid-cols-[1.6fr_1fr] gap-[0.8em]">
          <div className="rounded-[0.5em] border p-[1.2em]" style={{ background: C.panel, borderColor: C.line }}>
            <div className="flex justify-between text-[0.85em]">
              <span>Revenue by month</span>
              <span style={{ color: C.mute, ...mono }}>EGP M</span>
            </div>
            <div className="mt-[1em] flex h-[11em] items-end gap-[0.55em]">
              {months.map((m, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-[0.4em]">
                  <span className="grow-bar w-full rounded-t-[0.2em]" style={{ height: `${(m / 5) * 9.5}em`, background: i === 11 ? C.amber : "#3A3F46", animationDelay: `${i * 40}ms` }} />
                  <span className="text-[0.7em]" style={{ color: C.mute, ...mono }}>
                    {monthLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[0.5em] border p-[1.2em]" style={{ background: C.panel, borderColor: C.line }}>
            <p className="text-[0.85em]">Sales by branch</p>
            <div className="mt-[1em] space-y-[0.8em]">
              {branches.map((b) => (
                <div key={b.name} className="text-[0.8em]">
                  <div className="flex justify-between">
                    <span style={{ color: C.mute }}>{b.name}</span>
                    <span className="tabular-nums" style={mono}>
                      {b.v.toFixed(2)}M
                    </span>
                  </div>
                  <div className="mt-[0.3em] h-[0.45em] rounded-full" style={{ background: C.line }}>
                    <div className="h-full rounded-full" style={{ width: `${(b.v / 1.42) * 100}%`, background: C.mist }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-[0.8em] rounded-[0.5em] border" style={{ background: C.panel, borderColor: C.line }}>
          <div className="flex justify-between border-b px-[1.2em] py-[0.8em] text-[0.85em]" style={{ borderColor: C.line }}>
            <span>Recent orders</span>
            <span style={{ color: C.mute }}>Export CSV</span>
          </div>
          {orders.map((o) => (
            <div key={o.id} className="grid grid-cols-[1fr_1.4fr_1fr_1fr_0.8fr] items-center border-b px-[1.2em] py-[0.7em] text-[0.82em] last:border-0" style={{ borderColor: C.line }}>
              <span style={mono}>#{o.id}</span>
              <span>{o.who}</span>
              <span style={{ color: C.mute }}>{o.branch}</span>
              <span className="tabular-nums" style={mono}>
                EGP {o.amt}
              </span>
              <span className="flex items-center gap-[0.4em]">
                <span className="size-[0.5em] rounded-full" style={{ background: statusColor(o.status) }} />
                {o.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

export const AtlasMobile = () => (
  <PhoneFrame scroll="-20%">
    <div className="w-[24em]" style={{ background: "#F4F5F7", color: C.bg, ...ui }}>
      <StatusBar color={C.bg} />
      <div className="flex items-center justify-between px-[1.4em] py-[0.6em]">
        <span className="text-[1.3em] font-semibold">Overview</span>
        <span className="rounded-[0.4em] border px-[0.6em] py-[0.25em] text-[0.7em]" style={{ borderColor: "#D5D8DD", ...mono }}>
          YTD
        </span>
      </div>
      <div className="mx-[1.4em] rounded-[0.8em] p-[1.2em]" style={{ background: C.bg, color: C.mist }}>
        <p className="text-[0.75em]" style={{ color: C.mute }}>
          Revenue · all branches
        </p>
        <p className="mt-[0.2em] text-[2em] font-semibold tabular-nums" style={mono}>
          EGP 4.82M
        </p>
        <p className="text-[0.75em]" style={{ color: C.pos, ...mono }}>
          ▲ 12.4% vs last year
        </p>
        <div className="mt-[0.8em] flex h-[5em] items-end gap-[0.3em]">
          {months.map((m, i) => (
            <span key={i} className="flex-1 rounded-t-[0.15em]" style={{ height: `${(m / 5) * 100}%`, background: i === 11 ? C.amber : "#3A3F46" }} />
          ))}
        </div>
      </div>
      <div className="mx-[1.4em] mt-[0.8em] grid grid-cols-2 gap-[0.6em]">
        {kpis.slice(1).map((k) => (
          <div key={k.k} className="rounded-[0.7em] border bg-white p-[0.9em]" style={{ borderColor: "#E1E4E8" }}>
            <p className="text-[0.7em]" style={{ color: "#5E6670" }}>
              {k.k}
            </p>
            <p className="text-[1.2em] font-semibold tabular-nums" style={mono}>
              {k.v}
            </p>
            <p className="text-[0.68em]" style={{ color: k.up ? "#18794A" : "#C4383D", ...mono }}>
              {k.d}
            </p>
          </div>
        ))}
        <div className="rounded-[0.7em] p-[0.9em]" style={{ background: C.amber }}>
          <p className="text-[0.7em] font-medium">Goal · Q4</p>
          <p className="text-[1.2em] font-semibold" style={mono}>
            86%
          </p>
          <div className="mt-[0.3em] h-[0.35em] rounded-full bg-black/15">
            <div className="h-full w-[86%] rounded-full bg-black/80" />
          </div>
        </div>
      </div>
      <p className="mx-[1.4em] mt-[1.2em] text-[0.8em] font-semibold">Low stock</p>
      {[
        ["Linen shirt · M", "4 left"],
        ["Canvas tote", "6 left"],
        ["Leather belt · 90", "2 left"],
      ].map(([n, s]) => (
        <div key={n} className="mx-[1.4em] mt-[0.5em] flex justify-between rounded-[0.6em] border bg-white px-[0.9em] py-[0.7em] text-[0.8em]" style={{ borderColor: "#E1E4E8" }}>
          <span>{n}</span>
          <span style={{ color: "#B25E00", ...mono }}>{s}</span>
        </div>
      ))}
      <div className="h-[2em]" />
    </div>
  </PhoneFrame>
);
