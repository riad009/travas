"use client";
import Link from "next/link";
import { AQURION_BRANDS, getBrandsByTier } from "@repo/ui/brand-config";
import React from "react";

const tier1 = getBrandsByTier(1);
const tier2 = getBrandsByTier(2);
const tier3 = getBrandsByTier(3);

function BrandCard({ brand }: { brand: (typeof AQURION_BRANDS)[0] }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link
      href={`/preview?brand=${brand.id}`}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1.25rem",
        borderRadius: "16px",
        background: hovered ? brand.accentColor + "12" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? brand.accentColor + "50" : "rgba(255,255,255,0.08)"}`,
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: brand.accentColor + "20",
          border: `1px solid ${brand.accentColor}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          flexShrink: 0,
          color: brand.accentColor,
        }}
      >
        {brand.logoUrl ? (
          <img src={brand.logoUrl} alt="" style={{ width: 24, height: 24, borderRadius: 6, objectFit: "contain" }} />
        ) : (
          <span style={{ fontSize: "1.2rem" }}>{brand.icon}</span>
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "0.2rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            fontSize: "0.72rem",
            color: brand.accentColor,
            fontWeight: 600,
            marginBottom: "0.25rem",
            letterSpacing: "0.02em",
          }}
        >
          {brand.domain}
          {brand.altDomains ? ` · ${brand.altDomains.join(" · ")}` : ""}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.5,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {brand.tagline}
        </div>
      </div>
    </Link>
  );
}

function TierSection({
  title,
  subtitle,
  brands,
  accentColor,
}: {
  title: string;
  subtitle: string;
  brands: typeof AQURION_BRANDS;
  accentColor: string;
}) {
  return (
    <section style={{ marginBottom: "3.5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: accentColor,
            marginBottom: "0.35rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 18,
              height: 2,
              background: accentColor,
              borderRadius: 1,
            }}
          />
          {title}
          <span
            style={{
              padding: "0.1rem 0.6rem",
              borderRadius: "50px",
              background: accentColor + "18",
              border: `1px solid ${accentColor}35`,
              fontSize: "0.65rem",
              color: accentColor,
            }}
          >
            {brands.length}
          </span>
        </div>
        <p
          style={{
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.35)",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {brands.map((b) => (
          <BrandCard key={b.id} brand={b} />
        ))}
      </div>
    </section>
  );
}

export function BrandsGallery() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', sans-serif;
          background: #05050F;
          color: #fff;
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #05050F; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.35rem 1rem",
              borderRadius: "50px",
              background: "rgba(108,99,255,0.12)",
              border: "1px solid rgba(108,99,255,0.3)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#6C63FF",
              marginBottom: "1.5rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            }}
          >
            ◈ Dev Preview
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "0.75rem",
              background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.4))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            All {AQURION_BRANDS.length} Aqurion Domains
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.65,
              maxWidth: "60ch",
            }}
          >
            Click any card to preview its coming-soon page. In production, each domain is a
            separate Vercel deployment with its own{" "}
            <code
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "0.1rem 0.4rem",
                borderRadius: "4px",
                fontSize: "0.85em",
                color: "#00FF88",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              BRAND_ID
            </code>{" "}
            env variable.
          </p>

          {/* Legend */}
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" as const }}>
            {[
              { label: "Tier 1 — Corporate", color: "#6C63FF", count: tier1.length },
              { label: "Tier 2 — Divisions", color: "#F59E0B", count: tier2.length },
              { label: "Tier 3 — Verticals", color: "#10B981", count: tier3.length },
            ].map((t) => (
              <div
                key={t.label}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}
              >
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, flexShrink: 0, display: "inline-block" }} />
                {t.label}
                <span style={{ background: "rgba(255,255,255,0.08)", padding: "0.05rem 0.45rem", borderRadius: "50px", fontSize: "0.7rem", fontWeight: 700 }}>
                  {t.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "2.5rem" }} />

        {/* How it works */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderRadius: "14px",
            background: "rgba(0,255,136,0.04)",
            border: "1px solid rgba(0,255,136,0.15)",
            marginBottom: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {[
            { step: "01", title: "One codebase", desc: "apps/coming-soon serves all 20+ domains" },
            { step: "02", title: "One env var", desc: "BRAND_ID=aqurion-marketing on Vercel" },
            { step: "03", title: "Fully branded", desc: "Colors, icons, copy all change automatically" },
            { step: "04", title: "Dev preview", desc: "localhost:3001?brand=aqurion-travel" },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#00FF88", fontFamily: "monospace", marginTop: "2px", flexShrink: 0 }}>
                {s.step}
              </span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", marginBottom: "0.15rem" }}>{s.title}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier sections */}
        <TierSection
          title="Tier 1 — Corporate & Primary Brand"
          subtitle="Main company, AI brand, personal site, dev firm, and regional operations"
          brands={tier1}
          accentColor="#6C63FF"
        />
        <TierSection
          title="Tier 2 — Business Divisions"
          subtitle="Operating divisions — each getting a full site build"
          brands={tier2}
          accentColor="#F59E0B"
        />
        <TierSection
          title="Tier 3 — Industry Vertical Landing Pages"
          subtitle="Targeted pages for each industry Aqurion serves"
          brands={tier3}
          accentColor="#10B981"
        />
      </div>
    </>
  );
}
