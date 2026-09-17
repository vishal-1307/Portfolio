import { alsoBuilt, projects } from "@/content/projects";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { ArrowUpRight, Lock } from "@/components/ui/icons";
import { ProjectRow } from "./ProjectRow";

/**
 * Server component. Only the individual project rows are client components,
 * and only because of the build-notes disclosure.
 */
export function Work() {
  return (
    <Section
      id="work"
      index="02"
      kicker="Selected work"
      title="Six things I built and shipped."
      description="This is the curated set, not the full list. Each one is a real system with real constraints — open the build notes for the part that took the longest."
    >
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} priority={i === 0} />
        ))}
      </div>

      {/* Also built */}
      <div className="mt-6 border-t border-paper/12 pt-10">
        <h3 data-reveal className="eyebrow text-accent-soft">
          Also built
        </h3>

        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          {alsoBuilt.map((entry, i) => (
            <li
              key={entry.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="border-t border-paper/12 pt-5 md:border-t-0 md:border-l md:pl-6 md:pt-0"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="font-display text-lg font-extrabold text-paper">{entry.name}</h4>
                {entry.live ? (
                  <a
                    href={entry.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 py-1 text-xs font-semibold text-accent-soft hover:underline"
                  >
                    Visit
                    <ArrowUpRight className="h-3 w-3" />
                    <span className="sr-only">— {entry.name}</span>
                  </a>
                ) : null}
                {entry.repo === "private" ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-faint">
                    <Lock className="h-3 w-3" />
                    Private
                  </span>
                ) : null}
              </div>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{entry.hook}</p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
