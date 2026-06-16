export type Category = "film" | "documentary" | "acting";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  youtubeId: string;
  thumbnail: string;
  role: string;
  stills: string[];
  description: string;
  year: number;
  featured: boolean;
};

// Thumbnails and stills use picsum.photos seeds as placeholders.
// Replace with real image paths before launch.
// YouTube IDs are placeholders — swap in real trailer IDs before launch.
export const projects: Project[] = [
  {
    slug: "lia",
    title: "Lia",
    category: "film",
    youtubeId: "bvUICmxUfIo",
    thumbnail: "https://picsum.photos/seed/lia-film/1920/1080",
    role: "Actor / Producer",
    stills: [
      "https://picsum.photos/seed/lia-s1/1280/720",
      "https://picsum.photos/seed/lia-s2/800/1067",
      "https://picsum.photos/seed/lia-s3/1280/720",
      "https://picsum.photos/seed/lia-s4/1280/720",
      "https://picsum.photos/seed/lia-s5/800/1067",
      "https://picsum.photos/seed/lia-s6/1280/720",
      "https://picsum.photos/seed/lia-s7/1280/720",
      "https://picsum.photos/seed/lia-s8/1280/720",
    ],
    description:
      "Denva International presents Lia — a drama about faith, fatherhood, and the ties that bind. Starring Denis Mutugi alongside Alfred Munyua, Kierian Popo, Maureen Koech, and Edith Ithong'o.",
    year: 2023,
    featured: true,
  },
  {
    slug: "nawiri",
    title: "Nawiri",
    category: "film",
    youtubeId: "YqNYrYUiMfg",
    thumbnail: "https://picsum.photos/seed/nawiri-film/1920/1080",
    role: "Director / Producer",
    stills: [
      "https://picsum.photos/seed/nawiri-s1/1280/720",
      "https://picsum.photos/seed/nawiri-s2/1280/720",
      "https://picsum.photos/seed/nawiri-s3/800/1067",
      "https://picsum.photos/seed/nawiri-s4/1280/720",
      "https://picsum.photos/seed/nawiri-s5/1280/720",
      "https://picsum.photos/seed/nawiri-s6/800/1067",
    ],
    description:
      "A 2023 Denva International production. Nawiri follows the journey of a young man navigating ambition, family, and the cost of growth.",
    year: 2023,
    featured: true,
  },
  {
    slug: "miliki",
    title: "Miliki",
    category: "film",
    youtubeId: "n9xhJrPXop4",
    thumbnail: "https://picsum.photos/seed/miliki-film/1920/1080",
    role: "Director / Editor",
    stills: [
      "https://picsum.photos/seed/miliki-s1/1280/720",
      "https://picsum.photos/seed/miliki-s2/800/1067",
      "https://picsum.photos/seed/miliki-s3/1280/720",
      "https://picsum.photos/seed/miliki-s4/1280/720",
      "https://picsum.photos/seed/miliki-s5/1280/720",
      "https://picsum.photos/seed/miliki-s6/800/1067",
      "https://picsum.photos/seed/miliki-s7/1280/720",
    ],
    description:
      "A story of ownership, belonging, and what we are willing to fight for. Miliki is a 2022 drama produced and edited by Denis Mutugi.",
    year: 2022,
    featured: true,
  },
  {
    slug: "nada",
    title: "Nada",
    category: "film",
    youtubeId: "5xH0HfJHsaY",
    thumbnail: "https://picsum.photos/seed/nada-film/1920/1080",
    role: "Director",
    stills: [
      "https://picsum.photos/seed/nada-s1/1280/720",
      "https://picsum.photos/seed/nada-s2/1280/720",
      "https://picsum.photos/seed/nada-s3/800/1067",
      "https://picsum.photos/seed/nada-s4/1280/720",
      "https://picsum.photos/seed/nada-s5/1280/720",
    ],
    description:
      "Nada explores human connection, silence, and the weight of what remains unsaid. A 2022 short film by Denva International.",
    year: 2022,
    featured: false,
  },
  {
    slug: "baba-yao",
    title: "Baba Yao",
    category: "acting",
    youtubeId: "hEJnMQG9ev8",
    thumbnail: "https://picsum.photos/seed/baba-yao/1920/1080",
    role: "Set Runner / Actor",
    stills: [
      "https://picsum.photos/seed/baba-s1/1280/720",
      "https://picsum.photos/seed/baba-s2/1280/720",
      "https://picsum.photos/seed/baba-s3/800/1067",
      "https://picsum.photos/seed/baba-s4/1280/720",
      "https://picsum.photos/seed/baba-s5/1280/720",
    ],
    description:
      "Denis worked on the KTN series Baba Yao, produced by Africa Motion Pictures — an early on-set role that sharpened his understanding of professional production.",
    year: 2019,
    featured: true,
  },
  {
    slug: "mama-yangu",
    title: "Mama Yangu",
    category: "acting",
    youtubeId: "QRfj1VCg16E",
    thumbnail: "https://picsum.photos/seed/mama-yangu/1920/1080",
    role: "Editor / Script Writer / Actor",
    stills: [
      "https://picsum.photos/seed/mama-s1/1280/720",
      "https://picsum.photos/seed/mama-s2/800/1067",
      "https://picsum.photos/seed/mama-s3/1280/720",
      "https://picsum.photos/seed/mama-s4/1280/720",
      "https://picsum.photos/seed/mama-s5/800/1067",
      "https://picsum.photos/seed/mama-s6/1280/720",
    ],
    description:
      "Denis served as Editor, Script Writer, and Actor on Mama Yangu at Seven Seasons Production, aired on Mwangaza TV.",
    year: 2022,
    featured: false,
  },
  {
    slug: "zawadi-mashinani",
    title: "Zawadi Mashinani",
    category: "documentary",
    youtubeId: "0pdqf4P9MB8",
    thumbnail: "https://picsum.photos/seed/zawadi-mashinani/1920/1080",
    role: "Director / Cinematographer",
    stills: [
      "https://picsum.photos/seed/zawadi-s1/1280/720",
      "https://picsum.photos/seed/zawadi-s2/1280/720",
      "https://picsum.photos/seed/zawadi-s3/800/1067",
      "https://picsum.photos/seed/zawadi-s4/1280/720",
      "https://picsum.photos/seed/zawadi-s5/1280/720",
    ],
    description:
      "A documentary shining a light on grassroots talent and community-driven achievement across Kenya.",
    year: 2022,
    featured: true,
  },
  {
    slug: "magarini-childrens-home",
    title: "Magarini Children's Home",
    category: "documentary",
    youtubeId: "9NJj12tJzqc",
    thumbnail: "https://picsum.photos/seed/magarini-home/1920/1080",
    role: "Director / Cinematographer",
    stills: [
      "https://picsum.photos/seed/magarini-s1/1280/720",
      "https://picsum.photos/seed/magarini-s2/1280/720",
      "https://picsum.photos/seed/magarini-s3/800/1067",
      "https://picsum.photos/seed/magarini-s4/1280/720",
      "https://picsum.photos/seed/magarini-s5/1280/720",
    ],
    description:
      "A short documentary capturing life at the Magarini Children's Home — the resilience, the hope, and the community that sustains it.",
    year: 2021,
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
