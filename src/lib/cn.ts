/**
 * Tiny className joiner — filters falsy values, joins with spaces.
 * Kept dependency-free; no need for clsx/tailwind-merge at this scale.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
