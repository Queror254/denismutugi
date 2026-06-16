import Link from "next/link";

export function FooterA() {
  return (
    <>
      <section className="border-t border-white/10 px-10 py-20 md:px-24 md:py-24 lg:px-40">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-4xl leading-tight text-white md:text-5xl">
              Let&apos;s set things in motion.
            </p>
            <p className="mt-2 font-sans text-4xl leading-tight text-white md:text-5xl">
              <Link
                href="/contact"
                className="underline underline-offset-4 transition-opacity hover:opacity-60"
              >
                Contact Denis
              </Link>
            </p>
          </div>

          <div className="flex gap-20">
            <div className="space-y-4">
              {(["Work", "About", "Contact"] as const).map((l) => (
                <p key={l}>
                  <Link
                    href={`/${l.toLowerCase()}`}
                    className="text-base uppercase tracking-widest text-white/70 transition-opacity hover:opacity-100"
                  >
                    {l}
                  </Link>
                </p>
              ))}
            </div>
            <div className="space-y-4">
              <p>
                <a
                  href="https://youtube.com/@actingwithdeno1490"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base uppercase tracking-widest text-white/70 transition-opacity hover:opacity-100"
                >
                  YouTube
                </a>
              </p>
              <p>
                <a
                  href="mailto:mutugidenis57@gmail.com"
                  className="text-base uppercase tracking-widest text-white/70 transition-opacity hover:opacity-100"
                >
                  Email
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-t border-white/10 px-10 pb-12 pt-10 md:px-24 lg:px-40">
        <p
          className="font-bebas leading-none text-white"
          style={{ fontSize: "clamp(3rem, 14vw, 11rem)" }}
        >
          DENVA INTERNATIONAL
        </p>
      </div>
    </>
  );
}
