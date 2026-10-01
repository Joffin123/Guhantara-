import DeckViewer from "@/components/DeckViewer";
import Films from "@/components/Films";
import Presentation from "@/components/Presentation";
import SiteNav from "@/components/SiteNav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <header className="wrap pb-4 pt-20 md:pt-28">
          <p className="text-sm text-white/50">Alttred Nexxus × Guhantara</p>
          <h1 className="display mt-4 text-[clamp(3rem,8vw,6.5rem)]">Pitch files</h1>
          <p className="mt-6 text-lg text-white/60">Films, reels and the presentation, all in one place.</p>
        </header>
        <Films />
        <Presentation />
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
