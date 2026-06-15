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
