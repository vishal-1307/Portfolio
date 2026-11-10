import { founder } from "@/content/founder";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/icons";

export function Impact() {
  return (
    <Section id="impact" title="Social impact" intro={founder.lead}>
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
        <div data-reveal className="max-w-xl space-y-4">
          <p className="text-sm text-muted">
            {founder.role}
            <span className="text-faint"> · since {founder.since}</span>
          </p>
          {founder.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-muted md:text-[15px]">
              {paragraph}
            </p>
          ))}
          <a
            href={founder.site}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 pt-2 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            mithilakritikala.com
            <ArrowUpRight className="size-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <dl data-reveal className="rounded-2xl border border-line p-6 sm:p-8">
          {founder.credentials.map((item) => (
            <div key={item.key} className="border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0">
              <dt className="text-xs text-faint">{item.key}</dt>
              <dd className="mt-1 text-sm text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
