import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Aqurion Sudamérica — Inteligencia, Iluminada.",
  description: "Aqurion Sudamérica ofrece soluciones de inteligencia artificial de vanguardia en múltiples sectores industriales en América Latina.",
  keywords: "inteligencia artificial, tecnología, América Latina, Aqurion SA, soluciones empresariales",
  openGraph: { title: "Aqurion Sudamérica", description: "Inteligencia, Iluminada.", url: "https://AqurionSA.LAT", siteName: "Aqurion Sudamérica", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="es"><body>{children}</body></html>);
}
