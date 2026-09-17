"use client";

import { useEffect } from "react";

/**
 * The entire scroll-reveal system, in one observer.
 *
 * Every `[data-reveal]` element on the page is watched by a single
 * IntersectionObserver and marked `data-revealed` once, on the way in. The
 * animation itself is CSS (see globals.css), which is why the sections that
 * use it can stay server components and ship no JavaScript of their own.
 *
 * Renders nothing.
 */
export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"),
    );
    if (targets.length === 0) return;

    const revealAll = () => targets.forEach((el) => el.setAttribute("data-revealed", ""));

    // No observer support, or the visitor opted out of motion: show everything
    // immediately rather than leaving content stuck at opacity 0.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
