import Image from "next/image";
import type { Project, ProjectNote } from "@/content/projects";
import { ArrowUpRight } from "@/components/ui/icons";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/cn";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function ProjectCard({
  project,
  index,
  variant = "card",
}: {
  project: Project;
  index: number;
  variant?: "feature" | "card" | "name";
}) {
  const number = String(index + 1).padStart(2, "0");

  if (variant === "name" || (!project.summary && !project.image)) {
    return (
      <article
        data-reveal
        className="glow-card flex min-h-28 flex-col justify-between rounded-3xl border border-line bg-elevated/60 p-5"
      >
        <span className="font-mono text-xs text-accent tabular">{number}</span>
        <h3 className="mt-6 font-serif text-2xl tracking-tight text-fg">{project.name}</h3>
      </article>
    );
  }

  const featured = variant === "feature";
  const wide = featured || !project.image;

  return (
    <Tilt className={cn("h-full rounded-3xl", wide && "md:col-span-2")}>
      <article
        data-reveal
        className="group h-full overflow-hidden rounded-3xl border border-line bg-elevated/80"
      >
        <div className={cn("grid min-w-0", featured && project.image && "lg:grid-cols-2")}>
          <div className="flex min-w-0 flex-col p-5 sm:p-7">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
              <span className="text-accent tabular">{number}</span>
              {project.year ? <span>{project.year}</span> : null}
              {project.status ? <span className="text-accent">{project.status}</span> : null}
            </p>
            <h3
              className={cn(
                "mt-3 font-serif tracking-tight text-fg",
                featured ? "text-4xl md:text-5xl" : "text-3xl",
              )}
            >
              {project.name}
            </h3>
            {project.summary ? (
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">{project.summary}</p>
            ) : null}
            {project.stack && project.stack.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line bg-bg/40 px-2.5 py-1 text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}
            <ProjectLinks project={project} />
            {project.notes && project.notes.length > 0 ? <BuildNotes notes={project.notes} /> : null}
          </div>
          {project.image ? (
            <div className={cn("min-w-0 p-3 sm:p-4", featured ? "lg:p-4" : "")}>
              <div className="overflow-hidden rounded-2xl border border-line bg-bg">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `Screenshot of ${project.name}`}
                  width={1600}
                  height={1000}
                  sizes={featured ? "(min-width: 1024px) 36rem, 100vw" : "(min-width: 768px) 28rem, 100vw"}
                  className="img-zoom h-auto w-full max-w-full"
                />
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </Tilt>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const repoUrl = project.repo && project.repo !== "private" ? project.repo : null;
  if (!project.live && !repoUrl && project.repo !== "private") return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {project.live ? (
        <a
          href={project.live}
          {...external}
          className="link-underline inline-flex items-center gap-1 font-medium text-fg hover:text-accent"
        >
          Live
          <ArrowUpRight className="size-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
      {repoUrl ? (
        <a
          href={repoUrl}
          {...external}
          className="link-underline inline-flex items-center gap-1 font-medium text-fg hover:text-accent"
        >
          Source
          <ArrowUpRight className="size-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
      {project.repo === "private" ? <span className="text-faint">Private source</span> : null}
    </div>
  );
}

function BuildNotes({ notes }: { notes: ProjectNote[] }) {
  return (
    <details className="mt-6 border-t border-line pt-4">
      <summary className="cursor-pointer text-sm font-medium text-fg hover:text-accent">Build notes</summary>
      <ul className="mt-4 space-y-4">
        {notes.map((note) => (
          <li key={note.label}>
            <p className="text-sm font-medium text-fg">{note.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{note.detail}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
