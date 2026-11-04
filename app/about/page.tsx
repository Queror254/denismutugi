import type { Metadata } from "next";
import Image from "next/image";
import { FooterA } from "@/components/version-a/FooterA";
import {
  APPROACH,
  CAMERAS,
  FORMATS,
  MISSION,
  ON_SET,
  PROFILE,
  SKILLS,
  STATS,
  SUPPORT_GEAR,
  TAGLINE,
  TIMELINE,
  TITLE,
  VISION,
} from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "About — Denis Mutugi",
  description:
    "Denis Mutugi is a Nairobi-based cinematographer and editor with seven years behind the lens.",
};

const GUTTER = "px-10 md:px-24 lg:px-40";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">{eyebrow}</p>
      <h2 className="font-bebas leading-none text-white" style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}>
        {title}
      </h2>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-black">
      {/* Header */}
      <header className={`border-b border-white/10 pb-16 pt-32 ${GUTTER}`}>
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
          Denva International Films · Nairobi, Kenya
        </p>
        <h1 className="font-bebas leading-[0.9] text-white" style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}>
          Denis Mutugi
        </h1>
        <p className="mt-4 font-bebas text-3xl tracking-wide text-white/80 md:text-4xl">{TITLE}</p>
        <p className="mt-6 max-w-2xl text-base italic text-white/55">{TAGLINE}</p>
        <p className="mt-2 max-w-2xl text-sm text-white/40">{FORMATS}</p>
      </header>

      {/* Profile + portrait */}
      <section className={`grid grid-cols-1 gap-12 py-20 md:grid-cols-[3fr_2fr] ${GUTTER}`}>
        <div>
          <SectionHeading eyebrow="Profile" title="The Cinematographer" />
          <div className="space-y-6">
            {PROFILE.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-white/70">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[2/3] w-full self-start overflow-hidden">
          <Image
            src="/images/portfolio/portrait.jpg"
            alt="Denis Mutugi holding a camera on a gimbal"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
        </div>
      </section>

      {/* Stats */}
      <section className={`border-y border-white/10 py-14 ${GUTTER}`}>
        <dl className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{label}</dt>
              <dd className="font-bebas text-6xl leading-none text-white md:text-7xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Vision / Mission */}
      <section className={`grid grid-cols-1 gap-12 py-20 md:grid-cols-2 ${GUTTER}`}>
        {[
          { label: "Vision", text: VISION },
          { label: "Mission", text: MISSION },
        ].map(({ label, text }) => (
          <div key={label} className="border-l border-white/20 pl-6">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">{label}</p>
            <p className="text-2xl italic leading-snug text-white md:text-3xl">{text}</p>
          </div>
        ))}
      </section>

      {/* Camera experience */}
      <section className={`border-t border-white/10 py-20 ${GUTTER}`}>
        <SectionHeading eyebrow="Technical Craft" title="Camera Experience" />
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/60">
          Proficient across a range of camera systems, from lightweight mirrorless bodies for
          run-and-gun work to cinema cameras for scripted and commercial productions.
        </p>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {CAMERAS.map(({ name, kind, use }) => (
            <div key={name} className="grid grid-cols-1 gap-1 py-5 md:grid-cols-[1.2fr_1fr_2fr] md:gap-6">
              <p className="font-bebas text-3xl leading-none text-white">{name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 md:pt-2">{kind}</p>
              <p className="text-base text-white/65 md:pt-1">{use}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_3fr] md:items-center">
          <figure>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/images/portfolio/arri-night-exterior.jpg"
                alt="ARRI cinema camera rigged for a night exterior shoot"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <figcaption className="mt-3 text-sm text-white">
              ARRI cinema camera <span className="italic text-white/45">· Night exterior shoot</span>
            </figcaption>
          </figure>
          <div>
            <h3 className="mb-8 font-bebas text-4xl text-white">Shooting approach</h3>
            <ul className="space-y-5">
              {APPROACH.map((item) => (
                <li key={item} className="flex gap-4 text-lg leading-snug text-white/70">
                  <span aria-hidden className="mt-3 h-px w-6 flex-shrink-0 bg-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* On set */}
      <section className={`border-t border-white/10 py-20 ${GUTTER}`}>
        <SectionHeading eyebrow="Behind the Lens" title="On Set" />
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/60">
          Working across interviews, studio setups, night interiors, live events and run-and-gun
          locations.
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4">
          {ON_SET.map(({ src, title, caption }) => (
            <figure key={src} className="group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={src}
                  alt={`${title} — ${caption}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <figcaption className="mt-3">
                <span className="block text-sm text-white">{title}</span>
                <span className="block text-xs italic text-white/45">{caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 border border-white/15 p-6 md:p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">Support Gear</p>
          <p className="text-base leading-relaxed text-white/70">{SUPPORT_GEAR}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className={`border-t border-white/10 py-20 ${GUTTER}`}>
        <SectionHeading eyebrow="Experience" title="Career Timeline" />
        <ol className="border-t border-white/10">
          {TIMELINE.map(({ years, role, org, points }) => (
            <li
              key={years}
              className="grid grid-cols-1 gap-3 border-b border-white/10 py-8 md:grid-cols-[10rem_1fr] md:gap-10"
            >
              <p className="font-bebas text-4xl leading-none text-white/50">{years}</p>
              <div>
                <h3 className="font-bebas text-3xl leading-none text-white">{role}</h3>
                <p className="mt-2 text-sm italic text-white/45">{org}</p>
                <ul className="mt-4 space-y-2">
                  {points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-base text-white/70">
                      <span aria-hidden className="text-white/30">—</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className={`border-t border-white/10 py-20 ${GUTTER}`}>
        <SectionHeading eyebrow="Toolkit" title="Skills & Software" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {SKILLS.map(({ group, items }) => (
            <div key={group}>
              <h3 className="mb-5 border-b border-white/15 pb-3 text-xs uppercase tracking-[0.3em] text-white/50">
                {group}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="text-lg text-white/80">
                    {item}
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
