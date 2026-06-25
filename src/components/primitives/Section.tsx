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
 * Semantic section wrapper with consistent vertical rhythm, a labelled heading,
 * and scroll-margin so anchor navigation lands below the fixed navbar.
 */
export function Section({ id, index, kicker, title, description, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-24 py-section", className)}
    >
      <div className="container-page">
        <div id={`${id}-title`}>
          <SectionHeading index={index} kicker={kicker} title={title} description={description} />
        </div>
        {children}
      </div>
    </section>
  );
}
