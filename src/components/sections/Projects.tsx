import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/data/content";
import { Section } from "@/components/primitives/Section";
import { Card } from "@/components/primitives/Card";
import { Tag } from "@/components/primitives/Tag";
import { ImageWithFallback } from "@/components/primitives/ImageWithFallback";
import { fadeUp, instant, stagger, viewportOnce } from "@/lib/motion";
import { ArrowUpRight } from "@/components/primitives/icons";
import { ProjectModal } from "./ProjectModal";

function ProjectCard({
  project,
  number,
  featured,
  onOpen,
}: {
  project: Project;
  number: number;
  featured?: boolean;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div variants={reduce ? instant : fadeUp} className={featured ? "md:col-span-2" : ""}>
      <Card
        as="article"
        interactive
        className={`group h-full overflow-hidden ${featured ? "md:grid md:grid-cols-2" : "flex flex-col"}`}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open details for ${project.name}`}
          className="absolute inset-0 z-10"
        />

        <div className="order-2 overflow-hidden border-b border-ink/15 md:order-none md:border-b-0 md:border-r">
          <ImageWithFallback
            src={project.image}
            alt={`${project.name} — ${project.tagline}`}
            ratio={featured ? "16 / 11" : "16 / 10"}
            fallbackLabel={project.name.charAt(0)}
            className={featured ? "h-full" : ""}
            imgClassName="transition-transform duration-500 ease-emphatic group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>

        <div className="order-1 flex flex-1 flex-col p-6 md:order-none md:p-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-black text-accent">{String(number).padStart(2, "0")}</span>
            <span className="eyebrow flex items-center gap-2 text-muted">
              {featured && <span className="bg-accent px-1.5 py-0.5 text-accent-foreground">Flagship</span>}
              {project.status}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-ink md:text-3xl">{project.name}</h3>
          <p className="mt-1 text-sm font-medium text-faint">{project.tagline}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-accent-ink">
            View case
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      index="03"
      kicker="Selected Work"
      title="Products built and shipped end-to-end."
      description="A few things I’ve taken from first commit to live users. Click any card for the full build story."
    >
      <motion.div
        variants={reduce ? undefined : stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            number={i + 1}
            featured={project.featured}
            onOpen={() => setActive(project)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  );
}
