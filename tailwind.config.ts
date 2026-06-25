import type { Config } from "tailwindcss";

/**
 * Central theme source of truth — Swiss editorial system.
 * Re-theme the whole site from here: paper/ink/red palette, grotesque type,
 * grid rhythm, hairline rules. Color tokens map to CSS variables in index.css.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent-ink) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
      },
      fontFamily: {
        // Archivo: heavy grotesque for display. Hanken Grotesk: clean body/labels.
        display: ["'Archivo'", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["'Hanken Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial display sizes.
        "mega": ["clamp(3rem, 11vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.6rem, 3vw, 2.25rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "index": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "0.85", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        content: "80rem",
      },
      spacing: {
        section: "clamp(4.5rem, 9vw, 8rem)",
      },
      borderRadius: {
        card: "0",
      },
      transitionTimingFunction: {
        emphatic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s var(--ease-emphatic) both",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
