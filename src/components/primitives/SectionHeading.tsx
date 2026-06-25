import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, instant, viewportOnce } from "@/lib/motion";

type SectionHeadingProps = {
  /** Two-digit index, e.g. "02". */
  index: string;
  kicker: string;
  title: string;
  description?: string;
};

/**
 * Editorial section header: monospace index + kicker, a strong display title,
 * and a hairline rule. The index/kicker is the recurring "terminal" motif.
 */
export function SectionHeading({ index, kicker, title, description }: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const variants = reduce ? instant : fadeUp;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-center gap-3 label-mono">
        <span aria-hidden="true">{index}</span>
        <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
        <span>{kicker}</span>
      </div>
      <h2 className="mt-4 max-w-3xl font-display text-display-md font-semibold text-text">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p>}
    </motion.div>
  );
}
