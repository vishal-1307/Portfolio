import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/content";
import { Tag } from "@/components/primitives/Tag";
import { ImageWithFallback } from "@/components/primitives/ImageWithFallback";
import { Close, ArrowUpRight, Lock } from "@/components/primitives/icons";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
      <motion.button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-h-[92svh] w-full max-w-3xl overflow-y-auto border border-ink bg-paper"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center border border-ink bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <Close className="h-5 w-5" />
        </button>

        <ImageWithFallback
          src={project.image}
          alt={`${project.name} — ${project.tagline}`}
          ratio="16 / 9"
          fallbackLabel={project.name.charAt(0)}
          className="border-b border-ink/15"
        />

        <div className="p-6 sm:p-8">
          <div className="eyebrow flex items-center gap-3 text-accent-ink">
            <span>{project.status}</span>
            <span className="h-px w-6 bg-ink/25" />
            <span className="text-faint">{project.tagline}</span>
          </div>

          <h3 id="project-modal-title" className="mt-3 font-display text-display-md font-extrabold text-ink">
            {project.name}
          </h3>

          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          <h4 className="eyebrow mt-7 text-accent-ink">Highlights</h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
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
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-ink/15 pt-6">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
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
                  className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  View code
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {codeIsPrivate && (
                <span className="inline-flex items-center gap-2 border border-ink/25 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-faint">
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
