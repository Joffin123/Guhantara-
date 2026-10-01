"use client";

import { useEffect, useState } from "react";
import { openSlide } from "./DeckViewer";

const links = [
  { href: "#finding", label: "Findings" },
  { href: "#films", label: "Films" },
  { href: "#plan", label: "Plan" },
  { href: "#deck", label: "Deck" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-bg/85 text-fg backdrop-blur-xl" : "text-white"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#top" className="text-[15px] font-semibold tracking-tight">
          Guhantara
          <span className={`ml-2 font-normal ${solid ? "text-muted" : "text-white/60"}`}>Audit 2026</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`transition ${solid ? "text-muted hover:text-fg" : "text-white/75 hover:text-white"}`}>
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => openSlide(1)}
            className={`rounded-full px-4 py-1.5 font-medium transition ${
              solid ? "bg-fg text-bg hover:bg-fg/85" : "bg-white text-night hover:bg-white/85"
            }`}
          >
            Present
          </button>
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
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 text-2xl font-medium tracking-tight">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openSlide(1);
            }}
            className="mt-5 rounded-full bg-fg py-3 font-medium text-bg"
          >
            Present the deck
          </button>
        </nav>
      )}
    </header>
  );
}
