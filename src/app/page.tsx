import DeckViewer from "@/components/DeckViewer";
import Decks from "@/components/Decks";
import Films from "@/components/Films";
import SiteNav from "@/components/SiteNav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
          <video
            className="absolute inset-0 -z-20 size-full object-cover"
            src="/media/film-1-landscape.mp4"
            poster="/media/film-1-landscape.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
          <div className="wrap pb-12 pt-32 md:pb-16">
            <p className="text-sm text-white/70">Alttred Nexxus × Guhantara</p>
            <h1 className="display mt-5 text-[clamp(3.5rem,11vw,9rem)]">Pitch files</h1>
            <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-12">
              <p className="text-lg leading-relaxed text-white/80 md:col-span-6 md:text-xl">
                Videos, reels and the pitch decks, all in one place.
              </p>
              <div className="flex flex-wrap items-end gap-3 md:col-span-6 md:justify-end">
                <a href="#videos" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-night transition hover:bg-white/85">
                  Watch the videos
                </a>
                <a href="#performance-deck" className="rounded-full px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/35 transition hover:ring-white">
                  View the decks
                </a>
              </div>
            </div>
          </div>
        </section>
        <Films />
        <Decks />
      </main>
      <footer className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-white/45">
          <p>Guhantara · September 2026</p>
          <p>Alttred Nexxus</p>
        </div>
      </footer>
      <DeckViewer />
    </>
  );
}
