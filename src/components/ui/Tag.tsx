import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Square, hairline-bordered stack label. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-paper/20 px-2.5 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
