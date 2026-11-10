"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/ui/icons";
import { applyTheme, readTheme, THEME_EVENT, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => applyTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={`grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg ${className}`}
    >
      <Sun className="theme-icon-sun size-[18px]" />
      <Moon className="theme-icon-moon size-[18px]" />
    </button>
  );
}
