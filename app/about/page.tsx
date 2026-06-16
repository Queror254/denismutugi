import Image from "next/image";
import { FooterA } from "@/components/version-a/FooterA";

const DISCIPLINES = ["Director", "Producer", "Cinematographer", "Editor", "Actor"];

export default function AboutPage() {
  return (
    <div className="bg-black">
      {/* Statement */}
      <div className="border-b border-white/10 px-10 pb-16 pt-32 md:px-24 lg:px-40">
        <p className="max-w-4xl font-sans text-3xl leading-relaxed text-white md:text-4xl">
          Denis Mutugi is a dynamic filmmaker passionate about storytelling.
          His work spans film producing, acting, cinematography, and post-production —
          built for the screen and made to endure.
          Based in Nairobi, Kenya.
        </p>
      </div>

      {/* Disciplines + Portrait */}
      <div className="grid grid-cols-1 gap-12 px-10 py-16 md:grid-cols-2 md:px-24 lg:px-40">
        <div>
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Disciplines</p>
          <ul className="space-y-2">
            {DISCIPLINES.map((role) => (
              <li key={role} className="font-bebas text-5xl text-white">
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[3/4] w-full">
          <Image
            src="https://picsum.photos/seed/denva-portrait/800/1067"
            alt="Denis Mutugi"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <FooterA />
    </div>
  );
}
