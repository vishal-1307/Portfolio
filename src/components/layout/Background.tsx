/**
 * Faint structural column grid — the quiet "engineering paper" backdrop that
 * makes the Swiss layout legible. Aligns to the content container; hidden on
 * small screens where it would only add noise. Purely decorative, no motion.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden md:block">
      <div className="container-page h-full">
        <div className="grid h-full grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-ink/[0.045] last:border-r" />
          ))}
        </div>
      </div>
    </div>
  );
}
