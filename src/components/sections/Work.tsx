import { projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { ProjectArticle } from "./ProjectArticle";

export function Work() {
  return (
    <Section id="work" title="Selected work">
      <div>
        {projects.map((project, index) => (
          <ProjectArticle key={project.id} project={project} index={index} density="feature" />
        ))}
      </div>
    </Section>
  );
}
