/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 *  Edit text, links, projects, skills, certificates and socials HERE.
 *  You should never need to touch JSX to change wording or add a project.
 *
 *  Any link left as an empty string ("") is treated as "not available yet"
 *  and its button/link is hidden automatically — so there are no dead links.
 *  Search for `TODO` to find the gaps to fill in.
 */

export type NavItem = { id: string; label: string };

export type Project = {
  id: string;
  name: string;
  tagline: string;
  /** Short blurb shown on the card. */
  summary: string;
  /** Longer description + feature list shown in the detail modal. */
  description: string;
  highlights: string[];
  tags: string[];
  /** Image path under /public (e.g. "/projects/hungriees.png"). Empty = graceful fallback. */
  image: string;
  status: "Production" | "Live" | "Prototype" | "In progress";
  /** Leave "" to hide the link. */
  live: string;
  /** Leave "" to hide the link. Set to "private" to show a "Private repo" note. */
  code: string;
  featured?: boolean;
};

export type SkillGroup = { label: string; items: string[] };

export type Certificate = { title: string; org: string; year: string };

export type Social = { label: string; handle: string; href: string };

/* ───────────────────────────── SEO / META ───────────────────────────── */

export const site = {
  name: "Vishal Kumar Thakur",
  domain: "vishalkumarthakur.me",
  url: "https://vishalkumarthakur.me",
  email: "thakurvishal1307@gmail.com",
  // Resume PDF lives in /public. Replace the placeholder file with your real CV.
  resume: "/resume.pdf",
};

/* ───────────────────────────── NAVIGATION ───────────────────────────── */

export const nav: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

/* ─────────────────────────────── HERO ───────────────────────────────── */

export const hero = {
  kicker: "Madhubani, Bihar · India",
  name: "Vishal Kumar Thakur",
  // Rendered as three rotating/again-static facets of the same identity.
  roles: ["Full-Stack Developer", "AI Systems", "Cybersecurity"],
  subtitle:
    "Building production apps, AI integrations, and automation — from real-time food delivery to RAG chatbots.",
  availability: "Open to internships & freelance",
};

/* ─────────────────────────────── ABOUT ──────────────────────────────── */

export const about = {
  // Kept concrete and confident — no "aspiring".
  paragraphs: [
    "I’m a full-stack developer who ships end-to-end: frontend, backend, deployment, payments, and AI integration. I build real products that run in production, not demos that stop at the happy path.",
    "Currently a BCA Cybersecurity student at Lovely Professional University (graduating 2027), and a solo developer and founder from Madhubani, Bihar. I take projects from first commit to live users — and stay curious about applied AI and the security details most builds skip.",
    "Outside code, I’m Founder & Managing Trustee of Mithila KritiKala, a registered charitable trust preserving Mithila art and running vocational training for rural women.",
  ],
  // Max three concrete facts woven in — no generic soft-skill wall.
  facts: [
    { label: "Focus", value: "Full-stack · Applied AI · Security" },
    { label: "Education", value: "BCA Cybersecurity, LPU · 2027" },
    { label: "Also", value: "Founder, Mithila KritiKala Trust" },
  ],
};

/* ─────────────────────────────── SKILLS ─────────────────────────────── */

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "C"] },
  { label: "Frontend", items: ["React", "React Native (Expo)", "Astro", "Tailwind CSS", "HTML/CSS"] },
  { label: "Backend", items: ["FastAPI", "REST APIs", "WebSockets"] },
  { label: "Databases", items: ["PostgreSQL (Neon)", "MySQL"] },
  {
    label: "AI / Integrations",
    items: ["LLM / RAG", "Gemini API", "Roboflow", "Razorpay", "Clerk", "Cloudinary", "Twilio"],
  },
  { label: "DevOps / Tools", items: ["Git", "GitHub", "Vercel", "DigitalOcean", "n8n", "GitHub Actions"] },
];

/* ────────────────────────────── PROJECTS ────────────────────────────── */

export const projects: Project[] = [
  {
    id: "hungriees",
    name: "Hungriees",
    tagline: "Real-time food ordering platform",
    summary:
      "Full-stack, multi-role food delivery app with live order tracking, payments, and shopkeeper analytics — in production.",
    description:
      "A full-stack, multi-role food delivery platform built end-to-end. React Native (Expo) frontend, FastAPI backend on DigitalOcean, Neon PostgreSQL, Clerk auth, and Cloudinary media — running in production with real users.",
    highlights: [
      "Live order tracking across customer, shopkeeper, and admin roles",
      "Reviews system with photos, replies, and admin moderation",
      "Push notifications and shopkeeper analytics (peak-hours heatmap, CSV export)",
      "Razorpay payments with HMAC-verified webhooks and idempotency",
      "Secure server-side payment computation — never trusts the client",
    ],
    tags: ["React Native", "FastAPI", "PostgreSQL", "Razorpay", "Clerk"],
    image: "/projects/hungriees.png",
    status: "Production",
    live: "https://hungriees.app",
    code: "", // TODO: add repo URL or set to "private"
    featured: true,
  },
  {
    id: "diamond-jewellers",
    name: "Diamond Jewellers",
    tagline: "Jewellery storefront with an AI assistant",
    summary:
      "Astro + React storefront with a FastAPI RAG chatbot, live metal rates, and automated daily rate posts.",
    description:
      "An Astro 5 + React + Tailwind jewellery storefront on Vercel, paired with a FastAPI RAG chatbot (Gemini 2.5-flash) that answers product and store queries. Includes a live gold & silver rates endpoint and automated daily rate social posts via GitHub Actions.",
    highlights: [
      "RAG chatbot (Gemini 2.5-flash) for product and store questions",
      "Live gold & silver rates endpoint",
      "Automated daily rate social posts via GitHub Actions",
    ],
    tags: ["Astro", "React", "FastAPI", "RAG", "Gemini"],
    image: "/projects/diamond-jewellers.png",
    status: "Live",
    live: "", // TODO: add live URL
    code: "", // TODO: add repo URL or set to "private"
  },
  {
    id: "kalika-creation",
    name: "Kalika Creation",
    tagline: "Mithila art e-commerce",
    summary:
      "For-profit Madhubani/Mithila art storefront with artisan attribution, custom-order workflow, and checkout.",
    description:
      "A for-profit Madhubani/Mithila art brand storefront. Product catalog with real artisan attribution, a custom-order workflow, and Razorpay checkout.",
    highlights: [
      "Product catalog with genuine artisan attribution",
      "Custom-order workflow for commissioned pieces",
      "Razorpay checkout",
    ],
    tags: ["React", "Tailwind", "Razorpay", "E-commerce"],
    image: "/projects/kalika-creation.png",
    status: "Live",
    live: "", // TODO: add live URL
    code: "", // TODO: add repo URL or set to "private"
  },
  {
    id: "ai-cctv",
    name: "AI CCTV Theft Detection",
    tagline: "Real-time theft detection for small shops",
    summary:
      "Computer-vision prototype that flags theft in real time and sends WhatsApp alerts — built for kirana stores.",
    description:
      "A real-time theft detection prototype for small retail shops. Python with Roboflow hosted inference and Twilio WhatsApp alerts, designed for kirana (neighbourhood) stores with minimal hardware.",
    highlights: [
      "Real-time inference via Roboflow hosted models",
      "Instant Twilio WhatsApp alerts on detection",
      "Built for low-cost deployment in small shops",
    ],
    tags: ["Python", "Computer Vision", "Roboflow", "Twilio"],
    image: "/projects/ai-cctv.png",
    status: "Prototype",
    live: "",
    code: "", // TODO: add repo URL or set to "private"
  },
  {
    id: "mithila-kritikala",
    name: "Mithila KritiKala",
    tagline: "NGO website for a registered charitable trust",
    summary:
      "React + Tailwind site for my charitable trust — art showcase, artisan stories, training programs, and donations.",
    description:
      "A React + Tailwind website for Mithila KritiKala, my registered charitable trust. Showcases the art, artisan stories, training programs, and donation pathways.",
    highlights: [
      "Art showcase and artisan stories",
      "Vocational training program information",
      "Donation pathways",
    ],
    tags: ["React", "Tailwind"],
    image: "/projects/mithila-kritikala.png",
    status: "Live",
    live: "https://mithilakritikala.com",
    code: "", // TODO: add repo URL or set to "private"
  },
];

/* ──────────────────────────── CERTIFICATES ──────────────────────────── */
/**
 * Title + issuing org + year ONLY (no body text, by design).
 * TODO: replace these placeholders with your real certificates.
 */
export const certificates: Certificate[] = [
  { title: "Certificate title", org: "Issuing organization", year: "2025" },
  { title: "Certificate title", org: "Issuing organization", year: "2024" },
  { title: "Certificate title", org: "Issuing organization", year: "2024" },
];

/* ─────────────────────────────── CONTACT ────────────────────────────── */

export const contact = {
  heading: "Let’s build something",
  blurb:
    "Have a project, a role, or an idea worth shipping? I read every message. The fastest way to reach me is the form or a direct email.",
};

export const socials: Social[] = [
  { label: "GitHub", handle: "vishal-1307", href: "https://github.com/vishal-1307" },
  { label: "LinkedIn", handle: "vishalthakur13", href: "https://www.linkedin.com/in/vishalthakur13" },
  { label: "Instagram", handle: "@vishal", href: "https://instagram.com/" }, // TODO: confirm Instagram handle/URL
  { label: "X", handle: "Vishal_1315_", href: "https://x.com/Vishal_1315_" },
  { label: "Threads", handle: "@vishal", href: "https://www.threads.net/" }, // TODO: confirm Threads handle/URL
];
