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
      <div className="mb-10 flex gap-8">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`text-xs uppercase tracking-widest transition-colors ${
              active === f.value ? "text-white" : "text-white/30 hover:text-white/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

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
