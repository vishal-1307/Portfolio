import Image from "next/image";
import type { Project, ProjectNote } from "@/content/projects";
import { ArrowUpRight } from "@/components/ui/icons";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function ProjectArticle({
  project,
  index,
  density = "feature",
}: {
  project: Project;
  index: number;
  density?: "feature" | "compact";
}) {
  const number = String(index + 1).padStart(2, "0");
  const rich = Boolean(project.summary || project.image || project.stack?.length);

  if (!rich) {
    return (
      <article data-reveal className="flex items-baseline gap-4 border-t border-line py-4">
        <span className="w-7 shrink-0 font-mono text-xs text-faint tabular">{number}</span>
        <h3 className="text-base font-medium tracking-tight text-fg">{project.name}</h3>
      </article>
    );
  }

  const showMeta = density === "feature" || Boolean(project.year || project.status);
  const titleClass =
    density === "feature"
      ? "mt-3 text-2xl font-medium tracking-tight text-fg md:text-[1.75rem]"
      : showMeta
        ? "mt-2 text-xl font-medium tracking-tight text-fg"
        : "text-xl font-medium tracking-tight text-fg";

  return (
    <article data-reveal className="border-t border-line py-10 md:py-14">
      <div
        className={
          project.image
            ? density === "feature"
              ? "grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-16"
              : "grid min-w-0 items-start gap-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
            : "max-w-2xl"
        }
      >
        <div className={project.image && density === "compact" ? "min-w-0 md:order-2" : "min-w-0"}>
          {showMeta ? (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-faint">
              {density === "feature" ? <span className="font-mono tabular">{number}</span> : null}
              {project.year ? <span className="font-mono">{project.year}</span> : null}
              {project.status ? <span className="text-muted">{project.status}</span> : null}
            </p>
          ) : null}
          <h3 className={titleClass}>{project.name}</h3>
          {project.summary ? (
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">{project.summary}</p>
          ) : null}
          {project.stack && project.stack.length > 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-faint">{project.stack.join(" · ")}</p>
          ) : null}
          <ProjectLinks project={project} />
          {project.notes && project.notes.length > 0 ? <BuildNotes notes={project.notes} /> : null}
        </div>
        {project.image ? (
          <div className={density === "compact" ? "min-w-0 md:order-1" : "min-w-0"}>
            <Image
              src={project.image}
              alt={project.imageAlt ?? `Screenshot of ${project.name}`}
              width={1600}
              height={1000}
              sizes={
                density === "feature"
                  ? "(min-width: 1024px) 36rem, 100vw"
                  : "(min-width: 768px) 16rem, 100vw"
              }
              className="h-auto w-full max-w-full rounded-xl border border-line bg-elevated"
            />
          </div>
        ) : null}
      </div>
    </article>
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
          className="inline-flex items-center gap-1 font-medium text-fg transition-colors hover:text-accent"
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
          className="inline-flex items-center gap-1 font-medium text-fg transition-colors hover:text-accent"
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
      <summary className="cursor-pointer text-sm font-medium text-fg transition-colors hover:text-accent">
        Build notes
      </summary>
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
