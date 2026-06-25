import { site, socials } from "@/data/content";
import { SocialIcon } from "@/components/sections/SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/10 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-xs text-faint">
          © {year} {site.name} · Built with React, Vite & Tailwind
        </p>
        <ul className="flex items-center gap-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} — ${s.handle}`}
                className="grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-accent"
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
