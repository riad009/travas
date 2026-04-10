"use client";
import React from "react";

const ventures = [
  { name: "Aqurion Holdings", role: "Founder & CEO", domain: "Aqurion.NET", color: "#6C63FF", desc: "Strategic parent company overseeing the Aqurion technology ecosystem." },
  { name: "Aqurion AI", role: "Co-Founder", domain: "Aqurion.AI", color: "#00D4FF", desc: "Cutting-edge AI solutions across 12 industry verticals." },
  { name: "Aqurion Development", role: "Founder", domain: "AqurionDev.com", color: "#00FF88", desc: "Full-service software development for web, mobile, and enterprise." },
  { name: "Aqurion Marketing", role: "Founder", domain: "AqurionMarketing.com", color: "#FF6B6B", desc: "Data-driven marketing agency building bold brands." },
  { name: "Aqurion Sales", role: "Founder", domain: "AqurionSales.com", color: "#10B981", desc: "AI-powered CRM and sales management platform." },
  { name: "Aqurion South America", role: "Founder", domain: "AqurionSA.LAT", color: "#FFD700", desc: "Expanding Aqurion's technology ecosystem across Latin America." },
];

const timeline = [
  { year: "2024", title: "Founded Aqurion Holdings", desc: "Established the parent company to unify technology ventures." },
  { year: "2024", title: "Launched Aqurion Development", desc: "Built the technology foundation powering the ecosystem." },
  { year: "2025", title: "Expanded to 56+ Applications", desc: "Grew the portfolio across 12 industry verticals." },
  { year: "2025", title: "Aqurion South America", desc: "Established Latin American operations to serve regional markets." },
  { year: "2026", title: "AI-First Transformation", desc: "Integrated intelligent automation across all Aqurion platforms." },
];

export default function TravisPage() {
  const [formSent, setFormSent] = React.useState(false);

  return (
    <>
      <style>{`
        .tp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(10,10,18,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(245,166,35,0.08); }
        .tp-nav-name { font-size: 1.15rem; font-weight: 800; color: #fff; text-decoration: none; letter-spacing: -0.02em; }
        .tp-nav-links { display: flex; gap: 2rem; }
        .tp-nav-link { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.2s; }
        .tp-nav-link:hover { color: #F5A623; }
        .tp-cta { padding: 0.6rem 1.5rem; border-radius: 10px; background: #F5A623; color: #000; font-weight: 700; font-size: 0.85rem; border: none; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .tp-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(245,166,35,0.3); }

        .tp-hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8rem 2rem 4rem; position: relative; }
        .tp-hero-glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(245,166,35,0.05), transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .tp-hero-content { max-width: 700px; position: relative; z-index: 2; }
        .tp-hero-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #F5A623; margin-bottom: 1.5rem; }
        .tp-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 7vw, 5rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 1.5rem; }
        .tp-hero h1 span { color: #F5A623; }
        .tp-hero-bio { font-size: 1.1rem; color: rgba(255,255,255,0.5); line-height: 1.8; margin-bottom: 2.5rem; }
        .tp-hero-links { display: flex; gap: 1rem; flex-wrap: wrap; }
        .tp-social { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.25rem; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); font-size: 0.8rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .tp-social:hover { border-color: rgba(245,166,35,0.3); color: #F5A623; }

        .tp-section { padding: 6rem 2rem; max-width: 900px; margin: 0 auto; }
        .tp-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #F5A623; margin-bottom: 1rem; }
        .tp-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 1.5rem; }

        .tp-ventures { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
        .tp-venture { display: grid; grid-template-columns: auto 1fr auto; gap: 1.5rem; align-items: center; padding: 1.5rem; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s; text-decoration: none; color: #fff; }
        .tp-venture:hover { border-color: rgba(245,166,35,0.2); transform: translateX(4px); }
        .tp-venture-dot { width: 12px; height: 12px; border-radius: 50%; }
        .tp-venture-name { font-weight: 700; font-size: 1rem; }
        .tp-venture-role { font-size: 0.8rem; color: rgba(255,255,255,0.4); }
        .tp-venture-domain { font-size: 0.75rem; color: rgba(255,255,255,0.3); font-weight: 500; }

        .tp-timeline { margin-top: 2rem; padding-left: 2rem; border-left: 2px solid rgba(245,166,35,0.15); }
        .tp-tl-item { padding: 1.5rem 0 1.5rem 1.5rem; position: relative; }
        .tp-tl-item::before { content: ''; position: absolute; left: -7px; top: 1.9rem; width: 12px; height: 12px; border-radius: 50%; background: #F5A623; border: 3px solid #0A0A12; }
        .tp-tl-year { font-size: 0.72rem; color: #F5A623; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
        .tp-tl-title { font-weight: 700; margin-top: 0.25rem; }
        .tp-tl-desc { font-size: 0.85rem; color: rgba(255,255,255,0.4); margin-top: 0.25rem; }

        .tp-contact-form { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; max-width: 500px; }
        .tp-input { padding: 0.85rem 1.25rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 0.9rem; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s; }
        .tp-input:focus { border-color: rgba(245,166,35,0.4); }
        .tp-textarea { min-height: 120px; resize: vertical; }
        .tp-success { padding: 1rem; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; color: #22C55E; font-weight: 600; }

        .tp-footer { padding: 3rem 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; color: rgba(255,255,255,0.2); }

        @media (max-width: 768px) {
          .tp-nav { padding: 1rem 1.5rem; }
          .tp-nav-links { display: none; }
          .tp-venture { grid-template-columns: auto 1fr; }
          .tp-venture-domain { display: none; }
        }
      `}</style>

      <nav className="tp-nav">
        <a href="/" className="tp-nav-name">Travis Roque Soto</a>
        <div className="tp-nav-links">
          <a href="#ventures" className="tp-nav-link">Ventures</a>
          <a href="#journey" className="tp-nav-link">Journey</a>
          <a href="#contact" className="tp-nav-link">Contact</a>
        </div>
        <a href="#contact" className="tp-cta">Get In Touch</a>
      </nav>

      <section className="tp-hero">
        <div className="tp-hero-glow" />
        <div className="tp-hero-content">
          <div className="tp-hero-label">Entrepreneur & Visionary</div>
          <h1>Travis <span>Roque Soto</span></h1>
          <p className="tp-hero-bio">
            Founder and CEO of Aqurion Holdings — building the future of AI-powered business technology.
            Leading a portfolio of 56+ applications across 12 industry verticals, with a mission to
            democratize enterprise-grade technology for small and mid-sized businesses worldwide.
          </p>
          <div className="tp-hero-links">
            <a href="https://linkedin.com" className="tp-social" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://Aqurion.NET" className="tp-social" target="_blank" rel="noopener noreferrer">Aqurion Holdings</a>
            <a href="mailto:travis@aqurion.net" className="tp-social">Email</a>
          </div>
        </div>
      </section>

      <section id="ventures" className="tp-section">
        <div className="tp-label">Portfolio</div>
        <h2 className="tp-title">Ventures & Companies</h2>
        <div className="tp-ventures">
          {ventures.map(v => (
            <a key={v.domain} href={`https://${v.domain}`} className="tp-venture" target="_blank" rel="noopener noreferrer">
              <div className="tp-venture-dot" style={{ background: v.color }} />
              <div>
                <div className="tp-venture-name">{v.name}</div>
                <div className="tp-venture-role">{v.role} — {v.desc}</div>
              </div>
              <div className="tp-venture-domain">{v.domain} →</div>
            </a>
          ))}
        </div>
      </section>

      <section id="journey" className="tp-section">
        <div className="tp-label">Journey</div>
        <h2 className="tp-title">Building the Vision</h2>
        <div className="tp-timeline">
          {timeline.map((t, i) => (
            <div key={i} className="tp-tl-item">
              <div className="tp-tl-year">{t.year}</div>
              <div className="tp-tl-title">{t.title}</div>
              <div className="tp-tl-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="tp-section">
        <div className="tp-label">Contact</div>
        <h2 className="tp-title">Let&apos;s Connect</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1rem" }}>
          Interested in partnering, investing, or just want to say hello? I&apos;d love to hear from you.
        </p>
        {formSent ? (
          <div className="tp-success">✓ Message sent! I&apos;ll get back to you soon.</div>
        ) : (
          <form className="tp-contact-form" onSubmit={e => { e.preventDefault(); setFormSent(true); }}>
            <input className="tp-input" type="text" placeholder="Your Name" required />
            <input className="tp-input" type="email" placeholder="Your Email" required />
            <textarea className="tp-input tp-textarea" placeholder="Your Message" required />
            <button type="submit" className="tp-cta" style={{ padding: "0.85rem 2rem", fontSize: "0.95rem", alignSelf: "flex-start" }}>Send Message</button>
          </form>
        )}
      </section>

      <footer className="tp-footer">
        <p>© {new Date().getFullYear()} Travis Roque Soto — Founder, <a href="https://Aqurion.NET" style={{ color: "#F5A623", textDecoration: "none" }}>Aqurion Holdings</a></p>
      </footer>
    </>
  );
}
