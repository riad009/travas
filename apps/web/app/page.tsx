"use client";
import React from "react";
import { Navbar } from "@repo/ui/navbar";
import { Footer } from "@repo/ui/footer";
import { Hero } from "@repo/ui/hero";
import { AQURION_BRANDS, getBrandById, getBrandsByTier } from "@repo/ui/brand-config";

const brand = getBrandById("aqurion-holdings")!;
const tier2 = getBrandsByTier(2);
const tier3 = getBrandsByTier(3);

const services = [
  {
    icon: "⬡",
    title: "Software Development",
    desc: "Full-stack web, mobile, and enterprise applications built with cutting-edge technology stacks for any scale.",
    color: "#00FF88",
  },
  {
    icon: "◆",
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies that amplify your brand, drive traffic, and convert audiences into customers.",
    color: "#FF6B6B",
  },
  {
    icon: "◇",
    title: "Financial Technology",
    desc: "Innovative fintech solutions including payment processing, investment platforms, and financial analytics tools.",
    color: "#4ECDC4",
  },
  {
    icon: "◈",
    title: "E-Commerce Solutions",
    desc: "End-to-end marketplace and storefront platforms that enable businesses to sell anywhere, at any scale.",
    color: "#F59E0B",
  },
  {
    icon: "◎",
    title: "AI & Automation",
    desc: "Intelligent automation, machine learning models, and AI-powered tools to supercharge your business operations.",
    color: "#00D4FF",
  },
  {
    icon: "⬟",
    title: "Creative & Branding",
    desc: "World-class design services including logo creation, brand identity, UI/UX design, and creative direction.",
    color: "#A855F7",
  },
];

export default function HomePage() {
  return (
    <>
      <style>{`
        .corp-section {
          padding: 6rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        .corp-section-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #6C63FF;
          margin-bottom: 1rem;
        }
        .corp-section-title {
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1rem;
          color: #fff;
        }
        .corp-section-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.55);
          max-width: 54ch;
          line-height: 1.65;
          margin-bottom: 3.5rem;
        }

        /* Services grid */
        .corp-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.25rem;
        }
        .corp-service-card {
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.3s;
          cursor: default;
        }
        .corp-service-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-4px);
        }
        .corp-service-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
        }
        .corp-service-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: #fff;
        }
        .corp-service-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
        }

        /* Divisions section */
        .corp-divs-bg {
          background: rgba(255,255,255,0.015);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .corp-divs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .corp-div-card {
          padding: 1.5rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          transition: all 0.25s;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .corp-div-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-2px);
        }
        .corp-div-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .corp-div-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .corp-div-domain {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .corp-div-cat {
          font-size: 0.72rem;
          margin-top: 0.35rem;
          display: inline-block;
          padding: 0.15rem 0.6rem;
          border-radius: 50px;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.45);
          font-weight: 600;
        }

        /* Verticals section */
        .corp-verticals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.85rem;
        }
        .corp-vertical-card {
          padding: 1.4rem;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          text-align: center;
          transition: all 0.25s;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
        .corp-vertical-card:hover {
          background: rgba(255,255,255,0.06);
          transform: translateY(-2px);
        }
        .corp-vertical-icon {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
          display: block;
        }
        .corp-vertical-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.2rem;
        }
        .corp-vertical-domain {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.3);
        }

        /* About / CTA */
        .corp-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .corp-about-visual {
          position: relative;
          height: 400px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .corp-about-visual-inner {
          text-align: center;
          z-index: 1;
        }
        .corp-about-visual-icon {
          font-size: 5rem;
          display: block;
          margin-bottom: 1rem;
          color: #6C63FF;
        }
        .corp-about-visual-label {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .corp-about-orb {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: #6C63FF;
          filter: blur(80px);
          opacity: 0.08;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }

        .corp-cta-section {
          margin: 0 2rem;
          border-radius: 28px;
          padding: 5rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(0,212,255,0.06) 100%);
          border: 1px solid rgba(108,99,255,0.25);
          margin-bottom: 4rem;
        }
        .corp-cta-section h2 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .corp-cta-section p {
          color: rgba(255,255,255,0.6);
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          max-width: 50ch;
          margin-left: auto;
          margin-right: auto;
        }
        .corp-cta-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .corp-cta-btn-1 {
          padding: 0.9rem 2.25rem;
          background: #6C63FF;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
        }
        .corp-cta-btn-1:hover {
          background: #7C75FF;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(108,99,255,0.4);
        }
        .corp-cta-btn-2 {
          padding: 0.9rem 2.25rem;
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
        }
        .corp-cta-btn-2:hover {
          background: rgba(255,255,255,0.14);
          transform: translateY(-1px);
        }

        /* Contact form */
        .corp-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }
        .corp-contact-info h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .corp-contact-info p {
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .corp-contact-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .corp-contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255,255,255,0.65);
          font-size: 0.9rem;
        }
        .corp-contact-item-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(108,99,255,0.15);
          border: 1px solid rgba(108,99,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .corp-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .corp-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .corp-input {
          padding: 0.85rem 1.25rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.2s;
          width: 100%;
        }
        .corp-input::placeholder { color: rgba(255,255,255,0.3); }
        .corp-input:focus {
          border-color: rgba(108,99,255,0.5);
          background: rgba(108,99,255,0.08);
        }
        .corp-textarea {
          resize: vertical;
          min-height: 130px;
        }
        .corp-form-submit {
          padding: 0.9rem;
          background: #6C63FF;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s;
        }
        .corp-form-submit:hover {
          background: #7C75FF;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(108,99,255,0.4);
        }

        .section-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          max-width: 1280px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .corp-about-grid { grid-template-columns: 1fr; }
          .corp-contact-grid { grid-template-columns: 1fr; }
          .corp-form-row { grid-template-columns: 1fr; }
          .corp-about-visual { height: 280px; }
        }
        @media (max-width: 640px) {
          .corp-services-grid { grid-template-columns: 1fr; }
          .corp-verticals-grid { grid-template-columns: repeat(2, 1fr); }
          .corp-cta-section { margin: 0 1rem; padding: 3rem 1.5rem; }
        }
      `}</style>

      <Navbar brand={brand} />
      <Hero brand={brand} />

      {/* ── SERVICES ──────────────────────────────────── */}
      <section id="services">
        <div className="section-divider" />
        <div className="corp-section">
          <p className="corp-section-label">What We Do</p>
          <h2 className="corp-section-title">Complete Digital Solutions<br />Under One Roof</h2>
          <p className="corp-section-subtitle">
            From ideation to deployment, Aqurion Holdings provides the full spectrum of digital services across technology, marketing, finance, and creative disciplines.
          </p>
          <div className="corp-services-grid">
            {services.map((s) => (
              <div className="corp-service-card" key={s.title}>
                <div className="corp-service-icon" style={{ background: s.color + "18", color: s.color }}>
                  {s.icon}
                </div>
                <div className="corp-service-title">{s.title}</div>
                <div className="corp-service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVISIONS ─────────────────────────────────── */}
      <section id="divisions" className="corp-divs-bg">
        <div className="corp-section">
          <p className="corp-section-label">Our Divisions</p>
          <h2 className="corp-section-title">Specialized Divisions.<br />Unified Vision.</h2>
          <p className="corp-section-subtitle">
            Each Aqurion division is purpose-built for its market, combining deep industry expertise with powerful technology to deliver unmatched results.
          </p>
          <div className="corp-divs-grid">
            {tier2.map((b) => (
              <a
                key={b.id}
                className="corp-div-card"
                href={b.url || `https://${b.domain}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="corp-div-icon"
                  style={{ background: b.accentColor + "20", color: b.accentColor }}
                >
                  {b.icon}
                </div>
                <div>
                  <div className="corp-div-name">{b.name}</div>
                  <div className="corp-div-domain">{b.domain}</div>
                  <span className="corp-div-cat">{b.category}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY VERTICALS ────────────────────────── */}
      <section>
        <div className="section-divider" />
        <div className="corp-section">
          <p className="corp-section-label">Industry Verticals</p>
          <h2 className="corp-section-title">Every Industry.<br />Every Market.</h2>
          <p className="corp-section-subtitle">
            Aqurion&apos;s vertical platforms deliver tailored technology solutions to 13+ industries — each purpose-built for the unique challenges of that market.
          </p>
          <div className="corp-verticals-grid">
            {tier3.map((b) => (
              <a
                key={b.id}
                className="corp-vertical-card"
                href={`https://${b.domain}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="corp-vertical-icon"
                  style={{ color: b.accentColor }}
                >
                  {b.icon}
                </span>
                <div className="corp-vertical-name">{b.name}</div>
                <div className="corp-vertical-domain">{b.domain}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────── */}
      <section id="about" className="corp-divs-bg">
        <div className="section-divider" />
        <div className="corp-section">
          <div className="corp-about-grid">
            <div>
              <p className="corp-section-label">About Aqurion</p>
              <h2 className="corp-section-title">A Holding Company<br />Built for the Digital Age</h2>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "1.5rem", fontSize: "1rem" }}>
                Aqurion Holdings is a next-generation digital holding company, architecting the infrastructure for tomorrow&apos;s most influential industries. We build, invest in, and operate digital businesses that redefine what&apos;s possible.
              </p>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontSize: "1rem" }}>
                With operations spanning technology development, marketing, financial services, and industry-specific vertical platforms, Aqurion is positioned to be the connective tissue of the digital economy — serving businesses and consumers across every touchpoint.
              </p>
            </div>
            <div className="corp-about-visual">
              <div className="corp-about-orb" />
              <div className="corp-about-visual-inner">
                <span className="corp-about-visual-icon">◈</span>
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                  Aqurion
                </div>
                <div className="corp-about-visual-label">Holdings Network</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="corp-cta-section">
        <h2>Ready to Build Something<br />Extraordinary?</h2>
        <p>
          Partner with Aqurion Holdings and get access to the full suite of digital services, platforms, and expertise your business needs to dominate online.
        </p>
        <div className="corp-cta-btns">
          <a href="#contact" className="corp-cta-btn-1">Start a Project →</a>
          <a href="https://AqurionDev.com" target="_blank" rel="noopener noreferrer" className="corp-cta-btn-2">
            View Development
          </a>
        </div>
      </div>

      {/* ── CONTACT ───────────────────────────────────── */}
      <section id="contact">
        <div className="section-divider" />
        <div className="corp-section">
          <div className="corp-contact-grid">
            <div className="corp-contact-info">
              <p className="corp-section-label">Get In Touch</p>
              <h2 className="corp-section-title" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                Let&apos;s Build Together
              </h2>
              <p>
                Have a project in mind, or want to learn more about what Aqurion can do for your business? Send us a message and we&apos;ll be in touch within 24 hours.
              </p>
              <div className="corp-contact-items">
                <div className="corp-contact-item">
                  <span className="corp-contact-item-icon">✉</span>
                  info@aqurion.net
                </div>
                <div className="corp-contact-item">
                  <span className="corp-contact-item-icon">◎</span>
                  Aqurion.NET
                </div>
                <div className="corp-contact-item">
                  <span className="corp-contact-item-icon">⬡</span>
                  AqurionDev.com
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer brand={brand} />
    </>
  );
}

function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent) {
    return (
      <div style={{
        padding: "2rem",
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.25)",
        borderRadius: "16px",
        textAlign: "center",
        color: "#22C55E",
        fontWeight: 600,
        fontSize: "1.1rem",
      }}>
        ✓ &nbsp;Message sent! We&apos;ll be in touch shortly.
      </div>
    );
  }
  return (
    <form className="corp-form" onSubmit={handleSubmit}>
      <div className="corp-form-row">
        <input className="corp-input" type="text" placeholder="First name" required />
        <input className="corp-input" type="text" placeholder="Last name" required />
      </div>
      <input className="corp-input" type="email" placeholder="Email address" required />
      <input className="corp-input" type="text" placeholder="Company (optional)" />
      <select className="corp-input" defaultValue="">
        <option value="" disabled>Service of interest</option>
        <option>Software Development</option>
        <option>Digital Marketing</option>
        <option>Financial Technology</option>
        <option>E-Commerce Solutions</option>
        <option>AI & Automation</option>
        <option>Creative & Branding</option>
        <option>Other</option>
      </select>
      <textarea className="corp-input corp-textarea" placeholder="Tell us about your project..." required />
      <button type="submit" className="corp-form-submit">
        Send Message →
      </button>
    </form>
  );
}
