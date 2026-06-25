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
        className="grid gap-12 md:grid-cols-[1.6fr_1fr] md:gap-16"
      >
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={item}
              className={i === 0 ? "text-lg leading-relaxed text-text" : "leading-relaxed text-muted"}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* spec sheet — mono key/value pairs */}
        <motion.dl variants={item} className="h-fit divide-y divide-line/10 rounded-card border border-line/12 bg-surface/60">
          {about.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 p-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{fact.label}</dt>
              <dd className="text-sm text-text">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </Section>
  );
}
