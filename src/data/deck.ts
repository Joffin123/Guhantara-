import content from "./deck-content.json";

export type Block =
  | { type: "text"; text: string }
  | { type: "table"; rows: string[][] };

export type Slide = {
  n: number;
  chapter: string;
  title: string;
  notes: string;
  blocks: Block[];
  image: string;
};

export type Chapter = {
  id: string;
  num: string;
  title: string;
  summary: string;
  from: number;
  to: number;
};

export const chapters = content.chapters as Chapter[];
export const slides = content.slides as Slide[];

export const slidesFor = (chapterId: string) =>
  slides.filter((s) => s.chapter === chapterId);

/**
 * Monthly Meta spend, Jan 2025 – Sep 2026 (slide 13).
 * Exact figures come from the deck's tables; the rest are read off the
 * slide's bar geometry against the stated tallest bar (Mar 2025, ₹1,43,126).
 */
export type MetaMonth = {
  month: string;
  spend: number;
  exact: boolean;
  leads: boolean;
  leadCount?: number;
};

export const metaMonthly: MetaMonth[] = [
  { month: "Jan 2025", spend: 71563, exact: false, leads: false },
  { month: "Feb 2025", spend: 112116, exact: false, leads: false },
  { month: "Mar 2025", spend: 143126, exact: true, leads: false },
  { month: "Apr 2025", spend: 88738, exact: false, leads: false },
  { month: "May 2025", spend: 79611, exact: true, leads: true, leadCount: 285 },
  { month: "Jun 2025", spend: 103527, exact: false, leads: true },
  { month: "Jul 2025", spend: 92713, exact: true, leads: true, leadCount: 1 },
  { month: "Aug 2025", spend: 132630, exact: false, leads: false },
  { month: "Sep 2025", spend: 114830, exact: true, leads: true, leadCount: 51 },
  { month: "Oct 2025", spend: 29102, exact: false, leads: false },
  { month: "Nov 2025", spend: 9065, exact: false, leads: false },
  { month: "Dec 2025", spend: 33379, exact: true, leads: true, leadCount: 130 },
  { month: "Jan 2026", spend: 57163, exact: true, leads: true, leadCount: 242 },
  { month: "Feb 2026", spend: 69178, exact: false, leads: true },
  { month: "Mar 2026", spend: 50094, exact: false, leads: true },
  { month: "Apr 2026", spend: 0, exact: true, leads: false },
  { month: "May 2026", spend: 55819, exact: false, leads: false },
  { month: "Jun 2026", spend: 100188, exact: false, leads: false },
  { month: "Jul 2026", spend: 74037, exact: true, leads: true, leadCount: 29 },
  { month: "Aug 2026", spend: 42461, exact: false, leads: true },
  { month: "Sep 2026", spend: 34883, exact: true, leads: true, leadCount: 50 },
];

export type Film = {
  id: string;
  src: string;
  poster: string;
  title: string;
  caption: string;
  orientation: "landscape" | "portrait";
};

export const films: Film[] = [
  {
    id: "film-1",
    src: "/media/film-1-landscape.mp4",
    poster: "/media/film-1-landscape.jpg",
    title: "Leave the desk",
    caption: "From a stuck afternoon at work to the valley, the pool and a laptop with a view.",
    orientation: "landscape",
  },
  {
    id: "film-2",
    src: "/media/film-2-landscape.mp4",
    poster: "/media/film-2-landscape.jpg",
    title: "Work from the cave",
    caption: "Cave rooms, the dining hall under the dome, the spa, and the city traffic left behind.",
    orientation: "landscape",
  },
  {
    id: "film-3",
    src: "/media/film-3-landscape.mp4",
    poster: "/media/film-3-landscape.jpg",
    title: "The other Bangalore",
    caption: "Office, lake, courtyard pool, and a boat drifting into the rock.",
    orientation: "landscape",
  },
  {
    id: "reel-1",
    src: "/media/reel-1.mp4",
    poster: "/media/reel-1.jpg",
    title: "A hidden world, carved by nature",
    caption: "Thatched cottages, garden paths and the amphitheatre from above.",
    orientation: "portrait",
  },
  {
    id: "reel-2",
    src: "/media/reel-2.mp4",
    poster: "/media/reel-2.jpg",
    title: "Where nature meets adventure",
    caption: "The pool from above, games and the cave mural.",
    orientation: "portrait",
  },
  {
    id: "reel-3",
    src: "/media/reel-3.mp4",
    poster: "/media/reel-3.jpg",
    title: "Beyond the ordinary",
    caption: "The water slide, the cottages, the garden and the dining hall.",
    orientation: "portrait",
  },
];
