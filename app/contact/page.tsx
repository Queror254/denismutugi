import { FooterA } from "@/components/version-a/FooterA";
import { ContactFormA } from "@/components/version-a/ContactFormA";
import { CONTACT } from "@/lib/portfolio";

type Line = { text: string; href?: string };

const CONTACT_DETAILS: { label: string; lines: Line[] }[] = [
  {
    label: "General",
    lines: [
      { text: CONTACT.email, href: `mailto:${CONTACT.email}` },
      { text: CONTACT.phone, href: CONTACT.phoneHref },
    ],
  },
  {
    label: "Bookings",
    lines: [{ text: "bookings@denvainternational.com", href: "mailto:bookings@denvainternational.com" }],
  },
  {
    label: "YouTube",
    lines: [
      { text: CONTACT.youtubeLabel, href: CONTACT.youtubeUrl },
      { text: "Showreel", href: CONTACT.showreelUrl },
    ],
  },
  {
    label: "Based In",
    lines: [{ text: CONTACT.base }],
  },
];

export default function ContactPageA() {
  return (
    <div className="bg-black">
      {/* Header */}
      <div className="px-10 pb-16 pt-32 md:px-24 lg:px-40">
        <h1 className="font-sans text-5xl font-bold leading-tight text-white md:text-6xl">
          Let&apos;s set things in motion
        </h1>
        <p className="mt-4 font-sans text-xl font-semibold text-white/60 md:text-2xl">
          Available for features, series, documentaries and commercial work.
          Fill out the form below and Denis will be in touch.
        </p>
        <p className="mt-3 text-sm italic text-white/40">References available on request.</p>
      </div>

      {/* Form */}
      <div className="px-10 pb-20 md:px-24 lg:px-40">
        <ContactFormA />
      </div>

      {/* Contact details */}
      <div className="border-t border-white/10 px-10 py-16 md:px-24 lg:px-40">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {CONTACT_DETAILS.map(({ label, lines }) => (
            <div key={label}>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/30">{label}</p>
              {lines.map(({ text, href }) =>
                href ? (
                  <a
                    key={text}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block text-sm text-white transition-opacity hover:opacity-60"
                  >
                    {text}
                  </a>
                ) : (
                  <p key={text} className="text-sm text-white/60">
                    {text}
                  </p>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <FooterA />
    </div>
  );
}
