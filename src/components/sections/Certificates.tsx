import { motion, useReducedMotion } from "framer-motion";
import { certificates } from "@/data/content";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
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
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certificates.map((cert, i) => (
          <motion.li key={`${cert.title}-${i}`} variants={item}>
            <Card className="flex h-full flex-col justify-between gap-6 p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[11px] text-accent">{cert.year}</span>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold leading-snug text-text">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted">{cert.org}</p>
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
