import { founder } from "@/content/founder";
import { ArrowUpRight } from "@/components/ui/icons";

export function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="scroll-mt-28 py-16 md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] border border-madder/30 bg-[color-mix(in_oklab,var(--madder)_12%,var(--elevated))] px-5 py-8 sm:px-8 md:px-12 md:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-accent/20 blur-3xl"
          />
          <MithilaFrieze />
          <div className="relative mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
            <div data-reveal>
              <h2 id="impact-title" className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                Social impact
              </h2>
              <p className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-fg md:text-6xl">
                {founder.org}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-fg md:text-lg">{founder.lead}</p>
              <p className="mt-4 text-sm text-muted">
                {founder.role}
                <span> · since {founder.since}</span>
              </p>
              <div className="mt-5 max-w-xl space-y-4">
                {founder.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted md:text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <a
                href={founder.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-fg hover:text-accent"
              >
                mithilakritikala.com
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <dl data-reveal className="rounded-3xl border border-line bg-bg/50 p-5 sm:p-6">
              {founder.credentials.map((item) => (
                <div key={item.key} className="border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0">
                  <dt className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">{item.key}</dt>
                  <dd className="mt-1 text-sm text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function MithilaFrieze() {
  return (
    <svg aria-hidden="true" className="h-8 w-full text-accent" role="presentation">
      <defs>
        <pattern id="mithila-frieze" width="36" height="28" patternUnits="userSpaceOnUse">
          <path d="M18 3 L31 14 L18 25 L5 14 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="18" cy="14" r="1.6" fill="var(--madder)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mithila-frieze)" />
    </svg>
  );
}
