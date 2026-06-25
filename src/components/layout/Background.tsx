import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Quiet ambient backdrop: a single soft teal radial glow anchored top-center
 * plus a slow-drifting accent bloom. Deliberately restrained — the dot-grid
 * lives on <body>; this just adds depth. Drift pauses under reduced motion.
 */
export function Background() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* top glow */}
      <div
        className="absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.12), transparent)" }}
      />
      {/* drifting bloom */}
      <div
        className={cn(
          "absolute right-[-10rem] top-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl",
          !reduce && "animate-drift",
        )}
        style={{ background: "radial-gradient(closest-side, rgb(var(--accent-strong) / 0.08), transparent)" }}
      />
      {/* bottom vignette to ground long pages */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
