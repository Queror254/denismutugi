# DenvaInternational — Filmmaker Portfolio Design Spec

**Date:** 2026-06-15  
**Project:** DenvaInternational personal portfolio website  
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS  
**Deployment:** Vercel  

---

## 1. Overview

A personal portfolio website for Denva — a multi-disciplinary creative working as a director, filmmaker, photographer, editor, and actor. The primary audience is **industry professionals** (casting directors, producers, studios) looking to assess his work and make contact quickly.

Two visual versions (A and B) will be built in parallel inside the same Next.js project. The user will review both in the browser and choose one. Both versions share the same data, components, and infrastructure — only the layout and visual treatment differ.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, image optimisation, scales to video uploads in V2 |
| Language | TypeScript | Type safety across shared data model |
| Styling | Tailwind CSS | Utility-first, good for rapid layout iteration |
| Fonts | Bebas Neue (display) + Inter (body) | via `next/font/google` |
| Video (V1) | YouTube embed (`youtube-nocookie.com`) | Zero infrastructure, placeholder content |
| Images | `next/image` | Automatic optimisation, lazy loading |
| Data (V1) | Static TypeScript array | No database needed; swapped for DB in V2 |
| Deployment | Vercel | Zero-config Next.js deploys |

---

## 3. Route Structure

Both versions live in the same project via Next.js route groups:

```
app/
  (version-a)/
    page.tsx              → /a         (Homepage A)
    work/
      page.tsx            → /a/work
      [slug]/page.tsx     → /a/work/[slug]
    about/page.tsx        → /a/about
    contact/page.tsx      → /a/contact
  (version-b)/
    page.tsx              → /b         (Homepage B)
    work/
      page.tsx            → /b/work
      [slug]/page.tsx     → /b/work/[slug]
    about/page.tsx        → /b/about
    contact/page.tsx      → /b/contact
  page.tsx                → /          (Version selector — links to /a and /b)
```

---

## 4. Shared Data Model

Stored in `lib/projects.ts` as a static TypeScript array. Both versions consume the same data.

```ts
type Category = "film" | "photo" | "acting";

type Project = {
  slug: string;
  title: string;
  category: Category;
  youtubeId: string;       // V1: YouTube video ID; V2: replaced with uploaded video URL
  thumbnail: string;       // Path to still image used in grids
  description: string;
  year: number;
  featured: boolean;       // If true, appears on the homepage
};
```

V1 ships with 8 placeholder projects (2–3 per category) using real YouTube video IDs for cinematic films.

---

## 5. Shared Visual Foundations

Both versions share these non-negotiables:

- **Background:** `#000000` pure black throughout
- **Primary text:** `#FFFFFF`
- **Secondary text / metadata:** `#666666`
- **Display font:** Bebas Neue — used for brand name, section headers, marquee text
- **Body font:** Inter — used for descriptions, nav, metadata
- **No colour accents** — all colour comes from the imagery
- **Custom cursor:** Small white dot or crosshair replacing the default cursor
- **Transitions:** Page transitions with a quick black fade (opacity 0→1, ~300ms)
- **Images:** All thumbnails use `next/image` with `object-cover`, black placeholder while loading

---

## 6. Version A — Pure Cinema

Inspired by **LetiTrip Pictures**. The work is the design. Minimal UI chrome, maximum impact.

### Homepage (`/a`)

- `DENVA INTERNATIONAL` in Bebas Neue, massive (10–15vw), flush left or centred at the very top
- Below: full-bleed project stills stacked vertically, each 80–100vh tall
  - Each still fills the screen edge-to-edge
  - On hover: project title fades in (bottom-left), subtle zoom (scale 1.00 → 1.03, 600ms ease)
  - Clicking navigates to the project page
- Only `featured: true` projects appear here (4–6 stills)
- Footer: `DENVA INTERNATIONAL` again in the same massive type, full width
- Nav: minimal top bar — `WORK  ABOUT  CONTACT` right-aligned, small caps, no logo in nav (logo IS the page)

### Work Page (`/a/work`)

- Page title: none — content begins immediately
- **Scattered masonry grid**: images at varying widths (30%, 45%, 60% of container), placed organically using CSS columns or a masonry library
- No filters — all work shown together
- Each image: hover reveals title + category tag
- Grid has generous breathing room between items

### Project Page (`/a/work/[slug]`)

- Full-width YouTube embed at the top (16:9, no controls bar until hover)
- Title below in Bebas Neue, large
- Year and category as small metadata
- Description paragraph
- `← BACK TO WORK` link at bottom
- No "next project" navigation (keeps it clean)

### About Page (`/a/about`)

- Full-bleed black-and-white portrait photo of Denva, top half of page
- Below: short editorial bio in large Inter text (not small — readable and confident)
- Roles listed as a simple line: `DIRECTOR / FILMMAKER / PHOTOGRAPHER / EDITOR / ACTOR`
- No team, no credits list — just the person

### Contact Page (`/a/contact`)

- Minimal: just an email address in large type, centred on the page
- Social links below (Instagram, IMDb, LinkedIn) as small text links
- No form — industry pros prefer direct email

---

## 7. Version B — Editorial & Systematic

Inspired by **Stadium Creative Group**. Premium, navigable, structured — without losing cinematic edge.

### Navigation

- Sticky top bar: `[ DENVA INTERNATIONAL ]` centred in Bebas Neue
- Left: `WORK  ABOUT`
- Right: `CONTACT`
- Nav background: transparent over hero, transitions to `rgba(0,0,0,0.9)` on scroll

### Homepage (`/b`)

- **Hero marquee**: full-width horizontally scrolling ticker — `— DIRECTOR — FILMMAKER — PHOTOGRAPHER — ACTOR —` in Bebas Neue, white on black, continuous loop, moderate speed
- Below: **staggered asymmetric featured grid**
  - Row 1: 1 large project (60% width, left) + 1 smaller (38% width, right)
  - Row 2: 1 smaller (38%, left) + 1 large (60%, right)
  - Alternates for up to 6 featured projects
  - Each cell: thumbnail fills the box, title + year overlays on hover
- Footer: `[ DENVA INTERNATIONAL ]` in Bebas Neue, left — copyright right — Instagram/LinkedIn links centre

### Work Page (`/b/work`)

- `— WORK —` as a large Bebas Neue heading at the top (static, not scrolling)
- Filter tabs below: `ALL  FILM  PHOTO  ACTING` — clicking filters the grid client-side
- **2-column grid** of project thumbnails, consistent sizing, 16:9 aspect ratio
- Below each thumbnail: project title (white, Inter medium) + year (grey, small)
- Smooth filter transition: items fade out/in, no layout jump (use `AnimatePresence` from Framer Motion or CSS opacity transitions)

### Project Page (`/b/work/[slug]`)

- Full-width YouTube embed hero (100vw, 16:9)
- Below: title in Bebas Neue (large), year + category metadata
- Description paragraph (Inter, comfortable reading width ~65ch)
- `NEXT PROJECTS` heading, then a 2-up row of thumbnails linking to adjacent projects
- `VIEW ALL PROJECTS` button (outlined, white border) below the next projects row

### About Page (`/b/about`)

- Large editorial opening statement: *"Denva is a director, filmmaker, and photographer based in [City — to be confirmed]. He makes films that…"* — 2–3 sentences, large type (2rem+). The placeholder bio copy needs to be supplied before launch.
- Below: a horizontal rule, then two columns — disciplines left, a portrait photo right
- Roles and selected credits listed simply

### Contact Page (`/b/contact`)

- Headline: `LET'S WORK TOGETHER`
- **Natural language form:**
  ```
  My name is [_______] and I'm reaching out about [_______].
  You can email me at [_______].
  
  [Message textarea]
  
  [SEND MESSAGE →]
  ```
- Below the form: direct email address + Instagram link
- Form submits via a Next.js Server Action — V1: logs submission to console and shows a success message on screen. Actual email delivery (via Resend) is V2 scope.

---

## 8. Animations & Interactions

| Interaction | Both A & B |
|-------------|------------|
| Page load | Black screen fades to content (opacity 0→1, 300ms) |
| Custom cursor | Small white filled circle (12px), follows mouse with 80ms lag |
| Image hover | Scale 1.00 → 1.03, title overlay fades in |
| Nav links | Underline slides in from left on hover |
| Version B marquee | CSS `animation: scroll linear infinite` — no JS library needed |
| Version B filter | CSS opacity transition on grid items |

No heavy animation libraries needed for V1 — CSS transitions handle most of it. Framer Motion only if the filter transition feels janky.

---

## 9. V1 Scope (What's In)

- Both versions fully built and navigable
- 8 placeholder projects with YouTube embeds and placeholder thumbnail images
- All pages: Home, Work, Project Detail, About, Contact
- Custom cursor
- Responsive (mobile + desktop)
- Deployed to Vercel

## 10. V2 Scope (What's Out of V1)

- Self-hosted video uploads (S3/Vercel Blob + upload UI)
- CMS or admin panel for managing projects
- Contact form email delivery (Resend integration)
- Acting reel / separate acting section
- Password-protected press kit page
- Analytics
