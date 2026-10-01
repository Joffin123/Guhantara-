"use client";

import Image from "next/image";
import { decks, slideImage, type Deck } from "@/data/deck";
import { openSlide } from "./DeckViewer";
import { SectionTitle } from "./Films";

const Arrow = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d={d} />
  </svg>
);

function DeckSection({ deck }: { deck: Deck }) {
  const hasSlides = deck.slides.length > 0;

  return (
    <section id={`${deck.id}-deck`} className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
      <div className="wrap">
        <SectionTitle
          title={deck.title}
          meta={hasSlides ? `${deck.slides.length} slides · ${deck.date}` : deck.date}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          {hasSlides ? (
            <button
              type="button"
              onClick={() => openSlide(deck.id, 1)}
              className="group relative overflow-hidden rounded-xl text-left ring-1 ring-white/10 lg:col-span-8"
              aria-label={`View the ${deck.title}`}
            >
              <Image
                src={slideImage(deck.id, 1)}
                alt={`Cover of the ${deck.title}`}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="h-auto w-full transition duration-500 group-hover:scale-[1.015]"
              />
              <span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-night opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                View slides
              </span>
            </button>
          ) : (
            <a
              href={deck.canva}
              target="_blank"
              rel="noreferrer"
              className="group grid aspect-video place-items-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition hover:ring-white/30 lg:col-span-8"
            >
              <span className="text-center">
                <span className="headline block text-4xl md:text-6xl">{deck.title.replace(" pitch deck", "")} proposal.</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white">
                  View in Canva <Arrow d="M7 17L17 7M9 7h8v8" />
                </span>
              </span>
            </a>
          )}

          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-white/70">{deck.description}</p>
            <p className="mt-2 text-sm text-white/45">Prepared by Alttred Nexxus · {deck.date}</p>

            <div className="mt-8 grid gap-3">
              {hasSlides && (
                <button
                  type="button"
                  onClick={() => openSlide(deck.id, 1)}
                  className="flex items-center justify-between rounded-full bg-white px-5 py-3 font-medium text-night transition hover:bg-white/85"
                >
                  View slides
                  <Arrow d="M9 6l6 6-6 6" />
                </button>
              )}
              {deck.files.map((f) => (
                <a
                  key={f.href}
                  href={f.href}
                  download
                  className="flex items-center justify-between rounded-full px-5 py-3 font-medium ring-1 ring-white/25 transition hover:ring-white"
                >
                  <span>
                    Download {f.label}
                    <span className="ml-2 text-sm font-normal text-white/50">
                      .{f.ext} · {f.size}
                    </span>
                  </span>
                  <Arrow d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
                </a>
              ))}
              {deck.canva && (
                <a
                  href={deck.canva}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between rounded-full px-5 py-3 font-medium transition ${
                    hasSlides ? "ring-1 ring-white/25 hover:ring-white" : "bg-white text-night hover:bg-white/85"
                  }`}
                >
                  Open in Canva
                  <Arrow d="M7 17L17 7M9 7h8v8" />
                </a>
              )}
            </div>
          </div>
        </div>

        {hasSlides && (
          <ul className="mt-14 hidden gap-3 sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {deck.slides.map((s) => (
              <li key={s.n}>
                <button
                  type="button"
                  onClick={() => openSlide(deck.id, s.n)}
                  aria-label={`Open slide ${s.n}`}
                  className="group block w-full overflow-hidden rounded-md ring-1 ring-white/10 transition hover:ring-white/50"
                >
                  <Image
                    src={slideImage(deck.id, s.n)}
                    alt=""
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 12vw, (min-width: 768px) 16vw, 25vw"
                    className="h-auto w-full opacity-80 transition group-hover:opacity-100"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function Decks() {
  return (
    <>
      {decks.map((d) => (
        <DeckSection key={d.id} deck={d} />
      ))}
    </>
  );
}
