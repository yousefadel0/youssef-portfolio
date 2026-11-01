import { cn, pad } from "@/lib/utils";

/** Work-order label that opens every section: "WO—03 / Process". */
export const SectionLabel = ({ index, children, className }: { index: number; children: string; className?: string }) => (
  <p className={cn("label flex items-center gap-3", className)}>
    <span className="tabular">WO—{pad(index)}</span>
    <span aria-hidden className="h-px w-8 bg-current opacity-50" />
    <span>{children}</span>
  </p>
);

/** Four corner marks, like the trim marks on a print sheet. */
export const CropMarks = ({ className }: { className?: string }) => (
  <span aria-hidden className={cn("pointer-events-none absolute inset-3 md:inset-5", className)}>
    {["start-0 top-0", "end-0 top-0 rotate-90", "end-0 bottom-0 rotate-180", "start-0 bottom-0 -rotate-90"].map((pos) => (
      <svg key={pos} width="14" height="14" viewBox="0 0 14 14" className={cn("absolute opacity-60", pos)}>
        <path d="M0 6V0h6" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    ))}
  </span>
);
