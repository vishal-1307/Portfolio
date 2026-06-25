import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
};

/** Uppercase tracked grotesque chip with a hairline border. */
export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        variant === "accent"
          ? "border-accent/40 bg-accent/5 text-accent-ink"
          : "border-ink/20 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
