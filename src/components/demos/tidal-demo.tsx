"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useStored } from "./use-stored";

const C = { abyss: "#0A1F2B", deep: "#12384A", foam: "#F1F5F4", sea: "#5BE3C4", coral: "#FF6B5B", mute: "#9DB9C0", sand: "#F2C879", lilac: "#B9A7FF", sky: "#7CC4F2" };
const ui = { fontFamily: "var(--font-jakarta, var(--font-geist)), system-ui, sans-serif" };

type Cat = "food" | "transport" | "bills" | "fun" | "shopping" | "income";
const cats: Record<Cat, { label: string; color: string }> = {
  food: { label: "Food", color: C.coral },
  transport: { label: "Transport", color: C.sea },
  bills: { label: "Bills", color: C.sand },
  fun: { label: "Fun", color: C.lilac },
  shopping: { label: "Shopping", color: C.sky },
  income: { label: "Income", color: C.sea },
};
const spendCats: Exclude<Cat, "income">[] = ["food", "transport", "bills", "fun", "shopping"];

type Tx = { id: string; title: string; cat: Cat; amount: number; day: number };
type Goal = { id: string; name: string; target: number; saved: number };

const seedTx: Tx[] = [
  { id: "t1", title: "Salary", cat: "income", amount: 18000, day: 1 },
  { id: "t2", title: "WE Internet", cat: "bills", amount: -450, day: 2 },
  { id: "t3", title: "Carrefour Maadi", cat: "food", amount: -640, day: 3 },
  { id: "t4", title: "Uber", cat: "transport", amount: -92, day: 4 },
  { id: "t5", title: "Electricity", cat: "bills", amount: -780, day: 5 },
  { id: "t6", title: "Cinema, Point 90", cat: "fun", amount: -360, day: 6 },
  { id: "t7", title: "Talabat", cat: "food", amount: -185, day: 7 },
  { id: "t8", title: "Metro card", cat: "transport", amount: -150, day: 8 },
  { id: "t9", title: "Zara", cat: "shopping", amount: -1250, day: 9 },
  { id: "t10", title: "Coffee, Zamalek", cat: "food", amount: -85, day: 10 },
];
const seedBudgets: Record<Exclude<Cat, "income">, number> = { food: 2500, transport: 800, bills: 1800, fun: 1000, shopping: 1500 };
const seedGoals: Goal[] = [
  { id: "g1", name: "Emergency fund", target: 30000, saved: 12500 },
  { id: "g2", name: "Sahel trip", target: 8000, saved: 5200 },
  { id: "g3", name: "New laptop", target: 45000, saved: 9000 },
];

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(Math.abs(n)));
type Tab = "home" | "activity" | "budgets" | "goals";

const TxRow = ({ t, onDelete }: { t: Tx; onDelete: () => void }) => (
  <li className="flex items-center gap-3 py-2.5">
    <span className="grid size-10 shrink-0 place-items-center rounded-2xl" style={{ background: `${cats[t.cat].color}26` }}>
      <span className="size-3 rounded-full" style={{ background: cats[t.cat].color }} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-[0.95rem] font-semibold">{t.title}</span>
      <span className="block text-[0.78rem]" style={{ color: "#4D636C" }}>
        {cats[t.cat].label} · Dec {t.day}
      </span>
    </span>
    <span className="font-bold tabular-nums" style={{ color: t.amount > 0 ? "#0F7A62" : C.abyss }}>
      {t.amount > 0 ? "+" : "−"}
      {fmt(t.amount)}
    </span>
    <button type="button" onClick={onDelete} className="grid size-7 place-items-center rounded-full text-[0.9rem] text-[#4D636C] hover:bg-black/5" aria-label={`Delete ${t.title}`}>
      ×
    </button>
  </li>
);


export const TidalDemo = () => {
  const [txs, setTxs] = useStored<Tx[]>("demo:tidal:tx", seedTx);
  const [budgets, setBudgets] = useStored("demo:tidal:budgets", seedBudgets);
  const [goals, setGoals] = useStored<Goal[]>("demo:tidal:goals", seedGoals);
  const [tab, setTab] = useState<Tab>("home");
  const [sheet, setSheet] = useState(false);
  const [amount, setAmount] = useState("");
  const [kind, setKind] = useState<"expense" | "income">("expense");
  const [cat, setCat] = useState<Exclude<Cat, "income">>("food");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState<Cat | "all">("all");
  const [query, setQuery] = useState("");
  const opened = useRef(0);

  const spentBy = useMemo(() => {
    const out = Object.fromEntries(spendCats.map((c) => [c, 0])) as Record<Exclude<Cat, "income">, number>;
    txs.forEach((t) => t.cat !== "income" && (out[t.cat] += -t.amount));
    return out;
  }, [txs]);
  const income = txs.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const spent = spendCats.reduce((s, c) => s + spentBy[c], 0);
  const budgetTotal = spendCats.reduce((s, c) => s + budgets[c], 0);
  const balance = 4200 + income - spent;

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const openSheet = () => {
    setSheet(true);
    setAmount("");
    setNote("");
    setKind("expense");
    opened.current = performance.now();
  };

  const press = (k: string) => {
    if (k === "⌫") return setAmount((a) => a.slice(0, -1));
    if (k === "." && amount.includes(".")) return;
    if (amount.replace(".", "").length >= 7) return;
    setAmount((a) => (a === "0" && k !== "." ? k : a + k));
  };

  const save = () => {
    const n = parseFloat(amount);
    if (!n) return;
    const secs = ((performance.now() - opened.current) / 1000).toFixed(1);
    const day = Math.max(...txs.map((t) => t.day), 10) + 1;
    setTxs((list) => [
      { id: `t${Date.now()}`, title: note.trim() || (kind === "income" ? "Income" : cats[cat].label), cat: kind === "income" ? "income" : cat, amount: kind === "income" ? n : -n, day },
      ...list,
    ]);
    setSheet(false);
    flash(`Saved in ${secs}s`);
  };

  const r = 42;
  const circ = 2 * Math.PI * r;
  const arcs = spendCats.reduce<{ c: Exclude<Cat, "income">; len: number; start: number }[]>((acc, c) => {
    const start = acc.length ? acc[acc.length - 1].start + acc[acc.length - 1].len : 0;
    return [...acc, { c, len: (spentBy[c] / Math.max(budgetTotal, spent)) * circ, start }];
  }, []);

  const visible = txs.filter((t) => (filter === "all" || t.cat === filter) && t.title.toLowerCase().includes(query.toLowerCase()));


  return (
    <div className="flex min-h-full justify-center" style={{ background: "#061620", ...ui }}>
      <div className="relative flex min-h-[calc(100svh-7.5rem)] w-full max-w-[440px] flex-col pb-24" style={{ background: C.abyss, color: C.foam }}>
        {tab === "home" ? (
          <>
            <div className="flex items-center justify-between px-5 pt-6">
              <div>
                <p className="text-[0.8rem]" style={{ color: C.mute }}>
                  Good evening
                </p>
                <p className="text-[1.2rem] font-bold">Salma</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full font-bold" style={{ background: C.deep }}>
                S
              </span>
            </div>
            <div className="px-5 pt-5">
              <p className="text-[0.8rem]" style={{ color: C.mute }}>
                Balance
              </p>
              <p className="text-[2.6rem] leading-tight font-extrabold tracking-tight tabular-nums">
                {fmt(balance)}
                <span className="ms-1.5 text-[1rem] font-semibold" style={{ color: C.mute }}>
                  EGP
                </span>
              </p>
            </div>
            <div className="relative mx-auto mt-4 size-56">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r={r} fill="none" stroke={C.deep} strokeWidth="9" />
                {arcs.map((a) => (
                  <circle
                    key={a.c}
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke={cats[a.c].color}
                    strokeWidth="9"
                    strokeDasharray={`${Math.max(a.len - 1, 0)} ${circ}`}
                    strokeDashoffset={-a.start}
                    className="transition-[stroke-dasharray,stroke-dashoffset] duration-700 ease-expo"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[0.75rem]" style={{ color: C.mute }}>
                  Spent in December
                </p>
                <p className="text-[1.8rem] font-extrabold tabular-nums">{fmt(spent)}</p>
                <p className="text-[0.75rem]" style={{ color: spent > budgetTotal ? C.coral : C.mute }}>
                  of {fmt(budgetTotal)} budget
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 px-5 text-[0.75rem]">
              {spendCats.map((c) => (
                <span key={c} className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: cats[c].color }} />
                  {cats[c].label}
                </span>
              ))}
            </div>
            <div className="mt-5 flex-1 rounded-t-[2rem] px-5 pt-5" style={{ background: C.foam, color: C.abyss }}>
              <div className="flex items-center justify-between">
                <p className="font-bold">Recent</p>
                <button type="button" onClick={() => setTab("activity")} className="text-[0.82rem]" style={{ color: "#3F5862" }}>
                  See all
                </button>
              </div>
              <ul>
                {txs.slice(0, 5).map((t) => (
                  <TxRow key={t.id} t={t} onDelete={() => setTxs((l) => l.filter((x) => x.id !== t.id))} />
                ))}
              </ul>
            </div>
          </>
        ) : null}

        {tab === "activity" ? (
          <div className="flex-1 px-5 pt-6">
            <h2 className="text-[1.5rem] font-extrabold">Activity</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transactions"
              aria-label="Search transactions"
              className="mt-4 w-full rounded-2xl px-4 py-3 text-[0.95rem] outline-none placeholder:text-[#9DB9C0]"
              style={{ background: C.deep }}
            />
            <div className="-mx-5 mt-3 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
              {(["all", ...spendCats, "income"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className="shrink-0 rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold"
                  style={filter === c ? { background: C.sea, color: C.abyss } : { background: "rgb(241 245 244 / 0.08)" }}
                >
                  {c === "all" ? "All" : cats[c].label}
                </button>
              ))}
            </div>
            <ul className="mt-4 rounded-3xl px-4" style={{ background: C.foam, color: C.abyss }}>
              {visible.length === 0 ? <li className="py-8 text-center text-[0.9rem]">No transactions match.</li> : null}
              {visible.map((t) => (
                <TxRow key={t.id} t={t} onDelete={() => setTxs((l) => l.filter((x) => x.id !== t.id))} />
              ))}
            </ul>
          </div>
        ) : null}

        {tab === "budgets" ? (
          <div className="flex-1 px-5 pt-6">
            <h2 className="text-[1.5rem] font-extrabold">Budgets</h2>
            <p className="mt-1 text-[0.85rem]" style={{ color: C.mute }}>
              Tap − or + to change a monthly limit.
            </p>
            <ul className="mt-5 space-y-3">
              {spendCats.map((c) => {
                const pct = spentBy[c] / budgets[c];
                const over = pct > 1;
                return (
                  <li key={c} className="rounded-3xl p-4" style={{ background: C.deep }}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-semibold">
                        <span className="size-2.5 rounded-full" style={{ background: cats[c].color }} />
                        {cats[c].label}
                      </span>
                      <span className="flex items-center gap-2 text-[0.85rem]">
                        <button type="button" aria-label={`Lower ${cats[c].label} budget`} onClick={() => setBudgets((b) => ({ ...b, [c]: Math.max(100, b[c] - 100) }))} className="grid size-7 place-items-center rounded-full" style={{ background: "rgb(241 245 244 / 0.1)" }}>
                          −
                        </button>
                        <span className="w-16 text-center tabular-nums">{fmt(budgets[c])}</span>
                        <button type="button" aria-label={`Raise ${cats[c].label} budget`} onClick={() => setBudgets((b) => ({ ...b, [c]: b[c] + 100 }))} className="grid size-7 place-items-center rounded-full" style={{ background: "rgb(241 245 244 / 0.1)" }}>
                          +
                        </button>
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: "rgb(241 245 244 / 0.1)" }}>
                      <div className="h-full rounded-full transition-[width] duration-700 ease-expo" style={{ width: `${Math.min(100, pct * 100)}%`, background: over ? C.coral : cats[c].color }} />
                    </div>
                    <p className="mt-2 text-[0.8rem]" style={{ color: over ? C.coral : C.mute }}>
                      {over ? `Over by ${fmt(spentBy[c] - budgets[c])} EGP` : `${fmt(budgets[c] - spentBy[c])} EGP left`} · {fmt(spentBy[c])} spent
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {tab === "goals" ? (
          <div className="flex-1 px-5 pt-6">
            <h2 className="text-[1.5rem] font-extrabold">Goals</h2>
            <ul className="mt-5 space-y-3">
              {goals.map((g) => {
                const pct = Math.min(1, g.saved / g.target);
                return (
                  <li key={g.id} className="rounded-3xl p-5" style={{ background: C.deep }}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[1.05rem] font-bold">{g.name}</span>
                      <span className="text-[0.85rem] tabular-nums" style={{ color: C.mute }}>
                        {Math.round(pct * 100)}%
                      </span>
                    </div>
                    <p className="mt-1 text-[1.5rem] font-extrabold tabular-nums">
                      {fmt(g.saved)} <span className="text-[0.85rem] font-semibold" style={{ color: C.mute }}>/ {fmt(g.target)} EGP</span>
                    </p>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full" style={{ background: "rgb(241 245 244 / 0.1)" }}>
                      <div className="h-full rounded-full transition-[width] duration-1000 ease-expo" style={{ width: `${pct * 100}%`, background: C.sea }} />
                    </div>
                    <div className="mt-4 flex gap-2">
                      {[500, 1000, 2500].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          disabled={pct >= 1}
                          onClick={() => {
                            setGoals((list) => list.map((x) => (x.id === g.id ? { ...x, saved: Math.min(x.target, x.saved + amt) } : x)));
                            flash(`+${fmt(amt)} EGP to ${g.name}`);
                          }}
                          className="flex-1 rounded-2xl py-2.5 text-[0.85rem] font-bold disabled:opacity-40"
                          style={{ background: "rgb(91 227 196 / 0.14)", color: C.sea }}
                        >
                          +{fmt(amt)}
                        </button>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {/* Bottom nav + add */}
        <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[440px] -translate-x-1/2 items-center justify-around border-t px-2 pt-2 pb-3" style={{ background: C.abyss, borderColor: "rgb(241 245 244 / 0.08)" }} aria-label="Tidal">
          {(["home", "activity"] as const).map((k) => (
            <button key={k} type="button" onClick={() => setTab(k)} aria-current={tab === k} className="px-3 py-2 text-[0.8rem] font-semibold capitalize" style={{ color: tab === k ? C.sea : C.mute }}>
              {k}
            </button>
          ))}
          <button type="button" onClick={openSheet} className="-mt-8 grid size-16 place-items-center rounded-full text-[2rem] leading-none font-light shadow-lg" style={{ background: C.sea, color: C.abyss }} aria-label="Add transaction">
            +
          </button>
          {(["budgets", "goals"] as const).map((k) => (
            <button key={k} type="button" onClick={() => setTab(k)} aria-current={tab === k} className="px-3 py-2 text-[0.8rem] font-semibold capitalize" style={{ color: tab === k ? C.sea : C.mute }}>
              {k}
            </button>
          ))}
        </nav>

        {toast ? (
          <div role="status" className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full px-4 py-2 text-[0.85rem] font-semibold shadow-lg motion-safe:animate-[toast-in_0.35s_ease]" style={{ background: C.foam, color: C.abyss }}>
            {toast}
          </div>
        ) : null}

        {/* Quick add sheet */}
        {sheet ? (
          <div className="fixed inset-x-0 bottom-0 top-[var(--demo-top,0px)] z-40 flex items-end justify-center bg-black/50" onClick={() => setSheet(false)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Add transaction"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[440px] rounded-t-[2rem] p-5 motion-safe:animate-[sheet-up_0.4s_cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: C.deep, color: C.foam }}
            >
              <div className="mx-auto grid w-fit grid-cols-2 gap-1 rounded-full p-1" style={{ background: "rgb(241 245 244 / 0.08)" }}>
                {(["expense", "income"] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setKind(k)} className="rounded-full px-5 py-1.5 text-[0.85rem] font-semibold capitalize" style={kind === k ? { background: C.sea, color: C.abyss } : {}}>
                    {k}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-center text-[3.2rem] leading-none font-extrabold tabular-nums" aria-live="polite">
                {amount || "0"}
                <span className="ms-1 text-[1rem] font-semibold" style={{ color: C.mute }}>
                  EGP
                </span>
              </p>
              {kind === "expense" ? (
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {spendCats.map((c) => (
                    <button key={c} type="button" onClick={() => setCat(c)} className="rounded-full px-3 py-1.5 text-[0.8rem] font-semibold" style={cat === c ? { background: cats[c].color, color: C.abyss } : { background: "rgb(241 245 244 / 0.08)" }}>
                      {cats[c].label}
                    </button>
                  ))}
                </div>
              ) : null}
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (optional)" aria-label="Note" className="mt-3 w-full rounded-2xl px-4 py-2.5 text-center text-[0.9rem] outline-none placeholder:text-[#9DB9C0]" style={{ background: "rgb(241 245 244 / 0.06)" }} />
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((k) => (
                  <button key={k} type="button" onClick={() => press(k)} className="h-14 rounded-2xl text-[1.35rem] font-semibold active:scale-95" style={{ background: "rgb(241 245 244 / 0.05)" }} aria-label={k === "⌫" ? "Delete digit" : k}>
                    {k}
                  </button>
                ))}
              </div>
              <button type="button" onClick={save} disabled={!parseFloat(amount)} className={cn("mt-3 w-full rounded-2xl py-4 font-bold disabled:opacity-40")} style={{ background: C.sea, color: C.abyss }}>
                Save
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
