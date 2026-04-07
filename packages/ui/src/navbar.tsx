"use client";
import React from "react";
import type { BrandConfig } from "./brand-config";

interface NavbarProps {
  brand: BrandConfig;
}

export function Navbar({ brand }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        .aq-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.3s ease;
          padding: 1.25rem 2rem;
        }
        .aq-nav.scrolled {
          background: rgba(10,10,20,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 0.75rem 2rem;
        }
        .aq-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .aq-nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .aq-nav-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .aq-nav-brand-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .aq-nav-brand-sub {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .aq-nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .aq-nav-links a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .aq-nav-links a:hover {
          color: #fff;
        }
        .aq-nav-cta {
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .aq-nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .aq-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }
        .aq-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .aq-mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5,5,15,0.98);
          backdrop-filter: blur(20px);
          z-index: 99;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }
        .aq-mobile-menu.open {
          display: flex;
        }
        .aq-mobile-menu a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 600;
          transition: color 0.2s;
        }
        .aq-mobile-menu a:hover {
          color: #fff;
        }
        .aq-mobile-close {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          background: none;
          border: none;
          color: #fff;
          font-size: 1.8rem;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .aq-nav-links { display: none; }
          .aq-hamburger { display: flex; }
        }
      `}</style>
      <nav className={`aq-nav${scrolled ? " scrolled" : ""}`}>
        <div className="aq-nav-inner">
          <a href="/" className="aq-nav-logo">
            <div
              className="aq-nav-icon"
              style={{ background: brand.accentColor + "22", color: brand.accentColor }}
            >
              {brand.icon}
            </div>
            <div>
              <div className="aq-nav-brand-name">{brand.name}</div>
              <div className="aq-nav-brand-sub">{brand.domain}</div>
            </div>
          </a>

          <ul className="aq-nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#divisions">Divisions</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <a
                href="#contact"
                className="aq-nav-cta"
                style={{ background: brand.accentColor, color: "#000" }}
              >
                Get Started
              </a>
            </li>
          </ul>

          <button
            className="aq-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`aq-mobile-menu${menuOpen ? " open" : ""}`}>
        <button className="aq-mobile-close" onClick={() => setMenuOpen(false)}>×</button>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#divisions" onClick={() => setMenuOpen(false)}>Divisions</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "50px",
            background: brand.accentColor,
            color: "#000",
            fontWeight: 700,
          }}
        >
          Get Started
        </a>
      </div>
    </>
  );
}
