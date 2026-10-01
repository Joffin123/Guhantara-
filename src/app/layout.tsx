import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guhantara — Pitch files",
  description: "Videos, reels and pitch decks for Guhantara. Alttred Nexxus, September 2026.",
  openGraph: {
    title: "Guhantara — Pitch files",
    description: "Videos, reels and pitch decks. Alttred Nexxus × Guhantara.",
    images: ["/media/film-1-landscape.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
