import { FooterA } from "@/components/version-a/FooterA";
import { ContactFormA } from "@/components/version-a/ContactFormA";

const CONTACT_DETAILS = [
  {
    label: "General",
    lines: ["mutugidenis57@gmail.com", "+254 725 007 31"],
    href: "mailto:mutugidenis57@gmail.com",
  },
  {
    label: "Bookings",
    lines: ["bookings@denvainternational.com"],
    href: "mailto:bookings@denvainternational.com",
  },
  {
    label: "YouTube",
    lines: ["Acting With Deno"],
    href: "https://youtube.com/@actingwithdeno1490",
  },
  {
    label: "Based In",
    lines: ["Nairobi, Kenya"],
    href: null,
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
          Fill out the form below and Denis will be in touch.
        </p>
      </div>

      {/* Form */}
      <div className="px-10 pb-20 md:px-24 lg:px-40">
        <ContactFormA />
      </div>

      {/* Contact details */}
      <div className="border-t border-white/10 px-10 py-16 md:px-24 lg:px-40">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {CONTACT_DETAILS.map(({ label, lines, href }) => (
            <div key={label}>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/30">{label}</p>
              {lines.map((line, i) =>
                i === 0 && href ? (
                  <a
                    key={line}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block text-sm text-white transition-opacity hover:opacity-60"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line} className="text-sm text-white/60">
                    {line}
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
