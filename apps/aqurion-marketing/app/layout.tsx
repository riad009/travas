import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Aqurion Marketing — Data-Driven Marketing Built for Modern Businesses",
  description: "We build bold brands, powerful campaigns, and digital experiences that drive real results. SEO, social media, branding, and more.",
  keywords: "marketing agency, digital marketing, branding, social media, SEO, Aqurion Marketing",
  openGraph: { title: "Aqurion Marketing", description: "Data-Driven Marketing Built for Modern Businesses", url: "https://AqurionMarketing.com", siteName: "Aqurion Marketing", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
