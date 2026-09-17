import Image from "next/image";
import { about } from "@/content/about";
import { Section } from "@/components/ui/Section";

/** Server component. Entrance animation is CSS, see globals.css. */
export function About() {
  return (
    <Section id="about" index="01" kicker="About" title={about.lead}>
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 space-y-6 md:col-span-7">
          {about.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
            >
              {paragraph}
            </p>
          ))}

          <dl data-reveal className="grid grid-cols-1 pt-4 sm:grid-cols-2">
            {about.spec.map((row) => (
              <div key={row.key} className="border-t border-paper/12 py-4 sm:pr-6">
                <dt className="eyebrow text-accent-soft">{row.key}</dt>
                <dd className="mt-1.5 text-sm font-medium text-paper">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal="clip" className="col-span-12 md:col-span-4 md:col-start-9">
          <div className="relative border border-paper/15">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={800}
              height={836}
              sizes="(max-width: 768px) 90vw, 30vw"
              className="h-auto w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
            />
            {/* Grid overlay ties the portrait into the page structure. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(242,239,232,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,232,0.08) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
