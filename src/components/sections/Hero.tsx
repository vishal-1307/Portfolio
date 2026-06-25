import { motion, useReducedMotion } from "framer-motion";
import { hero, site } from "@/data/content";
import { fadeUp, instant, stagger } from "@/lib/motion";
import { ArrowDown, Download } from "@/components/primitives/icons";

export function Hero() {
  const reduce = useReducedMotion();
  const item = reduce ? instant : fadeUp;

  return (
    <section id="hero" aria-label="Introduction" className="relative flex min-h-[100svh] items-center pt-24">
      <div className="container-page">
        <motion.div
          variants={reduce ? undefined : stagger}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* status / location kicker */}
          <motion.p variants={item} className="flex items-center gap-3 label-mono text-accent">
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.availability}
            <span className="text-faint">/ {hero.kicker}</span>
          </motion.p>

          {/* name */}
          <motion.h1
            variants={item}
            className="mt-6 font-display text-display-xl font-bold uppercase leading-none tracking-tight text-text"
          >
            Vishal Kumar
            <br />
            <span className="text-text/90">Thakur</span>
          </motion.h1>

          {/* role line */}
          <motion.p variants={item} className="mt-6 font-display text-display-md font-medium text-muted">
            {hero.roles.map((role, i) => (
              <span key={role}>
                {i > 0 && <span className="px-2 text-accent">·</span>}
                <span className="text-text">{role}</span>
              </span>
            ))}
          </motion.p>

          {/* subtitle */}
          <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-200 ease-emphatic hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              View Work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none" />
            </a>
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-md border border-line/20 px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint md:flex"
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-accent/60 to-transparent" />
      </motion.a>
    </section>
  );
}
