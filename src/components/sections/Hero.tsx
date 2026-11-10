import { hero } from "@/content/hero";
import { site } from "@/content/site";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const cycle = [...hero.lines, hero.role];

  return (
    <header id="top" className="relative overflow-hidden">
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-grain" aria-hidden="true" />
      <HeroMark />

      <div className="container-page relative z-10 pb-16 pt-28 md:pb-24 md:pt-36">
        <p className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
          Benipatti, Bihar → Phagwara
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3.1rem,11vw,7.25rem)] leading-[0.9] tracking-[-0.035em] text-fg">
          <span className="block">Vishal Kumar</span>
          <span className="block text-accent italic">Thakur</span>
        </h1>

        <div className="role-mask mt-6">
          <div className="role-cycle text-sm font-medium text-accent sm:text-base">
            {cycle.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{hero.intro}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href={hero.ctas.primary.href}
              className="inline-flex h-12 items-center rounded-full bg-accent-fill px-5 text-sm font-semibold text-accent-ink shadow-[0_10px_40px_-16px_var(--accent-fill)]"
            >
              {hero.ctas.primary.label}
            </a>
          </Magnetic>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-12 items-center rounded-full border border-line bg-bg/40 px-5 text-sm font-medium text-fg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            {hero.ctas.secondary.label}
          </a>
          <a
            href={site.resume}
            className="link-underline inline-flex h-12 items-center px-2 text-sm font-medium text-muted hover:text-fg"
          >
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 420"
      className="pointer-events-none absolute top-24 -right-10 hidden w-[min(42vw,28rem)] text-accent md:block"
      fill="none"
    >
      <circle cx="210" cy="210" r="168" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="210" cy="210" r="112" stroke="currentColor" strokeOpacity="0.55" />
      <path d="M210 62 L318 210 L210 358 L102 210 Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M210 118 L274 210 L210 302 L146 210 Z" stroke="var(--madder)" strokeWidth="1.25" />
      <circle cx="210" cy="210" r="6" fill="currentColor" />
      <circle cx="318" cy="210" r="4" fill="var(--madder)" />
      <circle cx="210" cy="62" r="4" fill="currentColor" />
    </svg>
  );
}
