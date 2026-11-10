import { skills } from "@/content/skills";
import { Section } from "@/components/ui/Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <li key={group.label} data-reveal className="min-w-0">
            <h3 className="text-sm font-medium text-fg">{group.label}</h3>
            {group.note ? <p className="mt-3 text-xs leading-relaxed text-faint">{group.note}</p> : null}
            <ul className="mt-4 space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
