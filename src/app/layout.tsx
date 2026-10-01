import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guhantara — The account, opened up",
  description:
    "A performance audit of Guhantara's brand, website, Meta and Google accounts — and what ₹45.65 lakh actually bought. With the films and reels.",
  openGraph: {
    title: "Guhantara — The account, opened up",
    description: "Performance audit, September 2026. Alttred Nexxus × Guhantara.",
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
