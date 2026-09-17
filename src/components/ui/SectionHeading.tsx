type SectionHeadingProps = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description?: string;
};

/**
 * The recurring ledger heading: an oversized red index numeral in the left
 * column, the title block on the right. This motif is what makes the page read
 * as one document rather than a stack of cards.
 *
 * Server component — the entrance is CSS, driven by <ScrollReveal/>.
 */
export function SectionHeading({ id, index, kicker, title, description }: SectionHeadingProps) {
  return (
    <div data-reveal className="grid grid-cols-12 gap-x-6 gap-y-4 pt-10 md:pt-14">
      <div className="col-span-12 md:col-span-3">
        <span
          aria-hidden="true"
          className="block font-display text-index font-black leading-none text-accent"
        >
          {index}
        </span>
      </div>
      <div className="col-span-12 md:col-span-9">
        <p className="eyebrow text-accent-soft">{kicker}</p>
        <h2
          id={id}
          className="mt-3 max-w-4xl font-display text-display-lg font-extrabold text-paper"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
