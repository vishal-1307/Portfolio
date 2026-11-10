import { contact } from "@/content/contact";
import { site, socials } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

const primary = socials.filter((social) => social.label === "GitHub" || social.label === "LinkedIn");

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28 py-16 md:py-28">
      <div className="container-page">
        <h2 id="contact-title" className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
          {contact.heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{contact.blurb}</p>
        <p className="mt-3 text-sm text-faint">{contact.availability}</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block max-w-full font-serif text-[clamp(1.7rem,5vw,3.4rem)] leading-tight tracking-tight break-all text-fg hover:text-accent"
        >
          {site.email}
        </a>
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {primary.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1 text-sm font-medium text-fg hover:text-accent"
              >
                {social.label}
                <span className="text-muted">{social.handle}</span>
                <ArrowUpRight className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={site.resume} className="link-underline text-sm font-medium text-fg hover:text-accent">
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
