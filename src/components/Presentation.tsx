"use client";

import Image from "next/image";
import { presentation } from "@/data/deck";
import { slideImage, slides } from "@/data/slides";
import { openSlide } from "./DeckViewer";
import { SectionTitle } from "./Films";

export default function Presentation() {
  return (
    <section id="presentation" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
      <div className="wrap">
        <SectionTitle title="Presentation" meta={`${presentation.slideCount} slides · ${presentation.date}`} />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          <button
            type="button"
            onClick={() => openSlide(1)}
            className="group relative overflow-hidden rounded-xl text-left ring-1 ring-white/10 lg:col-span-8"
            aria-label="View the presentation"
          >
            <Image
              src={slideImage(1)}
              alt="Cover slide: The account, opened up"
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="h-auto w-full transition duration-500 group-hover:scale-[1.015]"
            />
            <span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-night opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              View slides
            </span>
          </button>

          <div className="lg:col-span-4">
            <p className="text-sm text-white/50">Guhantara</p>
            <h3 className="headline mt-2 text-3xl md:text-4xl">{presentation.title}</h3>
            <p className="mt-2 text-white/55">{presentation.date}</p>

            <div className="mt-8 grid gap-3">
              <button
                type="button"
                onClick={() => openSlide(1)}
                className="flex items-center justify-between rounded-full bg-white px-5 py-3 font-medium text-night transition hover:bg-white/85"
              >
                View slides
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
              </button>
              <a
                href={presentation.pptx}
                download
                className="flex items-center justify-between rounded-full px-5 py-3 font-medium ring-1 ring-white/25 transition hover:ring-white"
              >
                <span>
                  Download PowerPoint <span className="ml-1 text-sm font-normal text-white/50">.pptx · {presentation.pptxSize}</span>
                </span>
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" /></svg>
              </a>
              <a
                href={presentation.canva}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-full px-5 py-3 font-medium ring-1 ring-white/25 transition hover:ring-white"
              >
                Open in Canva
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M7 17L17 7M9 7h8v8" /></svg>
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-14 hidden gap-3 sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {slides.map((s) => (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => openSlide(s.n)}
                aria-label={`Open slide ${s.n}`}
                className="group block w-full overflow-hidden rounded-md ring-1 ring-white/10 transition hover:ring-white/50"
              >
                <Image
                  src={slideImage(s.n)}
                  alt=""
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 12vw, (min-width: 768px) 16vw, 33vw"
                  className="h-auto w-full opacity-80 transition group-hover:opacity-100"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
