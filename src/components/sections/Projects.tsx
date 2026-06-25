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
  featured,
  onOpen,
}: {
  project: Project;
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
        {/* Whole card is a button for accessibility (keyboard-openable). */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open details for ${project.name}`}
          className="absolute inset-0 z-10"
        />

        <ImageWithFallback
          src={project.image}
          alt={`${project.name} — ${project.tagline}`}
          ratio={featured ? "16 / 11" : "16 / 10"}
          fallbackLabel={project.name.charAt(0)}
          className={featured ? "md:h-full" : ""}
          imgClassName="transition-transform duration-500 ease-emphatic group-hover:scale-[1.03] motion-reduce:transform-none"
        />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em]">
            <span className="inline-flex items-center gap-1.5 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {project.status}
            </span>
            {featured && <span className="rounded border border-accent/30 px-1.5 py-0.5 text-accent">Flagship</span>}
          </div>

          <h3 className="mt-3 font-display text-xl font-semibold text-text">{project.name}</h3>
          <p className="mt-1 text-sm text-faint">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-accent">
            View case
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
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
        className="grid gap-5 md:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
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
