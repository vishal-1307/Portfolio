/** About section. Facts over adjectives. */

export const about = {
  lead: "I build the whole thing — frontend, API, database, payments, deploy — and then I go back and break it on purpose.",
  paragraphs: [
    "I'm a BCA Cybersecurity student at Lovely Professional University in Phagwara, graduating July 2027. The degree is the reason my projects get an audit pass before they get a launch: IDOR checks, webhook signature verification, constant-time comparisons, rate limits. Most of my security fixes came from attacking my own apps first.",
    "I'm from Benipatti in Madhubani, Bihar — Mithila country. The art my district is known for shows up in what I build: a storefront for contemporary Mithila pieces, and a trust that teaches the craft to women who live there.",
    "I'm not interviewing for campus placements. I'm building products and taking client work, and I'd rather be judged on what's running in production than on a CGPA.",
  ],
  spec: [
    { key: "Studying", value: "BCA Cybersecurity · LPU Phagwara · July 2027" },
    { key: "From", value: "Benipatti, Madhubani, Bihar" },
    { key: "Direction", value: "Founder & freelance — not placements" },
    { key: "Works with", value: "Founders, small businesses, campus products" },
  ],
  portrait: {
    src: "/me.webp",
    alt: "Vishal Kumar Thakur",
  },
} as const;
