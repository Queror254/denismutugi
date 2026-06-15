import Link from "next/link";

export function NavA() {
  return (
    <nav className="fixed right-0 top-0 z-50 flex gap-8 p-8">
      {[
        { href: "/a/work", label: "Work" },
        { href: "/a/about", label: "About" },
        { href: "/a/contact", label: "Contact" },
      ].map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
