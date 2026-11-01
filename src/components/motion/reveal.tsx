"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type Variant = "up" | "clip" | "wipe";

const variantClass: Record<Variant, string> = {
  up: "reveal",
  clip: "clip-reveal",
  wipe: "wipe-reveal",
};

type Props = {
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** Adds `is-in` when scrolled into view; the CSS in globals does the motion. */
export const Reveal = ({ as: Tag = "div", variant = "up", delay = 0, className, children }: Props) => {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={cn(variantClass[variant], inView && "is-in", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
};
