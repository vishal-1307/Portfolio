/** Hero copy. Facts only — the work below carries the detail. */

export const hero = {
  role: "Full-Stack AI Developer",
  /** Factual lines only. The first one is the role; the rest are already on the page. */
  lines: ["Full-Stack AI Developer", "BCA Cybersecurity, LPU", "Founder, Mithila KritiKala"],
  intro:
    "I build production apps — web, mobile, and AI — while studying cybersecurity. I also founded Mithila KritiKala, a registered charitable trust for women’s vocational training and Mithila art in Bihar.",
  ctas: {
    primary: { label: "See the work", href: "#work" },
    secondary: { label: "Email", href: "mailto:thakurvishal1307@gmail.com" },
  },
  facts: [
    {
      key: "Studying",
      value: "BCA (Cybersecurity), Lovely Professional University, Phagwara",
    },
    { key: "Years", value: "2024 – Jul 2027" },
    { key: "From", value: "Benipatti, Madhubani, Bihar" },
  ],
} as const;
