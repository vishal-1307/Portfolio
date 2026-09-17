/**
 * The quiet engineering-paper column grid behind everything. Aligns to the
 * content container so the editorial layout has visible structure. Decorative,
 * static, and hidden on small screens where it would only add noise.
 */
export function GridBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden md:block">
      <div className="container-page h-full">
        <div className="grid h-full grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-paper/[0.035] last:border-r" />
          ))}
        </div>
      </div>
    </div>
  );
}
