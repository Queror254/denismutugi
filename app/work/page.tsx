import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { FooterA } from "@/components/version-a/FooterA";

export default function WorkPage() {
  return (
    <div className="bg-black">
      <div className="columns-1 gap-3 px-10 pb-16 pt-24 sm:columns-2 lg:columns-3 md:px-24 lg:px-40">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative mb-3 block overflow-hidden"
          >
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
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
      <FooterA />
    </div>
  );
}
