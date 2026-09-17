import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

type SectionProps = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/**
 * One structural band: a full-bleed hairline, the ledger heading, the content.
 * `scroll-mt` keeps anchor targets clear of the fixed masthead.
 */
export function Section({
  id,
  index,
  kicker,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-16", className)}>
      <div className="rule" />
      <div className="container-page pb-section">
        <SectionHeading
          id={`${id}-title`}
          index={index}
          kicker={kicker}
          title={title}
          description={description}
        />
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
