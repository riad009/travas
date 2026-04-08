"use client";
import React from "react";
import type { BrandConfig } from "./brand-config";

interface ComingSoonProps {
  brand: BrandConfig;
}

export function ComingSoon({ brand }: ComingSoonProps) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [countdown, setCountdown] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    // Target: 60 days from now
    const target = new Date();
    target.setDate(target.getDate() + 60);

    const tick = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        .cs-root {
          min-height: 100vh;
          background: #05050F;
          color: #fff;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .cs-bg-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cs-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: cs-float 8s ease-in-out infinite;
        }
        .cs-bg-orb-1 {
          width: 600px; height: 600px;
          top: -200px; left: -200px;
          animation-delay: 0s;
        }
        .cs-bg-orb-2 {
          width: 400px; height: 400px;
          bottom: -150px; right: -100px;
          opacity: 0.1;
          animation-delay: -4s;
        }
        @keyframes cs-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        .cs-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .cs-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 700px;
          width: 100%;
        }

        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          border: 1px solid;
        }
        .cs-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          animation: cs-pulse 2s ease-in-out infinite;
        }
        @keyframes cs-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .cs-icon-wrapper {
          width: 110px; height: 110px;
          border-radius: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .cs-icon-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 26px;
        }
        .cs-logo-base {
          width: 110px;
          height: auto;
          margin: 0 auto 1.5rem;
          display: block;
          filter: drop-shadow(0 0 20px rgba(0,180,255,0.3));
        }

        .cs-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 1rem;
          background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cs-tagline {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: rgba(255,255,255,0.55);
          margin: 0 0 0.75rem;
          font-weight: 400;
          line-height: 1.6;
        }

        .cs-domain {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.05em;
          margin-bottom: 3rem;
          font-weight: 500;
        }

        .cs-countdown {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .cs-count-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          min-width: 80px;
        }
        .cs-count-number {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .cs-count-label {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        .cs-count-divider {
          font-size: 2rem;
          font-weight: 300;
          color: rgba(255,255,255,0.2);
          align-self: center;
          padding-bottom: 1.2rem;
        }

        .cs-form {
          display: flex;
          gap: 0.75rem;
          max-width: 480px;
          margin: 0 auto 2.5rem;
        }
        .cs-email-input {
          flex: 1;
          padding: 0.85rem 1.25rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.2s;
        }
        .cs-email-input::placeholder { color: rgba(255,255,255,0.3); }
        .cs-email-input:focus {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
        }
        .cs-submit-btn {
          padding: 0.85rem 1.5rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }
        .cs-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .cs-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 12px;
          color: #22C55E;
          font-weight: 600;
          max-width: 480px;
          margin: 0 auto 2.5rem;
          font-size: 0.9rem;
        }

        .cs-description {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 500px;
          margin: 0 auto 3rem;
        }

        .cs-divider-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .cs-divider-link {
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.2s;
          letter-spacing: 0.03em;
        }
        .cs-divider-link:hover { color: rgba(255,255,255,0.7); }
        .cs-divider-sep {
          width: 1px;
          height: 12px;
          background: rgba(255,255,255,0.15);
        }

        .cs-footer-text {
          position: absolute;
          bottom: 1.5rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          text-align: center;
          left: 0;
          right: 0;
        }

        @media (max-width: 480px) {
          .cs-form { flex-direction: column; }
          .cs-count-block { min-width: 60px; }
          .cs-count-number { font-size: 1.8rem; }
        }
      `}</style>

      <div className="cs-root">
        <div className="cs-bg-gradient">
          <div
            className="cs-bg-orb cs-bg-orb-1"
            style={{ background: brand.accentColor }}
          />
          <div
            className="cs-bg-orb cs-bg-orb-2"
            style={{ background: brand.accentColor }}
          />
        </div>
        <div className="cs-grid-overlay" />

        <div className="cs-content">
          <div
            className="cs-badge"
            style={{
              borderColor: brand.accentColor + "40",
              background: brand.accentColor + "15",
              color: brand.accentColor,
            }}
          >
            <span
              className="cs-badge-dot"
              style={{ background: brand.accentColor }}
            />
            Coming Soon
          </div>

          {/* Logo / Icon */}
          {brand.logoUrl ? (
            <div
              className="cs-icon-wrapper"
              style={{ background: "transparent", border: "none" }}
            >
              <img src={brand.logoUrl} alt={`${brand.name} logo`} />
            </div>
          ) : (
            <div
              className="cs-icon-wrapper"
              style={{
                background: brand.accentColor + "15",
                borderColor: brand.accentColor + "30",
              }}
            >
              {brand.icon}
            </div>
          )}

          <h1 className="cs-title">{brand.name}</h1>
          <p className="cs-tagline">{brand.tagline}</p>
          <p className="cs-domain">{brand.domain}{brand.altDomains ? ` · ${brand.altDomains.join(" · ")}` : ""}</p>

          <div className="cs-countdown">
            <div className="cs-count-block">
              <span className="cs-count-number" style={{ color: brand.accentColor }}>
                {String(countdown.days).padStart(2, "0")}
              </span>
              <span className="cs-count-label">Days</span>
            </div>
            <span className="cs-count-divider">:</span>
            <div className="cs-count-block">
              <span className="cs-count-number" style={{ color: brand.accentColor }}>
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="cs-count-label">Hours</span>
            </div>
            <span className="cs-count-divider">:</span>
            <div className="cs-count-block">
              <span className="cs-count-number" style={{ color: brand.accentColor }}>
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="cs-count-label">Minutes</span>
            </div>
            <span className="cs-count-divider">:</span>
            <div className="cs-count-block">
              <span className="cs-count-number" style={{ color: brand.accentColor }}>
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="cs-count-label">Seconds</span>
            </div>
          </div>

          {submitted ? (
            <div className="cs-success">
              ✓ &nbsp;You&apos;re on the list! We&apos;ll notify you at launch.
            </div>
          ) : (
            <form className="cs-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="cs-email-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="cs-submit-btn"
                style={{ background: brand.accentColor, color: "#000" }}
              >
                Notify Me
              </button>
            </form>
          )}

          <p className="cs-description">{brand.description}</p>

          <div className="cs-divider-links">
            <a href="https://Aqurion.NET" target="_blank" rel="noopener noreferrer" className="cs-divider-link">
              Aqurion Holdings
            </a>
            <div className="cs-divider-sep" />
            <a href="https://AqurionDev.com" target="_blank" rel="noopener noreferrer" className="cs-divider-link">
              Development
            </a>
            <div className="cs-divider-sep" />
            <a href="mailto:info@aqurion.net" className="cs-divider-link">
              Contact Us
            </a>
          </div>
        </div>

        <p className="cs-footer-text">
          © {new Date().getFullYear()} {brand.name} — An Aqurion Holdings Company
        </p>
      </div>
    </>
  );
}
