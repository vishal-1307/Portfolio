import { motion, useReducedMotion } from "framer-motion";
import { certificates } from "@/data/content";
import { Section } from "@/components/primitives/Section";
import { fadeUp, instant, stagger, viewportOnce } from "@/lib/motion";

export function Certificates() {
  const reduce = useReducedMotion();
  const item = reduce ? instant : fadeUp;

  return (
    <Section id="certificates" index="04" kicker="Credentials" title="Certificates.">
      <motion.ul
        variants={reduce ? undefined : stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certificates.map((cert, i) => (
          <motion.li
            key={`${cert.title}-${i}`}
            variants={item}
            className="group flex min-h-[8.5rem] flex-col justify-between gap-6 bg-paper p-5 transition-colors hover:bg-surface"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-lg font-black text-ink/20">{String(i + 1).padStart(2, "0")}</span>
              <span className="eyebrow text-accent-ink">{cert.year}</span>
            </div>
            <div>
              <h3 className="font-display text-base font-extrabold leading-snug text-ink">{cert.title}</h3>
              <p className="mt-1 text-sm text-muted">{cert.org}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
