"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { cn } from "@/lib/cn";
import { Close, Menu } from "@/components/ui/icons";
import { ThemeToggle } from "./ThemeToggle";

const ids = nav.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className="sticky top-0 z-50">
      {/* Blur lives on the bar only. A filter on the header would become the
          containing block for the fixed menu and swallow its clicks. */}
      <div
        className={cn(
          "border-b transition-colors",
          scrolled || open ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent bg-bg/70",
        )}
      >
        <nav className="container-page flex h-14 items-center justify-between gap-4" aria-label="Primary">
        <a href="#top" className="truncate text-sm font-medium tracking-tight text-fg">
          {site.shortName}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full px-3 text-sm transition-colors",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center">
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
        </nav>
      </div>

      {open ? (
        <div id="mobile-menu" className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg lg:hidden">
          <ul className="container-page flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className="flex h-12 items-center text-lg text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
