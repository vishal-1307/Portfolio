import { founder } from "@/content/founder";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/icons";

/** Server component. Entrance animation is CSS, see globals.css. */
export function Founder() {
  return (
    <Section id="founder" index="03" kicker="Founder" title={founder.lead}>
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 space-y-6 md:col-span-7">
          <div data-reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="font-display text-display-md font-extrabold text-paper">
              {founder.org}
            </h3>
            <a
              href={founder.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-accent-soft hover:underline"
            >
              mithilakritikala.com
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <p data-reveal className="eyebrow text-faint">
            {founder.role}
          </p>

          {founder.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
            >
              {paragraph}
            </p>
          ))}

          <dl data-reveal className="grid grid-cols-2 gap-6 pt-2">
            {founder.stats.map((stat) => (
              <div key={stat.label} className="border-t border-paper/12 pt-4">
                <dt className="font-display text-display-md font-black tabular text-accent-soft">
                  {stat.value}
                </dt>
                <dd className="mt-1 max-w-[20ch] text-sm leading-snug text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Registration facts — the part that makes this verifiable. */}
        <div data-reveal className="col-span-12 md:col-span-4 md:col-start-9">
          <div className="border border-paper/15 bg-surface p-6">
            <p className="eyebrow text-accent-soft">On the record</p>
            <dl className="mt-5">
              {founder.credentials.map((row) => (
                <div
                  key={row.key}
                  className="border-t border-paper/12 py-3.5 first:border-t-0 first:pt-0"
                >
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-faint">
                    {row.key}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-paper">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
