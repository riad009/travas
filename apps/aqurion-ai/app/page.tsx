"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const fadeUp = { hidden: { opacity: 0, y: 35 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }) };
function Rv({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.6,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const sectors = [
  { name: "Property Services", icon: "🏢", color: "#3B82F6", apps: ["PropertyFlow", "HOAPro", "HotelSuite", "MarinaSuite", "ParkingFlow"] },
  { name: "Home Services", icon: "🏠", color: "#F97316", apps: ["HomeServicesSuite", "SolarPro", "ContractingPlus"] },
  { name: "Automotive", icon: "🚗", color: "#EF4444", apps: ["AutoSuite", "TowSuite", "MotorsOne"] },
  { name: "Finance & Legal", icon: "⚖️", color: "#8B5CF6", apps: ["LegalOne", "FinanceFlow", "EscrowSuite"] },
  { name: "Wellness & Fitness", icon: "🧘", color: "#22C55E", apps: ["SalonPro", "FitnessFlow", "SpaSuite", "DentalPro"] },
  { name: "Food & Hospitality", icon: "🍽️", color: "#D97706", apps: ["RestaurantOne", "CateringSuite", "BarSuite"] },
  { name: "Security & Utilities", icon: "🛡️", color: "#64748B", apps: ["SecurityMaster", "UtilitySuite", "MuniSuite"] },
  { name: "Education & Nonprofit", icon: "🎓", color: "#EC4899", apps: ["EducationSuite", "DonorFlow", "CareFlow"] },
  { name: "Retail & Commerce", icon: "🛍️", color: "#F43F5E", apps: ["RetailFlow", "EcommerceSuite", "PawnShopPro"] },
];

const features = [
  { icon: "🧠", title: "Cognitive Engine", desc: "Multi-modal AI that understands text, images, and context across 56+ industry verticals." },
  { icon: "⚡", title: "Real-Time Processing", desc: "Sub-100ms response times with edge-deployed models and streaming inference." },
  { icon: "🔗", title: "Ecosystem Integration", desc: "Pre-built connectors to every Aqurion application with zero-config setup." },
  { icon: "🛡️", title: "Enterprise Security", desc: "SOC 2 Type II compliant. Your data never leaves your tenant boundary." },
];

export default function AqurionAIPage() {
  const bp = process.env.NODE_ENV === "development" ? "/ai" : "";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 80; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5 });
    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${0.15 + Math.random() * 0.1})`; ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i]!.x - nodes[j]!.x, dy = nodes[i]!.y - nodes[j]!.y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(nodes[i]!.x, nodes[i]!.y); ctx.lineTo(nodes[j]!.x, nodes[j]!.y); ctx.strokeStyle = `rgba(0,212,255,${0.02*(1-d/120)})`; ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .ai{background:#030712;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .ai-canvas{position:fixed;inset:0;z-index:0;pointer-events:none;}
        .ai-content{position:relative;z-index:1;}
        .ai-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(3,7,18,0.8);backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,212,255,0.06);}
        .ai-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#fff;}
        .ai-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .ai-cta{padding:0.55rem 1.5rem;border-radius:50px;background:linear-gradient(135deg,#00D4FF,#0066FF);color:#fff;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;}
        .ai-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,212,255,0.25);}

        .ai-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;}
        .ai-hero-glow{position:absolute;top:20%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(0,212,255,0.08) 0%,transparent 70%);animation:aiPulse 5s ease-in-out infinite;}
        @keyframes aiPulse{0%,100%{opacity:0.5;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.15);}}
        .ai-hero-badge{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1.2rem;border-radius:50px;font-size:0.72rem;font-weight:600;background:rgba(0,212,255,0.06);color:#00D4FF;border:1px solid rgba(0,212,255,0.12);margin-bottom:2rem;}
        .ai-hero-badge-dot{width:6px;height:6px;border-radius:50%;background:#00D4FF;animation:blink 2s infinite;box-shadow:0 0 8px rgba(0,212,255,0.5);}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
        .ai-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.5rem,8vw,6rem);font-weight:700;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;}
        .ai-grad{background:linear-gradient(135deg,#00D4FF,#0066FF,#8B5CF6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:gradShift 5s ease infinite;}
        @keyframes gradShift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .ai-hero-sub{font-size:1.15rem;color:rgba(255,255,255,0.3);max-width:550px;line-height:1.8;margin-bottom:3rem;}
        .ai-ghost{padding:0.55rem 1.5rem;border-radius:50px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);font-weight:600;font-size:0.82rem;text-decoration:none;transition:all 0.3s;cursor:pointer;}
        .ai-ghost:hover{border-color:rgba(255,255,255,0.3);color:#fff;}
        .ai-hero-btns{display:flex;gap:1rem;}

        .ai-section{padding:7rem 2rem;max-width:1200px;margin:0 auto;text-align:center;}
        .ai-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#00D4FF;margin-bottom:1rem;}
        .ai-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:3rem;}

        .ai-features{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.03);border-radius:20px;overflow:hidden;}
        .ai-feature{background:rgba(3,7,18,0.95);padding:2.5rem;text-align:left;transition:all 0.4s;position:relative;overflow:hidden;}
        .ai-feature:hover{background:rgba(15,20,35,0.95);}
        .ai-feature::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00D4FF,#0066FF);transform:scaleX(0);transition:transform 0.4s;transform-origin:left;}
        .ai-feature:hover::before{transform:scaleX(1);}
        .ai-feature-icon{font-size:2rem;margin-bottom:1.25rem;display:inline-block;transition:transform 0.3s;}
        .ai-feature:hover .ai-feature-icon{transform:scale(1.15);}
        .ai-feature-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.05rem;margin-bottom:0.5rem;}
        .ai-feature-desc{font-size:0.85rem;color:rgba(255,255,255,0.3);line-height:1.7;}

        .ai-sectors{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;text-align:left;}
        .ai-sector{padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);transition:all 0.4s;cursor:default;}
        .ai-sector:hover{transform:translateY(-4px);border-color:rgba(0,212,255,0.12);}
        .ai-sector-header{display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;}
        .ai-sector-icon{font-size:1.5rem;}
        .ai-sector-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.95rem;}
        .ai-sector-apps{display:flex;flex-wrap:wrap;gap:0.3rem;}
        .ai-tag{padding:0.2rem 0.6rem;border-radius:50px;font-size:0.68rem;font-weight:500;background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.35);border:1px solid rgba(255,255,255,0.04);}

        .ai-marquee{overflow:hidden;padding:2rem 0;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);margin:4rem 0;}
        .ai-marquee-inner{display:flex;gap:4rem;animation:marquee 35s linear infinite;white-space:nowrap;}
        @keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .ai-marquee-item{font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:600;color:rgba(255,255,255,0.04);display:flex;align-items:center;gap:1rem;}
        .ai-marquee-dot{width:6px;height:6px;border-radius:50%;background:rgba(0,212,255,0.15);}

        .ai-cta-sec{text-align:center;padding:8rem 2rem;margin:0 3rem 4rem;border-radius:24px;border:1px solid rgba(0,212,255,0.08);position:relative;overflow:hidden;}
        .ai-cta-sec::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,212,255,0.04),rgba(0,102,255,0.02));}
        .ai-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .ai-cta-sec p{color:rgba(255,255,255,0.3);margin-bottom:2.5rem;max-width:420px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;}
        .ai-footer{padding:3rem;text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.12);border-top:1px solid rgba(255,255,255,0.04);}
        @media(max-width:768px){.ai-nav{padding:1rem 1.5rem;}.ai-features{grid-template-columns:1fr 1fr;}.ai-sectors{grid-template-columns:1fr;}.ai-cta-sec{margin:0 1rem 3rem;}}
      `}</style>
      <div className="ai">
        <canvas ref={canvasRef} className="ai-canvas" />
        <div className="ai-content">
          <nav className="ai-nav"><a href={`${bp}/`} className="ai-nav-logo"><img src={`${bp}/logos/aqurion-ai-icon.png`} alt="" />Aqurion AI</a><a href="#contact" className="ai-cta">Get API Access →</a></nav>
          <section className="ai-hero">
            <div className="ai-hero-glow" />
            <Rv><div className="ai-hero-badge"><span className="ai-hero-badge-dot" />Powering 56+ Applications</div></Rv>
            <Rv d={0.1}><h1>Intelligence that<br /><span className="ai-grad">scales</span>.</h1></Rv>
            <Rv d={0.2}><p className="ai-hero-sub">The AI backbone for the entire Aqurion ecosystem. From NLP to computer vision, powering every vertical.</p></Rv>
            <Rv d={0.3}><div className="ai-hero-btns"><a href="#contact" className="ai-cta" style={{ padding: "0.7rem 2rem" }}>Request Access</a><a href="#features" className="ai-ghost">Explore Capabilities</a></div></Rv>
          </section>
          <div className="ai-marquee"><div className="ai-marquee-inner">{[...Array(2)].flatMap((_, j) => ["Natural Language", "Computer Vision", "Predictive Analytics", "Generative AI", "Voice Recognition", "Document Processing", "Recommendation Engine"].map((t, i) => <span key={`${j}-${i}`} className="ai-marquee-item"><span className="ai-marquee-dot" />{t}</span>))}</div></div>
          <section id="features" className="ai-section">
            <Rv><div className="ai-label">Capabilities</div><h2 className="ai-title">Enterprise AI, simplified.</h2></Rv>
            <div className="ai-features">{features.map((f, i) => <Rv key={f.title} d={i * 0.08}><div className="ai-feature"><div className="ai-feature-icon">{f.icon}</div><div className="ai-feature-title">{f.title}</div><div className="ai-feature-desc">{f.desc}</div></div></Rv>)}</div>
          </section>
          <section className="ai-section">
            <Rv><div className="ai-label">Ecosystem</div><h2 className="ai-title">AI for every industry.</h2></Rv>
            <div className="ai-sectors">{sectors.map((s, i) => <Rv key={s.name} d={i * 0.06}><div className="ai-sector"><div className="ai-sector-header"><span className="ai-sector-icon">{s.icon}</span><span className="ai-sector-name">{s.name}</span></div><div className="ai-sector-apps">{s.apps.map(a => <span key={a} className="ai-tag">{a}</span>)}</div></div></Rv>)}</div>
          </section>
          <Rv><section id="contact" className="ai-cta-sec"><h2>Build with <span className="ai-grad">Aqurion AI</span></h2><p>Get API access and start integrating intelligent features into your applications.</p><a href="mailto:ai@aqurion.net" className="ai-cta" style={{ padding: "0.75rem 2.5rem" }}>Request API Access →</a></section></Rv>
          <footer className="ai-footer">© {new Date().getFullYear()} Aqurion AI — An Aqurion Holdings Company</footer>
        </div>
      </div>
    </>
  );
}
