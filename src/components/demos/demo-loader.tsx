"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ProjectSlug } from "@/config/site";
import type { Locale } from "@/lib/i18n";

const Loading = () => (
  <div className="grid min-h-[calc(100svh-3.5rem)] place-items-center">
    <span className="label animate-pulse text-smoke">Loading demo…</span>
  </div>
);

type DemoProps = { locale: Locale };

/** Each demo is its own chunk and renders client-only (they keep state in localStorage). */
const demos: Record<ProjectSlug, ComponentType<DemoProps>> = {
  "maison-ember": dynamic(() => import("./ember-demo").then((m) => m.EmberDemo), { ssr: false, loading: Loading }),
  sufra: dynamic(() => import("./sufra-demo").then((m) => m.SufraDemo), { ssr: false, loading: Loading }),
  halcyon: dynamic(() => import("./halcyon-demo").then((m) => m.HalcyonDemo), { ssr: false, loading: Loading }),
  "pulse-club": dynamic(() => import("./pulse-demo").then((m) => m.PulseDemo), { ssr: false, loading: Loading }),
  maskan: dynamic(() => import("./maskan-demo").then((m) => m.MaskanDemo), { ssr: false, loading: Loading }),
  "atlas-console": dynamic(() => import("./atlas-demo").then((m) => m.AtlasDemo), { ssr: false, loading: Loading }),
  tidal: dynamic(() => import("./tidal-demo").then((m) => m.TidalDemo), { ssr: false, loading: Loading }),
};

export const DemoLoader = ({ slug, locale }: { slug: ProjectSlug; locale: Locale }) => {
  const Demo = demos[slug];
  return <Demo locale={locale} />;
};
