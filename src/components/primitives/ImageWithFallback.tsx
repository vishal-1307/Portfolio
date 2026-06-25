import { useState } from "react";
import { cn } from "@/lib/cn";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  ratio?: string;
  fallbackLabel: string;
  className?: string;
  imgClassName?: string;
};

/**
 * Image in a fixed-aspect box. If `src` is empty or fails, shows a paper panel
 * with a faint grid and an oversized red initial — reads as an intentional
 * placeholder, never a broken image.
 */
export function ImageWithFallback({
  src,
  alt,
  ratio = "16 / 10",
  fallbackLabel,
  className,
  imgClassName,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div className={cn("relative overflow-hidden bg-paper", className)} style={{ aspectRatio: ratio }}>
      {showFallback ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgb(244_242_236)]" role="img" aria-label={alt}>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--ink) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink) / 0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <span className="relative font-display text-6xl font-black text-accent/85">{fallbackLabel}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
