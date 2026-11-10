import { site, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-faint">
          © {year} {site.name}
        </p>
        <ul className="flex items-center gap-1">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} — ${social.handle} (opens in a new tab)`}
                className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg"
              >
                <SocialIcon label={social.label} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
