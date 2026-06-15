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
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
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
          className="select-none font-bebas leading-none text-white"
          style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
        >
          Denva International
        </p>
      </div>
    </div>
  );
}
