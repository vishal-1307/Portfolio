import { site, socials } from "@/data/content";
import { SocialIcon } from "@/components/sections/SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/15">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <p className="text-xs font-medium text-faint">
          © {year} {site.name} — Built with React, Vite &amp; Tailwind
        </p>
        <ul className="flex items-center gap-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} — ${s.handle}`}
                className="grid h-9 w-9 place-items-center text-muted transition-colors hover:text-accent-ink"
              >
                <SocialIcon label={s.label} className="h-[18px] w-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
