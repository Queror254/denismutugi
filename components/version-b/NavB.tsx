"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function NavB() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="hidden gap-8 sm:flex">
        <Link href="/b/work" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
          Work
        </Link>
        <Link href="/b/about" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
          About
        </Link>
      </div>

      <Link href="/b" className="font-bebas text-xl tracking-wider text-white transition-opacity hover:opacity-70">
        [ Denva International ]
      </Link>

      <Link href="/b/contact" className="text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-40">
        Contact
      </Link>
    </nav>
  );
}
