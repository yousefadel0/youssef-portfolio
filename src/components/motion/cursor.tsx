"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = { mode: "default" | "hover" | "label" | "hidden"; text: string };

const labels: Record<string, Record<string, string>> = {
  en: { view: "View", open: "Open", drag: "Drag", read: "Read" },
  ar: { view: "شوف", open: "افتح", drag: "اسحب", read: "اقرأ" },
};

/**
 * Desktop-only cursor with context states, read from `data-cursor` on hovered elements:
 * "view" and "read" show a labeled disc, "open" grows the ring, "hide" removes it.
 */
export const Cursor = ({ locale }: { locale: string }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({ mode: "hidden", text: "" });

  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine) and (hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const frame = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;
    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const target = { x: -100, y: -100 };
    const d = { ...target };
    const r = { ...target };
    let frame = 0;
    const tick = () => {
      d.x += (target.x - d.x) * 0.55;
      d.y += (target.y - d.y) * 0.55;
      r.x += (target.x - r.x) * 0.18;
      r.y += (target.y - r.y) * 0.18;
      dot.style.transform = `translate3d(${d.x}px, ${d.y}px, 0)`;
      ring.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    let last = "hide";
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const hit = (e.target as Element | null)?.closest?.("[data-cursor], a, button, input, textarea, select, label, summary");
      let key = "default";
      if (hit) {
        const attr = hit.getAttribute("data-cursor");
        if (attr) key = attr;
        else if (hit.matches("input, textarea, select")) key = "hide";
        else key = "open";
      }
      if (key === last) return;
      last = key;
      if (key === "hide") setState({ mode: "hidden", text: "" });
      else if (key === "open") setState({ mode: "hover", text: "" });
      else if (labels[locale]?.[key]) setState({ mode: "label", text: labels[locale][key] });
      else setState({ mode: "default", text: "" });
    };
    const leave = () => setState({ mode: "hidden", text: "" });
    const enter = () => {
      last = "";
      setState({ mode: "default", text: "" });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, [enabled, locale]);

  if (!enabled) return null;

  const ringSize = state.mode === "label" ? 92 : state.mode === "hover" ? 56 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div ref={ringRef} className="absolute top-0 left-0">
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-500 ease-expo"
          style={{
            width: ringSize,
            height: ringSize,
            opacity: state.mode === "hidden" ? 0 : 1,
            backgroundColor: state.mode === "label" ? "#FF5A1F" : "transparent",
            border: state.mode === "label" ? "1px solid #FF5A1F" : "1px solid rgb(255 90 31 / 0.9)",
          }}
        >
          <span className="label text-[0.68rem] text-ink transition-opacity duration-300" style={{ opacity: state.mode === "label" ? 1 : 0 }}>
            {state.text}
          </span>
        </div>
      </div>
      <div ref={dotRef} className="absolute top-0 left-0">
        <div
          className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kiln transition-opacity duration-200"
          style={{ opacity: state.mode === "default" || state.mode === "hover" ? 1 : 0 }}
        />
      </div>
    </div>
  );
};
