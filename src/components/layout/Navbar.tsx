"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { cn } from "@/lib/cn";
import { Close, Menu } from "@/components/ui/icons";
import { ThemeToggle } from "./ThemeToggle";
import { OPEN_COMMAND } from "./CommandPalette";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const ids = nav.map((item) => item.id);
const pill = nav.filter((item) => ["now", "work", "impact", "contact"].includes(item.id));

export function Navbar() {
  const reduce = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="container-page pointer-events-auto relative z-10 flex items-center justify-between gap-2 pt-3">
        <a
          href="#top"
          className="relative z-10 inline-flex h-12 max-w-[40vw] items-center truncate rounded-full border border-line bg-bg/80 px-4 font-serif text-lg tracking-tight text-fg backdrop-blur-md sm:max-w-none"
        >
          <span className="sm:hidden">Vishal</span>
          <span className="hidden sm:inline">{site.shortName}</span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-line bg-bg/75 px-1.5 py-1 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md lg:flex"
        >
          {pill.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive ? "bg-fg text-bg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 rounded-full border border-line bg-bg/75 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND))}
            aria-label="Open command palette"
            className="inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-xs font-medium text-muted transition-colors hover:text-fg"
          >
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-fg lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto fixed inset-x-0 top-0 bottom-0 overflow-y-auto bg-bg px-6 pt-24 lg:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item, index) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="font-serif text-4xl tracking-tight text-fg">{item.label}</span>
                    <span className="font-mono text-xs text-accent tabular">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
