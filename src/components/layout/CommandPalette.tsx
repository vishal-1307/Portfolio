"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site, socials } from "@/content/site";
import { moreProjects, projects } from "@/content/projects";
import { applyTheme, readTheme } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Item = {
  id: string;
  group: string;
  label: string;
  hint: string;
  run: () => void;
};

export const OPEN_COMMAND = "open-command";

export function CommandPalette() {
  const reduce = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const sectionItems: Item[] = nav.map((item) => ({
      id: `section-${item.id}`,
      group: "Go to",
      label: item.label,
      hint: "Section",
      run: go(item.id),
    }));
    const contactItems: Item[] = [
      {
        id: "email",
        group: "Contact",
        label: site.email,
        hint: "Email",
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "resume",
        group: "Contact",
        label: "Résumé",
        hint: "PDF",
        run: () => {
          window.location.href = site.resume;
        },
      },
      ...socials.map((social) => ({
        id: social.label,
        group: "Contact",
        label: social.label,
        hint: social.handle,
        run: () => {
          window.open(social.href, "_blank", "noopener,noreferrer");
        },
      })),
    ];
    const workItems: Item[] = [...projects, ...moreProjects]
      .filter((project) => project.live)
      .map((project) => ({
        id: `live-${project.id}`,
        group: "Live",
        label: project.name,
        hint: "Opens site",
        run: () => {
          window.open(project.live, "_blank", "noopener,noreferrer");
        },
      }));
    const themeItem: Item = {
      id: "theme",
      group: "Appearance",
      label: "Toggle light and dark",
      hint: "Theme",
      run: () => applyTheme(readTheme() === "light" ? "dark" : "light"),
    };
    return [...sectionItems, ...contactItems, ...workItems, themeItem];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => `${item.label} ${item.hint} ${item.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setActive(0);
        setOpen((value) => !value);
      }
    };
    const onOpen = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND, onOpen);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open) inputRef.current?.focus();
  }, [open]);

  function choose(index: number) {
    const item = filtered[index];
    if (!item) return;
    setOpen(false);
    item.run();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target === dialogRef.current) setOpen(false);
      }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-line bg-elevated text-fg shadow-2xl"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActive((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActive((index) => Math.max(index - 1, 0));
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  choose(active);
                }
              }}
              placeholder="Jump to a section, link, or theme"
              aria-controls={listId}
              aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].id}` : undefined}
              className="w-full border-b border-line bg-transparent px-4 py-3.5 text-sm text-fg outline-none placeholder:text-faint"
            />
            <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-faint">Nothing matches.</li>
              ) : (
                filtered.map((item, index) => (
                  <li key={item.id} role="presentation">
                    <button
                      id={`${listId}-${item.id}`}
                      role="option"
                      type="button"
                      aria-selected={index === active}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => choose(index)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${
                        index === active ? "bg-fg/10 text-fg" : "text-muted"
                      }`}
                    >
                      <span>
                        <span className="block text-[10px] font-medium tracking-[0.16em] text-faint uppercase">
                          {item.group}
                        </span>
                        <span className="mt-0.5 block font-medium text-fg">{item.label}</span>
                      </span>
                      <span className="shrink-0 text-xs text-faint">{item.hint}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}
