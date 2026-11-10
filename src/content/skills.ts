/**
 * The stack, grouped the way the work actually splits.
 * Security stays a first-class group — it is the part of the degree that
 * shows up in the code. Each security item is a fix shipped on a real app.
 */

export type SkillGroup = {
  label: string;
  note?: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native / Expo", "Astro"],
  },
  {
    label: "Backend",
    items: [
      "FastAPI",
      "Node.js",
      "Python",
      "REST APIs",
      "WebSockets",
      "Postgres (Neon)",
      "Prisma",
      "Drizzle",
      "pgvector",
      "Firebase",
      "Clerk",
      "Better Auth",
      "GitHub Actions",
    ],
  },
  {
    label: "AI",
    items: ["Claude API", "Gemini API", "RAG", "YOLOv11 / Roboflow", "n8n"],
  },
  {
    label: "Security",
    note: "From the Cybersecurity degree, applied to my own production apps — each of these is a fix I shipped, not a topic I read.",
    items: [
      "IDOR prevention",
      "Webhook signature verification (HMAC)",
      "Timing-attack mitigation",
      "Rate limiting",
      "CVE patching & dependency audit",
      "Forward-only state machines",
      "Server-side price computation",
    ],
  },
];
