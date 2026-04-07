"use client";
import React from "react";
import type { BrandConfig } from "./brand-config";
import { AQURION_BRANDS } from "./brand-config";

interface HeroProps {
  brand: BrandConfig;
}

export function Hero({ brand }: HeroProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        .aq-hero {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .aq-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .aq-hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .aq-hero-orb-1 {
          width: 800px; height: 800px;
          top: -300px; right: -200px;
          opacity: 0.12;
          animation: aq-hero-drift 12s ease-in-out infinite;
        }
        .aq-hero-orb-2 {
          width: 500px; height: 500px;
          bottom: -200px; left: -100px;
          opacity: 0.08;
          animation: aq-hero-drift 10s ease-in-out infinite reverse;
        }
        @keyframes aq-hero-drift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.08); }
        }

        .aq-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }

        .aq-hero-content {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 8rem 2rem 5rem;
          width: 100%;
        }

        .aq-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 1rem 0.4rem 0.5rem;
          border-radius: 50px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          margin-bottom: 2rem;
          animation: aq-fade-up 0.6s ease both;
        }
        .aq-hero-pill-icon {
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .aq-hero-h1 {
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.04em;
          margin: 0 0 1.5rem;
          max-width: 16ch;
          animation: aq-fade-up 0.6s ease 0.1s both;
        }
        .aq-hero-h1 span {
          display: block;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .aq-hero-h1 em {
          font-style: normal;
          color: rgba(255,255,255,0.35);
          -webkit-text-fill-color: rgba(255,255,255,0.35);
        }

        .aq-hero-sub {
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          color: rgba(255,255,255,0.6);
          max-width: 52ch;
          line-height: 1.65;
          margin: 0 0 2.5rem;
          font-weight: 400;
          animation: aq-fade-up 0.6s ease 0.2s both;
        }

        .aq-hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          animation: aq-fade-up 0.6s ease 0.3s both;
        }
        .aq-hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
        }
        .aq-hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .aq-hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
        }
        .aq-hero-btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.25);
          color: #fff;
          transform: translateY(-1px);
        }

        .aq-hero-stats {
          display: flex;
          gap: 3rem;
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-wrap: wrap;
          animation: aq-fade-up 0.6s ease 0.4s both;
        }
        .aq-hero-stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .aq-hero-stat-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          margin-top: 0.25rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @keyframes aq-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .aq-hero-stats { gap: 1.5rem; }
          .aq-hero-stat-value { font-size: 1.75rem; }
        }
      `}</style>

      <section className="aq-hero" style={{ background: "#05050F" }}>
        <div className="aq-hero-bg">
          <div className="aq-hero-orb aq-hero-orb-1" style={{ background: brand.accentColor }} />
          <div className="aq-hero-orb aq-hero-orb-2" style={{ background: brand.accentColor }} />
          <div className="aq-hero-grid" />
        </div>

        <div className="aq-hero-content">
          <div className="aq-hero-pill">
            <span
              className="aq-hero-pill-icon"
              style={{ background: brand.accentColor + "25", color: brand.accentColor }}
            >
              {brand.icon}
            </span>
            <span style={{ color: brand.accentColor }}>{brand.category}</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>· {brand.domain}</span>
          </div>

          <h1 className="aq-hero-h1">
            <span
              style={{
                backgroundImage: `linear-gradient(120deg, #fff 0%, ${brand.accentColor} 100%)`,
              }}
            >
              {brand.name}
            </span>
            <em>{brand.tagline}</em>
          </h1>

          <p className="aq-hero-sub">{brand.description}</p>

          <div className="aq-hero-actions">
            <a
              href="#services"
              className="aq-hero-btn-primary"
              style={{ background: brand.accentColor, color: "#000" }}
            >
              Explore Services →
            </a>
            <a href="#contact" className="aq-hero-btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="aq-hero-stats">
            <div>
              <div className="aq-hero-stat-value" style={{ color: brand.accentColor }}>22+</div>
              <div className="aq-hero-stat-label">Digital Properties</div>
            </div>
            <div>
              <div className="aq-hero-stat-value" style={{ color: brand.accentColor }}>15+</div>
              <div className="aq-hero-stat-label">Industry Verticals</div>
            </div>
            <div>
              <div className="aq-hero-stat-value" style={{ color: brand.accentColor }}>3</div>
              <div className="aq-hero-stat-label">Business Tiers</div>
            </div>
            <div>
              <div className="aq-hero-stat-value" style={{ color: brand.accentColor }}>∞</div>
              <div className="aq-hero-stat-label">Possibilities</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export { AQURION_BRANDS };
