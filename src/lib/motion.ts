import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary. Components use these with `whileInView` so each
 * section gets one purposeful entrance. All transforms are small and quick —
 * `useReducedMotion()` in components swaps these for instant/no-op variants.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Parent that staggers its children's entrances. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Reduced-motion variant: appear instantly, no transform. */
export const instant: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

/** Default viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
