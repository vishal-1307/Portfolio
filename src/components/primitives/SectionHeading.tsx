import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, instant, viewportOnce } from "@/lib/motion";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  description?: string;
};

/**
 * Editorial "ledger" heading: a giant red index number in a left column and the
 * title block on the right — the recurring structural motif of the site.
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
      className="grid grid-cols-12 gap-x-6 gap-y-4 pt-8 md:pt-12"
    >
      <div className="col-span-12 md:col-span-3">
        <span className="block font-display text-index font-black leading-none text-accent">{index}</span>
      </div>
      <div className="col-span-12 md:col-span-9">
        <p className="eyebrow text-accent-ink">{kicker}</p>
        <h2 className="mt-3 max-w-3xl font-display text-display-md font-extrabold leading-tight text-ink">{title}</h2>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p>}
      </div>
    </motion.div>
  );
}
