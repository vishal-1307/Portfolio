import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/data/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import { Menu, Close, ArrowUpRight } from "@/components/primitives/icons";

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
        scrolled ? "border-b border-ink/15 bg-paper/90 backdrop-blur" : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#hero" className="group inline-flex items-baseline gap-2 font-display text-lg font-extrabold tracking-tight text-ink" aria-label="Vishal Kumar Thakur — home">
          VKT<span className="text-accent">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item, i) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative inline-flex items-baseline gap-1.5 py-1 text-sm font-medium transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span className="text-[10px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-0.5 bg-accent transition-all duration-300 ease-emphatic",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            download
            className="hidden items-center gap-1.5 border border-ink px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper md:inline-flex"
          >
            Résumé
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center border border-ink text-ink md:hidden"
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
            className="border-b border-ink/15 bg-paper md:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {nav.map((item, i) => (
                <li key={item.id} className="border-t border-ink/10 first:border-t-0">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-3 py-4 text-lg font-semibold",
                      active === item.id ? "text-accent" : "text-ink",
                    )}
                  >
                    <span className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <a
                  href={site.resume}
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 border border-ink px-4 py-2.5 text-sm font-semibold text-ink"
                >
                  Download Résumé
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
