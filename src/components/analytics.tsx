"use client";

import { track } from "@vercel/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect } from "react";
import { site } from "@/config/site";

/**
 * Vercel Web Analytics (cookieless page views) plus a "WhatsApp click" event for every link to
 * Youssef's WhatsApp. Custom events only show in the dashboard on Vercel Pro; page views work on Hobby.
 */
export const Analytics = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest(`a[href^="https://wa.me/${site.person.whatsapp}"]`) : null;
      if (link) track("WhatsApp click", { page: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <VercelAnalytics />;
};
