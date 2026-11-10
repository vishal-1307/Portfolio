"use client";

import { useEffect } from "react";

export function Spotlight() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (media.matches || !fine.matches) return;

    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--sx", `${event.clientX}px`);
      root.style.setProperty("--sy", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
