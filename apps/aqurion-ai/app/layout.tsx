import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aqurion AI — Intelligence, Illuminated.",
  description:
    "Aqurion AI delivers cutting-edge artificial intelligence solutions across multiple industry verticals. Explore our sectors and discover the future of business technology.",
  keywords: "artificial intelligence, AI solutions, business technology, Aqurion AI, machine learning",
  openGraph: {
    title: "Aqurion AI",
    description: "Intelligence, Illuminated.",
    url: "https://Aqurion.AI",
    siteName: "Aqurion AI",
    type: "website",
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
