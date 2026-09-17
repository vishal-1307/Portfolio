/**
 * Mithila KritiKala — the trust. Registration facts only; the credibility is
 * in the documents, not in adjectives.
 */

export const founder = {
  org: "Mithila KritiKala",
  role: "Founder & Managing Trustee",
  site: "https://mithilakritikala.com",
  lead: "A registered public charitable trust teaching Mithila painting and vocational skills to women in the district I am from.",
  paragraphs: [
    "I registered Mithila KritiKala in July 2025 in Benipatti, Madhubani. Mithila painting is the thing my district is known for and the thing most of the women who can do it have never been paid properly for. The trust runs training batches in painting and stitching, and works towards the point where the craft is income rather than decoration.",
    "It is a real legal entity with real paperwork: 12A and 80G registration, an NGO Darpan ID, and a trust deed. I built and run the website as well. Three batches have completed training so far.",
  ],
  /** Verifiable registration facts. */
  credentials: [
    { key: "Entity", value: "Registered public charitable trust" },
    { key: "Tax status", value: "12A & 80G registered" },
    { key: "NGO Darpan ID", value: "BR/2025/0781443" },
    { key: "Founded", value: "July 2025 · Benipatti, Madhubani" },
  ],
  stats: [
    { value: "3", label: "Training batches completed" },
    { value: "2", label: "Disciplines taught — painting & stitching" },
  ],
} as const;
