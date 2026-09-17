"use client";

import { useEffect, useState } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

/**
 * Minimum viewport width that gets the WebGL hero.
 *
 * Measured, not guessed: on a 4x-throttled mobile profile the three.js chunk
 * costs ~1.2s of main-thread time, which pushes LCP past 3s and tanks the
 * performance score. A phone gets the static SVG lattice instead — same
 * silhouette, no JavaScript, and a page that loads immediately. The decorative
 * layer is the thing that yields, never the content.
 */
const MIN_WIDTH_FOR_3D = 1024;
const MIN_CORES_FOR_3D = 4;

/**
 * Decides whether the hero should run WebGL at all.
 *
 * Returns false — and the static fallback renders instead — when the visitor
 * asked for reduced motion, is on a phone or tablet, has few CPU cores, has
 * Data Saver on, is on a low-memory device, or has no usable WebGL context.
 * The check runs after mount, so server output is identical for everyone and
 * hydration stays stable.
 */
export function useRender3D(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia(`(min-width: ${MIN_WIDTH_FOR_3D}px)`);

    const evaluate = () => {
      if (motionQuery.matches || !widthQuery.matches) {
        setEnabled(false);
        return;
      }

      const nav = navigator as NavigatorWithConnection;
      if (nav.connection?.saveData) {
        setEnabled(false);
        return;
      }
      if (
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency > 0 &&
        navigator.hardwareConcurrency < MIN_CORES_FOR_3D
      ) {
        setEnabled(false);
        return;
      }
      if (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory < 4) {
        setEnabled(false);
        return;
      }

      let supported = false;
      try {
        const canvas = document.createElement("canvas");
        supported = Boolean(
          canvas.getContext("webgl2") ??
            canvas.getContext("webgl") ??
            canvas.getContext("experimental-webgl"),
        );
      } catch {
        supported = false;
      }

      setEnabled(supported);
    };

    evaluate();
    motionQuery.addEventListener("change", evaluate);
    widthQuery.addEventListener("change", evaluate);
    return () => {
      motionQuery.removeEventListener("change", evaluate);
      widthQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return enabled;
}
