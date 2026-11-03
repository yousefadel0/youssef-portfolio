"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/gsap";

/** Resolves once Lenis exists, or right away under reduced motion where it never will. */
let markLenisReady = () => {};
const lenisReady = new Promise<void>((resolve) => (markLenisReady = resolve));

/**
 * Where a hash target should land. Layout offsets, not getBoundingClientRect, so the page-enter
 * slide (a transform) doesn't skew it. Pinned sections are measured by their pin spacer and land flush.
 */
const targetY = (el: HTMLElement) => {
  const spacer = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : null;
  const margin = spacer ? 0 : parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  let top = 0;
  for (let n: HTMLElement | null = spacer ?? el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
  return Math.max(0, top - margin);
};

/**
 * Scrolls to a section by hash. `.cv-auto` sections report a placeholder height until they render
 * and the Process pin adds its spacer late, so every section is rendered and ScrollTrigger re-measured
 * before the target is read, and the landing is corrected once if anything still moved.
 */
const scrollToHash = async (hash: string, getLenis: () => Lenis | null, { immediate, waitForGsap }: { immediate: boolean; waitForGsap: boolean }) => {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return;
  const root = document.documentElement;
  root.classList.add("cv-measure");

  // After a click GSAP and Lenis are loading anyway (they wait for the first interaction), and Lenis
  // arriving mid-scroll would stop it, so wait for both. On a page load with a hash nobody has
  // interacted yet: no pins to measure, nothing to wait for.
  const gsap = waitForGsap
    ? (await Promise.all([loadGsap(), lenisReady]))[0]
    : await Promise.race([loadGsap(), new Promise<null>((r) => requestAnimationFrame(() => r(null)))]);
  gsap?.ScrollTrigger.refresh();

  const settle = () => requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("cv-measure")));
  const lenis = getLenis();
  if (!lenis) {
    window.scrollTo({ top: targetY(el), behavior: immediate ? "instant" : "smooth" });
    return settle();
  }
  // Lenis caps targets at its last measured page height, which after a route change is the old page's.
  lenis.resize();
  lenis.scrollTo(targetY(el), {
    immediate,
    force: true,
    onComplete: () => {
      const y = targetY(el);
      if (Math.abs(y - window.scrollY) > 2) {
        lenis.resize();
        lenis.scrollTo(y, { immediate: true, force: true });
      }
      settle();
    },
  });
};

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger and Lenis share one clock.
 * Both libraries load after hydration to keep them off the critical path.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export const SmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return markLenisReady();
    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("lenis"), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new LenisCtor({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
      lenisRef.current = lenis;
      markLenisReady();
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

  // In-page links (the header's Services, Process, Pricing, About) scroll here instead of the browser's
  // or Next's jump, which read stale positions. Capture phase, so Next's Link sees defaultPrevented.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href*='#']") : null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      if (!document.getElementById(decodeURIComponent(url.hash.slice(1)))) return;
      e.preventDefault();
      window.history.pushState(window.history.state, "", url.hash);
      void scrollToHash(url.hash, () => lenisRef.current, { immediate: false, waitForGsap: true });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
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
    const { hash } = window.location;
    // Arriving from another page on /en#about: land on the section's real position.
    if (hash) {
      const frame = requestAnimationFrame(() => void scrollToHash(hash, () => lenisRef.current, { immediate: true, waitForGsap: false }));
      return () => cancelAnimationFrame(frame);
    }
    lenisRef.current?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh()));
  }, [pathname]);

  return null;
};
