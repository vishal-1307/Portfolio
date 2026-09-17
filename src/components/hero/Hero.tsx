import { hero } from "@/content/hero";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowDown, Download } from "@/components/ui/icons";
import { HeroVisual } from "./HeroVisual";

/**
 * Server-rendered hero. The headline is plain HTML in the initial payload, so
 * the largest paint is text that is already there — the canvas mounts later and
 * never sits on the critical path.
 */
export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-svh flex-col pt-16">
      <div className="container-page relative flex flex-1 flex-col justify-center py-10 md:py-14">
        {/* Masthead meta row */}
        <div className="mb-10 grid grid-cols-1 gap-3 border-y border-paper/12 py-3 md:grid-cols-3">
          <span className="eyebrow text-paper">{hero.meta.left}</span>
          <span className="eyebrow hidden text-center text-faint md:block">{hero.meta.center}</span>
          <span className="eyebrow flex items-center gap-2 text-accent-soft md:justify-end">
            <span className="relative flex h-1.5 w-1.5">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full rounded-full bg-accent motion-safe:animate-pulse-dot"
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {hero.meta.status}
          </span>
        </div>

        <div className="grid grid-cols-12 items-center gap-y-10 md:gap-x-8">
          {/* Left: the argument */}
          <div className="col-span-12 md:col-span-7">
            {/* Block spans rather than <br/>, so the accessible name and any
                text extraction still read "Vishal Kumar Thakur." with a space. */}
            <h1 className="font-display text-mega font-black uppercase text-paper">
              <span className="block">{hero.name[0]}</span>{" "}
              <span className="block">
                {hero.name[1]}
                <span className="text-accent">.</span>
              </span>
            </h1>

            <p className="mt-7 font-display text-display-md font-extrabold text-paper">
              {hero.title}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {hero.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={hero.ctas.primary.href}>
                {hero.ctas.primary.label}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none" />
              </ButtonLink>
              <ButtonLink href={hero.ctas.secondary.href} variant="outline" download>
                {hero.ctas.secondary.label}
                <Download className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          {/* Right: the lattice */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[26rem] md:max-w-none">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* Spec list */}
        <dl className="mt-12 grid grid-cols-1 border-t border-paper/12 sm:grid-cols-3">
          {hero.spec.map((row) => (
            <div
              key={row.key}
              className="flex items-baseline justify-between gap-4 border-b border-paper/12 py-3 sm:flex-col sm:items-start sm:gap-1 sm:border-b-0 sm:border-r sm:px-5 sm:py-4 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="eyebrow text-faint">{row.key}</dt>
              <dd className="text-right text-sm font-medium text-paper sm:text-left">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Stack marquee */}
      <div className="overflow-hidden border-y border-paper/12 bg-surface py-3">
        <div className="flex w-max gap-8 whitespace-nowrap motion-safe:animate-marquee">
          {[...hero.marquee, ...hero.marquee].map((item, i) => (
            <span
              key={i}
              aria-hidden={i >= hero.marquee.length ? "true" : undefined}
              className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted"
            >
              {item}
              <span className="text-accent" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
