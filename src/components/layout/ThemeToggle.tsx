"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/ui/icons";

type Theme = "dark" | "light";

const THEME_EVENT = "themechange";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#fafafa" : "#09090b");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* Storage can throw in private mode. The attribute still updates. */
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => applyTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-fg"
    >
      <Sun className="theme-icon-sun size-[18px]" />
      <Moon className="theme-icon-moon size-[18px]" />
    </button>
  );
}
