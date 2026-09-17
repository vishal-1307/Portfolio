"use client";

import { useId, useState } from "react";
import type { Project } from "@/content/projects";
import { Tag } from "@/components/ui/Tag";
import { ArrowUpRight, Lock, Minus, Plus } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./ProjectVisual";

/**
 * One case study. Image and text alternate sides on desktop and stack on
 * mobile.
 *
 * The build notes are a disclosure rather than a modal: the content is
 * server-rendered into the page, so it is indexable and printable, and no focus
 * trap is needed. The panel animates with a CSS grid row transition — no height
 * measurement, no animation library. `inert` keeps the collapsed copy out of
 * the accessibility tree and the tab order while leaving it in the HTML.
 */
export function ProjectRow({
  project,
  index,
  priority,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const flip = index % 2 === 1;
  const hasRepo = project.repo !== "" && project.repo !== "private";
  const repoIsPrivate = project.repo === "private";

  return (
    <article className="grid grid-cols-12 items-start gap-x-8 gap-y-6 border-t border-paper/12 py-12 first:border-t-0 first:pt-0 md:py-16">
      {/* Visual */}
      <div
        data-reveal="clip"
        className={cn(
          "col-span-12 md:col-span-6",
          flip ? "md:order-2 md:col-start-7" : "md:order-1",
        )}
      >
        <div className="relative aspect-16/10 overflow-hidden border border-paper/15 bg-surface">
          <ProjectVisual project={project} priority={priority} />
        </div>
      </div>

      {/* Copy */}
      <div
        className={cn(
          "col-span-12 md:col-span-6",
          flip ? "md:order-1 md:col-start-1" : "md:order-2",
        )}
      >
        <div data-reveal className="flex flex-wrap items-center gap-4">
          <span aria-hidden="true" className="font-display text-2xl font-black tabular text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="eyebrow border border-paper/20 px-2 py-1 text-faint">
            {project.status}
          </span>
          <span className="eyebrow tabular text-faint">{project.year}</span>
        </div>

        <h3
          data-reveal
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
          className="mt-4 font-display text-display-md font-extrabold text-paper"
        >
          {project.name}
        </h3>

        <p
          data-reveal
          style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
          className="mt-3 max-w-xl font-display text-lg font-bold leading-snug text-accent-soft"
        >
          {project.hook}
        </p>

        <p
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          className="mt-4 max-w-xl leading-relaxed text-muted"
        >
          {project.summary}
        </p>

        <ul
          data-reveal
          style={{ "--reveal-delay": "210ms" } as React.CSSProperties}
          className="mt-6 flex flex-wrap gap-2"
        >
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {/* Build notes disclosure */}
        <div className="mt-7 border-t border-paper/12">
          <h4>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="group flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="eyebrow text-paper transition-colors group-hover:text-accent-soft">
                What was hard
                <span className="sr-only"> building {project.name}</span>
              </span>
              <span className="grid h-7 w-7 shrink-0 place-items-center border border-paper/25 text-paper transition-colors group-hover:border-accent-soft group-hover:text-accent-soft">
                {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
          </h4>

          <div id={panelId} className="disclosure" data-open={open} inert={!open}>
            <div>
              <ul className="space-y-5 pb-6">
                {project.hard.map((point) => (
                  <li key={point.label} className="border-l-2 border-accent pl-4">
                    <p className="text-sm font-semibold text-paper">{point.label}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-paper bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              Visit live site
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
              <span className="sr-only">— {project.name}</span>
            </a>
          ) : null}

          {hasRepo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-paper/35 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              View code
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">— {project.name}</span>
            </a>
          ) : null}

          {repoIsPrivate ? (
            <span className="inline-flex items-center gap-2 border border-paper/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              <Lock className="h-3.5 w-3.5" />
              Private repo
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
