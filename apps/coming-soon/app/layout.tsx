import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aqurion — Coming Soon",
  description: "An Aqurion Holdings Company. Coming Soon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Dev-only floating nav to switch between brands */}
        {process.env.NODE_ENV === "development" && (
          <a
            href="/brands"
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              zIndex: 999,
              padding: "0.6rem 1.1rem",
              background: "rgba(10,10,20,0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontSize: "0.78rem",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
            }}
          >
            ◈ All Brands →
          </a>
        )}
      </body>
    </html>
  );
}
