# Vishal Kumar Thakur — Portfolio

Personal site. Next.js App Router, TypeScript, Tailwind v4. Static output,
deployed on Vercel at **[vishalthakur.tech](https://vishalthakur.tech)**.

Dark by default, with a light-mode toggle. Geist for type. One restrained
indigo accent. Scroll reveals are a short fade and are skipped when the
visitor asks for reduced motion, or when JavaScript is off.

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

Copy lives in `src/content/`. Components only render it.

| File | Holds |
| --- | --- |
| `site.ts` | Name, title, email, domain, résumé, portrait, social links, nav |
| `hero.ts` | Role line, intro, and the fact rows under the hero |
| `projects.ts` | Selected work, then the smaller projects |
| `founder.ts` | Mithila KritiKala — copy and registration facts |
| `skills.ts` | Frontend, backend, AI, and security groups |
| `activity.ts` | Community and programmes, names only |
| `contact.ts` | Contact blurb and availability line |

A project with no `summary`, `live`, `repo`, or `image` renders as a name.
Leave those fields off rather than inventing them. Screenshots are 1600×1000
WebP in `public/projects/`, displayed in full through `next/image` (no crop).

`repo` is a URL, `"private"`, or omitted. `live` is a URL or omitted.

---

## Theme

Colours are CSS variables on `:root`, swapped by `data-theme` on `<html>`.
Dark is the default. The choice is stored in `localStorage` under `theme`.

---

## Deploying

Pushes to `main` deploy through Vercel. The production domain is
`vishalthakur.tech`. `site.url` in `src/content/site.ts` feeds the canonical
URL, Open Graph tags, sitemap, and JSON-LD.
