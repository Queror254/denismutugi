import Image from "next/image";

const DISCIPLINES = ["Director", "Filmmaker", "Photographer", "Editor", "Actor"];

export default function AboutPageB() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-4xl border-b border-white/10 px-8 pb-16">
        <p className="font-sans text-3xl leading-relaxed text-white">
          Denva is a director, filmmaker, and photographer.
          His work lives in the space between narrative and image —
          built for the screen and made to endure.
          Based in [City — to be confirmed].
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 px-8 py-16 md:grid-cols-2">
        <div>
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Disciplines</p>
          <ul className="space-y-2">
            {DISCIPLINES.map((role) => (
              <li key={role} className="font-bebas text-4xl text-white">
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[3/4] w-full">
          <Image
            src="https://picsum.photos/seed/denva-portrait/800/1067"
            alt="Denva"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
