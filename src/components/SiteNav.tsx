const links = [
  { href: "#films", label: "Films" },
  { href: "#reels", label: "Reels" },
  { href: "#presentation", label: "Presentation" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#top" className="text-[15px] font-semibold tracking-tight">
          Guhantara
        </a>
        <nav className="flex items-center gap-5 text-sm sm:gap-8" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/65 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
