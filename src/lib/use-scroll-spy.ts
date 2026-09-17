"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Tracks which section owns the viewport so the nav can mark it current.
 * One IntersectionObserver over all ids; the band crossing the vertical middle
 * of the screen wins.
 */
export function useScrollSpy(ids: readonly string[], offset = 0.5): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = useMemo(() => ids.join("|"), [ids]);

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) setActive(first.target.id);
      },
      {
        rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, offset]);

  return active;
}
