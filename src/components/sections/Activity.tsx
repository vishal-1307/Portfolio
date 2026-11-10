import { activity } from "@/content/activity";

export function Activity() {
  return (
    <section id="activity" aria-labelledby="activity-title" className="scroll-mt-28 py-12 md:py-20">
      <div className="container-page">
        <h2 id="activity-title" className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
          Activity
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {activity.map((item, index) => (
            <li
              key={item}
              data-reveal
              className="flex items-baseline justify-between gap-4 rounded-3xl border border-line px-5 py-5"
            >
              <span className="font-serif text-2xl tracking-tight text-fg">{item}</span>
              <span className="font-mono text-xs text-accent tabular">{String(index + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
