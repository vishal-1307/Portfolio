import { founder } from "@/content/founder";
import { hero } from "@/content/hero";
import { skills } from "@/content/skills";
import { ArrowUpRight } from "@/components/ui/icons";

const highlights = skills.flatMap((group) => group.items.slice(0, group.label === "Backend" ? 2 : 3));

export function Bento() {
  const studying = hero.facts[0];
  const years = hero.facts[1];
  const from = hero.facts[2];

  return (
    <section id="now" aria-labelledby="now-title" className="scroll-mt-28 py-8 md:py-14">
      <div className="container-page">
        <h2 id="now-title" className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
          Now
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">
          <article
            data-reveal
            className="glow-card rounded-3xl border border-line bg-elevated/80 p-6 md:col-span-2 md:row-span-2 md:p-8"
          >
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Studying</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-tight text-fg md:text-4xl">
              {studying?.value}
            </p>
            <p className="mt-4 text-sm text-muted">{years?.value}</p>
          </article>

          <article data-reveal className="glow-card rounded-3xl border border-line bg-elevated/80 p-6">
            <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">From</p>
            <p className="mt-3 font-serif text-2xl leading-tight text-fg">{from?.value}</p>
          </article>

          <article data-reveal className="glow-card rounded-3xl border border-line bg-elevated/80 p-6">
            <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">Trust</p>
            <p className="mt-3 font-serif text-2xl leading-tight text-fg">12A & 80G</p>
            <p className="mt-2 text-sm text-muted">
              NGO Darpan {founder.credentials.find((item) => item.key === "NGO Darpan ID")?.value}
            </p>
          </article>

          <article data-reveal className="glow-card rounded-3xl border border-line bg-elevated/80 p-6 md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">Training</p>
            <p className="mt-3 font-serif text-2xl leading-tight text-fg">3 batches completed</p>
            <p className="mt-2 text-sm text-muted">Free sewing and Mithila painting</p>
          </article>

          <article data-reveal className="glow-card rounded-3xl border border-line bg-elevated/80 p-6 md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">{founder.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg">
                  {founder.role}
                  <span className="text-muted"> · since {founder.since}</span>
                </p>
              </div>
              <a
                href={founder.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowUpRight className="size-4" />
                <span className="sr-only">mithilakritikala.com (opens in a new tab)</span>
              </a>
            </div>
          </article>

          <article data-reveal className="glow-card rounded-3xl border border-line bg-elevated/80 p-6 md:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">Stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-bg/50 px-3 py-1.5 text-sm text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
