import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { FooterA } from "@/components/version-a/FooterA";
import { HeroVideoA } from "@/components/version-a/HeroVideoA";

const MARQUEE: Array<{ type: "text"; label: string } | { type: "image"; seed: string }> = [
  { type: "text", label: "DIRECTOR" },
  { type: "image", seed: "mq-lia" },
  { type: "text", label: "FILMMAKER" },
  { type: "image", seed: "mq-nawiri" },
  { type: "text", label: "CINEMATOGRAPHER" },
  { type: "image", seed: "mq-miliki" },
  { type: "text", label: "ACTOR" },
  { type: "image", seed: "mq-baba" },
  { type: "text", label: "EDITOR" },
  { type: "image", seed: "mq-zawadi" },
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <div className="bg-black">
      {/* Full-screen hero — autoplaying background video */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Oversized wrapper keeps the 16:9 video filling the viewport at any aspect ratio */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "177.78vh",
            height: "100vh",
            minWidth: "100%",
            minHeight: "56.25vw",
          }}
        >
          <HeroVideoA videoId="bvUICmxUfIo" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </section>

      {/* Statement */}
      <section className="px-10 py-16 md:px-24 md:py-20 lg:px-40">
        <p className="max-w-4xl font-sans text-3xl font-bold leading-snug text-white md:text-4xl lg:text-5xl">
          A dynamic filmmaker passionate about storytelling. Actor, producer,
          cinematographer, and editor. Based in Nairobi, Kenya.
        </p>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/10 py-3">
        <div className="flex animate-marquee items-center whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) =>
            item.type === "text" ? (
              <span key={i} className="mx-10 font-bebas text-3xl tracking-wider text-white">
                {item.label}
              </span>
            ) : (
              <div
                key={i}
                className="mx-2 inline-block h-14 w-24 flex-shrink-0 overflow-hidden align-middle"
              >
                <Image
                  src={`https://picsum.photos/seed/${item.seed}/192/112`}
                  alt=""
                  width={96}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Selected Work */}
      <section className="px-10 py-20 md:px-24 lg:px-40">
        <p className="mb-14 text-sm uppercase tracking-[0.3em] text-white/40">Selected Work</p>

        <div>
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block border-t border-white/10 py-14"
            >
              <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
                {/* Left: title + description + tag */}
                <div className="sm:w-[38%] sm:pt-1">
                  <h2
                    className="mb-6 font-bebas leading-none text-white"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                  >
                    {project.title}
                  </h2>
                  <p className="mb-6 text-base leading-relaxed text-white/75">
                    {project.description}
                  </p>
                  <span className="inline-block border border-white/30 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
                    {project.category}
                  </span>
                </div>

                {/* Right: image */}
                <div
                  className="relative w-full overflow-hidden sm:w-[62%]"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 62vw"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/work"
          className="mt-4 flex w-full items-center justify-center border border-white/20 py-5 text-sm uppercase tracking-widest text-white/50 transition-colors hover:border-white/60 hover:text-white"
        >
          View All Work
        </Link>
      </section>

      <FooterA />
    </div>
  );
}
