"use client";
import React from "react";

const stack = [
  { name: "Next.js", icon: "▲", color: "#fff" },
  { name: "React", icon: "⚛", color: "#61DAFB" },
  { name: "TypeScript", icon: "TS", color: "#3178C6" },
  { name: "Node.js", icon: "⬡", color: "#83CD29" },
  { name: "Python", icon: "🐍", color: "#FFD43B" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "GraphQL", icon: "◈", color: "#E10098" },
  { name: "React Native", icon: "📱", color: "#61DAFB" },
  { name: "Prisma", icon: "◆", color: "#2D3748" },
  { name: "Vercel", icon: "▲", color: "#fff" },
];

const services = [
  { title: "Web Application Development", desc: "Scalable, performant web apps built with modern frameworks. From SaaS to enterprise portals.", tags: ["Next.js", "React", "Node.js"], icon: "🌐", color: "#3B82F6" },
  { title: "Mobile App Development", desc: "Native and cross-platform mobile applications for iOS and Android that delight users.", tags: ["React Native", "Flutter", "Swift"], icon: "📱", color: "#8B5CF6" },
  { title: "AI & Machine Learning", desc: "Intelligent automation, ML models, and AI-powered features integrated into your products.", tags: ["Python", "TensorFlow", "GPT"], icon: "🤖", color: "#06B6D4" },
  { title: "E-Commerce Solutions", desc: "End-to-end storefronts and marketplace platforms that convert visitors into customers.", tags: ["Shopify", "Stripe", "Next.js"], icon: "🛒", color: "#F59E0B" },
  { title: "Cloud & DevOps", desc: "Infrastructure architecture, CI/CD pipelines, and cloud-native deployments at any scale.", tags: ["AWS", "Docker", "Kubernetes"], icon: "☁️", color: "#10B981" },
  { title: "UI/UX Design", desc: "Research-driven design that creates intuitive, beautiful interfaces your users will love.", tags: ["Figma", "Prototyping", "Design Systems"], icon: "🎨", color: "#EC4899" },
];

const process_steps = [
  { num: "01", title: "Discovery", desc: "We dive deep into your business goals, target users, and technical requirements to define the perfect strategy." },
  { num: "02", title: "Design", desc: "Our designers create wireframes and high-fidelity mockups, iterating with your feedback until the experience is perfect." },
  { num: "03", title: "Development", desc: "Our engineers bring designs to life using battle-tested tech stacks, with weekly demos and transparent progress." },
  { num: "04", title: "Launch & Scale", desc: "We deploy to production, monitor performance, and provide ongoing support as your product grows." },
];

const projects = [
  { name: "PropertyFlow Suite", desc: "End-to-end property management platform serving 500+ properties.", tags: ["Next.js", "PostgreSQL", "Stripe"], metric: "500+", metricLabel: "Properties Managed", color: "#3B82F6" },
  { name: "Aqurion Marketplace", desc: "Multi-vendor e-commerce platform with AI-powered recommendations.", tags: ["React", "Node.js", "AI/ML"], metric: "$2.4M", metricLabel: "GMV Processed", color: "#F59E0B" },
  { name: "FinanceFlow", desc: "Real-time financial analytics dashboard for enterprise clients.", tags: ["TypeScript", "D3.js", "AWS"], metric: "99.9%", metricLabel: "Uptime SLA", color: "#10B981" },
  { name: "HealthSync Pro", desc: "HIPAA-compliant telemedicine platform with video and scheduling.", tags: ["React Native", "WebRTC", "HIPAA"], metric: "50K+", metricLabel: "Appointments/Month", color: "#8B5CF6" },
];

const testimonials = [
  { quote: "Aqurion Dev delivered our platform 3 weeks ahead of schedule. Their technical expertise and communication are world-class.", name: "Michael Reyes", role: "CTO, TechVault Solutions", rating: 5 },
  { quote: "The best development team we've ever worked with. They don't just write code — they solve business problems.", name: "Sarah Chen", role: "Founder, Bloom Wellness", rating: 5 },
  { quote: "From concept to launch in 8 weeks. Aqurion's velocity and quality are unmatched in the industry.", name: "David Park", role: "VP Engineering, Greystone", rating: 5 },
];

export default function DevPage() {
  const basePath = process.env.NODE_ENV === 'development' ? '/dev' : '';
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .dv-page { background: #000B1A; color: #fff; min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

        /* Nav */
        .dv-nav { position: fixed; top: 1.25rem; left: 50%; transform: translateX(-50%); z-index: 100; display: flex; align-items: center; gap: 0.5rem; background: rgba(0,11,26,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 50px; padding: 0.35rem 0.5rem; backdrop-filter: blur(20px); }
        .dv-nav-logo { display: flex; align-items: center; gap: 0.4rem; padding: 0 0.75rem; text-decoration: none; color: #fff; font-weight: 800; font-size: 0.85rem; }
        .dv-nav-logo img { width: 26px; height: 26px; border-radius: 6px; }
        .dv-nav-links { display: flex; gap: 0; }
        .dv-nav-link { padding: 0.45rem 1rem; border-radius: 50px; font-size: 0.76rem; font-weight: 600; color: rgba(255,255,255,0.45); text-decoration: none; transition: all 0.2s; }
        .dv-nav-link:hover { color: #fff; }
        .dv-nav-cta { padding: 0.45rem 1.25rem; border-radius: 50px; background: #FFD700; color: #000B1A; font-weight: 800; font-size: 0.76rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.2s; }
        .dv-nav-cta:hover { transform: scale(1.05); box-shadow: 0 4px 20px rgba(255,215,0,0.3); }

        /* Hero */
        .dv-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10rem 2rem 4rem; position: relative; overflow: hidden; }
        .dv-hero-glow { position: absolute; width: 800px; height: 500px; border-radius: 50%; background: radial-gradient(ellipse, rgba(59,130,246,0.08), transparent 70%); top: 20%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .dv-hero-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 1rem; border-radius: 50px; font-size: 0.7rem; font-weight: 700; background: rgba(255,215,0,0.08); color: #FFD700; border: 1px solid rgba(255,215,0,0.2); margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.06em; }
        .dv-hero h1 { font-size: clamp(2.8rem, 7vw, 5rem); font-weight: 900; line-height: 1.08; letter-spacing: -0.04em; margin-bottom: 1.5rem; max-width: 850px; }
        .dv-hero h1 span { background: linear-gradient(135deg, #FFD700, #FFA500); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .dv-hero-sub { font-size: 1.05rem; color: rgba(255,255,255,0.45); max-width: 520px; line-height: 1.7; margin-bottom: 2.5rem; }
        .dv-hero-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
        .dv-btn-primary { padding: 0.8rem 2rem; border-radius: 50px; background: #FFD700; color: #000B1A; font-weight: 800; font-size: 0.88rem; border: none; cursor: pointer; text-decoration: none; transition: all 0.2s; }
        .dv-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,215,0,0.3); }
        .dv-btn-ghost { padding: 0.8rem 2rem; border-radius: 50px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; font-weight: 600; font-size: 0.88rem; text-decoration: none; transition: all 0.2s; }
        .dv-btn-ghost:hover { background: rgba(255,255,255,0.1); }

        /* Trust row */
        .dv-trust { display: flex; justify-content: center; gap: 4rem; padding: 3rem 2rem; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.04); }
        .dv-trust-item { text-align: center; }
        .dv-trust-val { font-size: 2rem; font-weight: 900; color: #FFD700; letter-spacing: -0.02em; }
        .dv-trust-label { font-size: 0.65rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.15rem; }

        /* Section base */
        .dv-section { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
        .dv-sec-label { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #FFD700; margin-bottom: 1rem; }
        .dv-sec-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 1rem; line-height: 1.1; }
        .dv-sec-desc { color: rgba(255,255,255,0.4); font-size: 0.95rem; max-width: 550px; line-height: 1.7; }

        /* Services — Bento Grid */
        .dv-services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 3rem; }
        .dv-service { padding: 2rem; border-radius: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(10px); transition: all 0.3s; position: relative; overflow: hidden; }
        .dv-service:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-4px); }
        .dv-service::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0; transition: opacity 0.3s; }
        .dv-service:hover::before { opacity: 1; }
        .dv-service-icon { font-size: 1.75rem; margin-bottom: 1rem; }
        .dv-service-title { font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; }
        .dv-service-desc { font-size: 0.82rem; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 1rem; }
        .dv-service-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .dv-service-tag { padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.62rem; font-weight: 600; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); }

        /* Process */
        .dv-process { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 3rem; position: relative; }
        .dv-process::before { content: ''; position: absolute; top: 28px; left: 10%; right: 10%; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,215,0,0.15), transparent); }
        .dv-step { text-align: center; padding: 0 1rem; position: relative; }
        .dv-step-num { width: 56px; height: 56px; border-radius: 50%; background: rgba(255,215,0,0.08); border: 2px solid rgba(255,215,0,0.2); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; color: #FFD700; margin: 0 auto 1.25rem; position: relative; z-index: 1; }
        .dv-step-title { font-size: 0.95rem; font-weight: 800; margin-bottom: 0.5rem; }
        .dv-step-desc { font-size: 0.78rem; color: rgba(255,255,255,0.35); line-height: 1.6; }

        /* Projects */
        .dv-projects { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 3rem; }
        .dv-project { padding: 2rem; border-radius: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s; position: relative; overflow: hidden; }
        .dv-project:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-3px); }
        .dv-project-metric { font-size: 2.2rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 0.1rem; }
        .dv-project-metric-label { font-size: 0.65rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.25rem; }
        .dv-project-name { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.4rem; }
        .dv-project-desc { font-size: 0.82rem; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 1rem; }
        .dv-project-tags { display: flex; gap: 0.3rem; flex-wrap: wrap; }

        /* Tech Stack */
        .dv-stack { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; margin-top: 2rem; }
        .dv-stack-item { display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; border-radius: 50px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.6); transition: all 0.2s; }
        .dv-stack-item:hover { border-color: rgba(255,255,255,0.15); color: #fff; }

        /* Testimonials */
        .dv-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 3rem; }
        .dv-testimonial { padding: 2rem; border-radius: 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }
        .dv-test-stars { color: #FFD700; font-size: 0.85rem; margin-bottom: 1rem; letter-spacing: 2px; }
        .dv-test-quote { font-size: 0.88rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
        .dv-test-name { font-weight: 700; font-size: 0.85rem; }
        .dv-test-role { font-size: 0.72rem; color: rgba(255,255,255,0.3); }

        /* CTA */
        .dv-cta { text-align: center; padding: 6rem 2rem; margin: 0 2rem; border-radius: 24px; background: linear-gradient(135deg, rgba(255,215,0,0.06), rgba(59,130,246,0.06)); border: 1px solid rgba(255,215,0,0.12); position: relative; overflow: hidden; }
        .dv-cta h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 1rem; }
        .dv-cta p { color: rgba(255,255,255,0.45); font-size: 0.95rem; max-width: 450px; margin: 0 auto 2rem; line-height: 1.7; }

        /* Footer */
        .dv-footer { padding: 4rem 2rem 2rem; max-width: 1100px; margin: 0 auto; }
        .dv-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        .dv-footer-brand { font-size: 1.1rem; font-weight: 900; margin-bottom: 0.75rem; }
        .dv-footer-desc { font-size: 0.78rem; color: rgba(255,255,255,0.3); line-height: 1.6; max-width: 280px; }
        .dv-footer-col-title { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); margin-bottom: 1rem; }
        .dv-footer-link { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.4); text-decoration: none; padding: 0.2rem 0; transition: color 0.2s; }
        .dv-footer-link:hover { color: #FFD700; }
        .dv-footer-bottom { text-align: center; font-size: 0.7rem; color: rgba(255,255,255,0.15); padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.04); }

        @media (max-width: 768px) {
          .dv-nav-links { display: none; }
          .dv-services { grid-template-columns: 1fr; }
          .dv-process { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .dv-process::before { display: none; }
          .dv-projects { grid-template-columns: 1fr; }
          .dv-testimonials { grid-template-columns: 1fr; }
          .dv-footer-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="dv-page">
        {/* Nav */}
        <nav className="dv-nav">
          <a href="/" className="dv-nav-logo"><img src={`${basePath}/logos/aqurion-dev-icon.png`} alt="" style={{ width: 26, height: 26, borderRadius: 6 }} />Aqurion Dev</a>
          <div className="dv-nav-links">
            <a href="#services" className="dv-nav-link">Services</a>
            <a href="#work" className="dv-nav-link">Work</a>
            <a href="#process" className="dv-nav-link">Process</a>
            <a href="#stack" className="dv-nav-link">Stack</a>
          </div>
          <a href="#contact" className="dv-nav-cta">Start a Project</a>
        </nav>

        {/* Hero */}
        <section className="dv-hero">
          <div className="dv-hero-glow" />
          <div className="dv-hero-badge">⚡ Custom Software Development</div>
          <h1>We Build <span>Software</span> That Scales Your Business.</h1>
          <p className="dv-hero-sub">From concept to launch, Aqurion Development builds high-performance web apps, mobile apps, and AI-powered platforms that drive real business results.</p>
          <div className="dv-hero-btns">
            <a href="#contact" className="dv-btn-primary">Start Your Project →</a>
            <a href="#work" className="dv-btn-ghost">View Our Work</a>
          </div>
        </section>

        {/* Trust */}
        <div className="dv-trust">
          <div className="dv-trust-item"><div className="dv-trust-val">200+</div><div className="dv-trust-label">Projects Delivered</div></div>
          <div className="dv-trust-item"><div className="dv-trust-val">98%</div><div className="dv-trust-label">Client Satisfaction</div></div>
          <div className="dv-trust-item"><div className="dv-trust-val">4.9★</div><div className="dv-trust-label">Average Rating</div></div>
          <div className="dv-trust-item"><div className="dv-trust-val">12+</div><div className="dv-trust-label">Industries Served</div></div>
        </div>

        {/* Services */}
        <section id="services" className="dv-section">
          <div className="dv-sec-label">Services</div>
          <h2 className="dv-sec-title">What We Build</h2>
          <p className="dv-sec-desc">Full-stack development services powered by modern technology. We handle everything from design to deployment.</p>
          <div className="dv-services">
            {services.map(s => (
              <div key={s.title} className="dv-service" style={{ "--accent": s.color } as React.CSSProperties}>
                <div className="dv-service-icon">{s.icon}</div>
                <div className="dv-service-title">{s.title}</div>
                <div className="dv-service-desc">{s.desc}</div>
                <div className="dv-service-tags">{s.tags.map(t => <span key={t} className="dv-service-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="dv-section" style={{ textAlign: "center" }}>
          <div className="dv-sec-label" style={{ textAlign: "center" }}>Our Process</div>
          <h2 className="dv-sec-title">From Idea to Launch</h2>
          <div className="dv-process">
            {process_steps.map(s => (
              <div key={s.num} className="dv-step">
                <div className="dv-step-num">{s.num}</div>
                <div className="dv-step-title">{s.title}</div>
                <div className="dv-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="dv-section">
          <div className="dv-sec-label">Case Studies</div>
          <h2 className="dv-sec-title">Featured Work</h2>
          <div className="dv-projects">
            {projects.map(p => (
              <div key={p.name} className="dv-project">
                <div className="dv-project-metric" style={{ color: p.color }}>{p.metric}</div>
                <div className="dv-project-metric-label">{p.metricLabel}</div>
                <div className="dv-project-name">{p.name}</div>
                <div className="dv-project-desc">{p.desc}</div>
                <div className="dv-project-tags">{p.tags.map(t => <span key={t} className="dv-service-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="stack" className="dv-section" style={{ textAlign: "center" }}>
          <div className="dv-sec-label" style={{ textAlign: "center" }}>Technology</div>
          <h2 className="dv-sec-title">Our Tech Stack</h2>
          <div className="dv-stack">
            {stack.map(s => (
              <div key={s.name} className="dv-stack-item">
                <span style={{ color: s.color }}>{s.icon}</span> {s.name}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="dv-section">
          <div className="dv-sec-label">Testimonials</div>
          <h2 className="dv-sec-title">What Clients Say</h2>
          <div className="dv-testimonials">
            {testimonials.map(t => (
              <div key={t.name} className="dv-testimonial">
                <div className="dv-test-stars">{"★".repeat(t.rating)}</div>
                <div className="dv-test-quote">&ldquo;{t.quote}&rdquo;</div>
                <div className="dv-test-name">{t.name}</div>
                <div className="dv-test-role">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="dv-cta">
          <h2>Ready to Build Something Extraordinary?</h2>
          <p>Tell us about your project and we&apos;ll get back to you within 24 hours with a free consultation.</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:dev@aqurion.net" className="dv-btn-primary">Start a Project →</a>
            <a href="https://calendly.com" className="dv-btn-ghost" target="_blank" rel="noopener noreferrer">Book a Call</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="dv-footer">
          <div className="dv-footer-grid">
            <div>
              <div className="dv-footer-brand">Aqurion Development</div>
              <div className="dv-footer-desc">Custom software development that scales. Web apps, mobile apps, AI, and cloud solutions for ambitious businesses.</div>
            </div>
            <div>
              <div className="dv-footer-col-title">Services</div>
              <a href="#services" className="dv-footer-link">Web Development</a>
              <a href="#services" className="dv-footer-link">Mobile Apps</a>
              <a href="#services" className="dv-footer-link">AI & ML</a>
              <a href="#services" className="dv-footer-link">E-Commerce</a>
              <a href="#services" className="dv-footer-link">Cloud & DevOps</a>
            </div>
            <div>
              <div className="dv-footer-col-title">Aqurion</div>
              <a href="https://Aqurion.NET" className="dv-footer-link">Holdings</a>
              <a href="https://Aqurion.AI" className="dv-footer-link">AI</a>
              <a href="https://AqurionMarketing.com" className="dv-footer-link">Marketing</a>
              <a href="https://AqurionSales.com" className="dv-footer-link">Sales</a>
            </div>
            <div>
              <div className="dv-footer-col-title">Connect</div>
              <a href="mailto:dev@aqurion.net" className="dv-footer-link">dev@aqurion.net</a>
              <a href="https://AqurionDev.com" className="dv-footer-link">AqurionDev.com</a>
              <a href="https://github.com" className="dv-footer-link">GitHub</a>
            </div>
          </div>
          <div className="dv-footer-bottom">© {new Date().getFullYear()} Aqurion Development — An Aqurion Holdings Company</div>
        </footer>
      </div>
    </>
  );
}
