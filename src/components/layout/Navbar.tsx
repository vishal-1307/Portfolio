import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/data/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import { Menu, Close, Download } from "@/components/primitives/icons";

const sectionIds = nav.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(["hero", ...sectionIds]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line/10 bg-bg/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#hero" className="group inline-flex items-center gap-2.5" aria-label="Vishal Kumar Thakur — home">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-accent/40 bg-accent/10 font-display text-sm font-bold text-accent">
            V
          </span>
          <span className="font-mono text-sm tracking-tight text-text">
            vishal<span className="text-accent">.</span>thakur
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors hover:text-text",
                    isActive ? "text-text" : "text-muted",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-underline"}
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            download
            className="hidden items-center gap-2 rounded-md border border-line/15 px-3.5 py-2 text-sm text-text transition-colors hover:border-accent/50 hover:text-accent md:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-md border border-line/15 text-text md:hidden"
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-line/10 bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base transition-colors hover:bg-surface",
                      active === item.id ? "text-accent" : "text-text",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 px-3">
                <a
                  href={site.resume}
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-md border border-line/15 px-3.5 py-2.5 text-sm text-text"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
