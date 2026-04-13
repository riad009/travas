"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const fadeUp = { hidden: { opacity: 0, y: 35 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }) };
function Rv({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.6,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const features = [
  { icon: "🎯", title: "Lead Intelligence", desc: "AI-scored leads with buying intent signals, company data, and contact enrichment.", color: "#10B981" },
  { icon: "📊", title: "Pipeline Management", desc: "Visual deal boards with automated stage progression and revenue forecasting.", color: "#3B82F6" },
  { icon: "🤖", title: "AI Sales Rep", desc: "Automated outreach, follow-ups, and meeting scheduling that sounds human.", color: "#8B5CF6" },
  { icon: "💬", title: "Multi-Channel Outreach", desc: "Email, LinkedIn, SMS, and calls from one unified inbox.", color: "#F59E0B" },
  { icon: "📈", title: "Revenue Analytics", desc: "Real-time dashboards, win-rate analysis, and team performance tracking.", color: "#EF4444" },
  { icon: "🔗", title: "CRM Integration", desc: "Two-way sync with Salesforce, HubSpot, and every Aqurion application.", color: "#06B6D4" },
];

const stats = [{ val: "3.2x", label: "Average ROI" }, { val: "47%", label: "Faster Close" }, { val: "10K+", label: "Sales Reps" }, { val: "99.9%", label: "Uptime" }];

export default function SalesPage() {
  const bp = process.env.NODE_ENV === "development" ? "/sales" : "";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .sl{background:#FAFBFD;color:#0F172A;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .sl-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(250,251,253,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,0.04);}
        .sl-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#0F172A;}
        .sl-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .sl-cta{padding:0.55rem 1.5rem;border-radius:50px;background:#10B981;color:#fff;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;}
        .sl-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(16,185,129,0.25);}

        .sl-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;overflow:hidden;}
        .sl-hero-bg{position:absolute;inset:0;background:linear-gradient(180deg,#ECFDF5 0%,#F0FDF4 40%,#FAFBFD 100%);}
        .sl-hero-orb1{position:absolute;top:10%;right:15%;width:350px;height:350px;border-radius:50%;background:rgba(16,185,129,0.06);filter:blur(80px);animation:slFloat 10s ease-in-out infinite;}
        .sl-hero-orb2{position:absolute;bottom:15%;left:10%;width:300px;height:300px;border-radius:50%;background:rgba(59,130,246,0.04);filter:blur(80px);animation:slFloat 12s ease-in-out infinite reverse;}
        @keyframes slFloat{0%,100%{transform:translate(0,0);}50%{transform:translate(25px,-25px);}}
        .sl-hero-content{position:relative;z-index:1;}
        .sl-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.5rem,8vw,6rem);font-weight:700;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;}
        .sl-grad{background:linear-gradient(135deg,#10B981,#059669);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .sl-hero-sub{font-size:1.15rem;color:rgba(15,23,42,0.45);max-width:520px;line-height:1.8;margin-bottom:3rem;}

        .sl-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin:0 3rem;border-radius:20px;overflow:hidden;background:rgba(0,0,0,0.04);}
        .sl-stat{background:#fff;padding:3rem 2rem;text-align:center;}
        .sl-stat-val{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;color:#10B981;}
        .sl-stat-label{font-size:0.72rem;color:rgba(15,23,42,0.3);text-transform:uppercase;letter-spacing:0.12em;}

        .sl-section{padding:7rem 2rem;max-width:1200px;margin:0 auto;text-align:center;}
        .sl-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#10B981;margin-bottom:1rem;}
        .sl-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:3rem;}

        .sl-features{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left;}
        .sl-feature{padding:2.5rem;border-radius:20px;background:#fff;border:1px solid rgba(0,0,0,0.04);transition:all 0.4s;position:relative;overflow:hidden;}
        .sl-feature::before{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--accent);transform:scaleX(0);transition:transform 0.4s;transform-origin:left;}
        .sl-feature:hover::before{transform:scaleX(1);}
        .sl-feature:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,0.06);}
        .sl-feature-icon{font-size:1.5rem;margin-bottom:1.25rem;display:inline-flex;width:56px;height:56px;border-radius:16px;align-items:center;justify-content:center;background:rgba(16,185,129,0.06);}
        .sl-feature-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.05rem;margin-bottom:0.5rem;}
        .sl-feature-desc{font-size:0.85rem;color:rgba(15,23,42,0.4);line-height:1.7;}

        .sl-cta-sec{text-align:center;padding:8rem 2rem;background:linear-gradient(135deg,#10B981,#059669);color:#fff;border-radius:32px;margin:0 3rem 4rem;position:relative;overflow:hidden;}
        .sl-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .sl-cta-sec p{color:rgba(255,255,255,0.6);margin-bottom:2.5rem;max-width:420px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;}
        .sl-cta-white{padding:0.75rem 2rem;border-radius:50px;background:#fff;color:#10B981;font-weight:700;font-size:0.88rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;position:relative;}
        .sl-cta-white:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.2);}
        .sl-footer{padding:3rem;text-align:center;font-size:0.72rem;color:rgba(15,23,42,0.25);}
        @media(max-width:768px){.sl-nav{padding:1rem 1.5rem;}.sl-stats{grid-template-columns:repeat(2,1fr);margin:0 1rem;}.sl-features{grid-template-columns:1fr;}.sl-cta-sec{margin:0 1rem 3rem;}}
      `}</style>
      <div className="sl">
        <nav className="sl-nav"><a href={`${bp}/`} className="sl-nav-logo"><img src={`${bp}/logos/aqurion-sales-icon.png`} alt="" />Aqurion Sales</a><a href="#contact" className="sl-cta">Start Free Trial</a></nav>
        <section className="sl-hero">
          <div className="sl-hero-bg" /><div className="sl-hero-orb1" /><div className="sl-hero-orb2" />
          <div className="sl-hero-content">
            <Rv><h1>Close faster.<br />Sell <span className="sl-grad">smarter</span>.</h1></Rv>
            <Rv d={0.1}><p className="sl-hero-sub">AI-powered sales platform with lead intelligence, pipeline management, and automated outreach.</p></Rv>
            <Rv d={0.2}><a href="#contact" className="sl-cta" style={{ padding: "0.75rem 2.5rem" }}>Start Free Trial →</a></Rv>
          </div>
        </section>
        <Rv><div className="sl-stats">{stats.map(s => <div key={s.label} className="sl-stat"><div className="sl-stat-val">{s.val}</div><div className="sl-stat-label">{s.label}</div></div>)}</div></Rv>
        <section className="sl-section">
          <Rv><div className="sl-label">Features</div><h2 className="sl-title">Everything sales teams need.</h2></Rv>
          <div className="sl-features">{features.map((f, i) => <Rv key={f.title} d={i * 0.08}><div className="sl-feature" style={{ "--accent": f.color } as React.CSSProperties}><div className="sl-feature-icon">{f.icon}</div><div className="sl-feature-title">{f.title}</div><div className="sl-feature-desc">{f.desc}</div></div></Rv>)}</div>
        </section>
        <Rv><section id="contact" className="sl-cta-sec"><h2>Close more deals</h2><p>14-day free trial. No credit card required.</p><a href="mailto:sales@aqurion.net" className="sl-cta-white">Start Free Trial →</a></section></Rv>
        <footer className="sl-footer">© {new Date().getFullYear()} Aqurion Sales — An Aqurion Holdings Company</footer>
      </div>
    </>
  );
}
