"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chapters, slides, type Block } from "@/data/deck";

const OPEN_EVENT = "deck:open";

export function openSlide(n: number) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: n }));
}

export function OpenSlideButton({
  n,
  className,
  children,
  label,
}: {
  n: number;
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button type="button" className={className} aria-label={label} onClick={() => openSlide(n)}>
      {children}
    </button>
  );
}

function SlideText({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((b, i) =>
        b.type === "table" ? (
          <div key={i} className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-white/20">
                  {b.rows[0].map((h, j) => (
                    <th key={j} scope="col" className="py-2 pr-3 font-medium text-white">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.slice(1).map((r, j) => (
                  <tr key={j} className="border-b border-white/10">
                    {r.map((c, k) => (
                      <td key={k} className="py-2 pr-3 align-top text-white/65">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-white/65">{b.text}</p>
        ),
      )}
    </div>
  );
}

export default function DeckViewer() {
  const [index, setIndex] = useState<number | null>(null);
  const [panel, setPanel] = useState<"notes" | "text" | null>("notes");
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
      else if (e.key.toLowerCase() === "n") setPanel((p) => (p === "notes" ? null : "notes"));
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
  const chapter = chapters.find((c) => c.id === slide.chapter);

  const tab = (id: "notes" | "text", label: string) => (
    <button
      type="button"
      onClick={() => setPanel((p) => (p === id ? null : id))}
      aria-pressed={panel === id}
      className={`rounded-full px-3 py-1 text-sm transition ${
        panel === id ? "bg-white text-night" : "text-white/60 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Slide ${slide.n} of ${slides.length}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0a] text-white animate-fade"
    >
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 px-5 md:px-8">
        <p className="min-w-0 truncate text-sm text-white/60">
          <span className="text-white">{chapter?.title}</span>
          <span className="mx-2 text-white/30">/</span>
          <span className="tabular-nums">
            {slide.n} of {slides.length}
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <div className="mr-2 hidden items-center gap-1 sm:flex">
            {tab("notes", "Notes")}
            {tab("text", "Slide text")}
          </div>
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
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-6 px-5 pb-4 md:px-8 lg:flex-row">
        <div
          className="relative flex min-h-0 flex-1 items-center justify-center"
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
            key={slide.image}
            src={slide.image}
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
              className={`absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-0 md:grid ${
                d < 0 ? "left-2" : "right-2"
              }`}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
              </svg>
            </button>
          ))}
        </div>

        {panel && (
          <aside className="max-h-48 shrink-0 overflow-y-auto border-t border-white/10 pt-4 lg:max-h-none lg:w-[22rem] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-lg font-medium leading-snug tracking-tight">{slide.title}</p>
            <div className="mt-4">
              {panel === "notes" ? (
                slide.notes ? (
                  <p className="leading-relaxed text-white/70">{slide.notes}</p>
                ) : (
                  <p className="text-sm text-white/40">No presenter note on this slide.</p>
                )
              ) : (
                <SlideText blocks={slide.blocks} />
              )}
            </div>
          </aside>
        )}
      </div>

      <div className="flex items-center gap-3 px-5 pb-4 md:px-8">
        <div className="flex gap-1 sm:hidden">
          {tab("notes", "Notes")}
          {tab("text", "Text")}
        </div>
        <div ref={stripRef} className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto" aria-label="All slides">
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
              <img src={s.image.replace("/slides/", "/slides/thumbs/")} alt="" loading="lazy" className="h-10 w-auto sm:h-12" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
