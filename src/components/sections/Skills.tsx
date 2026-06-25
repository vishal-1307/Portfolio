import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/data/content";
import { Section } from "@/components/primitives/Section";
import { Tag } from "@/components/primitives/Tag";
import { fadeUp, instant, stagger, viewportOnce } from "@/lib/motion";

export function Skills() {
  const reduce = useReducedMotion();
  const item = reduce ? instant : fadeUp;

  return (
    <Section
      id="skills"
      index="02"
      kicker="Stack"
      title="The tools I build production with."
      description="Grouped by where they live in the stack — every one has shipped in a real project, not just a tutorial."
    >
      <motion.div
        variants={reduce ? undefined : stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-px overflow-hidden rounded-card border border-line/12 bg-line/10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((group) => (
          <motion.div key={group.label} variants={item} className="bg-bg p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-base font-semibold text-text">{group.label}</h3>
              <span className="font-mono text-[11px] text-faint">{String(group.items.length).padStart(2, "0")}</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
