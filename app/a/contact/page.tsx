export default function ContactPageA() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-8 text-center">
      <p className="mb-8 text-xs uppercase tracking-[0.3em] text-white/40">Get in touch</p>

      <a
        href="mailto:hello@denvainternational.com"
        className="font-bebas text-white transition-opacity hover:opacity-50"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        hello@denvainternational.com
      </a>

      <div className="mt-14 flex gap-10">
        {[
          { label: "Instagram", href: "#" },
          { label: "IMDb", href: "#" },
          { label: "LinkedIn", href: "#" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-xs uppercase tracking-widest text-white/30 transition-colors hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
