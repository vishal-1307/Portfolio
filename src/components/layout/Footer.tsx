import { site, socials } from "@/content/site";
import { SocialIcon, ArrowUpRight } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rule">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-display text-sm font-extrabold text-paper">
            © {year} {site.name}
          </p>
          <p className="text-xs text-faint">Built with Next.js, React Three Fiber and Tailwind.</p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex items-center gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} — ${s.handle}`}
                  className="grid h-9 w-9 place-items-center text-muted transition-colors hover:text-accent-soft"
                >
                  <SocialIcon label={s.label} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-faint transition-colors hover:text-paper"
          >
            Source for this site
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
