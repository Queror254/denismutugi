import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkPageA() {
  return (
    <div className="min-h-screen bg-black px-4 pb-12 pt-24">
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/a/work/${project.slug}`}
            className="group relative mb-3 block overflow-hidden"
          >
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
