import Link from "next/link";

export default function VersionSelector() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 bg-black px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        DenvaInternational — Select Version
      </p>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-16">
        <Link
          href="/a"
          className="font-bebas text-3xl text-white transition-opacity hover:opacity-50"
        >
          A — Pure Cinema
        </Link>
        <span className="text-white/20">|</span>
        <Link
          href="/b"
          className="font-bebas text-3xl text-white transition-opacity hover:opacity-50"
        >
          B — Editorial
        </Link>
      </div>
    </div>
  );
}
