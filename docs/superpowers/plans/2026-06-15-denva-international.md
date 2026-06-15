# DenvaInternational Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two visual versions (A: Pure Cinema, B: Editorial & Systematic) of the DenvaInternational filmmaker portfolio website inside a single Next.js project, accessible at `/a` and `/b`, so the client can choose one.

**Architecture:** Single Next.js 15 App Router project with two top-level route segments (`app/a/` and `app/b/`) sharing a common data layer (`lib/projects.ts`) and utility components (`components/shared/`). Version-specific layouts and components live in `components/version-a/` and `components/version-b/`. Static TypeScript data for V1 — no database or CMS.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, next/font (Bebas Neue + Inter), next/image, YouTube nocookie embeds, Vitest (unit tests), Vercel (deploy)

---

## File Map

```
denva/
├── app/
│   ├── layout.tsx                          root layout — fonts, cursor, globals
│   ├── page.tsx                            version selector at /
│   ├── globals.css
│   ├── a/
│   │   ├── layout.tsx                      Version A layout (NavA)
│   │   ├── page.tsx                        Homepage A — stacked full-bleed stills
│   │   ├── work/
│   │   │   ├── page.tsx                    Work A — scattered masonry grid
│   │   │   └── [slug]/page.tsx             Project A — YouTube embed + meta
│   │   ├── about/page.tsx                  About A — portrait + bio
│   │   └── contact/page.tsx                Contact A — just email address
│   └── b/
│       ├── layout.tsx                      Version B layout (NavB)
│       ├── page.tsx                        Homepage B — marquee + staggered grid
│       ├── work/
│       │   ├── page.tsx                    Work B — filtered 2-column grid
│       │   └── [slug]/page.tsx             Project B — hero + next projects
│       ├── about/page.tsx                  About B — editorial 2-col layout
│       └── contact/
│           ├── page.tsx                    Contact B — natural language form
│           └── actions.ts                  Server action (console log V1)
├── components/
│   ├── shared/
│   │   ├── CustomCursor.tsx                JS-driven white dot cursor
│   │   └── YouTubeEmbed.tsx                Reusable 16:9 iframe wrapper
│   ├── version-a/
│   │   └── NavA.tsx                        Minimal top-right nav links
│   └── version-b/
│       ├── NavB.tsx                        Sticky centred [ DENVA ] nav
│       ├── MarqueeB.tsx                    CSS marquee ticker
│       ├── WorkGridB.tsx                   Client component — filter state + grid
│       └── ContactFormB.tsx               Client component — natural language form
├── lib/
│   ├── fonts.ts                            Bebas Neue + Inter via next/font
│   ├── projects.ts                         Project type + 8 placeholder entries + helpers
│   ├── filterProjects.ts                   Pure filter function (testable)
│   └── __tests__/
│       ├── projects.test.ts
│       └── filterProjects.test.ts
├── public/
│   └── thumbnails/                         (populated via picsum.photos in next.config)
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
└── tsconfig.json
```

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `denva/` (project root, all files below)
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Scaffold with create-next-app**

Run from `/home/techmystique/workspace/`:
```bash
npx create-next-app@latest denva \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-eslint
```
Expected: `denva/` directory created with Next.js 15, TypeScript, Tailwind, App Router.

- [ ] **Step 2: Install Vitest and testing deps**

```bash
cd denva && npm install -D vitest @vitejs/plugin-react
```

- [ ] **Step 3: Write `vitest.config.ts`**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: Add test script to `package.json`**

Open `package.json` and add to the `"scripts"` block:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write `next.config.ts`**

Delete the auto-generated `next.config.ts` and replace:
```typescript
// next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default config;
```

- [ ] **Step 6: Write `tailwind.config.ts`**

Replace the auto-generated file:
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Write `app/globals.css`**

Replace the auto-generated file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

::selection {
  background: white;
  color: black;
}

::-webkit-scrollbar {
  width: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

main {
  animation: fadeIn 0.3s ease-in-out;
}
```

- [ ] **Step 8: Initialise git**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with Tailwind and Vitest"
```

---

## Task 2: Shared data model and helper functions

**Files:**
- Create: `lib/fonts.ts`
- Create: `lib/projects.ts`
- Create: `lib/filterProjects.ts`
- Create: `lib/__tests__/projects.test.ts`
- Create: `lib/__tests__/filterProjects.test.ts`

- [ ] **Step 1: Write `lib/fonts.ts`**

```typescript
// lib/fonts.ts
import { Bebas_Neue, Inter } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

- [ ] **Step 2: Write failing tests for project helpers**

```typescript
// lib/__tests__/projects.test.ts
import { describe, it, expect } from "vitest";
import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsByCategory,
  getAdjacentProjects,
  projects,
} from "../projects";

describe("getFeaturedProjects", () => {
  it("returns only featured projects", () => {
    expect(getFeaturedProjects().every((p) => p.featured)).toBe(true);
  });
  it("returns at least one project", () => {
    expect(getFeaturedProjects().length).toBeGreaterThan(0);
  });
});

describe("getProjectBySlug", () => {
  it("returns the correct project for a known slug", () => {
    expect(getProjectBySlug("home-again")?.title).toBe("Home Again");
  });
  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getProjectsByCategory", () => {
  it("returns only projects matching the category", () => {
    const films = getProjectsByCategory("film");
    expect(films.every((p) => p.category === "film")).toBe(true);
  });
  it("returns at least one film", () => {
    expect(getProjectsByCategory("film").length).toBeGreaterThan(0);
  });
});

describe("getAdjacentProjects", () => {
  it("returns the requested count", () => {
    expect(getAdjacentProjects("home-again", 2)).toHaveLength(2);
  });
  it("does not include the source project", () => {
    const adj = getAdjacentProjects("home-again", 2);
    expect(adj.every((p) => p.slug !== "home-again")).toBe(true);
  });
  it("wraps around when source is the last project", () => {
    const last = projects[projects.length - 1];
    expect(getAdjacentProjects(last.slug, 2)).toHaveLength(2);
  });
});
```

- [ ] **Step 3: Run tests — confirm they fail**

```bash
npm test
```
Expected: FAIL — `Cannot find module '../projects'`

- [ ] **Step 4: Write `lib/projects.ts`**

```typescript
// lib/projects.ts
export type Category = "film" | "photo" | "acting";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  youtubeId: string;
  thumbnail: string;
  description: string;
  year: number;
  featured: boolean;
};

// Thumbnails use picsum.photos seeds as placeholders.
// Replace with real image paths before launch.
export const projects: Project[] = [
  {
    slug: "home-again",
    title: "Home Again",
    category: "film",
    youtubeId: "YoHD9sv5v84",
    thumbnail: "https://picsum.photos/seed/home-again/1920/1080",
    description: "A short film exploring the tension between memory and belonging.",
    year: 2024,
    featured: true,
  },
  {
    slug: "still-waters",
    title: "Still Waters",
    category: "film",
    youtubeId: "YqNYrYUiMfg",
    thumbnail: "https://picsum.photos/seed/still-waters/1920/1080",
    description: "A visual essay on solitude and the urban experience.",
    year: 2023,
    featured: true,
  },
  {
    slug: "after-midnight",
    title: "After Midnight",
    category: "film",
    youtubeId: "n9xhJrPXop4",
    thumbnail: "https://picsum.photos/seed/after-midnight/1920/1080",
    description: "A noir-influenced short set in a single location over one night.",
    year: 2022,
    featured: true,
  },
  {
    slug: "the-return",
    title: "The Return",
    category: "film",
    youtubeId: "5xH0HfJHsaY",
    thumbnail: "https://picsum.photos/seed/the-return/1920/1080",
    description: "A cinematic short about identity and displacement.",
    year: 2023,
    featured: false,
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    category: "photo",
    youtubeId: "hEJnMQG9ev8",
    thumbnail: "https://picsum.photos/seed/golden-hour/800/1200",
    description: "A portrait series captured during the last light of day.",
    year: 2024,
    featured: true,
  },
  {
    slug: "concrete-dreams",
    title: "Concrete Dreams",
    category: "photo",
    youtubeId: "QRfj1VCg16E",
    thumbnail: "https://picsum.photos/seed/concrete-dreams/1920/1080",
    description: "Street photography exploring the poetry of city life.",
    year: 2023,
    featured: false,
  },
  {
    slug: "inheritance",
    title: "Inheritance",
    category: "acting",
    youtubeId: "0pdqf4P9MB8",
    thumbnail: "https://picsum.photos/seed/inheritance/1920/1080",
    description: "A family drama — Denva plays the estranged son, Marcus.",
    year: 2024,
    featured: true,
  },
  {
    slug: "between-worlds",
    title: "Between Worlds",
    category: "acting",
    youtubeId: "9NJj12tJzqc",
    thumbnail: "https://picsum.photos/seed/between-worlds/1920/1080",
    description: "An independent feature — Denva plays the lead, Gabriel.",
    year: 2023,
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getAdjacentProjects(slug: string, count = 2): Project[] {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return projects.slice(0, count);
  const tail = projects.slice(idx + 1);
  const head = projects.slice(0, idx);
  return [...tail, ...head].slice(0, count);
}
```

- [ ] **Step 5: Write failing tests for filterProjects**

```typescript
// lib/__tests__/filterProjects.test.ts
import { describe, it, expect } from "vitest";
import { filterProjects } from "../filterProjects";
import { projects } from "../projects";

describe("filterProjects", () => {
  it("returns all projects when filter is 'all'", () => {
    expect(filterProjects(projects, "all")).toHaveLength(projects.length);
  });
  it("returns only film projects for 'film'", () => {
    const result = filterProjects(projects, "film");
    expect(result.every((p) => p.category === "film")).toBe(true);
  });
  it("returns only photo projects for 'photo'", () => {
    const result = filterProjects(projects, "photo");
    expect(result.every((p) => p.category === "photo")).toBe(true);
  });
  it("returns only acting projects for 'acting'", () => {
    const result = filterProjects(projects, "acting");
    expect(result.every((p) => p.category === "acting")).toBe(true);
  });
  it("returns an empty array for an empty input", () => {
    expect(filterProjects([], "film")).toHaveLength(0);
  });
});
```

- [ ] **Step 6: Confirm filterProjects test fails**

```bash
npm test
```
Expected: filterProjects tests FAIL — `Cannot find module '../filterProjects'`. Projects tests should now PASS.

- [ ] **Step 7: Write `lib/filterProjects.ts`**

```typescript
// lib/filterProjects.ts
import type { Project, Category } from "./projects";

export type Filter = "all" | Category;

export function filterProjects(projects: Project[], filter: Filter): Project[] {
  if (filter === "all") return projects;
  return projects.filter((p) => p.category === filter);
}
```

- [ ] **Step 8: Run all tests — confirm all pass**

```bash
npm test
```
Expected: All 12 tests PASS.

- [ ] **Step 9: Commit**

```bash
git add lib/
git commit -m "feat: add shared data model, project helpers, and filter function with tests"
```

---

## Task 3: Shared components

**Files:**
- Create: `components/shared/CustomCursor.tsx`
- Create: `components/shared/YouTubeEmbed.tsx`

- [ ] **Step 1: Write `components/shared/CustomCursor.tsx`**

```tsx
// components/shared/CustomCursor.tsx
"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white mix-blend-difference transition-opacity"
    />
  );
}
```

- [ ] **Step 2: Write `components/shared/YouTubeEmbed.tsx`**

```tsx
// components/shared/YouTubeEmbed.tsx

type Props = {
  videoId: string;
  title: string;
  className?: string;
};

export function YouTubeEmbed({ videoId, title, className = "" }: Props) {
  return (
    <div className={`relative aspect-video w-full ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
```

- [ ] **Step 3: Write root `app/layout.tsx`**

Delete the auto-generated content and replace:
```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { bebasNeue, inter } from "@/lib/fonts";
import { CustomCursor } from "@/components/shared/CustomCursor";

export const metadata: Metadata = {
  title: "Denva International",
  description: "Director. Filmmaker. Photographer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-black cursor-none antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Write version selector `app/page.tsx`**

```tsx
// app/page.tsx
import Link from "next/link";

export default function VersionSelector() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 bg-black px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        DenvaInternational — Select Version
      </p>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-16">
        <Link
          href="/a"
          className="font-bebas text-3xl text-white transition-opacity hover:opacity-50"
        >
          A — Pure Cinema
        </Link>
        <span className="text-white/20">|</span>
        <Link
          href="/b"
          className="font-bebas text-3xl text-white transition-opacity hover:opacity-50"
        >
          B — Editorial
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify the dev server starts**

```bash
npm run dev
```
Expected: server starts on http://localhost:3000. Open it — you should see the black version selector with two links. No errors in the terminal.

- [ ] **Step 6: Commit**

```bash
git add app/ components/
git commit -m "feat: add shared components, root layout, and version selector"
```

---

## Task 4: Version A — Layout and Nav

**Files:**
- Create: `components/version-a/NavA.tsx`
- Create: `app/a/layout.tsx`

- [ ] **Step 1: Write `components/version-a/NavA.tsx`**

```tsx
// components/version-a/NavA.tsx
import Link from "next/link";

export function NavA() {
  return (
    <nav className="fixed right-0 top-0 z-50 flex gap-8 p-8">
      {[
        { href: "/a/work", label: "Work" },
        { href: "/a/about", label: "About" },
        { href: "/a/contact", label: "Contact" },
      ].map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Write `app/a/layout.tsx`**

```tsx
// app/a/layout.tsx
import type { Metadata } from "next";
import { NavA } from "@/components/version-a/NavA";

export const metadata: Metadata = {
  title: "Denva International",
};

export default function LayoutA({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavA />
      <main>{children}</main>
    </>
  );
}
```

- [ ] **Step 3: Confirm `/a` gives a 404 (no page yet)**

Visit http://localhost:3000/a — you should see Next.js 404. Nav is not visible yet because there's no page to mount the layout. This is expected.

- [ ] **Step 4: Commit**

```bash
git add components/version-a/ app/a/layout.tsx
git commit -m "feat: add Version A layout and nav"
```

---

## Task 5: Version A — Homepage

**Files:**
- Create: `app/a/page.tsx`

- [ ] **Step 1: Write `app/a/page.tsx`**

```tsx
// app/a/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomeA() {
  const featured = getFeaturedProjects();

  return (
    <div className="bg-black">
      {/* Brand name — top */}
      <div className="px-6 pb-4 pt-8">
        <h1
          className="font-bebas leading-none text-white"
          style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
        >
          Denva International
        </h1>
      </div>

      {/* Full-bleed stacked stills */}
      {featured.map((project) => (
        <Link
          key={project.slug}
          href={`/a/work/${project.slug}`}
          className="group relative block h-[85vh] w-full overflow-hidden"
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
          {/* Title overlay */}
          <div className="absolute bottom-8 left-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="font-bebas text-4xl text-white">{project.title}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
              {project.category} — {project.year}
            </p>
          </div>
        </Link>
      ))}

      {/* Brand name — bottom */}
      <div className="px-6 py-16">
        <p
          className="font-bebas leading-none text-white select-none"
          style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
        >
          Denva International
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/a. You should see:
- Large "Denva International" heading
- 5 stacked full-bleed images (the featured projects)
- Hovering each image should show a slight zoom and the project title fading in
- Nav links top-right
- Brand name repeated at the bottom

- [ ] **Step 3: Commit**

```bash
git add app/a/page.tsx
git commit -m "feat: Version A homepage — stacked full-bleed stills"
```

---

## Task 6: Version A — Work Page

**Files:**
- Create: `app/a/work/page.tsx`

- [ ] **Step 1: Write `app/a/work/page.tsx`**

```tsx
// app/a/work/page.tsx
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkPageA() {
  return (
    <div className="min-h-screen bg-black px-4 pt-24 pb-12">
      {/* CSS columns masonry — no JS library needed */}
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/a/work/${project.slug}`}
            className="group relative mb-3 block overflow-hidden"
          >
            {/* Photo projects use portrait ratio; others use landscape */}
            <div
              className="relative w-full"
              style={{
                aspectRatio: project.category === "photo" ? "3/4" : "16/9",
              }}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end bg-black/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <span className="font-bebas text-2xl text-white">{project.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/a/work. You should see:
- All 8 projects in a scattered column layout (CSS columns)
- Photo project ("Golden Hour") has a portrait aspect ratio — taller than the rest
- Hovering a card shows the title overlay and subtle zoom

- [ ] **Step 3: Commit**

```bash
git add app/a/work/page.tsx
git commit -m "feat: Version A work page — CSS columns masonry grid"
```

---

## Task 7: Version A — Project Detail Page

**Files:**
- Create: `app/a/work/[slug]/page.tsx`

- [ ] **Step 1: Write `app/a/work/[slug]/page.tsx`**

```tsx
// app/a/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPageA({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-black pt-16">
      <YouTubeEmbed videoId={project.youtubeId} title={project.title} />

      <div className="max-w-3xl px-8 py-12">
        <h1 className="font-bebas text-6xl text-white leading-none mb-2">{project.title}</h1>
        <p className="mb-8 text-xs uppercase tracking-widest text-white/40">
          {project.category} — {project.year}
        </p>
        <p className="text-lg leading-relaxed text-white/75">{project.description}</p>

        <Link
          href="/a/work"
          className="mt-16 inline-block text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white"
        >
          ← Back to Work
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Click any project from `/a/work`. You should see:
- Full-width YouTube embed at the top
- Project title in large Bebas Neue below
- Category and year metadata in grey
- Description paragraph
- Back link at the bottom

- [ ] **Step 3: Commit**

```bash
git add app/a/work/
git commit -m "feat: Version A project detail page"
```

---

## Task 8: Version A — About Page

**Files:**
- Create: `app/a/about/page.tsx`

- [ ] **Step 1: Write `app/a/about/page.tsx`**

```tsx
// app/a/about/page.tsx
import Image from "next/image";

export default function AboutPageA() {
  return (
    <div className="min-h-screen bg-black">
      {/* Full-bleed portrait — grayscale */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="https://picsum.photos/seed/denva-portrait/1200/800"
          alt="Denva"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      <div className="max-w-3xl px-8 py-16">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-white/40">
          Director / Filmmaker / Photographer / Editor / Actor
        </p>
        <p className="font-sans text-2xl leading-relaxed text-white">
          Denva is a multi-disciplinary creative working across film, photography, and performance.
          His work explores identity, tension, and the unsaid — crafted for the screen and built to last.
          Based in [City — to be confirmed].
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/a/about. You should see:
- Full-bleed greyscale portrait photo (placeholder from picsum)
- Role list in spaced small caps below
- Editorial bio paragraph

- [ ] **Step 3: Commit**

```bash
git add app/a/about/page.tsx
git commit -m "feat: Version A about page"
```

---

## Task 9: Version A — Contact Page

**Files:**
- Create: `app/a/contact/page.tsx`

- [ ] **Step 1: Write `app/a/contact/page.tsx`**

```tsx
// app/a/contact/page.tsx
export default function ContactPageA() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-8 text-center">
      <p className="mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Get in touch</p>

      <a
        href="mailto:hello@denvainternational.com"
        className="font-bebas text-white transition-opacity hover:opacity-50"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        hello@denvainternational.com
      </a>

      <div className="mt-14 flex gap-10">
        {[
          { label: "Instagram", href: "#" },
          { label: "IMDb", href: "#" },
          { label: "LinkedIn", href: "#" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/a/contact. You should see a centered black page with just the email address large and three social links below. Nothing else.

- [ ] **Step 3: Commit**

```bash
git add app/a/contact/page.tsx
git commit -m "feat: Version A contact page — email only"
```

---

## Task 10: Version B — Layout, Nav, and Marquee

**Files:**
- Create: `components/version-b/NavB.tsx`
- Create: `components/version-b/MarqueeB.tsx`
- Create: `app/b/layout.tsx`

- [ ] **Step 1: Write `components/version-b/NavB.tsx`**

```tsx
// components/version-b/NavB.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function NavB() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5 transition-colors duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="flex gap-8">
        <Link href="/b/work" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
          Work
        </Link>
        <Link href="/b/about" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
          About
        </Link>
      </div>

      <Link href="/b" className="font-bebas text-xl tracking-wider text-white transition-opacity hover:opacity-70">
        [ Denva International ]
      </Link>

      <Link href="/b/contact" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
        Contact
      </Link>
    </nav>
  );
}
```

- [ ] **Step 2: Write `components/version-b/MarqueeB.tsx`**

```tsx
// components/version-b/MarqueeB.tsx

const SEGMENT = "— DIRECTOR — FILMMAKER — PHOTOGRAPHER — ACTOR — EDITOR ";

export function MarqueeB() {
  // Render 4 copies so the infinite loop never shows a gap
  const copies = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="overflow-hidden border-y border-white/10 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {copies.map((i) => (
          <span key={i} className="mx-6 font-bebas text-2xl tracking-wider text-white">
            {SEGMENT}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `app/b/layout.tsx`**

```tsx
// app/b/layout.tsx
import type { Metadata } from "next";
import { NavB } from "@/components/version-b/NavB";

export const metadata: Metadata = {
  title: "Denva International",
};

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavB />
      <main>{children}</main>
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/version-b/ app/b/layout.tsx
git commit -m "feat: Version B layout, nav, and marquee component"
```

---

## Task 11: Version B — Homepage

**Files:**
- Create: `app/b/page.tsx`

- [ ] **Step 1: Write `app/b/page.tsx`**

```tsx
// app/b/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { MarqueeB } from "@/components/version-b/MarqueeB";

export default function HomeB() {
  const featured = getFeaturedProjects().slice(0, 6);

  // Pair projects into rows of 2
  const rows: [typeof featured[number], typeof featured[number] | null][] = [];
  for (let i = 0; i < featured.length; i += 2) {
    rows.push([featured[i], featured[i + 1] ?? null]);
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Space for fixed nav */}
      <div className="pt-20">
        <MarqueeB />
      </div>

      {/* Staggered asymmetric grid */}
      <div className="space-y-3 px-4 py-6">
        {rows.map(([left, right], rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          return (
            <div key={rowIndex} className="flex gap-3">
              {/* Left cell */}
              <Link
                href={`/b/work/${left.slug}`}
                className={`group relative overflow-hidden ${isEven ? "w-[62%]" : "w-[38%]"}`}
                style={{ aspectRatio: "16/10" }}
              >
                <Image
                  src={left.thumbnail}
                  alt={left.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="62vw"
                />
                <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition-colors duration-300 group-hover:bg-black/30">
                  <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-bebas text-3xl text-white">{left.title}</p>
                    <p className="text-xs uppercase tracking-widest text-white/50">{left.year}</p>
                  </div>
                </div>
              </Link>

              {/* Right cell — only rendered if pair exists */}
              {right && (
                <Link
                  href={`/b/work/${right.slug}`}
                  className={`group relative overflow-hidden ${isEven ? "w-[38%]" : "w-[62%]"}`}
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={right.thumbnail}
                    alt={right.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="38vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition-colors duration-300 group-hover:bg-black/30">
                    <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="font-bebas text-3xl text-white">{right.title}</p>
                      <p className="text-xs uppercase tracking-widest text-white/50">{right.year}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-white/10 px-8 py-10">
        <span className="font-bebas text-lg text-white">[ Denva International ]</span>
        <div className="flex gap-6">
          <a href="#" className="text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white">Instagram</a>
          <a href="#" className="text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white">LinkedIn</a>
        </div>
        <span className="text-xs text-white/20">© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/b. You should see:
- `[ Denva International ]` centred nav at the top
- The scrolling marquee ticker below it
- Staggered grid: Row 1 has a wide image left + narrow image right; Row 2 flips (narrow left, wide right)
- Hover shows title overlay
- Footer with bracketed logo

- [ ] **Step 3: Commit**

```bash
git add app/b/page.tsx
git commit -m "feat: Version B homepage — marquee and staggered asymmetric grid"
```

---

## Task 12: Version B — Work Page with Filter

**Files:**
- Create: `components/version-b/WorkGridB.tsx`
- Create: `app/b/work/page.tsx`

- [ ] **Step 1: Write `components/version-b/WorkGridB.tsx`**

```tsx
// components/version-b/WorkGridB.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { filterProjects, type Filter } from "@/lib/filterProjects";
import type { Project } from "@/lib/projects";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Film", value: "film" },
  { label: "Photo", value: "photo" },
  { label: "Acting", value: "acting" },
];

export function WorkGridB({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");
  const visible = filterProjects(projects, active);

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-10 flex gap-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`text-xs uppercase tracking-widest transition-colors ${
              active === f.value
                ? "text-white"
                : "text-white/30 hover:text-white/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 gap-3 pb-16 sm:grid-cols-2">
        {visible.map((project) => (
          <Link key={project.slug} href={`/b/work/${project.slug}`} className="group block">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-white">{project.title}</p>
              <p className="mt-0.5 text-xs text-white/40">{project.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Write `app/b/work/page.tsx`**

```tsx
// app/b/work/page.tsx
import { projects } from "@/lib/projects";
import { WorkGridB } from "@/components/version-b/WorkGridB";

export default function WorkPageB() {
  return (
    <div className="min-h-screen bg-black px-8 pt-28 pb-12">
      <h1 className="mb-10 font-bebas text-6xl text-white leading-none">— WORK —</h1>
      <WorkGridB projects={projects} />
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

Visit http://localhost:3000/b/work. You should see:
- "— WORK —" heading
- Filter tabs: All / Film / Photo / Acting
- 2-column grid of all 8 projects
- Clicking "Film" shows only the 4 film projects
- Clicking "Photo" shows only the 2 photo projects
- Clicking "All" restores the full grid

- [ ] **Step 4: Commit**

```bash
git add components/version-b/WorkGridB.tsx app/b/work/page.tsx
git commit -m "feat: Version B work page with client-side category filter"
```

---

## Task 13: Version B — Project Detail Page

**Files:**
- Create: `app/b/work/[slug]/page.tsx`

- [ ] **Step 1: Write `app/b/work/[slug]/page.tsx`**

```tsx
// app/b/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAdjacentProjects, projects } from "@/lib/projects";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPageB({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const adjacent = getAdjacentProjects(slug, 2);

  return (
    <div className="min-h-screen bg-black pt-16">
      <YouTubeEmbed videoId={project.youtubeId} title={project.title} />

      <div className="max-w-4xl px-8 py-12">
        <h1 className="font-bebas text-6xl text-white leading-none mb-2">{project.title}</h1>
        <p className="mb-8 text-xs uppercase tracking-widest text-white/40">
          {project.category} — {project.year}
        </p>
        <p className="max-w-prose text-lg leading-relaxed text-white/75">
          {project.description}
        </p>
      </div>

      {/* Next Projects */}
      <div className="px-8 pb-16">
        <p className="mb-6 text-xs uppercase tracking-widest text-white/40">Next Projects</p>
        <div className="grid grid-cols-2 gap-3">
          {adjacent.map((p) => (
            <Link key={p.slug} href={`/b/work/${p.slug}`} className="group block">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="50vw"
                />
              </div>
              <p className="mt-2 text-sm text-white">{p.title}</p>
              <p className="text-xs text-white/40">{p.year}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/b/work"
          className="mt-8 flex w-full items-center justify-center border border-white/20 py-3 text-xs uppercase tracking-widest text-white/50 transition-colors hover:border-white/60 hover:text-white"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Click a project from `/b/work`. You should see:
- Full-width YouTube embed
- Title, category, year
- Description paragraph
- "Next Projects" section with 2 thumbnails
- "View All Projects" outlined button

- [ ] **Step 3: Commit**

```bash
git add app/b/work/
git commit -m "feat: Version B project detail with next projects section"
```

---

## Task 14: Version B — About Page

**Files:**
- Create: `app/b/about/page.tsx`

- [ ] **Step 1: Write `app/b/about/page.tsx`**

```tsx
// app/b/about/page.tsx
import Image from "next/image";

const DISCIPLINES = ["Director", "Filmmaker", "Photographer", "Editor", "Actor"];

export default function AboutPageB() {
  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Opening statement */}
      <div className="max-w-4xl border-b border-white/10 px-8 pb-16">
        <p className="font-sans text-3xl leading-relaxed text-white">
          Denva is a director, filmmaker, and photographer.
          His work lives in the space between narrative and image —
          built for the screen and made to endure.
          Based in [City — to be confirmed].
        </p>
      </div>

      {/* Two-column: disciplines + portrait */}
      <div className="grid grid-cols-1 gap-12 px-8 py-16 md:grid-cols-2">
        <div>
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Disciplines</p>
          <ul className="space-y-2">
            {DISCIPLINES.map((role) => (
              <li key={role} className="font-bebas text-4xl text-white">
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[3/4] w-full">
          <Image
            src="https://picsum.photos/seed/denva-portrait/800/1067"
            alt="Denva"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/b/about. You should see:
- Large editorial opening statement at the top
- A horizontal rule below it
- Two columns: discipline list (Bebas Neue) on the left, portrait photo on the right

- [ ] **Step 3: Commit**

```bash
git add app/b/about/page.tsx
git commit -m "feat: Version B about page — editorial two-column layout"
```

---

## Task 15: Version B — Contact Page with Natural Language Form

**Files:**
- Create: `app/b/contact/actions.ts`
- Create: `components/version-b/ContactFormB.tsx`
- Create: `app/b/contact/page.tsx`

- [ ] **Step 1: Write `app/b/contact/actions.ts`**

```typescript
// app/b/contact/actions.ts
"use server";

type ContactPayload = {
  name: string;
  about: string;
  email: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  // V1: log submission. V2: send via Resend.
  console.log("[Contact Form]", payload);
}
```

- [ ] **Step 2: Write `components/version-b/ContactFormB.tsx`**

```tsx
// components/version-b/ContactFormB.tsx
"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/app/b/contact/actions";

export function ContactFormB() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await submitContact({ name, about, email, message });
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <p className="font-sans text-2xl text-white">
        Thanks, {name || "there"}. Denva will be in touch soon.
      </p>
    );
  }

  const inputClass =
    "border-b border-white/30 bg-transparent pb-1 text-white placeholder-white/30 focus:border-white focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-10">
      {/* Line 1 */}
      <p className="font-sans text-xl leading-relaxed text-white">
        My name is{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          required
          className={`${inputClass} w-36`}
        />{" "}
        and I&apos;m reaching out about{" "}
        <input
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="project / opportunity"
          required
          className={`${inputClass} w-52`}
        />.
      </p>

      {/* Line 2 */}
      <p className="font-sans text-xl text-white">
        You can email me at{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={`${inputClass} w-56`}
        />.
      </p>

      {/* Message */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell me more..."
        rows={4}
        className="w-full resize-none border border-white/20 bg-transparent p-4 text-sm text-white placeholder-white/30 focus:border-white/60 focus:outline-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="border border-white/20 px-8 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:border-white/70 disabled:opacity-40"
      >
        {isPending ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Write `app/b/contact/page.tsx`**

```tsx
// app/b/contact/page.tsx
import { ContactFormB } from "@/components/version-b/ContactFormB";

export default function ContactPageB() {
  return (
    <div className="min-h-screen bg-black px-8 pb-24 pt-32">
      <h1 className="mb-3 font-sans text-4xl font-light text-white">
        Let&apos;s work together
      </h1>
      <p className="mb-16 text-sm text-white/40">
        Fill out the form and Denva will be in touch.
      </p>

      <ContactFormB />

      <div className="mt-16 border-t border-white/10 pt-8">
        <a
          href="mailto:hello@denvainternational.com"
          className="text-sm text-white/40 transition-colors hover:text-white"
        >
          hello@denvainternational.com
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify in browser**

Visit http://localhost:3000/b/contact. You should see:
- "Let's work together" heading
- Natural language form: "My name is ___ and I'm reaching out about ___."
- "You can email me at ___."
- Message textarea
- "Send Message →" button
- After submitting: success message with the user's name
- Email address at the bottom as a plain link

- [ ] **Step 5: Commit**

```bash
git add app/b/contact/ components/version-b/ContactFormB.tsx
git commit -m "feat: Version B contact page with natural language form and server action"
```

---

## Task 16: Mobile Responsiveness Pass

**Files:**
- Modify: `app/a/page.tsx`
- Modify: `app/b/page.tsx`
- Modify: `components/version-b/NavB.tsx`

- [ ] **Step 1: Fix Version A homepage on mobile**

The stacked stills are 85vh on all screen sizes — fine. But the brand name font needs to be readable on small screens. Verify that `clamp(2.5rem, 9vw, 7rem)` renders correctly on a 375px screen (should be ~2.5rem = 40px). Open browser DevTools, toggle mobile view at 375px width and check `/a`. No code changes needed if it looks right.

- [ ] **Step 2: Fix Version B homepage grid on mobile**

The staggered grid is side-by-side on all screens. On mobile (<640px) this makes cells too narrow. Update `app/b/page.tsx` — change the rows section to stack vertically on mobile:

Find the `<div key={rowIndex} className="flex gap-3">` and update to:
```tsx
<div key={rowIndex} className="flex flex-col gap-3 sm:flex-row">
```

And remove the percentage widths on mobile by updating both cell `className` props:
```tsx
// Left cell
className={`group relative overflow-hidden w-full sm:${isEven ? "w-[62%]" : "w-[38%]"}`}

// Right cell
className={`group relative overflow-hidden w-full sm:${isEven ? "w-[38%]" : "w-[62%]"}`}
```

- [ ] **Step 3: Fix Version B nav on mobile**

On screens below 640px, the three-column nav is too cramped. Update `components/version-b/NavB.tsx` — hide the left nav links on mobile and show only the logo and contact link:

```tsx
// Replace the return statement with:
return (
  <nav
    className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 ${
      scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
    }`}
  >
    {/* Hide work/about on smallest screens */}
    <div className="hidden gap-8 sm:flex">
      <Link href="/b/work" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
        Work
      </Link>
      <Link href="/b/about" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
        About
      </Link>
    </div>

    <Link href="/b" className="font-bebas text-xl tracking-wider text-white transition-opacity hover:opacity-70">
      [ Denva International ]
    </Link>

    <Link href="/b/contact" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
      Contact
    </Link>
  </nav>
);
```

- [ ] **Step 4: Verify both versions on mobile**

In DevTools, switch to 375px width. Check each page on `/a` and `/b`:
- `/a` — stacked stills should fill the width, title readable
- `/a/work` — columns collapse to 1 column on mobile (CSS columns handles this automatically)
- `/b` — homepage grid stacks vertically
- `/b/work` — 2-column grid collapses to 1 column (`grid-cols-1 sm:grid-cols-2` already handles this)
- `/b/contact` — natural language form inputs wrap correctly

- [ ] **Step 5: Commit**

```bash
git add app/b/page.tsx components/version-b/NavB.tsx
git commit -m "fix: mobile responsiveness for Version B grid and nav"
```

---

## Task 17: Run full test suite and build check

- [ ] **Step 1: Run all unit tests**

```bash
npm test
```
Expected: 12 tests PASS across `projects.test.ts` and `filterProjects.test.ts`.

- [ ] **Step 2: Run TypeScript type check**

```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 3: Run production build**

```bash
npm run build
```
Expected: Build completes successfully. All 10 routes (`/`, `/a`, `/a/work`, `/a/work/[slug]`, `/a/about`, `/a/contact`, `/b`, `/b/work`, `/b/work/[slug]`, `/b/about`, `/b/contact`) listed as static pages. No build errors.

- [ ] **Step 4: Fix any build errors before continuing**

If `npm run build` reports errors, fix them before proceeding to deploy.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: confirm passing tests and clean production build"
```

---

## Task 18: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

Create a new repository on GitHub named `denva-international` (private), then:
```bash
git remote add origin https://github.com/<your-username>/denva-international.git
git push -u origin main
```

- [ ] **Step 2: Deploy via Vercel CLI**

```bash
npx vercel --yes
```
Follow prompts: link to your Vercel account, accept the auto-detected Next.js framework settings.

Expected output includes a preview URL like `https://denva-international-xxxx.vercel.app`.

- [ ] **Step 3: Visit both versions on the live URL**

Open the preview URL. Verify:
- `/` — version selector loads
- `/a` — homepage with stacked stills
- `/b` — homepage with marquee and staggered grid
- Both project detail pages load with YouTube embeds

- [ ] **Step 4: Deploy to production**

```bash
npx vercel --prod
```

Expected: Production URL printed — something like `https://denva-international.vercel.app`.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: production deployment to Vercel"
git push
```

---

## Post-Build: Choosing a Version

Once both versions are live, share the two URLs with the client:
- `<production-url>/a` — Pure Cinema
- `<production-url>/b` — Editorial

When a version is chosen, the other can be deleted and the chosen version's routes promoted to `/` by renaming `app/a/` or `app/b/` to root-level routes.
