import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
  /** Adds hover lift + accent hairline. Use for interactive cards. */
  interactive?: boolean;
};

/** Surface container with a hairline border; optional hover treatment. */
export function Card({ as: Tag = "div", interactive = false, className, children, ...rest }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-card border border-line/12 bg-surface/70",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-300 ease-emphatic hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
