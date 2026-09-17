/**
 * The stack, grouped by where it lives. Security is a first-class group, not a
 * bullet under "other" — it is the part of the degree that shows up in the code.
 */

export type SkillGroup = {
  label: string;
  note?: string;
  items: string[];
  emphasis?: boolean;
};

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native / Expo", "Astro"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Node.js", "REST APIs", "WebSockets", "Python"],
  },
  {
    label: "Databases",
    items: ["Postgres (Neon)", "Prisma", "Drizzle", "pgvector", "Firebase"],
  },
  {
    label: "Auth",
    items: ["Clerk", "Better Auth", "Session & token design"],
  },
  {
    label: "AI & Automation",
    items: ["Claude API", "Gemini API", "RAG", "YOLOv11 / Roboflow", "n8n", "GitHub Actions"],
  },
  {
    label: "Security",
    note: "From the Cybersecurity degree, applied to my own production apps — each of these is a fix I shipped, not a topic I read.",
    emphasis: true,
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
