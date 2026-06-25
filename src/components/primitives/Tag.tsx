import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  /** Accent variant fills with teal; default is a quiet outlined chip. */
  variant?: "default" | "accent";
  className?: string;
};

/** Monospace tech/stack chip — the recurring "engineered" detail across the site. */
export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs leading-none",
        variant === "accent"
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-line/15 bg-surface text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
