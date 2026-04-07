import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aqurion Development — Code That Scales. Products That Win.",
  description:
    "Aqurion Development is a full-service software development firm specializing in web, mobile, and enterprise platforms. We turn ideas into market-ready products.",
  keywords: "software development, web development, mobile apps, enterprise software, Aqurion Dev",
  openGraph: {
    title: "Aqurion Development",
    description: "Code That Scales. Products That Win.",
    url: "https://AqurionDev.com",
    siteName: "Aqurion Development",
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
