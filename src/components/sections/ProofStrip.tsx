import { proof } from "@/content/hero";

/**
 * Four facts, stated once, immediately under the hero. Each one is backed by a
 * section further down the page — this band exists so a visitor who reads
 * nothing else still leaves with something checkable.
 */
export function ProofStrip() {
  return (
    <section aria-label="Key facts" className="bg-surface">
      <div className="container-page">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {proof.map((item) => (
            <div
              key={item.label}
              className="border-b border-paper/12 px-1 py-7 last:border-b-0 sm:px-0 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 [&:nth-child(2)]:border-b [&:nth-child(2)]:lg:border-b-0"
            >
              <dt className="font-display text-display-md font-black tabular text-accent-soft">
                {item.value}
              </dt>
              <dd className="mt-2 max-w-[18ch] text-sm leading-snug text-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
