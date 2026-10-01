"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slideImage, slideThumb, slides } from "@/data/slides";

const OPEN_EVENT = "deck:open";

export function openSlide(n: number) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: n }));
}

export default function DeckViewer() {
  const [index, setIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : Math.min(slides.length - 1, Math.max(0, i + delta)))),
    [],
  );

  useEffect(() => {
    const onOpen = (e: Event) => {
      const n = (e as CustomEvent<number>).detail;
      setIndex(Math.max(0, slides.findIndex((s) => s.n === n)));
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, go]);

  useEffect(() => {
    if (index === null) return;
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-i="${index}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  if (index === null) return null;
  const slide = slides[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Slide ${slide.n} of ${slides.length}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0a] text-white animate-fade"
    >
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 px-5 md:px-8">
        <p className="text-sm tabular-nums text-white/60">
          {slide.n} <span className="text-white/30">/</span> {slides.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          className="grid size-10 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-4 md:px-20"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={slide.n}
          src={slideImage(slide.n)}
          alt={`Slide ${slide.n}: ${slide.title}`}
          className="max-h-full w-auto max-w-full rounded-md animate-fade"
        />
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            disabled={d < 0 ? index === 0 : index === slides.length - 1}
            aria-label={d < 0 ? "Previous slide" : "Next slide"}
            className={`absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-0 md:grid ${
              d < 0 ? "left-5" : "right-5"
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
            </svg>
          </button>
        ))}
      </div>

      <div ref={stripRef} className="no-scrollbar flex gap-1.5 overflow-x-auto px-5 pb-4 md:px-8" aria-label="All slides">
        {slides.map((s, i) => (
          <button
            key={s.n}
            type="button"
            data-i={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${s.n}`}
            aria-current={i === index}
            className={`shrink-0 overflow-hidden rounded transition ${
              i === index ? "opacity-100 ring-1 ring-white" : "opacity-35 hover:opacity-80"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slideThumb(s.n)} alt="" loading="lazy" className="h-10 w-auto sm:h-12" />
          </button>
        ))}
      </div>
    </div>
  );
}
