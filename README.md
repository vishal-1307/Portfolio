# Vishal Kumar Thakur — Portfolio

Personal site. Next.js App Router, TypeScript, Tailwind v4, React Three Fiber
for the hero lattice, Motion for scroll reveals. Static output, deployed on
Vercel at **[vishalthakur.tech](https://vishalthakur.tech)**.

Design direction: *dark editorial* — ink page, warm paper type, one disciplined
Swiss red, a hairline column grid, and oversized red section numerals. Archivo
for display, Hanken Grotesk for body.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (type-checked) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

---

## Editing content

**You should never need to open a component to change wording.** All copy lives
in `src/content/`:

| File | Holds |
| --- | --- |
| `site.ts` | Name, title, email, domain, résumé path, social links, nav |
| `hero.ts` | Hero copy, the spec list, the marquee, and the four proof stats |
| `about.ts` | About paragraphs and the spec sheet |
| `projects.ts` | The six case studies, plus the "Also built" entries |
| `founder.ts` | Mithila KritiKala — copy, registration facts, stats |
| `skills.ts` | Stack groups (the Security group is flagged `emphasis: true`) |
| `contact.ts` | Contact heading, blurb, availability line |

### Adding or changing a project

Add an object to `projects` in `src/content/projects.ts`. The fields that matter:

- `live` — a URL, or `""` to hide the button.
- `repo` — a URL, `"private"` for a locked badge, or `""` to hide it entirely.
- `visual` — `"image"` reads `/public/projects/<id>.webp`; `"diagram"` renders
  the drawn SVG keyed by `id` in `src/components/sections/ProjectVisual.tsx`.
- `hard` — the build-notes list. This is the part worth writing carefully: it is
  what separates a case study from a link.

Screenshots are 1600×1000 WebP. Anything without a public UI gets a drawn
diagram rather than a placeholder.

### Re-theming

Colours, type scale and spacing are CSS variables in the `@theme` block at the
top of `app/globals.css`. Every colour there is contrast-checked against the ink
background; the comment records the ratios. Note the split: `accent` (#E5123B)
is for fills and oversized numerals, `accent-soft` (#FF4D6D) is for red text,
because the darker red does not clear 4.5:1 at body size.

---

## The hero lattice

`src/components/hero/` has three pieces:

- `Hero.tsx` — server component. The headline is in the initial HTML, so the
  largest paint is text and the canvas never sits on the critical path.
- `HeroVisual.tsx` — the gate. Loads the 3D chunk via `next/dynamic` only after
  the browser goes idle, and only when `useRender3D()` says yes.
- `HeroScene.tsx` — the WebGL scene. Nodes and edges share one vertex shader, so
  displacement is a pure function of position and they stay welded: two draw
  calls, no lights, no post-processing.
- `HeroFallback.tsx` — a static SVG lattice, no JavaScript.

The fallback renders instead of WebGL when the visitor requests reduced motion,
has Data Saver on, is on a very low-memory device, or has no WebGL context. The
render loop also stops completely when the hero scrolls out of view or the tab
is backgrounded.

three.js is a separate lazy chunk — confirm with:

```bash
npm run build && curl -s http://localhost:3000/ | grep -c three
```

---

## Contact form

Works with no configuration: with no endpoint set it composes a `mailto:`. To
collect submissions instead, copy `.env.example` to `.env.local` and set
`NEXT_PUBLIC_CONTACT_ENDPOINT` (Web3Forms or Formspree). There are no server
secrets in this project.

---

## Deploying

Pushes to `main` deploy through Vercel. The production domain is
`vishalthakur.tech`; `site.url` in `src/content/site.ts` feeds the canonical
URL, Open Graph tags, sitemap and JSON-LD, so change it there if the domain
ever moves.
