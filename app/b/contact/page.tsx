import { ContactFormB } from "@/components/version-b/ContactFormB";

export default function ContactPageB() {
  return (
    <div className="min-h-screen bg-black px-8 pb-24 pt-32">
      <h1 className="mb-3 font-sans text-4xl font-light text-white">
        Let&apos;s work together
      </h1>
      <p className="mb-16 text-sm text-white/40">
        Fill out the form and Denva will be in touch.
      </p>

      <ContactFormB />

      <div className="mt-16 border-t border-white/10 pt-8">
        <a
          href="mailto:hello@denvainternational.com"
          className="text-sm text-white/40 transition-colors hover:text-white"
        >
          hello@denvainternational.com
        </a>
      </div>
    </div>
  );
}
