import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the navbar can highlight the
 * active link. Uses a single IntersectionObserver over the given element ids.
 */
export function useScrollSpy(ids: string[], offset = 0.5): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Trigger when a section crosses the vertical middle of the viewport.
        rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
