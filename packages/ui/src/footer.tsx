import React from "react";
import type { BrandConfig } from "./brand-config";
import { AQURION_BRANDS } from "./brand-config";

interface FooterProps {
  brand: BrandConfig;
}

export function Footer({ brand }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const tier1 = AQURION_BRANDS.filter((b) => b.tier === 1);
  const tier2 = AQURION_BRANDS.filter((b) => b.tier === 2);

  return (
    <>
      <style>{`
        .aq-footer {
          background: #050508;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 4rem 2rem 2rem;
          color: rgba(255,255,255,0.6);
          font-size: 0.875rem;
        }
        .aq-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .aq-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .aq-footer-brand h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.5rem;
        }
        .aq-footer-brand p {
          margin: 0 0 1.5rem;
          line-height: 1.7;
          max-width: 300px;
        }
        .aq-footer-socials {
          display: flex;
          gap: 0.75rem;
        }
        .aq-footer-social-link {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .aq-footer-social-link:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .aq-footer-col h4 {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
          margin: 0 0 1rem;
        }
        .aq-footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .aq-footer-col a {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
          font-size: 0.875rem;
        }
        .aq-footer-col a:hover {
          color: #fff;
        }
        .aq-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .aq-footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }
        .aq-footer-bottom-links a {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.2s;
        }
        .aq-footer-bottom-links a:hover { color: rgba(255,255,255,0.7); }
        .aq-footer-accent-bar {
          height: 3px;
          width: 100%;
          margin-bottom: 3rem;
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .aq-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .aq-footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .aq-footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <footer className="aq-footer">
        <div className="aq-footer-inner">
          <div
            className="aq-footer-accent-bar"
            style={{ background: `linear-gradient(90deg, ${brand.accentColor}, transparent)` }}
          />
          <div className="aq-footer-grid">
            <div className="aq-footer-brand">
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <div className="aq-footer-socials">
                <a href="#" className="aq-footer-social-link" aria-label="LinkedIn">in</a>
                <a href="#" className="aq-footer-social-link" aria-label="Twitter">𝕏</a>
                <a href="#" className="aq-footer-social-link" aria-label="Instagram">◎</a>
                <a href="#" className="aq-footer-social-link" aria-label="Facebook">f</a>
              </div>
            </div>

            <div className="aq-footer-col">
              <h4>Corporate</h4>
              <ul>
                {tier1.map((b) => (
                  <li key={b.id}>
                    <a href={`https://${b.domain}`} target="_blank" rel="noopener noreferrer">
                      {b.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aq-footer-col">
              <h4>Divisions</h4>
              <ul>
                {tier2.map((b) => (
                  <li key={b.id}>
                    <a href={`https://${b.domain}`} target="_blank" rel="noopener noreferrer">
                      {b.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aq-footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="aq-footer-bottom">
            <span>© {currentYear} {brand.name}. All rights reserved. | {brand.domain}</span>
            <div className="aq-footer-bottom-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
