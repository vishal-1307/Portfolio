import Image from "next/image";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

export function Hero() {
  return (
    <div id="top" className="hero-wash">
      <div className="container-page pb-20 pt-14 md:pb-28 md:pt-20">
        <Image
          src={site.portrait.src}
          alt={site.portrait.alt}
          width={site.portrait.width}
          height={site.portrait.height}
          priority
          sizes="64px"
          className="size-16 rounded-full object-cover object-[center_18%] ring-1 ring-line"
        />
        <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,7vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance text-fg">
          {site.name}
        </h1>
        <p className="mt-4 text-lg text-muted md:text-xl">{hero.role}</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{hero.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={hero.ctas.primary.href}
            className="inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg transition-opacity hover:opacity-80"
          >
            {hero.ctas.primary.label}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-fg transition-colors hover:bg-elevated"
          >
            {hero.ctas.secondary.label}
          </a>
          <a
            href={site.resume}
            className="inline-flex h-11 items-center rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            Résumé
          </a>
        </div>
        <dl className="mt-14 max-w-2xl border-y border-line">
          {hero.facts.map((fact) => (
            <div key={fact.key} className="grid gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
              <dt className="text-sm text-faint">{fact.key}</dt>
              <dd className="text-sm leading-relaxed text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
