import { skills } from "@/content/skills";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-28 py-12 md:py-20">
      <div className="container-page">
        <h2 id="skills-title" className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
          Skills
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {skills.map((group) => (
            <li key={group.label} data-reveal className="rounded-3xl border border-line bg-elevated/70 p-6">
              <h3 className="font-serif text-2xl tracking-tight text-fg">{group.label}</h3>
              {group.note ? <p className="mt-2 text-xs leading-relaxed text-faint">{group.note}</p> : null}
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
