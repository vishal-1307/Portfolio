# Vishal Kumar Thakur — Portfolio

A fast, accessible, static developer portfolio. Built with **Vite + React +
TypeScript + Tailwind CSS + Framer Motion**, deploy-ready for **Vercel**.

Design direction: *Engineered Terminal Editorial* — near-black charcoal base, a
single electric-teal accent, monospace "system" metadata, hairline rules, and
restrained motion. No purple-gradient template clichés.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
```

---

## Edit your content (no JSX needed)

Everything you'll want to change lives in **one file**:

> `src/data/content.ts`

Sections, the about copy, skills groups, projects, certificates, and social
links are all plain data there. Re-theming (colors, fonts, spacing) lives in
**`tailwind.config.ts`** and the CSS variables at the top of **`src/index.css`**.

### Add project images

1. Drop screenshots into `public/projects/` using the names listed in
   `public/projects/README.md` (e.g. `hungriees.png`).
2. They're referenced by the `image` field of each project in `content.ts`.
3. Until an image exists, the card shows a tasteful teal gradient with the
   project's initial — nothing ever looks broken.

### Add your résumé

Replace the placeholder **`public/resume.pdf`** with your real CV (keep the same
filename, or update `site.resume` in `content.ts`).

### Fill in the gaps

Search `content.ts` for `TODO` — these are the live/code URLs, the real
certificate list, and the Instagram/Threads handles. Any link left as `""` is
hidden automatically, so you can fill them in whenever. Set a project's `code`
to `"private"` to show a "Private repo" note instead of a link.

---

## Wire up the contact form

The form posts to an endpoint from an env var. With no endpoint set, it falls
back to opening the visitor's mail client — so it works out of the box.

1. Copy the env template:
   ```bash
   cp .env.example .env
   ```
2. Pick a provider and fill in `.env`:

   **Web3Forms** (free, no account needed — https://web3forms.com)
   ```env
   VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
   VITE_WEB3FORMS_KEY=your-access-key
   ```

   **Formspree** (https://formspree.io)
   ```env
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
   ```
3. Restart `npm run dev` so Vite picks up the new env values.

> Note: `VITE_`-prefixed vars are bundled into the client. That's expected here —
> a Web3Forms access key / Formspree form id are meant to be public.

---

## Deploy to Vercel

The repo includes `vercel.json`, so Vercel auto-detects everything.

**Option A — Dashboard**
1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build: `npm run build`, Output:
   `dist` (already set in `vercel.json`).
4. Add Environment Variables: `VITE_CONTACT_ENDPOINT` (and `VITE_WEB3FORMS_KEY`
   if using Web3Forms).
5. **Deploy.**

**Option B — CLI**
```bash
npm i -g vercel
vercel            # preview deploy (follow the prompts)
vercel --prod     # production deploy
```
Set env vars once with `vercel env add VITE_CONTACT_ENDPOINT` (repeat for the
key), or add them in the project's dashboard settings.

After deploying, update the canonical/OG URLs in `index.html` if your final
domain differs from `vishalkumarthakur.me`, and replace `public/og-image.svg`
with a real `public/og-image.png` (1200×630) for link previews.

---

## Project structure

```
index.html                 SEO/OG/Twitter meta, favicon, JSON-LD Person
tailwind.config.ts         Theme tokens (colors, fonts, spacing, motion)
public/                    favicon, OG placeholder, resume.pdf, project images
src/
  data/content.ts          ← all editable content
  index.css                tokens, dot-grid/grain texture, a11y, reduced-motion
  lib/                      motion variants, cn() helper
  hooks/useScrollSpy.ts     active-nav tracking
  components/
    primitives/            Section, Card, Tag, SectionHeading, ImageWithFallback, icons
    layout/                Navbar, Footer, Background
    sections/              Hero, About, Skills, Projects, ProjectModal, Certificates, Contact
```

## Accessibility & performance

- Semantic landmarks, skip link, labelled controls, visible focus rings.
- Keyboard-navigable nav, mobile menu, and project modal (focus trap + Esc).
- Full `prefers-reduced-motion` support (Framer + a CSS safety net).
- Self-hosted fonts, lazy-loaded images, graceful image fallbacks.
