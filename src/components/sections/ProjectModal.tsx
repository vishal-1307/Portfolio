import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/content";
import { Tag } from "@/components/primitives/Tag";
import { ImageWithFallback } from "@/components/primitives/ImageWithFallback";
import { Close, ArrowUpRight, Lock } from "@/components/primitives/icons";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + restore focus to the element that opened the modal.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap
      if (e.key === "Tab" && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose]);

  const hasCode = project.code && project.code !== "private";
  const codeIsPrivate = project.code === "private";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      {/* backdrop */}
      <motion.button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line/15 bg-surface shadow-lift sm:rounded-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-md border border-line/15 bg-bg/60 text-text backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Close className="h-5 w-5" />
        </button>

        <ImageWithFallback
          src={project.image}
          alt={`${project.name} — ${project.tagline}`}
          ratio="16 / 9"
          fallbackLabel={project.name.charAt(0)}
          className="rounded-t-2xl"
        />

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-accent">{project.status}</span>
            <span className="h-px w-6 bg-line/20" />
            <span className="text-faint">{project.tagline}</span>
          </div>

          <h3 id="project-modal-title" className="mt-3 font-display text-display-md font-semibold text-text">
            {project.name}
          </h3>

          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          <h4 className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Highlights</h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-text">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {(project.live || hasCode || codeIsPrivate) && (
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line/10 pt-6">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
                >
                  Visit live site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {hasCode && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line/20 px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent/50 hover:text-accent"
                >
                  View code
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {codeIsPrivate && (
                <span className="inline-flex items-center gap-2 rounded-md border border-line/15 px-4 py-2.5 font-mono text-xs text-faint">
                  <Lock className="h-4 w-4" />
                  Private repo
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
