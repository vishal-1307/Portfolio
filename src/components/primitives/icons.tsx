/**
 * Minimal inline icon set — keeps the bundle lean (no icon library) and lets
 * every glyph inherit `currentColor`. Stroke icons share a common wrapper.
 */
type IconProps = { className?: string };

function Stroke({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

export const ArrowDown = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Stroke>
);

export const ArrowUpRight = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Stroke>
);

export const Download = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
  </Stroke>
);

export const Close = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);

export const Menu = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);

export const Mail = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Stroke>
);

export const Lock = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </Stroke>
);

/* Brand glyphs (filled paths, official-ish marks) */

export const GitHub = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

export const LinkedIn = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34v-7.2H6.06v7.2h2.28ZM7.2 10.1a1.32 1.32 0 1 0 0-2.64 1.32 1.32 0 0 0 0 2.64Zm11.14 8.24v-3.95c0-2.11-.45-3.74-2.92-3.74-1.19 0-1.98.65-2.31 1.27h-.03v-1.07h-2.19v7.2h2.28v-3.56c0-.94.18-1.85 1.34-1.85 1.15 0 1.16 1.08 1.16 1.91v3.5h2.27Z" />
  </svg>
);

export const Instagram = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Stroke>
);

export const XMark = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.53 3H20.5l-6.49 7.42L21.75 21h-5.96l-4.67-6.1L5.74 21H2.77l6.94-7.93L2.5 3h6.11l4.22 5.58L17.53 3Zm-1.05 16.2h1.65L7.6 4.7H5.83L16.48 19.2Z" />
  </svg>
);

export const Threads = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M16.2 11.3c-.1 0-.2-.1-.3-.1-.2-3-1.8-4.7-4.6-4.7-1.6 0-3 .7-3.8 2l1.4.9c.6-.9 1.5-1.1 2.4-1.1 1.5 0 2.6.9 2.8 2.5-.7-.1-1.4-.2-2.1-.1-2.3.1-3.8 1.4-3.7 3.3.1 1.6 1.5 2.7 3.3 2.6 1.4-.1 2.4-.7 3-1.7.4-.7.6-1.5.7-2.4.7.4 1.2 1 1.4 1.7.4 1.2-.5 3.1-2.4 3.9-1.7.7-3.8.6-5.4-.4-1.8-1.2-2.8-3.3-2.8-6 0-2.7 1-4.8 2.8-6C9.7 4.6 12 4.5 13.9 5.6c1 .6 1.8 1.5 2.3 2.7l1.7-.7c-.6-1.5-1.6-2.7-3-3.5C12.6 2.7 9.7 2.8 7.5 4 5.1 5.4 3.8 8.1 3.8 11.4c0 3.3 1.3 6 3.7 7.4 1.2.7 2.5 1 3.8 1 1 0 2-.2 2.9-.6 2.7-1.1 4-3.9 3.3-6-.4-1.2-1.3-2.1-2.6-2.6Zm-3.7 4.1c-.9.1-1.7-.4-1.7-1.1-.1-.6.4-1.2 1.8-1.3h.5c.5 0 1 0 1.4.1-.2 1.4-.9 2.2-2 2.3Z" />
  </svg>
);
