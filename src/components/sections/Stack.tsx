import { skills } from "@/content/skills";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/** Server component. Entrance animation is CSS, see globals.css. */
export function Stack() {
  return (
    <Section
      id="stack"
      index="04"
      kicker="Stack"
      title="What I build with, and what I break with."
      description="Every tool below has shipped in something on this page. The security group is the one worth reading twice — those are fixes I made to my own live apps, not coursework."
    >
      <div className="border-t border-paper/12">
        {skills.map((group, i) => (
          <div
            key={group.label}
            data-reveal
            style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            className={cn(
              "grid grid-cols-12 items-start gap-x-6 gap-y-4 border-b border-paper/12 py-7",
              group.emphasis && "bg-surface",
            )}
          >
            <div className={cn("col-span-12 md:col-span-3", group.emphasis && "md:pl-5")}>
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-extrabold tabular text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={cn(
                    "font-display text-lg font-extrabold",
                    group.emphasis ? "text-accent-soft" : "text-paper",
                  )}
                >
                  {group.label}
                </h3>
              </div>
            </div>

            <div className={cn("col-span-12 md:col-span-9", group.emphasis && "md:pr-5")}>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className={cn(
                      "border px-3 py-1.5 text-sm font-medium",
                      group.emphasis ? "border-accent/45 text-paper" : "border-paper/20 text-muted",
                    )}
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              {group.note ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{group.note}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
