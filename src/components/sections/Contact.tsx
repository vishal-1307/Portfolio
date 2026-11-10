import { contact } from "@/content/contact";
import { site, socials } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/icons";

const primary = socials.filter((social) => social.label === "GitHub" || social.label === "LinkedIn");

export function Contact() {
  return (
    <Section id="contact" title={contact.heading}>
      <div data-reveal className="max-w-xl">
        <p className="text-base leading-relaxed text-muted md:text-lg">{contact.blurb}</p>
        <p className="mt-3 text-sm text-faint">{contact.availability}</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block max-w-full break-all text-xl font-medium tracking-tight text-fg transition-colors hover:text-accent sm:text-2xl md:text-3xl"
        >
          {site.email}
        </a>
        <ul className="mt-8 space-y-3">
          {primary.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-3 text-sm"
              >
                <span className="w-20 text-faint">{social.label}</span>
                <span className="inline-flex items-center gap-1 font-medium text-fg transition-colors group-hover:text-accent">
                  {social.handle}
                  <ArrowUpRight className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
          <li>
            <a href={site.resume} className="inline-flex items-baseline gap-3 text-sm">
              <span className="w-20 text-faint">Résumé</span>
              <span className="font-medium text-fg transition-colors hover:text-accent">Download PDF</span>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
