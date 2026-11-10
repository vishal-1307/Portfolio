/**
 * Work.
 *
 * Featured projects follow the order they should be read. Descriptions, links,
 * stacks, and screenshots are copied from what this repo already documented.
 * Entries with only a name had no description, link, or image here — those
 * fields are omitted on purpose.
 *
 * `repo`: a URL, "" (hidden), or "private" (renders a quiet “Private” label).
 * `live`: a URL, or "" to hide the link.
 */

export type ProjectNote = {
  label: string;
  detail: string;
};

export type Project = {
  id: string;
  name: string;
  summary?: string;
  status?: string;
  year?: string;
  notes?: ProjectNote[];
  stack?: string[];
  live?: string;
  repo?: string;
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    id: "hungriees",
    name: "Hungriees",
    status: "In production",
    year: "2026",
    summary:
      "Students pre-order from campus outlets and skip the queue; shopkeepers get a live order board, analytics and payouts. React Native (Expo) client, FastAPI backend, Neon Postgres, Clerk auth, Cloudinary media, Razorpay payments. Multi-role — customer, shopkeeper, admin — with the entire money path computed server-side.",
    notes: [
      {
        label: "Payment webhooks are HMAC-verified",
        detail:
          "Razorpay callbacks are rejected unless the signature validates against the raw request body. Order totals are recomputed on the server at capture time, so the client never gets a say in what it owes.",
      },
      {
        label: "IDOR protection across every resource",
        detail:
          "Ownership is enforced at the query layer, not the route. A customer cannot fetch, mutate or refund another customer order by changing an ID, and a shopkeeper is scoped to their own outlet.",
      },
      {
        label: "Timing-attack fixes on secret comparison",
        detail:
          "Token and signature checks were rewritten to constant-time comparison after the naive equality checks turned out to leak length and prefix information under timing measurement.",
      },
      {
        label: "Forward-only order state machine",
        detail:
          "Orders move through a fixed sequence and cannot be replayed, reversed or skipped. A retried webhook or a double-tapped button lands on the same final state instead of double-charging.",
      },
    ],
    stack: ["React Native", "Expo", "FastAPI", "Neon Postgres", "Clerk", "Razorpay", "Cloudinary"],
    live: "https://hungriees.app",
    repo: "private",
    image: "/projects/hungriees.webp",
    imageAlt: "Hungriees homepage: Skip the Campus Queue, with a food photograph and order calls to action",
  },
  {
    id: "diamond-jewellers",
    name: "Diamond Jewellers",
    status: "Live",
    year: "2026",
    summary:
      "A storefront for the family jewellery business: Astro 5 with React islands on the front, FastAPI behind it. A retrieval-augmented chatbot answers product and store questions from pgvector embeddings on Neon with Gemini generating the reply, and a scheduled job publishes the day gold and silver rates without anyone opening a laptop.",
    notes: [
      {
        label: "RAG over pgvector, not a bare LLM",
        detail:
          "Questions are answered from embedded shop and catalogue content retrieved out of pgvector on Neon Postgres, with Gemini generating from those passages. Grounding it in real content is what stops it inventing prices.",
      },
      {
        label: "Daily rate posting via GitHub Actions",
        detail:
          "A scheduled workflow pulls the day gold and silver rates, renders the post and publishes it. The shop daily rate update went from a manual chore to a cron line.",
      },
      {
        label: "Islands keep the chatbot off the critical path",
        detail:
          "The storefront is static Astro output and only the chat island hydrates. A visitor browsing rings never pays the JavaScript cost of a chatbot they did not open.",
      },
    ],
    stack: ["Astro 5", "React", "FastAPI", "pgvector", "Gemini API", "GitHub Actions"],
    live: "https://diamond-jewellers.vercel.app",
    repo: "https://github.com/vishal-1307/diamond-jewellers",
    image: "/projects/diamond-jewellers.webp",
    imageAlt: "Diamond Jewellers homepage with a diamond necklace and a featured collections row",
  },
  {
    id: "timetable-generator",
    name: "Timetable Generator",
  },
  {
    id: "school-management",
    name: "School Management Platform",
  },
  {
    id: "dashy",
    name: "Dashy",
    status: "Private beta",
    year: "2026",
    summary:
      "One place for tasks, habits, notes, finance and everything else that was scattered across five different apps. Next.js 15 and React 19 on a 51-table Prisma schema, Better Auth for sessions, Zustand for client state. Designed phone-first, because that is where the check-ins actually happen.",
    notes: [
      {
        label: "51 tables that still answer fast",
        detail:
          "A domain this wide gets slow at the joins. The schema is normalised with explicit indexes on the access paths the dashboard actually uses, so the home view stays a small number of queries instead of an N+1 cascade.",
      },
      {
        label: "Mobile-first, not mobile-tolerated",
        detail:
          "Layouts are designed at 390px and scaled up. Every primary action sits inside thumb reach, and the desktop view is the adaptation rather than the reference.",
      },
      {
        label: "Typed all the way through",
        detail:
          "Prisma types flow through the server layer into the React components, so a schema change surfaces as a compile error instead of a runtime blank screen.",
      },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "Better Auth", "Zustand"],
    live: "https://dashy-weld-psi.vercel.app",
    repo: "private",
    image: "/projects/dashy.webp",
    imageAlt: "Dashy dashboard with a sidebar, operating queue, and a 25-minute focus timer",
  },
  {
    id: "yolo-theft",
    name: "YOLOv11 theft detection",
    status: "Prototype",
    year: "2026",
    summary:
      "Small neighbourhood shops in India lose stock they never see leave. This runs a YOLOv11 model, trained and served through Roboflow, against the existing CCTV feed and sends the owner a WhatsApp alert through Twilio the moment it flags a likely theft. Aimed at a ₹999/month subscription — priced for a shop, not an enterprise.",
    notes: [
      {
        label: "Trained on the shelf, not on a benchmark",
        detail:
          "The dataset is annotated from shop-floor footage with bad angles, bad light and cluttered shelves, because a model tuned on clean academic video falls apart in an actual kirana aisle.",
      },
      {
        label: "The alert arrives where the owner already is",
        detail:
          "Detections go out as Twilio WhatsApp messages. No app to install and no dashboard to watch — the owner gets a message on the number they use all day.",
      },
      {
        label: "The price set the architecture",
        detail:
          "₹999 a month, running against the camera already on the wall. That business constraint drove the technical one: inference has to be cheap enough to survive the price.",
      },
    ],
    stack: ["Python", "YOLOv11", "Roboflow", "Twilio", "Computer Vision"],
    live: "",
    repo: "private",
  },
  {
    id: "star-flex-printers",
    name: "Star Flex Printers",
  },
];

/**
 * Smaller work. The first four are named experiments with nothing else on
 * file. DKOM, AstroSaathi, and FRIDAY already had write-ups in the repo, so
 * those write-ups are kept.
 */
export const moreProjects: Project[] = [
  { id: "rfid-attendance", name: "RFID attendance system" },
  { id: "cpp-university", name: "C++ University Management System" },
  { id: "cyber-defense-lab", name: "Cyber Defense Lab" },
  { id: "dandiya-ticketing", name: "Dandiya ticketing" },
  {
    id: "dkom",
    name: "DKOM",
    status: "Live",
    year: "2026",
    summary:
      "A contemporary Mithila art label selling apparel and pieces for the home, built on Next.js and TypeScript. The catalogue runs a dual fulfilment model: Ready-to-Ship stock that ships immediately, and Made-to-Order work priced and scheduled per commission, because hand-painted pieces cannot be treated like warehouse inventory.",
    notes: [
      {
        label: "Patched a Next.js CVE before launch",
        detail:
          "A dependency audit during pre-launch surfaced a known Next.js advisory affecting the version in use. Patched and re-verified, with the upgrade path documented so the fix does not regress on the next install.",
      },
      {
        label: "IDOR fixed on order lookup",
        detail:
          "Order and address endpoints were returning records by ID without binding them to the session. Rewritten so every read and write is scoped to the authenticated customer.",
      },
      {
        label: "Rate limiting on the abusable routes",
        detail:
          "Auth, checkout and enquiry endpoints are throttled per identity and per IP, which closes off credential stuffing and cheap enumeration of the order space.",
      },
      {
        label: "Two fulfilment models in one catalogue",
        detail:
          "Ready-to-Ship and Made-to-Order carry different stock rules, lead times and pricing logic, resolved in a single product model so the storefront never promises a delivery date the studio cannot hit.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Postgres", "E-commerce"],
    live: "https://www.dkom.store",
    repo: "private",
    image: "/projects/dkom.webp",
    imageAlt: "Screenshot of the DKOM storefront",
  },
  {
    id: "astrosaathi",
    name: "AstroSaathi",
    status: "Live",
    year: "2026",
    summary:
      "Birth-chart generation backed by the Prokerala API, with Claude reading the chart back to you in plain language instead of raw tables of houses and degrees. Astro 5 with Neon Postgres and Drizzle, Better Auth for sessions, and the whole interface in both English and Hindi. Free to use, with no paywall on a reading.",
    notes: [
      {
        label: "AI interpretation grounded in real chart data",
        detail:
          "Prokerala returns the chart mathematics; Claude turns it into readable interpretation. The prompt is bound to the computed chart so the model explains that data rather than inventing a horoscope.",
      },
      {
        label: "Bilingual end to end",
        detail:
          "English and Hindi across the UI, the chart labels and the generated interpretation — not a translated menu bar sitting on top of English output.",
      },
      {
        label: "Islands architecture keeps it fast",
        detail:
          "Astro 5 ships the chart pages as mostly static HTML and hydrates only the interactive pieces, so a chart loads quickly on the low-end Android phones most of the audience uses.",
      },
    ],
    stack: ["Astro 5", "Neon", "Drizzle", "Better Auth", "Claude API", "Prokerala API"],
    live: "https://astrosaathi.vercel.app",
    repo: "private",
    image: "/projects/astrosaathi.webp",
    imageAlt: "Screenshot of AstroSaathi",
  },
  {
    id: "friday",
    name: "FRIDAY",
    summary:
      "A voice assistant that never leaves the machine — Whisper for speech, Ollama for the model, Piper for the voice. Fully local pipeline, no cloud round-trip, no transcript leaving the laptop.",
    stack: ["Python", "Whisper", "Ollama", "Piper"],
    live: "",
    repo: "private",
  },
];
