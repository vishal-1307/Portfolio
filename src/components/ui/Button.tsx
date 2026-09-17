import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

const styles: Record<Variant, string> = {
  solid:
    "bg-paper text-ink hover:bg-accent hover:text-accent-foreground border border-paper hover:border-accent",
  outline: "border border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

/**
 * Square editorial button. Anchor-only by design — every call to action on this
 * page navigates or downloads; nothing here is a form control.
 */
export function ButtonLink({ variant = "solid", className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        "group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors duration-200",
        styles[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
