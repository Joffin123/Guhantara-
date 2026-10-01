"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { chapters, slides } from "@/data/deck";
import { openSlide } from "./DeckViewer";
import { Eyebrow } from "./ui";

export default function Audit() {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? slides : slides.filter((s) => s.chapter === active);
  const chapter = chapters.find((c) => c.id === active);
  const gridTop = useRef<HTMLDivElement>(null);

  const select = (id: string) => {
    setActive(id);
    // Keep the reader at the top of the gallery when a chapter shortens the page.
    const el = gridTop.current;
    if (el && el.getBoundingClientRect().top < 64) {
      requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    }
  };

  return (
    <section id="deck" className="scroll-mt-16 border-t border-line bg-bg py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Eyebrow>The full deck</Eyebrow>
            <h2 className="headline mt-6 text-[clamp(2.1rem,4.6vw,3.75rem)]">All 73 slides, with notes.</h2>
          </div>
          <div className="flex flex-col justify-end gap-5 md:col-span-5">
            <p className="text-lg leading-relaxed text-muted">
              Open any slide to read it full screen, with the presenter notes and the slide text.
              Use the arrow keys to move through the deck.
            </p>
            <button
              type="button"
              onClick={() => openSlide(1)}
              className="w-fit rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-fg/85"
            >
              Present from the start
            </button>
          </div>
        </div>

        <div ref={gridTop} aria-hidden className="mt-14 scroll-mt-16" />
        <div className="sticky top-16 z-20 -mx-5 border-b border-line bg-bg/90 px-5 backdrop-blur-xl md:mx-0 md:px-0">
          <div role="tablist" aria-label="Chapters" className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {[{ id: "all", title: "All" }, ...chapters].map((c) => {
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => select(c.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm transition ${
                    on ? "bg-fg text-bg" : "text-muted hover:bg-soft hover:text-fg"
                  }`}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
        </div>

        {chapter && (
          <p className="mt-8 max-w-2xl text-muted">
            <span className="font-medium text-fg">{chapter.title}.</span> {chapter.summary}
          </p>
        )}

        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <li key={s.n}>
              <button type="button" onClick={() => openSlide(s.n)} className="group block w-full text-left">
                <span className="block overflow-hidden rounded-lg ring-1 ring-line">
                  <Image
                    src={s.image}
                    alt={`Slide ${s.n}: ${s.title}`}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="mt-3 flex gap-3 text-[15px] leading-snug">
                  <span className="tabular-nums text-muted">{String(s.n).padStart(2, "0")}</span>
                  <span className="transition group-hover:text-accent">{s.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
