"use client";

import { useEffect, useState, type ReactNode } from "react";

let hasNavigated = false;

/**
 * Route transition: a kiln curtain lifts off the new page while the content settles in.
 * Pure CSS (see `.curtain-lift` / `.page-enter` in globals). Skipped on the very first load,
 * where the intro loader plays instead; reduced motion is handled in CSS.
 */
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const [animate] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animate ? <div aria-hidden className="curtain curtain-lift" /> : null}
      <div className={animate ? "page-enter" : undefined}>{children}</div>
    </>
  );
};
