"use client";

type GsapModules = { gsap: typeof import("gsap").gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger };

let interaction: Promise<void> | null = null;
let pending: Promise<GsapModules> | null = null;

/** Resolves on the visitor's first scroll, touch, pointer or key input. */
export const firstInteraction = () => {
  interaction ??= new Promise<void>((resolve) => {
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "pointermove", "keydown"] as const;
    const done = () => {
      events.forEach((e) => window.removeEventListener(e, done));
      resolve();
    };
    events.forEach((e) => window.addEventListener(e, done, { once: true, passive: true }));
  });
  return interaction;
};

/**
 * GSAP + ScrollTrigger, loaded once after the first interaction. Every scroll-driven
 * effect needs the visitor to move anyway, so ~110 KB of animation code never competes
 * with the first paint or hydration.
 */
export const loadGsap = () => {
  pending ??= firstInteraction()
    .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]))
    .then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });
  return pending;
};
