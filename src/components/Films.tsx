"use client";

import { useRef, useState } from "react";
import { films, type Film } from "@/data/deck";
import { Eyebrow } from "./ui";

function VideoCard({ film, large = false }: { film: Film; large?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const portrait = film.orientation === "portrait";

  const start = () => {
    const v = ref.current;
    if (!v) return;
    // Only one film plays at a time.
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
              className={`grid place-items-center rounded-full bg-white/90 text-night backdrop-blur transition group-hover:scale-105 ${
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
      <figcaption className="mt-4">
        <p className={`font-medium tracking-tight ${large ? "text-xl" : "text-base"}`}>{film.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-white/55">{film.caption}</p>
      </figcaption>
    </figure>
  );
}

export default function Films() {
  const landscape = films.filter((f) => f.orientation === "landscape");
  const reels = films.filter((f) => f.orientation === "portrait");
  const [first, ...rest] = landscape;

  return (
    <section id="films" className="scroll-mt-16 bg-night py-24 text-white md:py-36">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Eyebrow dark>The films</Eyebrow>
            <h2 className="headline mt-6 text-[clamp(2.1rem,4.6vw,3.75rem)] text-balance">
              Six films. One place nobody else can shoot.
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-white/65 md:col-span-5">
            Three widescreen films follow the weekday buyer — someone stuck at a desk on a Tuesday who
            could be working from a cave. Three vertical reels are cut for Instagram, where the
            cheapest leads already come from.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VideoCard film={first} large />
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((f) => (
              <VideoCard key={f.id} film={f} />
            ))}
          </div>
        </div>

        <div className="mt-28 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-8">
          <p className="text-xl font-medium tracking-tight">Reels · 9:16</p>
          <p className="max-w-md text-sm leading-relaxed text-white/55">
            Instagram leads cost ₹929 against Facebook&apos;s ₹2,064, and 30–60 seconds reaches best.
            Every reel sits inside that window.
          </p>
        </div>
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
          {reels.map((f) => (
            <div key={f.id} className="w-[72vw] shrink-0 snap-center md:w-auto">
              <VideoCard film={f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
