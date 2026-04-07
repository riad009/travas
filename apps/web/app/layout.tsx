import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aqurion Holdings — Building the Future of Digital Business",
  description:
    "Aqurion Holdings is the parent company driving innovation across technology, finance, marketing, and beyond. We build world-class digital platforms and services.",
  keywords: "Aqurion, digital business, technology, fintech, marketing, development",
  openGraph: {
    title: "Aqurion Holdings",
    description: "Building the Future of Digital Business",
    url: "https://Aqurion.NET",
    siteName: "Aqurion Holdings",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqurion Holdings",
    description: "Building the Future of Digital Business",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
