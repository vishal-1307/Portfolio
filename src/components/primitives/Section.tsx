import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

type SectionProps = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Semantic section: a full-bleed top rule (the catalogue divider), the ledger
 * heading, then content. scroll-mt keeps anchors clear of the fixed masthead.
 */
export function Section({ id, index, kicker, title, description, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-20", className)}>
      <div className="rule" />
      <div className="container-page pb-section">
        <div id={`${id}-title`}>
          <SectionHeading index={index} kicker={kicker} title={title} description={description} />
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
