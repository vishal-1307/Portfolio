import { moreProjects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { ProjectArticle } from "./ProjectArticle";

export function MoreProjects() {
  return (
    <Section id="more" title="More projects">
      <div>
        {moreProjects.map((project, index) => (
          <ProjectArticle key={project.id} project={project} index={index} density="compact" />
        ))}
      </div>
    </Section>
  );
}
