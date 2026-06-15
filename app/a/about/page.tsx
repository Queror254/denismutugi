import Image from "next/image";

export default function AboutPageA() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[60vh] w-full">
        <Image
          src="https://picsum.photos/seed/denva-portrait/1200/800"
          alt="Denva"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      <div className="max-w-3xl px-8 py-16">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-white/40">
          Director / Filmmaker / Photographer / Editor / Actor
        </p>
        <p className="font-sans text-2xl leading-relaxed text-white">
          Denva is a multi-disciplinary creative working across film, photography, and performance.
          His work explores identity, tension, and the unsaid — crafted for the screen and built to last.
          Based in [City — to be confirmed].
        </p>
      </div>
    </div>
  );
}
