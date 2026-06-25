import { GitHub, LinkedIn, Instagram, XMark, Threads, Mail } from "@/components/primitives/icons";

/** Maps a social label from content.ts to its brand glyph. */
export function SocialIcon({ label, className }: { label: string; className?: string }) {
  switch (label.toLowerCase()) {
    case "github":
      return <GitHub className={className} />;
    case "linkedin":
      return <LinkedIn className={className} />;
    case "instagram":
      return <Instagram className={className} />;
    case "x":
    case "twitter":
      return <XMark className={className} />;
    case "threads":
      return <Threads className={className} />;
    default:
      return <Mail className={className} />;
  }
}
