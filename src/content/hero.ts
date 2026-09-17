/** Hero copy. Kept short on purpose — the work below carries the argument. */

export const hero = {
  meta: {
    left: "Portfolio — 2026",
    center: "Benipatti, Bihar → Phagwara, Punjab",
    status: "Open for freelance & collaborations",
  },
  name: ["Vishal Kumar", "Thakur"],
  title: "Full-Stack Developer & Founder",
  intro:
    "I ship production apps on my own — payments, auth, and the security work most builds skip. Six are live. One of them takes real money from real students every day.",
  ctas: {
    primary: { label: "See the work", href: "#work" },
    secondary: { label: "Résumé", href: "/resume.pdf" },
  },
  spec: [
    { key: "Role", value: "Solo full-stack developer" },
    { key: "Studying", value: "BCA Cybersecurity, LPU" },
    { key: "Also", value: "Founder, Mithila KritiKala Trust" },
  ],
  /** Flattened into the hero marquee strip. */
  marquee: [
    "Next.js",
    "TypeScript",
    "React Native",
    "FastAPI",
    "Postgres",
    "Prisma",
    "Drizzle",
    "Razorpay",
    "Clerk",
    "Better Auth",
    "Claude API",
    "Gemini",
    "YOLOv11",
    "GitHub Actions",
  ],
} as const;

/** Four load-bearing facts. Each one is verifiable from the sections below. */
export const proof = [
  { value: "6", label: "Apps in production" },
  { value: "HMAC", label: "Verified payment webhooks" },
  { value: "12A/80G", label: "Registered charitable trust" },
  { value: "3", label: "Training batches completed" },
] as const;
