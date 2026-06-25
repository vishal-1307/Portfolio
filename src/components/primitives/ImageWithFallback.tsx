import { useState } from "react";
import { cn } from "@/lib/cn";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "16 / 10". Keeps layout stable before load. */
  ratio?: string;
  /** Single letter/word shown in the fallback (e.g. project initial). */
  fallbackLabel: string;
  className?: string;
  imgClassName?: string;
};

/**
 * Renders an image inside a fixed-aspect box. If `src` is empty or fails to
 * load, it shows a tasteful charcoal→teal gradient with the project initial,
 * so the layout never looks broken before real screenshots are added.
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
    <div
      className={cn("relative overflow-hidden bg-surface-2", className)}
      style={{ aspectRatio: ratio }}
    >
      {showFallback ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 120% at 0% 0%, rgb(var(--accent) / 0.18), transparent 55%), linear-gradient(135deg, rgb(var(--surface-2)), rgb(var(--bg)))",
          }}
          role="img"
          aria-label={alt}
        >
          {/* faint grid lines reinforce the engineered look */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--line) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line) / 0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span className="relative font-display text-5xl font-bold text-accent/70">{fallbackLabel}</span>
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
