import { motion, useReducedMotion } from "framer-motion";
import { about } from "@/data/content";
import { Section } from "@/components/primitives/Section";
import { fadeUp, instant, stagger, viewportOnce } from "@/lib/motion";

export function About() {
  const reduce = useReducedMotion();
  const item = reduce ? instant : fadeUp;

  return (
    <Section id="about" index="01" kicker="About" title="A developer who ships the whole thing.">
      <motion.div
        variants={reduce ? undefined : stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-12 gap-x-6 gap-y-10"
      >
        <div className="col-span-12 space-y-6 md:col-span-7">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={item}
              className={
                i === 0
                  ? "font-display text-display-md font-extrabold leading-tight text-ink"
                  : "max-w-xl text-lg leading-relaxed text-muted"
              }
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* spec sheet */}
        <motion.dl variants={item} className="col-span-12 self-start md:col-span-4 md:col-start-9">
          {about.facts.map((fact) => (
            <div key={fact.label} className="border-t border-ink/15 py-4 first:border-t-0 md:first:border-t">
              <dt className="eyebrow text-accent-ink">{fact.label}</dt>
              <dd className="mt-1.5 text-base font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </Section>
  );
}
