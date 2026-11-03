"use client";

import { useEffect, useRef } from "react";
import { SplitText } from "@/components/motion/split-text";
import { SectionLabel } from "@/components/ui/section-label";
import { loadGsap } from "@/lib/gsap";
import { pad } from "@/lib/utils";

type Step = { name: string; time: string; text: string; get: string };
type Props = { label: string; title: string[]; intro: string; youGet: string; steps: Step[]; rtl: boolean };

/**
 * Six steps on a horizontal track. On large screens the section pins and vertical scroll
 * drives the track sideways (mirrored in RTL); on phones it is a vertical timeline whose
 * line fills as you scroll.
 */
export const Process = ({ label, title, intro, youGet, steps, rtl }: Props) => {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const barH = useRef<HTMLDivElement>(null);
  const barV = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert = () => {};
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      revert = () => mm.revert();

      mm.add("(min-width: 1024px)", () => {
        const el = track.current;
        const sec = section.current;
        if (!el || !sec) return;
        const before = window.scrollY;
        const below = before > sec.getBoundingClientRect().top + before;
        const distance = () => Math.max(0, el.scrollWidth - el.clientWidth);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
        });
        tl.to(el, { x: () => (rtl ? distance() : -distance()), ease: "none" }, 0);
        tl.fromTo(barH.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        // GSAP loads on the first interaction, so the pin's extra scroll length can appear above someone
        // already past this section (a reload, or a link straight to #about). Keep their view in place.
        if (below) {
          ScrollTrigger.refresh();
          window.scrollTo(0, before + distance());
        }
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(barV.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: track.current, start: "top 70%", end: "bottom 70%", scrub: true } });
      });
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, [rtl]);

  return (
    <section ref={section} id="process" aria-labelledby="process-title" className="relative scroll-mt-16 overflow-hidden bg-kiln text-ink lg:flex lg:h-[100svh] lg:flex-col">
      <div className="shell pt-24 md:pt-32 lg:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index={3}>{label}</SectionLabel>
            <SplitText id="process-title" lines={title} className="display mt-6 text-[clamp(3rem,7.5vw,7.5rem)]" />
          </div>
          <p className="max-w-md self-end text-[1.08rem] leading-relaxed lg:col-span-4 lg:col-start-9">{intro}</p>
        </div>
      </div>

      <div className="relative mt-14 lg:mt-auto lg:mb-14">
        <div aria-hidden className="absolute inset-x-[var(--gutter)] top-0 hidden h-[2px] bg-ink/20 lg:block">
          <div ref={barH} className="h-full origin-left rtl:origin-right bg-ink" />
        </div>
        <div aria-hidden className="absolute top-0 bottom-0 start-[calc(var(--gutter)+0.5rem)] w-[2px] bg-ink/20 lg:hidden">
          <div ref={barV} className="h-full origin-top bg-ink" />
        </div>

        <ol ref={track} className="flex flex-col gap-10 pb-24 ps-[calc(var(--gutter)+2.5rem)] pe-[var(--gutter)] lg:flex-row lg:gap-0 lg:overflow-visible lg:px-[var(--gutter)] lg:pt-8 lg:pb-0">
          {steps.map((s, i) => (
            <li key={s.name} className="relative lg:w-[min(30rem,34vw)] lg:shrink-0 lg:pe-12">
              <span aria-hidden className="absolute top-2 -start-[2.3rem] size-3 bg-ink lg:-top-[2.3rem] lg:start-0" />
              <div className="flex items-baseline justify-between gap-4 border-b border-ink/25 pb-3 lg:border-0">
                <span className="display tabular text-[clamp(3.5rem,6vw,6rem)] leading-none">{pad(i + 1)}</span>
                <span className="label">{s.time}</span>
              </div>
              <h3 className="headline mt-4 text-[clamp(1.8rem,2.6vw,2.6rem)]">{s.name}</h3>
              <p className="mt-3 max-w-sm leading-relaxed">{s.text}</p>
              <p className="mt-5 inline-flex items-center gap-2 bg-ink px-3 py-2 text-[0.9rem] text-bone">
                <span className="label text-kiln">{youGet}</span>
                {s.get}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
