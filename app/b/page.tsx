import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { MarqueeB } from "@/components/version-b/MarqueeB";

export default function HomeB() {
  const featured = getFeaturedProjects().slice(0, 6);

  const rows: [typeof featured[number], typeof featured[number] | null][] = [];
  for (let i = 0; i < featured.length; i += 2) {
    rows.push([featured[i], featured[i + 1] ?? null]);
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-20">
        <MarqueeB />
      </div>

      {/* Staggered asymmetric grid */}
      <div className="space-y-3 px-4 py-6">
        {rows.map(([left, right], rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          return (
            <div key={rowIndex} className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/b/work/${left.slug}`}
                className={`group relative overflow-hidden w-full sm:${isEven ? "w-[62%]" : "w-[38%]"}`}
                style={{ aspectRatio: "16/10" }}
              >
                <Image
                  src={left.thumbnail}
                  alt={left.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 62vw"
                />
                <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition-colors duration-300 group-hover:bg-black/30">
                  <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-bebas text-3xl text-white">{left.title}</p>
                    <p className="text-xs uppercase tracking-widest text-white/50">{left.year}</p>
                  </div>
                </div>
              </Link>

              {right && (
                <Link
                  href={`/b/work/${right.slug}`}
                  className={`group relative overflow-hidden w-full sm:${isEven ? "w-[38%]" : "w-[62%]"}`}
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={right.thumbnail}
                    alt={right.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 38vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition-colors duration-300 group-hover:bg-black/30">
                    <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="font-bebas text-3xl text-white">{right.title}</p>
                      <p className="text-xs uppercase tracking-widest text-white/50">{right.year}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <footer className="flex items-center justify-between border-t border-white/10 px-8 py-10">
        <span className="font-bebas text-lg text-white">[ Denva International ]</span>
        <div className="flex gap-6">
          <a href="#" className="text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white">Instagram</a>
          <a href="#" className="text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white">LinkedIn</a>
        </div>
        <span className="text-xs text-white/20">© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
