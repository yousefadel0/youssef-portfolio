"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger and Lenis share one clock.
 * Both libraries load after hydration to keep them off the critical path.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export const SmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("lenis"), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new LenisCtor({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -72 } });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    let timer = 0;
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return;
      lastHeight = h;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh()), 200);
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh()));
  }, [pathname]);

  return null;
};
