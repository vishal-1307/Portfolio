import { motion, useReducedMotion } from "framer-motion";
import { hero, skills, site } from "@/data/content";
import { fadeUp, instant, stagger } from "@/lib/motion";
import { ArrowDown, ArrowUpRight } from "@/components/primitives/icons";
import { cn } from "@/lib/cn";

// Flatten the stack into a single marquee strip — sourced from content.ts.
const marquee = skills.flatMap((g) => g.items);

export function Hero() {
  const reduce = useReducedMotion();
  const item = reduce ? instant : fadeUp;

  return (
    <section id="hero" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col justify-between pt-16">
      <div className="container-page flex flex-1 flex-col justify-center py-12">
        <motion.div variants={reduce ? undefined : stagger} initial="hidden" animate="show">
          {/* masthead meta row */}
          <motion.div variants={item} className="mb-8 grid grid-cols-2 gap-4 border-y border-ink/15 py-3 md:grid-cols-3">
            <span className="eyebrow text-ink">Portfolio — 2026</span>
            <span className="eyebrow hidden text-center text-muted md:block">{hero.kicker}</span>
            <span className="eyebrow flex items-center justify-end gap-2 text-accent-ink">
              <span className="relative flex h-2 w-2">
                {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
          </motion.div>

          {/* giant name */}
          <motion.h1
            variants={item}
            className="font-display text-mega font-black uppercase leading-[0.9] tracking-[-0.03em] text-ink"
          >
            Vishal Kumar
            <br />
            Thakur<span className="text-accent">.</span>
          </motion.h1>

          {/* lower grid: statement + spec list */}
          <div className="mt-10 grid grid-cols-12 gap-8 md:mt-14">
            <motion.div variants={item} className="col-span-12 md:col-span-7">
              <p className="font-display text-display-md font-extrabold leading-tight text-ink">
                {hero.roles.map((role, i) => (
                  <span key={role}>
                    {i > 0 && <span className="text-accent"> / </span>}
                    {role}
                  </span>
                ))}
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{hero.subtitle}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
                >
                  View Work
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none" />
                </a>
                <a
                  href={site.resume}
                  download
                  className="group inline-flex items-center gap-2 border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Download Résumé
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* spec definition list */}
            <motion.dl variants={item} className="col-span-12 self-end md:col-span-4 md:col-start-9">
              {[
                { k: "Role", v: "Solo developer & founder" },
                { k: "Studying", v: "BCA Cybersecurity, LPU" },
                { k: "Based in", v: "Madhubani, Bihar · India" },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-4 border-t border-ink/15 py-2.5">
                  <dt className="eyebrow text-faint">{row.k}</dt>
                  <dd className="text-right text-sm font-medium text-ink">{row.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </motion.div>
      </div>

      {/* stack marquee strip */}
      <div className="overflow-hidden border-y border-ink/15 bg-ink py-3 text-paper">
        <div className={cn("flex w-max gap-8 whitespace-nowrap", !reduce && "animate-marquee")}>
          {[...marquee, ...marquee].map((kw, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
              {kw}
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
