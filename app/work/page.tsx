import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { CREDITS, SHOWCASE, SHOWCASE_LEAD } from "@/lib/portfolio";
import { FooterA } from "@/components/version-a/FooterA";

export const metadata: Metadata = {
  title: "Work — Denis Mutugi",
  description:
    "Films, series, documentaries and adverts shot and edited by cinematographer Denis Mutugi.",
};

const GUTTER = "px-10 md:px-24 lg:px-40";

export default function WorkPage() {
  return (
    <div className="bg-black">
      <h1 className="sr-only">Work</h1>

      {/* Projects */}
      <div className={`columns-1 gap-3 pb-16 pt-24 sm:columns-2 lg:columns-3 ${GUTTER}`}>
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

      {/* Visual showcase */}
      <section className={`border-t border-white/10 py-20 ${GUTTER}`}>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">Frames</p>
        <h2 className="font-bebas leading-none text-white" style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}>
          Visual Showcase
        </h2>
        <p className="mb-12 mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
          A look at the colour, lighting and framing across productions. Each board is a set of
          frames from a finished project.
        </p>

        <figure className="mb-10">
          <Image
            src={SHOWCASE_LEAD.src}
            alt={`${SHOWCASE_LEAD.title} — ${SHOWCASE_LEAD.caption}`}
            width={SHOWCASE_LEAD.width}
            height={SHOWCASE_LEAD.height}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <figcaption className="mt-3 text-sm text-white">
            {SHOWCASE_LEAD.title}{" "}
            <span className="italic text-white/45">· {SHOWCASE_LEAD.caption}</span>
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2">
          {SHOWCASE.map(({ src, title, caption, width, height }) => (
            <figure key={src}>
              <Image
                src={src}
                alt={`${title} frames — ${caption}`}
                width={width}
                height={height}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <figcaption className="mt-3 text-sm text-white">
                {title} <span className="italic text-white/45">· {caption}</span>
              </figcaption>
            </figure>
          ))}
          <figure>
            <div className="relative aspect-video w-full overflow-hidden bg-white/5">
              <Image
                src="/images/portfolio/lia-poster.jpg"
                alt="LIA feature film poster — We all have a father"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white">
              LIA <span className="italic text-white/45">· Feature film poster</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Credits */}
      <section className={`border-t border-white/10 py-20 ${GUTTER}`}>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">Credits</p>
        <h2
          className="mb-12 font-bebas leading-none text-white"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
        >
          Selected Credits
        </h2>

        <div className="border-t border-white/10">
          {CREDITS.map(({ category, items }) => (
            <div
              key={category}
              className="grid grid-cols-1 gap-6 border-b border-white/10 py-10 md:grid-cols-[12rem_1fr] md:gap-10"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 md:pt-2">{category}</h3>
              <ul className="space-y-8">
                {items.map(({ title, role, year, note }) => (
                  <li key={title}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <p className="font-bebas text-3xl leading-none text-white">{title}</p>
                      <p className="text-sm text-white/50">
                        {role} · {year}
                      </p>
                    </div>
                    <p className="mt-2 max-w-3xl text-base leading-relaxed text-white/65">{note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <FooterA />
    </div>
  );
}
