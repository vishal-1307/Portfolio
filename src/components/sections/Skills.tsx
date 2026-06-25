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
        className="border-t border-ink/15"
      >
        {skills.map((group, i) => (
          <motion.div
            key={group.label}
            variants={item}
            className="grid grid-cols-12 items-start gap-x-6 gap-y-3 border-b border-ink/15 py-6"
          >
            <div className="col-span-12 flex items-baseline gap-3 md:col-span-3">
              <span className="font-display text-sm font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-lg font-extrabold text-ink">{group.label}</h3>
            </div>
            <ul className="col-span-12 flex flex-wrap gap-2 md:col-span-9">
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
