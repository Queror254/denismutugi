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
        <h1 className="mb-2 font-bebas text-6xl leading-none text-white">{project.title}</h1>
        <p className="mb-8 text-xs uppercase tracking-widest text-white/40">
          {project.category} — {project.year}
        </p>
        <p className="max-w-prose text-lg leading-relaxed text-white/75">{project.description}</p>
      </div>

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
