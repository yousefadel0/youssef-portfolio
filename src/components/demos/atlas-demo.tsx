"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useStored } from "./use-stored";

const ui = { fontFamily: "var(--font-inter, var(--font-geist)), system-ui, sans-serif" };
const mono = { fontFamily: "var(--font-jetbrains, var(--font-geist-mono)), ui-monospace, monospace" };

const themes = {
  dark: { bg: "#16181B", panel: "#1E2125", line: "#2C3035", text: "#E7E9EC", mute: "#9AA1AA", bar: "#3A3F46", hover: "#24282D" },
  light: { bg: "#F4F5F7", panel: "#FFFFFF", line: "#E1E4E8", text: "#16181B", mute: "#5E6670", bar: "#C9CED5", hover: "#F0F2F4" },
};
const amber = "#F5A524";
const statusColor: Record<Status, string> = { Paid: "#3DBE7A", Pending: "#F5A524", Refunded: "#EF5F63", Shipped: "#6BA8F0" };

type Status = "Paid" | "Pending" | "Refunded" | "Shipped";
type Order = { id: string; customer: string; branch: string; day: number; amount: number; status: Status; items: number };

const first = ["Mariam", "Ahmed", "Laila", "Omar", "Nada", "Karim", "Salma", "Youssef", "Hana", "Mostafa", "Farida", "Tarek", "Dina", "Hassan", "Yara"];
const last = ["Ali", "Kamal", "Mansour", "Hegazy", "Farouk", "Samir", "Ezz", "Nabil", "Mostafa", "Fathy", "Adel", "Saad"];
const branches = ["Zamalek", "New Cairo", "Maadi", "Alexandria", "Heliopolis"];
const statuses: Status[] = ["Paid", "Paid", "Paid", "Shipped", "Pending", "Refunded"];

/** Deterministic sample orders so every visitor sees the same data. */
const makeOrders = (): Order[] => {
  let s = 42;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: 64 }, (_, i) => ({
    id: `A-${10482 - i}`,
    customer: `${first[Math.floor(rnd() * first.length)]} ${last[Math.floor(rnd() * last.length)]}`,
    branch: branches[Math.floor(rnd() * branches.length)],
    day: Math.floor(i / 3),
    amount: Math.round(180 + rnd() * 3200),
    status: statuses[Math.floor(rnd() * statuses.length)],
    items: 1 + Math.floor(rnd() * 5),
  }));
};

const seedOrders = makeOrders();

const monthly = [3.1, 3.4, 3.2, 3.6, 3.9, 3.7, 4.1, 4.0, 4.3, 4.5, 4.4, 4.82];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const egp = (n: number) => `EGP ${new Intl.NumberFormat("en-US").format(n)}`;
const PAGE = 10;

export const AtlasDemo = () => {
  const [mode, setMode] = useStored<"dark" | "light">("demo:atlas-console:theme", "dark");
  const [orders, setOrders] = useStored<Order[]>("demo:atlas-console:orders", seedOrders);
  const [range, setRange] = useState(12);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "All">("All");
  const [sort, setSort] = useState<{ key: "amount" | "day"; dir: 1 | -1 }>({ key: "day", dir: 1 });
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [detail, setDetail] = useState<Order | null>(null);
  const [palette, setPalette] = useState(false);
  const [cmd, setCmd] = useState("");
  const [hover, setHover] = useState<number | null>(null);
  const T = themes[mode];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return orders
      .filter((o) => (status === "All" || o.status === status) && (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.branch.toLowerCase().includes(q)))
      .sort((a, b) => (a[sort.key] - b[sort.key]) * sort.dir);
  }, [orders, query, status, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const current = filtered.slice(page * PAGE, page * PAGE + PAGE);

  const revenue = orders.filter((o) => o.status !== "Refunded").reduce((s, o) => s + o.amount, 0);
  const avg = Math.round(revenue / Math.max(1, orders.filter((o) => o.status !== "Refunded").length));
  const pending = orders.filter((o) => o.status === "Pending").length;
  const series = monthly.slice(-range);
  const labels = months.slice(-range);

  const exportCsv = () => {
    const rows = [["Order", "Customer", "Branch", "Amount", "Status"], ...filtered.map((o) => [o.id, o.customer, o.branch, String(o.amount), o.status])];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "atlas-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const markShipped = () => {
    setOrders((list) => list.map((o) => (selected.has(o.id) && o.status !== "Refunded" ? { ...o, status: "Shipped" } : o)));
    setSelected(new Set());
  };

  const commands = [
    { label: "Go to orders", run: () => document.getElementById("atlas-orders")?.scrollIntoView({ behavior: "smooth" }) },
    { label: `Switch to ${mode === "dark" ? "light" : "dark"} theme`, run: () => setMode(mode === "dark" ? "light" : "dark") },
    { label: "Show pending orders", run: () => { setStatus("Pending"); setPage(0); } },
    { label: "Show refunds", run: () => { setStatus("Refunded"); setPage(0); } },
    { label: "Clear filters", run: () => { setStatus("All"); setQuery(""); setPage(0); } },
    { label: "Export orders as CSV", run: exportCsv },
    { label: "Revenue: last 3 months", run: () => setRange(3) },
    { label: "Revenue: last 12 months", run: () => setRange(12) },
  ];
  const shown = commands.filter((c) => c.label.toLowerCase().includes(cmd.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
        setCmd("");
      }
      if (e.key === "Escape") {
        setPalette(false);
        setDetail(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleSort = (key: "amount" | "day") => setSort((s) => ({ key, dir: s.key === key ? ((s.dir * -1) as 1 | -1) : -1 }));
  const allOnPage = current.length > 0 && current.every((o) => selected.has(o.id));

  const panel = "rounded-xl border";
  const panelStyle = { background: T.panel, borderColor: T.line };

  return (
    <div className="min-h-full transition-colors duration-300" style={{ background: T.bg, color: T.text, ...ui }}>
      {/* Top bar */}
      <div className="sticky top-[var(--demo-top,0px)] z-20 flex items-center gap-3 border-b px-4 py-3 @3xl:px-6" style={{ background: T.bg, borderColor: T.line }}>
        <span className="flex items-center gap-2 font-semibold">
          <span className="grid size-6 place-items-center rounded-md" style={{ background: amber }}>
            <span className="size-0 border-x-[5px] border-b-[8px] border-x-transparent" style={{ borderBottomColor: "#16181B" }} />
          </span>
          Atlas
        </span>
        <button
          type="button"
          onClick={() => {
            setPalette(true);
            setCmd("");
          }}
          className="ms-2 hidden flex-1 items-center justify-between rounded-lg border px-3 py-1.5 text-[0.85rem] @xl:flex @3xl:max-w-sm"
          style={{ borderColor: T.line, color: T.mute }}
        >
          Search or run a command…
          <kbd className="rounded border px-1.5 text-[0.72rem]" style={{ borderColor: T.line, ...mono }}>
            ⌘K
          </kbd>
        </button>
        <div className="ms-auto flex items-center gap-2">
          <button type="button" onClick={() => setPalette(true)} className="rounded-lg border px-2.5 py-1.5 text-[0.8rem] @xl:hidden" style={{ borderColor: T.line }}>
            ⌘K
          </button>
          <button type="button" onClick={() => setMode(mode === "dark" ? "light" : "dark")} className="rounded-lg border px-3 py-1.5 text-[0.8rem]" style={{ borderColor: T.line }} title="Toggle theme">
            {mode === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      <div className="space-y-4 p-4 @3xl:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-[1.5rem] font-semibold tracking-tight">Overview</h1>
            <p className="text-[0.85rem]" style={{ color: T.mute }}>
              All branches · this year
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4">
          {[
            { k: "Revenue · latest orders", v: egp(revenue), d: "+12.4%", up: true },
            { k: "Orders", v: String(orders.length), d: "+8.1%", up: true },
            { k: "Avg. basket", v: egp(avg), d: "+3.9%", up: true },
            { k: "Pending", v: String(pending), d: pending > 10 ? "needs attention" : "on track", up: pending <= 10 },
          ].map((m) => (
            <div key={m.k} className={cn(panel, "p-4")} style={panelStyle}>
              <p className="text-[0.8rem]" style={{ color: T.mute }}>
                {m.k}
              </p>
              <p className="mt-1 text-[1.25rem] font-semibold tabular-nums @3xl:text-[1.45rem]" style={mono}>
                {m.v}
              </p>
              <p className="mt-0.5 text-[0.75rem]" style={{ color: m.up ? "#3DBE7A" : "#EF5F63", ...mono }}>
                {m.d}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue chart + branches */}
        <div className="grid gap-3 @4xl:grid-cols-[1.6fr_1fr]">
          <div className={cn(panel, "p-4")} style={panelStyle}>
            <div className="flex items-center justify-between">
              <p className="text-[0.9rem] font-medium">Revenue by month</p>
              <div className="flex gap-1" role="radiogroup" aria-label="Range">
                {[3, 6, 12].map((r) => (
                  <button key={r} type="button" role="radio" aria-checked={range === r} onClick={() => setRange(r)} className="rounded-md px-2.5 py-1 text-[0.75rem]" style={{ ...mono, background: range === r ? T.text : "transparent", color: range === r ? T.bg : T.mute }}>
                    {r}M
                  </button>
                ))}
              </div>
            </div>
            <div className="relative mt-4 flex h-44 items-end gap-1.5">
              {series.map((v, i) => (
                <div key={`${range}-${i}`} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5" onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
                  {hover === i ? (
                    <span className="absolute top-0 rounded-md px-2 py-1 text-[0.72rem] whitespace-nowrap shadow" style={{ background: T.text, color: T.bg, ...mono }}>
                      {labels[i]} · EGP {v.toFixed(2)}M
                    </span>
                  ) : null}
                  <span
                    className="grow-bar w-full rounded-t"
                    style={{ height: `${(v / 5) * 100}%`, background: i === series.length - 1 || hover === i ? amber : T.bar, animationDelay: `${i * 30}ms` }}
                  />
                  <span className="text-[0.68rem]" style={{ color: T.mute, ...mono }}>
                    {labels[i].slice(0, range > 6 ? 1 : 3)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={cn(panel, "p-4")} style={panelStyle}>
            <p className="text-[0.9rem] font-medium">Sales by branch</p>
            <ul className="mt-3 space-y-3">
              {branches.map((b) => {
                const total = orders.filter((o) => o.branch === b && o.status !== "Refunded").reduce((s, o) => s + o.amount, 0);
                const max = Math.max(...branches.map((x) => orders.filter((o) => o.branch === x && o.status !== "Refunded").reduce((s, o) => s + o.amount, 0)));
                return (
                  <li key={b}>
                    <div className="flex justify-between text-[0.8rem]">
                      <span style={{ color: T.mute }}>{b}</span>
                      <span className="tabular-nums" style={mono}>
                        {egp(total)}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full" style={{ background: T.line }}>
                      <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${(total / max) * 100}%`, background: T.text }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Orders table */}
        <div id="atlas-orders" className={cn(panel, "scroll-mt-20 overflow-hidden")} style={panelStyle}>
          <div className="flex flex-wrap items-center gap-2 border-b p-3" style={{ borderColor: T.line }}>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search orders, customers, branches"
              aria-label="Search orders"
              className="min-w-0 flex-1 rounded-lg border bg-transparent px-3 py-1.5 text-[0.85rem] outline-none"
              style={{ borderColor: T.line }}
            />
            <div className="flex flex-wrap gap-1">
              {(["All", "Paid", "Shipped", "Pending", "Refunded"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setStatus(s);
                    setPage(0);
                  }}
                  className="rounded-md border px-2.5 py-1 text-[0.75rem]"
                  style={{ borderColor: status === s ? T.text : T.line, background: status === s ? T.text : "transparent", color: status === s ? T.bg : T.mute }}
                >
                  {s}
                </button>
              ))}
            </div>
            <button type="button" onClick={exportCsv} className="rounded-md border px-2.5 py-1 text-[0.75rem]" style={{ borderColor: T.line }}>
              Export CSV
            </button>
          </div>

          {selected.size > 0 ? (
            <div className="flex items-center justify-between border-b px-3 py-2 text-[0.82rem]" style={{ borderColor: T.line, background: T.hover }}>
              <span>{selected.size} selected</span>
              <button type="button" onClick={markShipped} className="rounded-md px-3 py-1 font-medium" style={{ background: amber, color: "#16181B" }}>
                Mark as shipped
              </button>
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-[0.82rem]">
              <thead>
                <tr className="border-b text-start" style={{ borderColor: T.line, color: T.mute }}>
                  <th className="w-10 p-3">
                    <input
                      type="checkbox"
                      aria-label="Select all on page"
                      checked={allOnPage}
                      onChange={() =>
                        setSelected((cur) => {
                          const next = new Set(cur);
                          current.forEach((o) => (allOnPage ? next.delete(o.id) : next.add(o.id)));
                          return next;
                        })
                      }
                      className="accent-[#F5A524]"
                    />
                  </th>
                  <th className="p-3 text-start font-medium">Order</th>
                  <th className="p-3 text-start font-medium">Customer</th>
                  <th className="p-3 text-start font-medium">Branch</th>
                  <th className="p-3 text-start font-medium">
                    <button type="button" onClick={() => toggleSort("day")} className="inline-flex items-center gap-1">
                      Date {sort.key === "day" ? (sort.dir === 1 ? "↓" : "↑") : ""}
                    </button>
                  </th>
                  <th className="p-3 text-end font-medium">
                    <button type="button" onClick={() => toggleSort("amount")} className="inline-flex items-center gap-1">
                      Amount {sort.key === "amount" ? (sort.dir === 1 ? "↑" : "↓") : ""}
                    </button>
                  </th>
                  <th className="p-3 text-start font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {current.map((o) => (
                  <tr key={o.id} onClick={() => setDetail(o)} className="cursor-pointer border-b transition-colors last:border-0" style={{ borderColor: T.line, background: selected.has(o.id) ? T.hover : "transparent" }}>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        aria-label={`Select ${o.id}`}
                        checked={selected.has(o.id)}
                        onChange={() =>
                          setSelected((cur) => {
                            const next = new Set(cur);
                            if (next.has(o.id)) next.delete(o.id);
                            else next.add(o.id);
                            return next;
                          })
                        }
                        className="accent-[#F5A524]"
                      />
                    </td>
                    <td className="p-3" style={mono}>
                      #{o.id}
                    </td>
                    <td className="p-3">{o.customer}</td>
                    <td className="p-3" style={{ color: T.mute }}>
                      {o.branch}
                    </td>
                    <td className="p-3" style={{ color: T.mute, ...mono }}>
                      Dec {14 - Math.min(13, o.day)}
                    </td>
                    <td className="p-3 text-end tabular-nums" style={mono}>
                      {egp(o.amount)}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full" style={{ background: statusColor[o.status] }} />
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {current.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center" style={{ color: T.mute }}>
                      No orders match these filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t p-3 text-[0.8rem]" style={{ borderColor: T.line, color: T.mute }}>
            <span>
              {filtered.length} orders · page {page + 1} of {pages}
            </span>
            <span className="flex gap-1">
              <button type="button" disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded-md border px-2.5 py-1 disabled:opacity-40" style={{ borderColor: T.line }}>
                Prev
              </button>
              <button type="button" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)} className="rounded-md border px-2.5 py-1 disabled:opacity-40" style={{ borderColor: T.line }}>
                Next
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* Order drawer */}
      {detail ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-40" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <aside
            role="dialog"
            aria-label={`Order ${detail.id}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 end-0 w-full max-w-sm overflow-y-auto border-s p-5 motion-safe:animate-[sheet-up_0.35s_ease]"
            style={{ background: T.panel, borderColor: T.line }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[1.1rem] font-semibold" style={mono}>
                #{detail.id}
              </p>
              <button type="button" onClick={() => setDetail(null)} className="text-[0.85rem] underline">
                Close
              </button>
            </div>
            <p className="mt-1 text-[0.85rem]" style={{ color: T.mute }}>
              {detail.customer} · {detail.branch}
            </p>
            <p className="mt-4 text-[1.8rem] font-semibold" style={mono}>
              {egp(detail.amount)}
            </p>
            <p className="text-[0.85rem]" style={{ color: T.mute }}>
              {detail.items} items · {detail.status}
            </p>
            <p className="mt-6 text-[0.8rem] font-medium" style={{ color: T.mute }}>
              Timeline
            </p>
            <ol className="mt-3 space-y-4 border-s ps-4" style={{ borderColor: T.line }}>
              {["Order placed", "Payment confirmed", detail.status === "Refunded" ? "Refund issued" : detail.status === "Shipped" ? "Shipped with Bosta" : "Preparing at branch"].map((step, i) => (
                <li key={step} className="relative">
                  <span className="absolute -start-[1.32rem] top-1 size-2.5 rounded-full" style={{ background: i === 2 ? statusColor[detail.status] : T.text }} />
                  <p className="text-[0.9rem]">{step}</p>
                  <p className="text-[0.75rem]" style={{ color: T.mute, ...mono }}>
                    Dec {14 - Math.min(13, detail.day)} · {10 + i * 2}:{i === 0 ? "04" : i === 1 ? "05" : "40"}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      ) : null}

      {/* Command palette */}
      {palette ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-50 flex items-start justify-center bg-black/50 p-4 pt-[12%]" onClick={() => setPalette(false)}>
          <div role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl motion-safe:animate-[sheet-up_0.25s_ease]" style={{ background: T.panel, borderColor: T.line }}>
            <input
              autoFocus
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && shown[0]) {
                  shown[0].run();
                  setPalette(false);
                }
              }}
              placeholder="Type a command…"
              aria-label="Command"
              className="w-full border-b bg-transparent px-4 py-3.5 text-[0.95rem] outline-none"
              style={{ borderColor: T.line }}
            />
            <ul className="max-h-72 overflow-y-auto p-1.5">
              {shown.map((c, i) => (
                <li key={c.label}>
                  <button
                    type="button"
                    onClick={() => {
                      c.run();
                      setPalette(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-start text-[0.9rem] transition-colors"
                    style={{ background: i === 0 ? T.hover : "transparent" }}
                  >
                    {c.label}
                    {i === 0 ? (
                      <kbd className="text-[0.7rem]" style={{ color: T.mute, ...mono }}>
                        ↵
                      </kbd>
                    ) : null}
                  </button>
                </li>
              ))}
              {shown.length === 0 ? <li className="px-3 py-4 text-center text-[0.85rem]" style={{ color: T.mute }}>No commands found.</li> : null}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};
