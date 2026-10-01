"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#videos", label: "Videos" },
  { href: "#reels", label: "Reels" },
  { href: "#performance-deck", label: "Performance deck" },
  { href: "#website-deck", label: "Website deck" },
];

export default function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open ? "border-b border-white/10 bg-night/85 backdrop-blur-xl" : ""
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#top" className="text-[15px] font-semibold tracking-tight">
          Guhantara
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/70 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="grid size-10 place-items-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="wrap grid pb-6 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-3 text-2xl font-medium tracking-tight">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
