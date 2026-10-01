"use client";

import { useRef, useState } from "react";
import { films, type Film } from "@/data/deck";

function VideoCard({ film, index, large = false }: { film: Film; index: number; large?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const portrait = film.orientation === "portrait";

  const start = () => {
    const v = ref.current;
    if (!v) return;
    // Only one video plays at a time.
    document.querySelectorAll<HTMLVideoElement>("video[data-film]").forEach((other) => {
      if (other !== v) other.pause();
    });
    v.controls = true;
    void v.play();
  };

  return (
    <figure>
      <div className={`group relative overflow-hidden rounded-xl bg-white/5 ${portrait ? "aspect-[9/16]" : "aspect-video"}`}>
        <video
          ref={ref}
          data-film
          src={film.src}
          poster={film.poster}
          preload="none"
          playsInline
          className="absolute inset-0 size-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play ${film.title}`}
            className="absolute inset-0 grid place-items-center bg-black/10 transition hover:bg-black/25"
          >
            <span
              className={`grid place-items-center rounded-full bg-white/90 text-night transition group-hover:scale-105 ${
                large ? "size-20" : "size-14"
              }`}
            >
              <svg viewBox="0 0 24 24" className={`ml-0.5 ${large ? "size-6" : "size-5"}`} fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <span className={`font-medium tracking-tight ${large ? "text-lg" : ""}`}>
          <span className="mr-3 tabular-nums text-white/40">{String(index).padStart(2, "0")}</span>
          {film.title}
        </span>
        <span className="shrink-0 text-sm tabular-nums text-white/45">
          {portrait ? "9:16" : "16:9"} · {film.duration}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Films() {
  const landscape = films.filter((f) => f.orientation === "landscape");
  const reels = films.filter((f) => f.orientation === "portrait");
  const [first, ...rest] = landscape;

  return (
    <>
      <section id="films" className="scroll-mt-16 py-20 md:py-28">
        <div className="wrap">
          <SectionTitle title="Films" meta={`${landscape.length} videos · 16:9`} />
          <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <VideoCard film={first} index={1} large />
            </div>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
              {rest.map((f, i) => (
                <VideoCard key={f.id} film={f} index={i + 2} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reels" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
        <div className="wrap">
          <SectionTitle title="Reels" meta={`${reels.length} videos · 9:16`} />
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
            {reels.map((f, i) => (
              <div key={f.id} className="w-[72vw] shrink-0 snap-center md:w-auto">
                <VideoCard film={f} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function SectionTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 className="headline text-4xl md:text-5xl">{title}</h2>
      {meta && <p className="text-sm text-white/50">{meta}</p>}
    </div>
  );
}
