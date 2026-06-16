import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAdjacentProjects, projects } from "@/lib/projects";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { FooterA } from "@/components/version-a/FooterA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getAdjacentProjects(slug, 4);

  return (
    <div className="bg-black">
      {/* Breadcrumb — pt-20 clears the fixed nav */}
      <div className="flex items-center gap-3 px-10 pt-20 md:px-24 lg:px-40">
        <Link
          href="/work"
          className="text-sm uppercase tracking-widest text-white/30 transition-colors hover:text-white"
        >
          ← Work
        </Link>
        <span className="text-white/20">/</span>
        <span className="inline-block border border-white/20 px-2 py-0.5 text-xs uppercase tracking-widest text-white/40">
          {project.category}
        </span>
        <span className="text-xs uppercase tracking-widest text-white/20">{project.year}</span>
      </div>

      {/* Title */}
      <div className="px-10 pt-4 md:px-24 lg:px-40">
        <h1
          className="font-bebas leading-none text-white"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
        >
          {project.title}
        </h1>
      </div>

      {/* Video */}
      <div className="mt-6">
        <YouTubeEmbed videoId={project.youtubeId} title={project.title} />
      </div>

      {/* Role + metadata + description */}
      <div className="grid grid-cols-1 gap-12 px-10 py-16 md:grid-cols-2 md:px-24 lg:px-40 md:py-20">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/30">Role</p>
          <p className="font-bebas text-5xl text-white">{project.role}</p>

          <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
            {[
              { label: "Category", value: project.category },
              { label: "Year", value: String(project.year) },
              { label: "Production", value: "Denva International" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-xs uppercase tracking-widest text-white/30">{label}</span>
                <span className="text-sm capitalize text-white/50">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start">
          <p className="font-sans text-lg leading-relaxed text-white/55">{project.description}</p>
        </div>
      </div>

      {/* Still Images */}
      {project.stills.length > 0 && (
        <div className="px-10 pb-20 md:px-24 lg:px-40">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-white/30">Still Images</p>
          <div className="columns-1 gap-2 sm:columns-2 md:columns-3">
            {project.stills.map((src, i) => {
              const ratio = i % 5 === 1 || i % 5 === 4 ? "4/5" : "16/9";
              return (
                <div
                  key={i}
                  className="relative mb-2 break-inside-avoid overflow-hidden"
                  style={{ aspectRatio: ratio }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Work */}
      {related.length > 0 && (
        <div className="border-t border-white/10 px-10 py-16 md:px-24 lg:px-40">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-white/30">Related Work</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-2 text-sm text-white">{p.title}</p>
                <p className="text-xs text-white/30">{p.year}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <FooterA />
    </div>
  );
}
