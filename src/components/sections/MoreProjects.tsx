import { moreProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function MoreProjects() {
  return (
    <section id="more" aria-labelledby="more-title" className="scroll-mt-28 py-8 md:py-16">
      <div className="container-page">
        <h2 id="more-title" className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
          More projects
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {moreProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              variant={project.summary || project.image ? "card" : "name"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
