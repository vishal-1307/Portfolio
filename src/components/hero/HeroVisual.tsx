"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRender3D } from "@/lib/use-render-3d";
import { HeroFallback } from "./HeroFallback";

/**
 * Gate in front of the WebGL scene.
 *
 * The three.js bundle is a separate chunk that is only requested after the page
 * is interactive and the browser goes idle, so it never competes with the hero
 * text for the LCP. Until then — and forever, on machines that opted out — the
 * static SVG lattice stands in.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroVisual() {
  const allow3D = useRender3D();
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (!allow3D) return;

    const requestIdle =
      window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 400));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;

    const handle = requestIdle(() => setIdle(true), { timeout: 2200 });
    return () => cancelIdle(handle as number);
  }, [allow3D]);

  return (
    <div className="relative h-full w-full">
      {/* Soft red bloom behind the lattice. CSS, so it costs nothing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(229,18,59,0.16), rgba(229,18,59,0.04) 42%, transparent 68%)",
        }}
      />
      <div className="relative h-full w-full text-paper">
        {allow3D && idle ? <HeroScene /> : <HeroFallback />}
      </div>
    </div>
  );
}
