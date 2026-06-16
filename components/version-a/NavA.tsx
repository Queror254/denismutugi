"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavA() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const check = () => setScrolledPastHero(window.scrollY >= window.innerHeight - 64);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isHome]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const atTop = !isHome || scrolledPastHero;

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 flex items-center justify-between px-10 py-5 transition-colors duration-300 md:px-24 lg:px-40 ${
          atTop ? "top-0 bg-black" : "bottom-0 bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-bebas text-3xl tracking-widest text-white transition-opacity hover:opacity-50"
        >
          Denva International
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-40"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex cursor-pointer flex-col gap-[5px] md:hidden"
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
        </button>
      </nav>

      {/* Full-screen mobile menu — fades in/out */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[60] flex flex-col bg-black px-10 py-7 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top row */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-bebas text-3xl tracking-widest text-white"
          >
            Denva International
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="cursor-pointer text-white"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="2" y1="2" x2="20" y2="20" />
              <line x1="20" y1="2" x2="2" y2="20" />
            </svg>
          </button>
        </div>

        {/* Nav links — large Bebas, vertically centred */}
        <div className="flex flex-1 flex-col justify-center gap-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-bebas text-[18vw] leading-none text-white transition-opacity hover:opacity-40"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Footer row */}
        <p className="text-xs uppercase tracking-widest text-white/30">
          © Denva International
        </p>
      </div>
    </>
  );
}
