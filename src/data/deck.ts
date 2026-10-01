import { slides as performanceSlides } from "./performance-slides";

export type Film = {
  id: string;
  src: string;
  poster: string;
  title: string;
  duration: string;
  orientation: "landscape" | "portrait";
};

export const films: Film[] = [
  { id: "film-1", src: "/media/film-1-landscape.mp4", poster: "/media/film-1-landscape.jpg", title: "Leave the desk", duration: "0:38", orientation: "landscape" },
  { id: "film-2", src: "/media/film-2-landscape.mp4", poster: "/media/film-2-landscape.jpg", title: "Work from the cave", duration: "0:32", orientation: "landscape" },
  { id: "film-3", src: "/media/film-3-landscape.mp4", poster: "/media/film-3-landscape.jpg", title: "The other Bangalore", duration: "0:34", orientation: "landscape" },
  { id: "reel-1", src: "/media/reel-1.mp4", poster: "/media/reel-1.jpg", title: "A hidden world, carved by nature", duration: "0:30", orientation: "portrait" },
  { id: "reel-2", src: "/media/reel-2.mp4", poster: "/media/reel-2.jpg", title: "Where nature meets adventure", duration: "0:25", orientation: "portrait" },
  { id: "reel-3", src: "/media/reel-3.mp4", poster: "/media/reel-3.jpg", title: "Beyond the ordinary", duration: "0:36", orientation: "portrait" },
];

export type DeckFile = { label: string; ext: "pptx" | "pdf"; href: string; size: string };

export type Deck = {
  id: "performance" | "website";
  title: string;
  description: string;
  date: string;
  /** Slide titles for alt text; empty until the slide images are exported. */
  slides: { n: number; title: string }[];
  files: DeckFile[];
  canva?: string;
};

export const decks: Deck[] = [
  {
    id: "performance",
    title: "Performance pitch deck",
    description: "Audit of the brand, website, Meta and Google accounts, with the 90-day plan.",
    date: "September 2026",
    slides: performanceSlides,
    files: [
      { label: "PowerPoint", ext: "pptx", href: "/files/Guhantara-Performance-Audit-SEP26.pptx", size: "446 KB" },
      { label: "PDF", ext: "pdf", href: "/files/Guhantara-Performance-Audit-SEP26.pdf", size: "630 KB" },
    ],
  },
  {
    id: "website",
    title: "Website pitch deck",
    description: "Website proposal for Guhantara.",
    date: "September 2026",
    // Fill in once the Canva design is exported (27 pages).
    slides: [],
    files: [],
    canva: "https://canva.link/cawslnlnh8yp8at",
  },
];

export const deckById = (id: Deck["id"]) => decks.find((d) => d.id === id)!;
export const slideImage = (deck: Deck["id"], n: number) => `/decks/${deck}/slide-${String(n).padStart(2, "0")}.webp`;
export const slideThumb = (deck: Deck["id"], n: number) => `/decks/${deck}/thumbs/slide-${String(n).padStart(2, "0")}.webp`;
