"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
function R({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.7,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const features = [
  { icon: "🏪", title: "Storefront Builder", desc: "Launch a beautiful online store in minutes with AI-powered design templates.", gradient: "linear-gradient(135deg, #FF6B6B, #FFE66D)" },
  { icon: "💳", title: "Payments", desc: "Accept credit cards, digital wallets, and crypto. Lower fees than Shopify.", gradient: "linear-gradient(135deg, #4ECDC4, #556270)" },
  { icon: "📦", title: "Inventory", desc: "Real-time inventory tracking across online and physical locations.", gradient: "linear-gradient(135deg, #7C3AED, #3B82F6)" },
  { icon: "🤖", title: "AI Assistant", desc: "Smart product descriptions, pricing recommendations, and marketing copy.", gradient: "linear-gradient(135deg, #EC4899, #F59E0B)" },
  { icon: "📊", title: "Analytics", desc: "Customer insights, conversion funnels, and revenue dashboards.", gradient: "linear-gradient(135deg, #10B981, #06B6D4)" },
  { icon: "🚚", title: "Fulfillment", desc: "Integrated shipping with USPS, FedEx, and UPS. Print labels instantly.", gradient: "linear-gradient(135deg, #F97316, #EF4444)" },
];

export default function StoresPage() {
  const bp = process.env.NODE_ENV === "development" ? "/stores" : "";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .st { background: #0A0A0A; color: #fff; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .st-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 3rem; background: rgba(10,10,10,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.04); }
        .st-nav-logo { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; font-weight: 700; text-decoration: none; color: #fff; }
        .st-nav-logo img { width: 32px; height: 32px; border-radius: 10px; }
        .st-cta { padding: 0.55rem 1.5rem; border-radius: 50px; background: linear-gradient(135deg, #F59E0B, #F97316); color: #000; font-weight: 700; font-size: 0.82rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.3s; }
        .st-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(245,158,11,0.25); }

        .st-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; }
        .st-hero-glow { position: absolute; top: 15%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 700px; background: radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%); animation: stPulse 5s ease-in-out infinite; }
        @keyframes stPulse { 0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); } }
        .st-hero-rings { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
        .st-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(245,158,11,0.06); }
        .st-ring:nth-child(1) { width: 400px; height: 400px; top: -200px; left: -200px; animation: ringRot 30s linear infinite; }
        .st-ring:nth-child(2) { width: 600px; height: 600px; top: -300px; left: -300px; animation: ringRot 40s linear infinite reverse; }
        .st-ring:nth-child(3) { width: 800px; height: 800px; top: -400px; left: -400px; animation: ringRot 50s linear infinite; }
        @keyframes ringRot { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .st-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(3.5rem, 8vw, 6rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 1.5rem; position: relative; }
        .st-grad { background: linear-gradient(135deg, #F59E0B, #F97316, #EF4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% 200%; animation: gradAnim 4s ease infinite; }
        @keyframes gradAnim { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .st-hero-sub { font-size: 1.15rem; color: rgba(255,255,255,0.35); max-width: 550px; line-height: 1.8; margin-bottom: 3rem; position: relative; }

        .st-section { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; text-align: center; }
        .st-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #F59E0B; margin-bottom: 1rem; }
        .st-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 3rem; }

        .st-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .st-feature { padding: 2.5rem; border-radius: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); text-align: left; transition: all 0.4s; position: relative; overflow: hidden; cursor: default; }
        .st-feature:hover { transform: translateY(-6px); border-color: rgba(245,158,11,0.15); background: rgba(255,255,255,0.04); }
        .st-feature-glow { position: absolute; top: -50px; left: -50px; width: 150px; height: 150px; border-radius: 50%; opacity: 0; transition: opacity 0.4s; filter: blur(60px); }
        .st-feature:hover .st-feature-glow { opacity: 0.3; }
        .st-feature-icon { font-size: 1.5rem; margin-bottom: 1.25rem; display: inline-flex; width: 56px; height: 56px; border-radius: 16px; align-items: center; justify-content: center; background: rgba(255,255,255,0.04); }
        .st-feature-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .st-feature-desc { font-size: 0.88rem; color: rgba(255,255,255,0.35); line-height: 1.7; }

        /* Pricing */
        .st-pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; text-align: left; }
        .st-plan { padding: 2.5rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); transition: all 0.4s; }
        .st-plan.pop { border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.04); }
        .st-plan:hover { transform: translateY(-4px); }
        .st-plan-name { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); }
        .st-plan-price { font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; margin: 0.5rem 0 0.25rem; }
        .st-plan-price span { font-size: 1rem; color: rgba(255,255,255,0.25); font-weight: 400; }
        .st-plan-desc { font-size: 0.82rem; color: rgba(255,255,255,0.3); margin-bottom: 2rem; line-height: 1.6; }
        .st-plan-list { list-style: none; }
        .st-plan-list li { padding: 0.45rem 0; font-size: 0.85rem; color: rgba(255,255,255,0.5); display: flex; gap: 0.5rem; align-items: center; }
        .st-plan-list li::before { content: ''; width: 18px; height: 18px; border-radius: 50%; background: rgba(78,205,196,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .st-plan-btn { display: block; width: 100%; padding: 0.75rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #fff; font-weight: 600; font-size: 0.85rem; cursor: pointer; margin-top: 2rem; transition: all 0.3s; text-align: center; text-decoration: none; }
        .st-plan-btn:hover { background: rgba(255,255,255,0.06); }
        .st-plan-btn.pop { background: linear-gradient(135deg, #F59E0B, #F97316); border: none; color: #000; }
        .st-plan-btn.pop:hover { box-shadow: 0 8px 30px rgba(245,158,11,0.25); }

        .st-cta-sec { text-align: center; padding: 8rem 2rem; margin: 0 3rem 4rem; border-radius: 32px; border: 1px solid rgba(245,158,11,0.1); position: relative; overflow: hidden; }
        .st-cta-sec::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(245,158,11,0.04), rgba(249,115,22,0.02)); }
        .st-cta-sec h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 1rem; position: relative; }
        .st-cta-sec p { color: rgba(255,255,255,0.35); margin-bottom: 2.5rem; max-width: 420px; margin-left: auto; margin-right: auto; position: relative; line-height: 1.7; }

        .st-footer { padding: 3rem; text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.15); border-top: 1px solid rgba(255,255,255,0.04); }
        @media (max-width: 768px) { .st-nav { padding: 1rem 1.5rem; } .st-features, .st-pricing { grid-template-columns: 1fr; } .st-cta-sec { margin: 0 1rem 3rem; } }
      `}</style>
      <div className="st">
        <nav className="st-nav"><a href={`${bp}/`} className="st-nav-logo"><img src={`${bp}/logos/aqurion-stores-icon.png`} alt="" />Aqurion Stores</a><a href="#contact" className="st-cta">Start Free Trial</a></nav>
        <section className="st-hero">
          <div className="st-hero-glow" />
          <div className="st-hero-rings"><div className="st-ring" /><div className="st-ring" /><div className="st-ring" /></div>
          <R><h1>Your store,<br /><span className="st-grad">your way</span>.</h1></R>
          <R d={0.1}><p className="st-hero-sub">Build, launch, and grow your ecommerce business with AI-powered tools and lower fees than the competition.</p></R>
          <R d={0.2}><a href="#contact" className="st-cta" style={{ padding: "0.75rem 2.5rem", fontSize: "0.92rem" }}>Start Free Trial →</a></R>
        </section>
        <section className="st-section">
          <R><div className="st-label">Features</div><h2 className="st-title">Everything you need to sell online</h2></R>
          <div className="st-features">
            {features.map((f, i) => <R key={f.title} d={i * 0.08}><div className="st-feature"><div className="st-feature-glow" style={{ background: f.gradient }} /><div className="st-feature-icon">{f.icon}</div><div className="st-feature-title">{f.title}</div><div className="st-feature-desc">{f.desc}</div></div></R>)}
          </div>
        </section>
        <section className="st-section">
          <R><div className="st-label">Pricing</div><h2 className="st-title">Plans that grow with you</h2></R>
          <div className="st-pricing">
            <R><div className="st-plan"><div className="st-plan-name">Starter</div><div className="st-plan-price">$19<span>/mo</span></div><div className="st-plan-desc">Perfect for new sellers.</div><ul className="st-plan-list"><li>Unlimited products</li><li>2% transaction fee</li><li>Basic analytics</li><li>Email support</li></ul><a href="#contact" className="st-plan-btn">Get Started</a></div></R>
            <R d={0.1}><div className="st-plan pop"><div className="st-plan-name" style={{ color: "#F59E0B" }}>Growth ✦</div><div className="st-plan-price">$49<span>/mo</span></div><div className="st-plan-desc">For growing businesses.</div><ul className="st-plan-list"><li>Everything in Starter</li><li>1% transaction fee</li><li>AI product descriptions</li><li>Advanced analytics</li><li>Priority support</li></ul><a href="#contact" className="st-plan-btn pop">Start Free Trial</a></div></R>
            <R d={0.2}><div className="st-plan"><div className="st-plan-name">Enterprise</div><div className="st-plan-price">Custom</div><div className="st-plan-desc">For high-volume sellers.</div><ul className="st-plan-list"><li>Everything in Growth</li><li>0.5% transaction fee</li><li>Dedicated manager</li><li>Custom integrations</li><li>SLA guarantee</li></ul><a href="#contact" className="st-plan-btn">Contact Sales</a></div></R>
          </div>
        </section>
        <R><section id="contact" className="st-cta-sec"><h2>Start selling today</h2><p>14-day free trial. No credit card required.</p><a href="mailto:stores@aqurion.net" className="st-cta" style={{ padding: "0.75rem 2.5rem" }}>Get Started Free →</a></section></R>
        <footer className="st-footer"><p>© {new Date().getFullYear()} Aqurion Stores — An Aqurion Holdings Company</p></footer>
      </div>
    </>
  );
}
