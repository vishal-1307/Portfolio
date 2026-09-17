"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Close, Menu } from "@/components/ui/icons";

const ids = nav.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open mobile sheet, and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-paper/12 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        {/* The accessible name opens with the visible text, so speech input
            ("click V T") matches what is on screen — WCAG 2.5.3 Label in Name. */}
        <a
          href="#top"
          className="inline-flex items-center py-2 font-display text-lg font-extrabold tracking-tight text-paper"
          aria-label={`${site.initials} — ${site.name}, back to top`}
        >
          {site.initials}
          <span className="text-accent-soft">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.map((item, i) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  // py-2 keeps the hit area at the 24px WCAG 2.5.8 minimum
                  // without changing how the row looks.
                  className={cn(
                    "group relative inline-flex items-baseline gap-1.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-paper" : "text-muted hover:text-paper",
                  )}
                >
                  <span aria-hidden="true" className="text-[10px] font-semibold text-accent-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-accent-soft transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
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
            className="hidden items-center gap-1.5 border border-paper/35 px-3.5 py-2 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink md:inline-flex"
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
            className="grid h-10 w-10 place-items-center border border-paper/35 text-paper md:hidden"
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-b border-paper/12 bg-ink md:hidden">
            <ul className="container-page flex flex-col py-2">
              {nav.map((item, i) => (
                <li key={item.id} className="border-t border-paper/10 first:border-t-0">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-3 py-4 font-display text-xl font-extrabold",
                      active === item.id ? "text-accent-soft" : "text-paper",
                    )}
                  >
                    <span aria-hidden="true" className="text-xs font-semibold text-accent-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="border-t border-paper/10 py-4">
                <a
                  href={site.resume}
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 border border-paper/35 px-4 py-2.5 text-sm font-semibold text-paper"
                >
                  Download résumé
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
        </div>
      ) : null}
    </header>
  );
}
