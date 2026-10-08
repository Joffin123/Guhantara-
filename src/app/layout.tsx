import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { asset } from "@/data/deck";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pitch.alttrednexxus.com"),
  title: "Guhantara — Pitch files",
  description: "Videos, reels and pitch decks for Guhantara. Alttred Nexxus, September 2026.",
  openGraph: {
    title: "Guhantara — Pitch files",
    description: "Videos, reels and pitch decks. Alttred Nexxus × Guhantara.",
    images: [asset("/media/film-1-landscape.jpg")],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
