"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
function R({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}>{children}</motion.div>;
}

const categories = [
  { icon: "🍕", name: "Restaurants", count: "12,400+", color: "#F59E0B" },
  { icon: "🏠", name: "Home Services", count: "8,200+", color: "#10B981" },
  { icon: "🏋️", name: "Fitness", count: "5,600+", color: "#EF4444" },
  { icon: "🚗", name: "Automotive", count: "4,100+", color: "#3B82F6" },
  { icon: "💇", name: "Beauty & Spa", count: "7,800+", color: "#EC4899" },
  { icon: "⚖️", name: "Legal", count: "3,200+", color: "#8B5CF6" },
  { icon: "🐾", name: "Pet Services", count: "2,900+", color: "#F97316" },
  { icon: "📸", name: "Photography", count: "1,800+", color: "#06B6D4" },
];

const features = [
  { icon: "🔍", title: "Smart Search", desc: "AI-powered search that understands what you need, not just what you type." },
  { icon: "⭐", title: "Verified Reviews", desc: "Authentic reviews from real customers. No fakes, no bots." },
  { icon: "💸", title: "Exclusive Deals", desc: "Save with cashback offers and coupons from local businesses." },
  { icon: "📍", title: "Nearby Discovery", desc: "Find the best businesses within walking distance, instantly." },
];

export default function DirectoryPage() {
  const bp = process.env.NODE_ENV === "development" ? "/directory" : "";
  const [q, setQ] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .dr { background: #FAFBFD; color: #0F172A; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        .dr-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1rem 3rem; background: rgba(250,251,253,0.85); backdrop-filter: blur(20px) saturate(1.4); border-bottom: 1px solid rgba(0,0,0,0.04); }
        .dr-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #0F172A; }
        .dr-nav-logo img { width: 32px; height: 32px; border-radius: 10px; }
        .dr-cta-btn { padding: 0.55rem 1.5rem; border-radius: 50px; background: #7C3AED; color: #fff; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .dr-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(124,58,237,0.25); }

        /* Hero */
        .dr-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; overflow: hidden; }
        .dr-hero-bg { position: absolute; inset: 0; background: linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 40%, #FAFBFD 100%); }
        .dr-hero-orb1 { position: absolute; top: 10%; left: 15%; width: 300px; height: 300px; border-radius: 50%; background: rgba(124,58,237,0.08); filter: blur(80px); animation: float1 8s ease-in-out infinite; }
        .dr-hero-orb2 { position: absolute; top: 30%; right: 10%; width: 250px; height: 250px; border-radius: 50%; background: rgba(236,72,153,0.06); filter: blur(80px); animation: float2 10s ease-in-out infinite; }
        @keyframes float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -30px); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, 20px); } }

        .dr-hero-content { position: relative; z-index: 1; }
        .dr-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(3.5rem, 8vw, 6rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 1.5rem; max-width: 800px; }
        .dr-hero h1 .dr-grad { background: linear-gradient(135deg, #7C3AED, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .dr-hero-sub { font-size: 1.15rem; color: rgba(15,23,42,0.5); max-width: 500px; line-height: 1.8; margin-bottom: 2.5rem; }

        .dr-search { display: flex; max-width: 600px; width: 100%; background: #fff; border-radius: 16px; box-shadow: 0 4px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04); overflow: hidden; border: 2px solid transparent; transition: all 0.3s; margin-bottom: 2.5rem; }
        .dr-search:focus-within { border-color: #7C3AED; box-shadow: 0 4px 30px rgba(124,58,237,0.15); }
        .dr-search input { flex: 1; padding: 1.1rem 1.5rem; border: none; font-size: 1rem; outline: none; font-family: 'Inter', sans-serif; background: transparent; }
        .dr-search button { padding: 1rem 2rem; background: #7C3AED; color: #fff; border: none; font-weight: 700; font-size: 0.95rem; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.3s; }
        .dr-search button:hover { background: #6D28D9; }

        .dr-cats { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; max-width: 700px; }
        .dr-cat { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.2rem; border-radius: 50px; background: #fff; border: 1px solid rgba(0,0,0,0.06); font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .dr-cat:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); border-color: rgba(124,58,237,0.2); }
        .dr-cat-count { font-size: 0.68rem; color: rgba(15,23,42,0.3); }

        /* Features */
        .dr-section { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; text-align: center; }
        .dr-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #7C3AED; margin-bottom: 1rem; }
        .dr-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 3rem; }

        .dr-features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .dr-feature { padding: 2.5rem 2rem; border-radius: 20px; background: #fff; text-align: left; border: 1px solid rgba(0,0,0,0.04); transition: all 0.4s; position: relative; overflow: hidden; }
        .dr-feature::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7C3AED, #EC4899); transform: scaleX(0); transition: transform 0.4s; transform-origin: left; }
        .dr-feature:hover::before { transform: scaleX(1); }
        .dr-feature:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
        .dr-feature-icon { font-size: 2rem; margin-bottom: 1.25rem; display: inline-block; width: 56px; height: 56px; background: #F5F3FF; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .dr-feature-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; margin-bottom: 0.5rem; font-size: 1.05rem; }
        .dr-feature-desc { font-size: 0.85rem; color: rgba(15,23,42,0.45); line-height: 1.7; }

        /* CTA */
        .dr-cta-sec { text-align: center; padding: 8rem 2rem; background: linear-gradient(135deg, #7C3AED, #6D28D9); color: #fff; border-radius: 32px; margin: 0 3rem 4rem; position: relative; overflow: hidden; }
        .dr-cta-orb { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.05); filter: blur(60px); }
        .dr-cta-sec h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 1rem; position: relative; }
        .dr-cta-sec p { color: rgba(255,255,255,0.6); margin-bottom: 2rem; max-width: 420px; margin-left: auto; margin-right: auto; position: relative; line-height: 1.7; }
        .dr-cta-white { padding: 0.75rem 2rem; border-radius: 50px; background: #fff; color: #7C3AED; font-weight: 700; font-size: 0.88rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; position: relative; }
        .dr-cta-white:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }

        .dr-footer { padding: 3rem; text-align: center; font-size: 0.72rem; color: rgba(15,23,42,0.25); }
        .dr-footer-links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; }
        .dr-footer-link { color: rgba(15,23,42,0.35); text-decoration: none; font-size: 0.78rem; transition: color 0.2s; }
        .dr-footer-link:hover { color: #7C3AED; }

        @media (max-width: 768px) { .dr-nav { padding: 1rem 1.5rem; } .dr-features { grid-template-columns: 1fr 1fr; } .dr-cta-sec { margin: 0 1rem 3rem; } }
      `}</style>

      <div className="dr">
        <nav className="dr-nav">
          <a href={`${bp}/`} className="dr-nav-logo"><img src={`${bp}/logos/aqurion-directory-icon.png`} alt="" />Aqurion Directory</a>
          <a href="#contact" className="dr-cta-btn">List Your Business</a>
        </nav>

        <section className="dr-hero">
          <div className="dr-hero-bg" />
          <div className="dr-hero-orb1" />
          <div className="dr-hero-orb2" />
          <div className="dr-hero-content">
            <R><h1>Find the <span className="dr-grad">best</span> local businesses.</h1></R>
            <R delay={0.1}><p className="dr-hero-sub">Discover, review, and save with 50,000+ verified businesses across every category.</p></R>
            <R delay={0.2}>
              <div className="dr-search">
                <input type="text" placeholder="What are you looking for?" value={q} onChange={e => setQ(e.target.value)} />
                <button>Search</button>
              </div>
            </R>
            <R delay={0.3}>
              <div className="dr-cats">
                {categories.map(c => <div key={c.name} className="dr-cat"><span>{c.icon}</span> {c.name} <span className="dr-cat-count">{c.count}</span></div>)}
              </div>
            </R>
          </div>
        </section>

        <section className="dr-section">
          <R><div className="dr-label">Why Aqurion Directory</div></R>
          <R delay={0.1}><h2 className="dr-title">Smarter discovery for modern consumers.</h2></R>
          <div className="dr-features">
            {features.map((f, i) => (
              <R key={f.title} delay={i * 0.1}>
                <div className="dr-feature">
                  <div className="dr-feature-icon">{f.icon}</div>
                  <div className="dr-feature-title">{f.title}</div>
                  <div className="dr-feature-desc">{f.desc}</div>
                </div>
              </R>
            ))}
          </div>
        </section>

        <R>
          <section id="contact" className="dr-cta-sec">
            <div className="dr-cta-orb" style={{ top: "-80px", left: "10%" }} />
            <div className="dr-cta-orb" style={{ bottom: "-100px", right: "15%" }} />
            <h2>List your business today</h2>
            <p>Join thousands of businesses already on Aqurion Directory and get discovered by local customers.</p>
            <a href="mailto:directory@aqurion.net" className="dr-cta-white">Get Listed Free →</a>
          </section>
        </R>

        <footer className="dr-footer">
          <div className="dr-footer-links">
            <a href="https://Aqurion.NET" className="dr-footer-link">Holdings</a>
            <a href="https://AqurionDev.com" className="dr-footer-link">Development</a>
            <a href="https://Aqurion.AI" className="dr-footer-link">AI</a>
          </div>
          <p>© {new Date().getFullYear()} Aqurion Directory — An Aqurion Holdings Company</p>
        </footer>
      </div>
    </>
  );
}
