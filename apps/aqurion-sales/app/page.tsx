"use client";
import React from "react";

const features = [
  { icon: "📞", title: "Unified Communications", desc: "Connect phone, email, SMS, and chat in one platform. Never miss a lead again.", color: "#E8F5E9" },
  { icon: "🤖", title: "AI-Powered Insights", desc: "Automatic call transcription, sentiment analysis, and deal scoring powered by AI.", color: "#E3F2FD" },
  { icon: "📊", title: "Real-Time Analytics", desc: "Live dashboards showing pipeline health, team performance, and revenue forecasts.", color: "#FFF3E0" },
  { icon: "🔗", title: "250+ Integrations", desc: "Connect with HubSpot, Salesforce, Slack, Zapier, and hundreds more tools.", color: "#F3E5F5" },
  { icon: "⚡", title: "Smart Automation", desc: "Automate follow-ups, task assignments, and workflow triggers to close faster.", color: "#FFFDE7" },
  { icon: "🎯", title: "Lead Scoring", desc: "AI ranks your leads by close probability so your team focuses on what matters.", color: "#E0F2F1" },
];

const integrations = ["HubSpot", "Salesforce", "Slack", "Zapier", "Intercom", "Zendesk", "Pipedrive", "Monday.com", "Shopify", "Microsoft Teams", "Google Workspace", "Stripe"];

const stats = [
  { value: "35%", label: "More Deals Closed" },
  { value: "50%", label: "Less Manual Work" },
  { value: "2.4x", label: "Faster Response" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function SalesPage() {
  const basePath = process.env.NODE_ENV === 'development' ? '/sales' : '';
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        .sl-page { background: #FAF8F5; color: #1a1a1a; min-height: 100vh; font-family: 'Inter', sans-serif; }

        /* Nav */
        .sl-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1rem 3rem; background: rgba(250,248,245,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.05); }
        .sl-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #1a1a1a; }
        .sl-nav-logo img { width: 32px; height: 32px; border-radius: 8px; }
        .sl-nav-links { display: flex; gap: 2rem; }
        .sl-nav-link { color: #888; text-decoration: none; font-size: 0.82rem; font-weight: 500; transition: color 0.2s; }
        .sl-nav-link:hover { color: #1a1a1a; }
        .sl-cta-btn { padding: 0.6rem 1.5rem; border-radius: 8px; background: #0D6B4F; color: #fff; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .sl-cta-btn:hover { background: #0A5840; transform: translateY(-1px); }
        .sl-ghost-btn { padding: 0.6rem 1.5rem; border-radius: 8px; background: transparent; border: 1px solid rgba(0,0,0,0.15); color: #1a1a1a; font-weight: 600; font-size: 0.82rem; text-decoration: none; transition: all 0.2s; }
        .sl-ghost-btn:hover { border-color: rgba(0,0,0,0.3); }

        /* Hero — centered big text with product mockup area */
        .sl-hero { padding: 10rem 2rem 4rem; text-align: center; position: relative; overflow: hidden; }
        .sl-hero-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 1rem; border-radius: 50px; font-size: 0.7rem; font-weight: 600; background: rgba(13,107,79,0.08); color: #0D6B4F; border: 1px solid rgba(13,107,79,0.15); margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.06em; }
        .sl-hero h1 { font-size: clamp(3rem, 7vw, 5rem); font-family: 'Instrument Serif', serif; font-weight: 400; line-height: 1.08; letter-spacing: -0.03em; margin-bottom: 1.5rem; max-width: 800px; margin-left: auto; margin-right: auto; }
        .sl-hero h1 em { font-style: italic; color: #0D6B4F; }
        .sl-hero-sub { font-size: 1.05rem; color: #888; max-width: 550px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .sl-hero-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

        /* Product mockup */
        .sl-mockup { max-width: 1000px; margin: 4rem auto 0; border-radius: 16px; overflow: hidden; background: #fff; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 20px 60px rgba(0,0,0,0.06); padding: 2rem; }
        .sl-mockup-bar { display: flex; gap: 6px; margin-bottom: 1.5rem; }
        .sl-mockup-dot { width: 10px; height: 10px; border-radius: 50%; background: #e0e0e0; }
        .sl-mockup-content { display: grid; grid-template-columns: 200px 1fr 250px; gap: 1rem; min-height: 300px; }
        .sl-mockup-sidebar { background: #f5f5f5; border-radius: 10px; padding: 1rem; }
        .sl-mockup-sidebar-item { padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.72rem; color: #888; margin-bottom: 0.3rem; }
        .sl-mockup-sidebar-item.active { background: rgba(13,107,79,0.08); color: #0D6B4F; font-weight: 600; }
        .sl-mockup-main { background: #fafafa; border-radius: 10px; padding: 1.5rem; }
        .sl-mockup-title { font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; }
        .sl-mockup-row { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid #f0f0f0; font-size: 0.72rem; color: #666; }
        .sl-mockup-panel { background: #f9f9f9; border-radius: 10px; padding: 1rem; }
        .sl-mockup-metric { text-align: center; padding: 0.75rem 0; }
        .sl-mockup-metric-val { font-size: 1.3rem; font-weight: 800; color: #0D6B4F; }
        .sl-mockup-metric-label { font-size: 0.6rem; color: #999; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Stats — trusted by strip */
        .sl-stats { display: flex; justify-content: center; gap: 4rem; padding: 4rem 2rem; flex-wrap: wrap; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); margin: 0 3rem; }
        .sl-stat { text-align: center; }
        .sl-stat-val { font-size: 2.2rem; font-weight: 800; color: #0D6B4F; letter-spacing: -0.02em; }
        .sl-stat-label { font-size: 0.68rem; color: #999; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.15rem; }

        /* Sections */
        .sl-section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
        .sl-sec-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #0D6B4F; margin-bottom: 1rem; }
        .sl-sec-title { font-size: clamp(2rem, 4vw, 3rem); font-family: 'Instrument Serif', serif; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 1rem; line-height: 1.15; }
        .sl-sec-desc { color: #888; font-size: 0.95rem; max-width: 500px; line-height: 1.7; }

        /* Features */
        .sl-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; margin-top: 3rem; }
        .sl-feature { border-radius: 16px; padding: 2rem; transition: transform 0.3s; }
        .sl-feature:hover { transform: translateY(-4px); }
        .sl-feature-icon { font-size: 1.75rem; margin-bottom: 1rem; }
        .sl-feature-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
        .sl-feature-desc { font-size: 0.85rem; color: #666; line-height: 1.6; }

        /* How it works */
        .sl-how { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; margin-top: 3rem; text-align: center; }
        .sl-how-num { width: 40px; height: 40px; border-radius: 50%; background: #0D6B4F; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; margin: 0 auto 1rem; }
        .sl-how-title { font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; }
        .sl-how-desc { font-size: 0.85rem; color: #888; line-height: 1.6; }

        /* Integrations */
        .sl-integrations { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem; justify-content: center; }
        .sl-integration { padding: 0.6rem 1.2rem; border-radius: 50px; background: #fff; border: 1px solid rgba(0,0,0,0.08); font-size: 0.82rem; font-weight: 600; color: #555; transition: all 0.2s; }
        .sl-integration:hover { border-color: #0D6B4F; color: #0D6B4F; }

        /* CTA */
        .sl-cta-section { text-align: center; padding: 8rem 2rem; background: #0D6B4F; color: #fff; border-radius: 24px; margin: 0 3rem 3rem; }
        .sl-cta-section h2 { font-size: clamp(2rem, 4vw, 3rem); font-family: 'Instrument Serif', serif; font-weight: 400; margin-bottom: 1rem; }
        .sl-cta-section p { color: rgba(255,255,255,0.7); font-size: 0.95rem; margin-bottom: 2rem; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        .sl-cta-white { padding: 0.75rem 2rem; border-radius: 8px; background: #fff; color: #0D6B4F; font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.2s; }
        .sl-cta-white:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }

        .sl-footer { padding: 3rem; text-align: center; font-size: 0.75rem; color: #bbb; }
        .sl-footer-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .sl-footer-link { color: #999; text-decoration: none; font-size: 0.75rem; transition: color 0.2s; }
        .sl-footer-link:hover { color: #0D6B4F; }

        @media (max-width: 768px) {
          .sl-nav { padding: 1rem 1.5rem; }
          .sl-nav-links { display: none; }
          .sl-mockup-content { grid-template-columns: 1fr; }
          .sl-how { grid-template-columns: 1fr; }
          .sl-stats { margin: 0 1rem; }
          .sl-cta-section { margin: 0 1rem 2rem; }
        }
      `}</style>

      <div className="sl-page">
        {/* Nav */}
        <nav className="sl-nav">
          <a href="/" className="sl-nav-logo"><img src={`${basePath}/logos/aqurion-sales-icon.png`} alt="" style={{ width: 32, height: 32, borderRadius: 8 }} />Aqurion Sales</a>
          <div className="sl-nav-links">
            <a href="#features" className="sl-nav-link">Features</a>
            <a href="#how" className="sl-nav-link">How It Works</a>
            <a href="#integrations" className="sl-nav-link">Integrations</a>
          </div>
          <a href="#contact" className="sl-cta-btn">Start Free Trial</a>
        </nav>

        {/* Hero */}
        <section className="sl-hero">
          <div className="sl-hero-badge">⚡ AI-Powered Sales Platform</div>
          <h1>The <em>smarter</em> way to close more deals.</h1>
          <p className="sl-hero-sub">AI-powered CRM that unifies communications, automates workflows, and delivers real-time insights to help your team sell smarter.</p>
          <div className="sl-hero-btns">
            <a href="#contact" className="sl-cta-btn" style={{ padding: "0.75rem 2rem", fontSize: "0.88rem" }}>Start Free Trial</a>
            <a href="#features" className="sl-ghost-btn">See Features →</a>
          </div>

          {/* Product Mockup */}
          <div className="sl-mockup">
            <div className="sl-mockup-bar">
              <div className="sl-mockup-dot" style={{ background: "#FF5F57" }} />
              <div className="sl-mockup-dot" style={{ background: "#FFBD2E" }} />
              <div className="sl-mockup-dot" style={{ background: "#28C840" }} />
            </div>
            <div className="sl-mockup-content">
              <div className="sl-mockup-sidebar">
                <div className="sl-mockup-sidebar-item active">📊 Dashboard</div>
                <div className="sl-mockup-sidebar-item">📞 Calls</div>
                <div className="sl-mockup-sidebar-item">✉️ Messages</div>
                <div className="sl-mockup-sidebar-item">👥 Contacts</div>
                <div className="sl-mockup-sidebar-item">📈 Analytics</div>
                <div className="sl-mockup-sidebar-item">⚙️ Settings</div>
              </div>
              <div className="sl-mockup-main">
                <div className="sl-mockup-title">Active Deals</div>
                <div className="sl-mockup-row"><span>TechVault Solutions</span><span style={{ color: "#0D6B4F", fontWeight: 600 }}>$45,000</span></div>
                <div className="sl-mockup-row"><span>Bloom Wellness Co.</span><span style={{ color: "#0D6B4F", fontWeight: 600 }}>$28,500</span></div>
                <div className="sl-mockup-row"><span>Greystone Capital</span><span style={{ color: "#0D6B4F", fontWeight: 600 }}>$72,000</span></div>
                <div className="sl-mockup-row"><span>Meridian Logistics</span><span style={{ color: "#D97706", fontWeight: 600 }}>$18,200</span></div>
                <div className="sl-mockup-row" style={{ borderBottom: "none" }}><span>Apex Manufacturing</span><span style={{ color: "#0D6B4F", fontWeight: 600 }}>$55,000</span></div>
              </div>
              <div className="sl-mockup-panel">
                <div className="sl-mockup-metric"><div className="sl-mockup-metric-val">$218K</div><div className="sl-mockup-metric-label">Pipeline Value</div></div>
                <div className="sl-mockup-metric"><div className="sl-mockup-metric-val">78%</div><div className="sl-mockup-metric-label">Win Rate</div></div>
                <div className="sl-mockup-metric"><div className="sl-mockup-metric-val">4.2d</div><div className="sl-mockup-metric-label">Avg. Close Time</div></div>
                <div className="sl-mockup-metric"><div className="sl-mockup-metric-val">142</div><div className="sl-mockup-metric-label">Active Leads</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="sl-stats">
          {stats.map(s => (<div key={s.label} className="sl-stat"><div className="sl-stat-val">{s.value}</div><div className="sl-stat-label">{s.label}</div></div>))}
        </div>

        {/* Features */}
        <section id="features" className="sl-section" style={{ textAlign: "center" }}>
          <div className="sl-sec-label" style={{ textAlign: "center" }}>Features</div>
          <h2 className="sl-sec-title" style={{ maxWidth: "600px", margin: "0 auto 1rem" }}>Everything your sales team needs, in one place.</h2>
          <div className="sl-features">
            {features.map(f => (
              <div key={f.title} className="sl-feature" style={{ background: f.color }}>
                <div className="sl-feature-icon">{f.icon}</div>
                <div className="sl-feature-title">{f.title}</div>
                <div className="sl-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="sl-section" style={{ textAlign: "center" }}>
          <div className="sl-sec-label">How It Works</div>
          <h2 className="sl-sec-title">Up and running in minutes.</h2>
          <div className="sl-how">
            <div><div className="sl-how-num">1</div><div className="sl-how-title">Connect Your Channels</div><div className="sl-how-desc">Link your phone, email, and messaging tools. We integrate with 250+ platforms.</div></div>
            <div><div className="sl-how-num">2</div><div className="sl-how-title">Let AI Organize</div><div className="sl-how-desc">Our AI scores leads, transcribes calls, and suggests next best actions automatically.</div></div>
            <div><div className="sl-how-num">3</div><div className="sl-how-title">Close More Deals</div><div className="sl-how-desc">Focus on high-value opportunities while automation handles the rest.</div></div>
          </div>
        </section>

        {/* Integrations */}
        <section id="integrations" className="sl-section" style={{ textAlign: "center" }}>
          <div className="sl-sec-label">Integrations</div>
          <h2 className="sl-sec-title">Works with your favorite tools.</h2>
          <div className="sl-integrations">
            {integrations.map(i => <div key={i} className="sl-integration">{i}</div>)}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="sl-cta-section">
          <h2>Ready to transform your sales?</h2>
          <p>Join thousands of teams using Aqurion to close deals faster and smarter.</p>
          <a href="mailto:sales@aqurion.net" className="sl-cta-white">Start Free Trial →</a>
        </section>

        {/* Footer */}
        <footer className="sl-footer">
          <div className="sl-footer-links">
            <a href="https://Aqurion.NET" className="sl-footer-link">Aqurion Holdings</a>
            <a href="https://AqurionDev.com" className="sl-footer-link">Development</a>
            <a href="https://Aqurion.AI" className="sl-footer-link">AI</a>
            <a href="https://AqurionMarketing.com" className="sl-footer-link">Marketing</a>
          </div>
          <p style={{ color: "#ccc" }}>© {new Date().getFullYear()} Aqurion Sales — An Aqurion Holdings Company</p>
        </footer>
      </div>
    </>
  );
}
