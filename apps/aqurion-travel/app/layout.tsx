import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Aqurion Travel — Members-Only Travel. AI Price Intelligence.",
  description: "Private booking platform for members of the Aqurion ecosystem. Below-market rates on flights, hotels, and rental cars with real-time price comparison and AI price prediction.",
  keywords: "travel, flights, hotels, car rental, AI price prediction, members only, wholesale travel rates, Aqurion Travel",
  openGraph: { title: "Aqurion Travel", description: "Members-Only Travel. AI Price Intelligence. Powered by Duffel & Oracle Merchant Services.", url: "https://AqurionTravel.com", siteName: "Aqurion Travel", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
