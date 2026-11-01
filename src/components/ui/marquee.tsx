import { cn } from "@/lib/utils";

/** Infinite band of words. Duplicated once so the loop is seamless; the copy is hidden from screen readers. */
export const Marquee = ({ items, className }: { items: string[]; className?: string }) => {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display px-[0.35em] text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.15]">{item}</span>
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="mx-[0.6em] shrink-0">
            <path d="M14 0v28M0 14h28M4 4l20 20M24 4 4 24" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee overflow-hidden py-5 md:py-7", className)}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};
