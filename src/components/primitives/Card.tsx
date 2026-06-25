import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
  /** Adds hover treatment (ink border + slight lift). Use for interactive cards. */
  interactive?: boolean;
};

/** Square-cornered surface with a hairline border — Swiss editorial card. */
export function Card({ as: Tag = "div", interactive = false, className, children, ...rest }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative border border-ink/15 bg-surface",
        interactive &&
          "transition-[transform,border-color] duration-300 ease-emphatic hover:-translate-y-1 hover:border-ink motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
