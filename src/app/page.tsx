import Audit from "@/components/Audit";
import DeckViewer from "@/components/DeckViewer";
import Films from "@/components/Films";
import SiteNav from "@/components/SiteNav";
import {
  Brand,
  Business,
  Chain,
  Close,
  Finding,
  Footer,
  GoogleHighlights,
  Hero,
  MetaHighlights,
  Plan,
  Website,
  Weekday,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Finding />
        <Business />
        <Films />
        <MetaHighlights />
        <GoogleHighlights />
        <Chain />
        <Website />
        <Brand />
        <Weekday />
        <Plan />
        <Audit />
        <Close />
      </main>
      <Footer />
      <DeckViewer />
    </>
  );
}
