import { OpenSlideButton } from "./DeckViewer";

export function Section({
  id,
  dark = false,
  tint = false,
  children,
}: {
  id?: string;
  dark?: boolean;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 py-24 md:py-36 ${
        dark ? "bg-night text-white" : tint ? "bg-soft" : "bg-bg"
      }`}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Small running label above a section: "02  Meta account". */
export function Eyebrow({ n, children, dark = false }: { n?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-sm ${dark ? "text-white/55" : "text-muted"}`}>
      {n && <span className="tabular-nums">{n}</span>}
      {n && <span aria-hidden className={`h-px w-6 ${dark ? "bg-white/30" : "bg-fg/25"}`} />}
      <span>{children}</span>
    </p>
  );
}

export function Header({
  n,
  label,
  title,
  intro,
  dark = false,
  slides,
}: {
  n?: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  slides?: { from: number; count: number };
}) {
  return (
    <header className="grid gap-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-7">
        <Eyebrow n={n} dark={dark}>
          {label}
        </Eyebrow>
        <h2 className="headline mt-6 text-[clamp(2.1rem,4.6vw,3.75rem)] text-balance">{title}</h2>
      </div>
      {(intro || slides) && (
        <div className="flex flex-col justify-end gap-5 md:col-span-5">
          {intro && (
            <p className={`text-lg leading-relaxed text-pretty ${dark ? "text-white/65" : "text-muted"}`}>{intro}</p>
          )}
          {slides && <SlidesLink from={slides.from} count={slides.count} dark={dark} />}
        </div>
      )}
    </header>
  );
}

export function SlidesLink({ from, count, dark = false }: { from: number; count: number; dark?: boolean }) {
  return (
    <OpenSlideButton
      n={from}
      className={`group inline-flex w-fit items-center gap-2 text-sm font-medium ${dark ? "text-white" : "text-fg"}`}
    >
      <span className={`border-b pb-0.5 transition ${dark ? "border-white/30 group-hover:border-white" : "border-fg/25 group-hover:border-fg"}`}>
        {count === 1 ? "View the slide" : `View the ${count} slides`}
      </span>
      <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
    </OpenSlideButton>
  );
}

/** A row of large figures separated by hairlines. */
export function Figures({
  items,
  dark = false,
  cols = 3,
}: {
  items: { value: string; label: string; note?: string; accent?: boolean }[];
  dark?: boolean;
  cols?: 2 | 3 | 4;
}) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";
  return (
    <dl className={`grid ${grid} border-t ${dark ? "border-white/15" : "border-line"}`}>
      {items.map((it, i) => (
        <div
          key={it.label}
          className={`py-8 sm:pr-8 ${i > 0 ? `border-t sm:border-t-0 sm:border-l sm:pl-8 ${dark ? "border-white/15" : "border-line"}` : ""}`}
        >
          <dt className={`text-sm ${dark ? "text-white/55" : "text-muted"}`}>{it.label}</dt>
          <dd className={`figure mt-4 text-[clamp(2.75rem,5vw,4.25rem)] ${it.accent ? "text-accent" : ""}`}>{it.value}</dd>
          {it.note && <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted"}`}>{it.note}</p>}
        </div>
      ))}
    </dl>
  );
}
