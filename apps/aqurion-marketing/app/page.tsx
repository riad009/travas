"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const fadeUp = { hidden: { opacity: 0, y: 35 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }) };
function Rv({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.6,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const services = [
  { num: "01", title: "Branding", items: ["Logo & Visual Identity", "Brand Strategy", "Voice & Copywriting", "Packaging Design", "Rebranding"], color: "#EBD96B" },
  { num: "02", title: "Social Media", items: ["Content Creation", "Community Management", "Influencer Marketing", "Paid Social Ads", "Strategy & Audits"], color: "#B4D7C4" },
  { num: "03", title: "Digital Marketing", items: ["SEO & Content", "PPC & Google Ads", "Email Automation", "CRO Optimization", "Analytics"], color: "#C4B4D7" },
];

const projects = [
  { title: "SaaS launch campaign drives 400% MRR growth", stats: [{ val: "400%", label: "MRR Growth" }, { val: "12K+", label: "New Users" }], color: "#EBD96B" },
  { title: "E-commerce rebrand increases conversion 65%", stats: [{ val: "65%", label: "Conversion" }, { val: "$2.4M", label: "Revenue" }], color: "#B4D7C4" },
  { title: "B2B lead gen delivers 3x pipeline growth", stats: [{ val: "3x", label: "Pipeline" }, { val: "82%", label: "SQL Rate" }], color: "#C4B4D7" },
];

const pricing = [
  { name: "Starter", price: "$2,999", desc: "For companies getting started.", features: ["Brand strategy", "8 social posts/mo", "Basic SEO", "Monthly report"], pop: false },
  { name: "Growth", price: "$5,999", desc: "Ready to scale.", features: ["Everything in Starter", "16 social posts/mo", "Full content suite", "$5K ad management", "Bi-weekly calls"], pop: true },
  { name: "Enterprise", price: "Custom", desc: "Large-scale solutions.", features: ["Everything in Growth", "Unlimited content", "Dedicated manager", "Custom dashboards"], pop: false },
];

export default function MarketingPage() {
  const bp = process.env.NODE_ENV === "development" ? "/marketing" : "";
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .mk{background:#0C0C0C;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .mk-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 30% 40%,rgba(235,217,107,0.03),transparent),radial-gradient(ellipse 50% 60% at 70% 60%,rgba(180,215,196,0.03),transparent);animation:meshA 20s ease-in-out infinite alternate;}
        @keyframes meshA{0%{opacity:0.8;}100%{opacity:1.2;}}
        .mk-content{position:relative;z-index:1;}
        .mk-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(12,12,12,0.8);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.04);}
        .mk-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#fff;}
        .mk-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .mk-cta{padding:0.55rem 1.5rem;border-radius:50px;background:#EBD96B;color:#0C0C0C;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;}
        .mk-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(235,217,107,0.2);}

        .mk-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;}
        .mk-hero-orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(235,217,107,0.06),transparent 70%);top:20%;left:50%;transform:translate(-50%,-50%);animation:mkOrb 6s ease-in-out infinite;}
        @keyframes mkOrb{0%,100%{transform:translate(-50%,-50%) scale(1);}50%{transform:translate(-50%,-50%) scale(1.15);}}
        .mk-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.5rem,8vw,6rem);font-weight:700;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;position:relative;}
        .mk-grad{background:linear-gradient(135deg,#EBD96B,#B4D7C4,#C4B4D7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:300% 300%;animation:mkGrad 6s ease infinite;}
        @keyframes mkGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .mk-hero-sub{font-size:1.15rem;color:rgba(255,255,255,0.3);max-width:520px;line-height:1.8;margin-bottom:3rem;position:relative;}

        .mk-section{padding:7rem 2rem;max-width:1200px;margin:0 auto;}
        .mk-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#EBD96B;margin-bottom:1rem;}
        .mk-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:3rem;}

        .mk-services{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        .mk-svc{padding:2.5rem;border-radius:24px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);transition:all 0.4s;}
        .mk-svc:hover{transform:translateY(-6px);border-color:rgba(235,217,107,0.15);}
        .mk-svc-num{font-family:'Space Grotesk',sans-serif;font-size:3rem;font-weight:700;margin-bottom:1rem;-webkit-text-fill-color:transparent;-webkit-text-stroke:1px;opacity:0.15;}
        .mk-svc-title{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:1.25rem;}
        .mk-svc-list{list-style:none;}
        .mk-svc-list li{padding:0.4rem 0;font-size:0.85rem;color:rgba(255,255,255,0.35);display:flex;align-items:center;gap:0.5rem;}
        .mk-svc-list li::before{content:'';width:4px;height:4px;border-radius:50%;flex-shrink:0;}

        .mk-projects{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        .mk-project{padding:2.5rem;border-radius:24px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);transition:all 0.4s;}
        .mk-project:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.08);}
        .mk-project-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;margin-bottom:1.5rem;line-height:1.4;}
        .mk-project-stats{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .mk-project-stat-val{font-family:'Space Grotesk',sans-serif;font-size:1.8rem;font-weight:700;margin-bottom:0.15rem;}
        .mk-project-stat-label{font-size:0.68rem;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;}

        .mk-pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;text-align:left;}
        .mk-plan{padding:2.5rem;border-radius:24px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);transition:all 0.4s;}
        .mk-plan.pop{border-color:rgba(235,217,107,0.2);background:rgba(235,217,107,0.03);}
        .mk-plan:hover{transform:translateY(-4px);}
        .mk-plan-name{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);}
        .mk-plan-price{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;margin:0.5rem 0;}
        .mk-plan-price span{font-size:1rem;color:rgba(255,255,255,0.2);}
        .mk-plan-desc{font-size:0.82rem;color:rgba(255,255,255,0.25);margin-bottom:1.5rem;}
        .mk-plan-list{list-style:none;}
        .mk-plan-list li{padding:0.35rem 0;font-size:0.82rem;color:rgba(255,255,255,0.4);}
        .mk-plan-btn{display:block;width:100%;padding:0.7rem;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:#fff;font-weight:600;font-size:0.82rem;cursor:pointer;margin-top:1.5rem;text-align:center;text-decoration:none;transition:all 0.3s;}
        .mk-plan-btn:hover{background:rgba(255,255,255,0.04);}
        .mk-plan-btn.pop{background:#EBD96B;color:#0C0C0C;border:none;}
        .mk-plan-btn.pop:hover{box-shadow:0 8px 20px rgba(235,217,107,0.2);}

        .mk-cta-sec{text-align:center;padding:8rem 2rem;margin:0 3rem 4rem;border-radius:24px;border:1px solid rgba(235,217,107,0.08);position:relative;overflow:hidden;}
        .mk-cta-sec::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(235,217,107,0.03),rgba(180,215,196,0.02));}
        .mk-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .mk-cta-sec p{color:rgba(255,255,255,0.3);margin-bottom:2.5rem;max-width:420px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;}
        .mk-footer{padding:3rem;text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.12);border-top:1px solid rgba(255,255,255,0.04);}
        @media(max-width:768px){.mk-nav{padding:1rem 1.5rem;}.mk-services,.mk-projects,.mk-pricing{grid-template-columns:1fr;}.mk-cta-sec{margin:0 1rem 3rem;}}
      `}</style>
      <div className="mk">
        <div className="mk-mesh" />
        <div className="mk-content">
          <nav className="mk-nav"><a href={`${bp}/`} className="mk-nav-logo"><img src={`${bp}/logos/aqurion-marketing-icon.png`} alt="" />Aqurion Marketing</a><a href="#contact" className="mk-cta">Get a Quote</a></nav>
          <section className="mk-hero">
            <div className="mk-hero-orb" />
            <Rv><h1>Marketing that<br /><span className="mk-grad">moves</span>.</h1></Rv>
            <Rv d={0.1}><p className="mk-hero-sub">Branding, social media, and digital marketing that drives real results for modern businesses.</p></Rv>
            <Rv d={0.2}><a href="#contact" className="mk-cta" style={{ padding: "0.75rem 2.5rem" }}>Get Started →</a></Rv>
          </section>
          <section className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">Services</div><h2 className="mk-title">Full-spectrum marketing.</h2></Rv>
            <div className="mk-services">{services.map((s, i) => <Rv key={s.title} d={i * 0.1}><div className="mk-svc"><div className="mk-svc-num">{s.num}</div><div className="mk-svc-title" style={{ color: s.color }}>{s.title}</div><ul className="mk-svc-list">{s.items.map(it => <li key={it} style={{ "--dot": s.color } as React.CSSProperties}><span style={{ background: s.color, width: 4, height: 4, borderRadius: "50%", display: "inline-block" }} />{it}</li>)}</ul></div></Rv>)}</div>
          </section>
          <section className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">Results</div><h2 className="mk-title">Proven outcomes.</h2></Rv>
            <div className="mk-projects">{projects.map((p, i) => <Rv key={p.title} d={i * 0.1}><div className="mk-project"><div className="mk-project-title">{p.title}</div><div className="mk-project-stats">{p.stats.map(s => <div key={s.label}><div className="mk-project-stat-val" style={{ color: p.color }}>{s.val}</div><div className="mk-project-stat-label">{s.label}</div></div>)}</div></div></Rv>)}</div>
          </section>
          <section className="mk-section" style={{ textAlign: "center" }}>
            <Rv><div className="mk-label">Pricing</div><h2 className="mk-title">Transparent pricing.</h2></Rv>
            <div className="mk-pricing">{pricing.map((p, i) => <Rv key={p.name} d={i * 0.1}><div className={`mk-plan${p.pop ? " pop" : ""}`}><div className="mk-plan-name">{p.name}</div><div className="mk-plan-price">{p.price}<span>/mo</span></div><div className="mk-plan-desc">{p.desc}</div><ul className="mk-plan-list">{p.features.map(f => <li key={f}>✓ {f}</li>)}</ul><a href="#contact" className={`mk-plan-btn${p.pop ? " pop" : ""}`}>{p.pop ? "Start Growing" : "Get Started"}</a></div></Rv>)}</div>
          </section>
          <Rv><section id="contact" className="mk-cta-sec"><h2>Ready to <span className="mk-grad">grow</span>?</h2><p>Let's build a marketing strategy that delivers real results.</p><a href="mailto:marketing@aqurion.net" className="mk-cta" style={{ padding: "0.75rem 2.5rem" }}>Get a Free Quote →</a></section></Rv>
          <footer className="mk-footer">© {new Date().getFullYear()} Aqurion Marketing — An Aqurion Holdings Company</footer>
        </div>
      </div>
    </>
  );
}
