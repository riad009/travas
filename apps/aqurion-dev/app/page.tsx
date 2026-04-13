"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const fadeUp = { hidden: { opacity: 0, y: 35 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }) };
function Rv({children,d=0}:{children:React.ReactNode;d?:number}){return<motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-50px"}} transition={{delay:d,duration:0.6,ease:[0.16,1,0.3,1]}}>{children}</motion.div>;}

const stack = [
  { name: "Next.js", icon: "▲", color: "#fff" }, { name: "React", icon: "⚛", color: "#61DAFB" }, { name: "TypeScript", icon: "TS", color: "#3178C6" },
  { name: "Node.js", icon: "⬡", color: "#83CD29" }, { name: "Python", icon: "🐍", color: "#FFD43B" }, { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Docker", icon: "🐳", color: "#2496ED" }, { name: "GraphQL", icon: "◈", color: "#E10098" }, { name: "Prisma", icon: "◆", color: "#5A67D8" },
  { name: "React Native", icon: "📱", color: "#61DAFB" }, { name: "PostgreSQL", icon: "🐘", color: "#336791" }, { name: "Vercel", icon: "▲", color: "#fff" },
];

const services = [
  { title: "Web Applications", desc: "Scalable, performant web apps with Next.js, React, and modern frameworks.", icon: "🌐", color: "#00B872" },
  { title: "Mobile Development", desc: "Native and cross-platform apps for iOS and Android.", icon: "📱", color: "#8B5CF6" },
  { title: "AI & ML Integration", desc: "Intelligent automation and AI features for your products.", icon: "🤖", color: "#06B6D4" },
  { title: "E-Commerce", desc: "End-to-end storefronts and marketplaces that convert.", icon: "🛒", color: "#F59E0B" },
  { title: "Cloud & DevOps", desc: "CI/CD, infrastructure, and cloud-native deployments.", icon: "☁️", color: "#10B981" },
  { title: "UI/UX Design", desc: "Research-driven interfaces your users will love.", icon: "🎨", color: "#EC4899" },
];

const steps = [
  { num: "01", title: "Discovery", desc: "Deep dive into your goals, users, and technical needs." },
  { num: "02", title: "Design", desc: "Wireframes and hi-fi mockups iterated with your feedback." },
  { num: "03", title: "Build", desc: "Sprint-based development with weekly demos and reviews." },
  { num: "04", title: "Launch", desc: "Production deployment, monitoring, and ongoing support." },
];

const stats = [{ val: "200+", label: "Projects Delivered" }, { val: "56+", label: "Applications Built" }, { val: "99.9%", label: "Client Retention" }, { val: "24/7", label: "Support" }];

export default function DevPage() {
  const bp = process.env.NODE_ENV === "development" ? "/dev" : "";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    let t = 0; let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        for (let x = 0; x < W; x += 4) {
          const y = H / 2 + Math.sin((x + t * 2) * 0.003 + i * 0.8) * (40 + i * 15) + Math.cos((x - t) * 0.005) * 20;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0,184,114,${0.02 + i * 0.005})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      t++;
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .dv{background:#0A0A0A;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}
        .dv-canvas{position:fixed;inset:0;z-index:0;pointer-events:none;}
        .dv-content{position:relative;z-index:1;}
        .dv-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 3rem;background:rgba(10,10,10,0.8);backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,184,114,0.06);}
        .dv-nav-logo{display:flex;align-items:center;gap:0.6rem;font-size:1rem;font-weight:700;text-decoration:none;color:#fff;}
        .dv-nav-logo img{width:32px;height:32px;border-radius:10px;}
        .dv-cta{padding:0.55rem 1.5rem;border-radius:50px;background:#00B872;color:#fff;font-weight:700;font-size:0.82rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.3s;}
        .dv-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,184,114,0.25);}

        .dv-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem;position:relative;}
        .dv-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.5rem,8vw,6rem);font-weight:700;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;}
        .dv-grad{background:linear-gradient(135deg,#00B872,#00D4FF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:dvGrad 5s ease infinite;}
        @keyframes dvGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .dv-hero-sub{font-size:1.15rem;color:rgba(255,255,255,0.3);max-width:550px;line-height:1.8;margin-bottom:3rem;}
        .dv-hero-badge{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1rem;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:0.68rem;font-weight:500;background:rgba(0,184,114,0.06);color:#00B872;border:1px solid rgba(0,184,114,0.08);margin-bottom:2rem;letter-spacing:0.08em;}

        .dv-stack-marquee{overflow:hidden;padding:1.5rem 0;border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);margin:2rem 0 4rem;}
        .dv-stack-inner{display:flex;gap:2rem;animation:stackScroll 25s linear infinite;}
        @keyframes stackScroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .dv-stack-item{display:flex;align-items:center;gap:0.5rem;padding:0.5rem 1.2rem;border-radius:50px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.04);white-space:nowrap;font-size:0.82rem;font-weight:600;color:rgba(255,255,255,0.5);transition:all 0.3s;}

        .dv-section{padding:7rem 2rem;max-width:1200px;margin:0 auto;text-align:center;}
        .dv-label{font-family:'JetBrains Mono',monospace;font-size:0.65rem;font-weight:500;text-transform:uppercase;letter-spacing:0.2em;color:#00B872;margin-bottom:1rem;}
        .dv-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;letter-spacing:-0.03em;margin-bottom:3rem;}

        .dv-services{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        .dv-service{padding:2.5rem;border-radius:20px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);text-align:left;transition:all 0.4s;position:relative;overflow:hidden;}
        .dv-service:hover{transform:translateY(-6px);border-color:rgba(0,184,114,0.15);}
        .dv-service::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);opacity:0;transition:opacity 0.3s;}
        .dv-service:hover::before{opacity:1;}
        .dv-service-icon{font-size:2rem;margin-bottom:1.25rem;display:inline-flex;width:56px;height:56px;border-radius:14px;align-items:center;justify-content:center;background:rgba(255,255,255,0.04);}
        .dv-service-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.05rem;margin-bottom:0.5rem;}
        .dv-service-desc{font-size:0.85rem;color:rgba(255,255,255,0.3);line-height:1.7;}

        .dv-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.04);border-radius:20px;overflow:hidden;margin:4rem 3rem;}
        .dv-stat{background:rgba(10,10,10,0.95);padding:3rem 2rem;text-align:center;}
        .dv-stat-val{font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;color:#00B872;margin-bottom:0.25rem;}
        .dv-stat-label{font-size:0.72rem;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.12em;}

        .dv-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:left;margin-top:3rem;}
        .dv-step{padding:0 0 0 1.5rem;border-left:2px solid rgba(0,184,114,0.15);}
        .dv-step-num{font-family:'JetBrains Mono',monospace;font-size:2.5rem;font-weight:700;color:rgba(0,184,114,0.12);margin-bottom:0.5rem;}
        .dv-step-title{font-family:'Space Grotesk',sans-serif;font-weight:700;margin-bottom:0.5rem;}
        .dv-step-desc{font-size:0.82rem;color:rgba(255,255,255,0.3);line-height:1.7;}

        .dv-cta-sec{text-align:center;padding:8rem 2rem;margin:0 3rem 4rem;border-radius:24px;border:1px solid rgba(0,184,114,0.08);position:relative;overflow:hidden;}
        .dv-cta-sec::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,184,114,0.04),rgba(0,212,255,0.02));}
        .dv-cta-sec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(2.5rem,5vw,3.5rem);font-weight:700;margin-bottom:1rem;position:relative;}
        .dv-cta-sec p{color:rgba(255,255,255,0.3);margin-bottom:2.5rem;max-width:420px;margin-left:auto;margin-right:auto;position:relative;line-height:1.7;}
        .dv-footer{padding:3rem;text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.12);border-top:1px solid rgba(255,255,255,0.04);}
        @media(max-width:768px){.dv-nav{padding:1rem 1.5rem;}.dv-services,.dv-steps{grid-template-columns:1fr;}.dv-stats{grid-template-columns:repeat(2,1fr);margin:3rem 1rem;}.dv-cta-sec{margin:0 1rem 3rem;}}
      `}</style>
      <div className="dv">
        <canvas ref={canvasRef} className="dv-canvas" />
        <div className="dv-content">
          <nav className="dv-nav"><a href={`${bp}/`} className="dv-nav-logo"><img src={`${bp}/logos/aqurion-dev-icon.png`} alt="" />Aqurion Dev</a><a href="#contact" className="dv-cta">Start a Project →</a></nav>
          <section className="dv-hero">
            <Rv><div className="dv-hero-badge">// Full-Stack Digital Agency</div></Rv>
            <Rv d={0.1}><h1>We build what's <span className="dv-grad">next</span>.</h1></Rv>
            <Rv d={0.2}><p className="dv-hero-sub">Full-stack development, AI integration, cloud architecture, and design — from idea to deployment.</p></Rv>
            <Rv d={0.3}><a href="#contact" className="dv-cta" style={{ padding: "0.75rem 2.5rem" }}>Start a Project →</a></Rv>
          </section>
          <div className="dv-stack-marquee"><div className="dv-stack-inner">{[...Array(2)].flatMap((_, j) => stack.map((s, i) => <div key={`${j}-${i}`} className="dv-stack-item"><span style={{ color: s.color }}>{s.icon}</span> {s.name}</div>))}</div></div>
          <Rv><div className="dv-stats">{stats.map(s => <div key={s.label} className="dv-stat"><div className="dv-stat-val">{s.val}</div><div className="dv-stat-label">{s.label}</div></div>)}</div></Rv>
          <section className="dv-section">
            <Rv><div className="dv-label">// Services</div><h2 className="dv-title">End-to-end digital craftsmanship.</h2></Rv>
            <div className="dv-services">{services.map((s, i) => <Rv key={s.title} d={i * 0.08}><div className="dv-service" style={{ "--accent": s.color } as React.CSSProperties}><div className="dv-service-icon">{s.icon}</div><div className="dv-service-title">{s.title}</div><div className="dv-service-desc">{s.desc}</div></div></Rv>)}</div>
          </section>
          <section className="dv-section">
            <Rv><div className="dv-label">// Process</div><h2 className="dv-title">How we work.</h2></Rv>
            <div className="dv-steps">{steps.map((s, i) => <Rv key={s.num} d={i * 0.12}><div className="dv-step"><div className="dv-step-num">{s.num}</div><div className="dv-step-title">{s.title}</div><div className="dv-step-desc">{s.desc}</div></div></Rv>)}</div>
          </section>
          <Rv><section id="contact" className="dv-cta-sec"><h2>Let&apos;s build <span className="dv-grad">together</span>.</h2><p>Tell us about your project. We'll bring the expertise.</p><a href="mailto:dev@aqurion.net" className="dv-cta" style={{ padding: "0.75rem 2.5rem" }}>Start a Project →</a></section></Rv>
          <footer className="dv-footer">© {new Date().getFullYear()} Aqurion Development — An Aqurion Holdings Company</footer>
        </div>
      </div>
    </>
  );
}
