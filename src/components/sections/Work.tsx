import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function Work() {
  const [featured, ...rest] = projects;
  if (!featured) return null;

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-28 py-16 md:py-24">
      <div className="container-page">
        <h2 id="work-title" className="font-serif text-4xl tracking-tight text-fg md:text-5xl">
          Selected work
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProjectCard project={featured} index={0} variant="feature" />
          {rest.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
              variant={project.summary || project.image ? "card" : "name"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
