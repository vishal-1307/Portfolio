import type { ReactNode } from "react";

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 border-t border-line py-20 md:py-28"
    >
      <div className="container-page">
        <h2 id={`${id}-title`} className="text-sm font-medium text-muted">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg md:text-lg">{intro}</p>
        ) : null}
        <div className={intro ? "mt-12 md:mt-14" : "mt-8 md:mt-10"}>{children}</div>
      </div>
    </section>
  );
}
