export type Theme = "dark" | "light";

export const THEME_EVENT = "themechange";

const DARK = "#100e0c";
const LIGHT = "#fbf6ef";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? LIGHT : DARK);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* Storage can throw in private mode. The attribute still updates. */
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
