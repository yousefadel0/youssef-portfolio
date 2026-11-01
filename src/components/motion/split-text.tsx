"use client";

import { Fragment, type CSSProperties, type ElementType } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Extra classes per line, by index. */
  lineClassNames?: (string | undefined)[];
  delay?: number;
  id?: string;
};

/**
 * Word-by-word mask reveal. Splits on spaces only, so Arabic letters keep their joins.
 * Screen readers get the plain sentence; the animated words are hidden from them.
 */
export const SplitText = ({ lines, as: Tag = "h2", className, lineClassNames, delay = 0, id }: Props) => {
  const [ref, inView] = useInView<HTMLElement>("0px 0px -8% 0px");
  let i = 0;

  return (
    <Tag ref={ref} id={id} className={cn("split", inView && "is-in", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden>
        {lines.map((line, li) => (
          <span key={line} className={cn("block", lineClassNames?.[li])}>
            {line.split(" ").map((word, wi, words) => (
              <Fragment key={`${word}-${wi}`}>
                <span className="w">
                  <span style={{ "--i": i++ } as CSSProperties}>{word}</span>
                </span>
                {wi < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
};
