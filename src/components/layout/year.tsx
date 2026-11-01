"use client";

/** Current year, computed in the browser so static pages never go stale. */
export const Year = () => <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
