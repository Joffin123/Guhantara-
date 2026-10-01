import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guhantara — Pitch files",
  description: "Films, reels and the presentation for Guhantara. Alttred Nexxus, September 2026.",
  openGraph: {
    title: "Guhantara — Pitch files",
    description: "Films, reels and the presentation. Alttred Nexxus × Guhantara.",
    images: ["/slides/slide-01.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
