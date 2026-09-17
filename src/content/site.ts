/**
 * Identity, contact and social links.
 * Everything here is real — no placeholders. An empty string hides its link.
 */

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const site = {
  name: "Vishal Kumar Thakur",
  shortName: "Vishal Thakur",
  initials: "VT",
  title: "Full-Stack Developer & Founder",
  domain: "vishalthakur.tech",
  url: "https://vishalthakur.tech",
  email: "thakurvishal1307@gmail.com",
  resume: "/resume.pdf",
  repo: "https://github.com/vishal-1307/Portfolio",
  description:
    "Vishal Kumar Thakur builds production apps solo — payments, auth and security hardening included — and runs a registered charitable trust in Mithila.",
} as const;

export const socials: Social[] = [
  { label: "GitHub", handle: "vishal-1307", href: "https://github.com/vishal-1307" },
  { label: "LinkedIn", handle: "vishalthakur13", href: "https://www.linkedin.com/in/vishalthakur13" },
  { label: "X", handle: "vishal1307n", href: "https://x.com/vishal1307n" },
  { label: "Instagram", handle: "vishal_1307__", href: "https://instagram.com/vishal_1307__" },
  { label: "Threads", handle: "vishal_1307__", href: "https://www.threads.net/@vishal_1307__" },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "founder", label: "Founder" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;
