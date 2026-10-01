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

export const presentation = {
  title: "Performance Audit",
  date: "September 2026",
  slideCount: 73,
  pptx: "/files/Guhantara-Performance-Audit-SEP26.pptx",
  pptxSize: "446 KB",
  canva: "https://canva.link/cawslnlnh8yp8at",
};
