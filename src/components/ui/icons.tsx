import type { SVGProps } from "react";

/**
 * Hand-rolled icon set. Inline SVG beats an icon package here: seven icons, no
 * dependency, no tree-shaking guesswork, and they all inherit currentColor.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="10" width="16" height="10" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

/** Brand glyphs are filled paths, so they opt out of the stroked base. */
function brand(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function GitHubMark(props: IconProps) {
  return (
    <svg {...brand(props)}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedInMark(props: IconProps) {
  return (
    <svg {...brand(props)}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
    </svg>
  );
}

export function XMark(props: IconProps) {
  return (
    <svg {...brand(props)}>
      <path d="M17.53 3h3.06l-6.69 7.64L21.75 21h-6.16l-4.83-6.3L5.24 21H2.18l7.15-8.17L2.25 3h6.32l4.36 5.77L17.53 3Zm-1.07 16.17h1.7L7.62 4.74H5.8l10.66 14.43Z" />
    </svg>
  );
}

export function InstagramMark(props: IconProps) {
  return (
    <svg {...brand(props)}>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-3.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  );
}

export function ThreadsMark(props: IconProps) {
  return (
    <svg {...brand(props)}>
      <path d="M12.44 22h-.01c-3.04-.02-5.37-1.03-6.93-3C4.1 17.24 3.38 14.8 3.35 12v-.02c.03-2.8.75-5.24 2.15-6.99C7.06 3.03 9.4 2.02 12.43 2h.02c2.33.02 4.28.62 5.8 1.79 1.42 1.1 2.42 2.66 2.98 4.65l-1.9.53c-.94-3.35-3.3-5.06-6.89-5.08-2.42.02-4.24.79-5.43 2.28-1.11 1.4-1.69 3.41-1.71 5.83.02 2.42.6 4.44 1.71 5.83 1.19 1.49 3.01 2.26 5.43 2.28 2.18-.02 3.63-.53 4.83-1.72 1.37-1.36 1.35-3.03 0-3.9-.25 1.37-.9 2.4-1.92 3.06-.98.63-2.22.86-3.5.65-2.13-.36-3.3-1.95-3.16-3.72.15-2.03 1.98-3.26 4.5-3.26.86 0 1.67.08 2.4.23-.11-.65-.33-1.16-.67-1.5-.45-.47-1.14-.7-2.05-.71h-.03c-.73 0-1.72.2-2.35 1.14l-1.62-1.09c.84-1.25 2.21-1.94 3.97-1.94h.05c2.94.02 4.69 1.82 4.86 4.96l-.01.01.4.17c1.14.54 1.98 1.35 2.42 2.35.62 1.4.68 3.67-1.17 5.51-1.41 1.4-3.12 2.03-5.71 2.05Zm-.44-9.11c-1.9 0-2.56.86-2.6 1.6-.06.8.75 1.37 1.71 1.53.9.15 1.67.02 2.25-.36.63-.41 1-1.12 1.1-2.12l.02-.2a8.4 8.4 0 0 0-2.48-.45Z" />
    </svg>
  );
}

const brandMap: Record<string, (props: IconProps) => React.ReactElement> = {
  GitHub: GitHubMark,
  LinkedIn: LinkedInMark,
  X: XMark,
  Instagram: InstagramMark,
  Threads: ThreadsMark,
};

/** Resolves a social label to its glyph, falling back to an arrow. */
export function SocialIcon({ label, ...props }: IconProps & { label: string }) {
  const Glyph = brandMap[label] ?? ArrowUpRight;
  return <Glyph {...props} />;
}
