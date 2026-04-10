import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Aqurion Sales — Intelligent Sales Tools to Close More Deals",
  description: "AI-powered CRM and sales management platform. Unify channels, automate tasks, and provide insights. Integrations with HubSpot, Salesforce, and more.",
  keywords: "CRM, sales tools, AI sales, lead management, Aqurion Sales",
  openGraph: { title: "Aqurion Sales", description: "Intelligent Sales Tools to Close More Deals", url: "https://AqurionSales.com", siteName: "Aqurion Sales", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
