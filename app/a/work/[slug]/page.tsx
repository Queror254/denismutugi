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
        <h1 className="mb-2 font-bebas text-6xl leading-none text-white">{project.title}</h1>
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
