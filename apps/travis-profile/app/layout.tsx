import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Travis Roque Soto — Entrepreneur & Visionary",
  description: "Founder & CEO of Aqurion Holdings. Building the future of AI-powered business technology across multiple industry verticals.",
  keywords: "Travis Roque Soto, entrepreneur, Aqurion, CEO, technology leader",
  openGraph: { title: "Travis Roque Soto", description: "Entrepreneur & Visionary", url: "https://TravisRoqueSoto.ME", siteName: "Travis Roque Soto", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
