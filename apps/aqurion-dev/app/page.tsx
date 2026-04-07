"use client";
import React from "react";
import { Navbar } from "@repo/ui/navbar";
import { Footer } from "@repo/ui/footer";
import { getBrandById } from "@repo/ui/brand-config";
import "./globals.css";

const brand = getBrandById("aqurion-dev")!;

const stack = [
  { name: "Next.js", icon: "▲", color: "#fff" },
  { name: "React", icon: "◉", color: "#61DAFB" },
  { name: "TypeScript", icon: "◈", color: "#3178C6" },
  { name: "Node.js", icon: "⬡", color: "#83CD29" },
  { name: "Python", icon: "◆", color: "#FFD43B" },
  { name: "PostgreSQL", icon: "◇", color: "#336791" },
  { name: "MongoDB", icon: "◎", color: "#47A248" },
  { name: "AWS", icon: "⬟", color: "#FF9900" },
  { name: "Docker", icon: "◉", color: "#2496ED" },
  { name: "GraphQL", icon: "◈", color: "#E10098" },
  { name: "React Native", icon: "◆", color: "#61DAFB" },
  { name: "Vercel", icon: "▲", color: "#fff" },
];

const services = [
  {
    title: "Web Application Development",
    desc: "Scalable, performant web applications built with modern frameworks. From SaaS platforms to enterprise portals.",
    tags: ["Next.js", "React", "Node.js", "TypeScript"],
    icon: "⬡",
  },
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android that deliver premium user experiences.",
    tags: ["React Native", "Swift", "Kotlin"],
    icon: "◎",
  },
  {
    title: "API & Backend Engineering",
    desc: "Robust, secure, and documented APIs and microservices architectures built to handle any scale.",
    tags: ["REST", "GraphQL", "WebSockets", "gRPC"],
    icon: "◈",
  },
  {
    title: "Database Architecture",
    desc: "Optimized database design, migrations, and management — relational, NoSQL, and time-series.",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
    icon: "◇",
  },
  {
    title: "Cloud Infrastructure",
    desc: "Deployment, CI/CD pipelines, auto-scaling infrastructure, and DevOps engineering on major cloud platforms.",
    tags: ["AWS", "GCP", "Docker", "Terraform"],
    icon: "◆",
  },
  {
    title: "AI & Machine Learning Integration",
    desc: "Embed AI capabilities into your products — from LLM integrations to custom ML model deployment.",
    tags: ["OpenAI", "LangChain", "Python", "TensorFlow"],
    icon: "⬟",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery & Planning",
    desc: "We dive deep into your requirements, define the scope, and create a detailed technical roadmap before a single line of code is written.",
  },
  {
    num: "02",
    title: "Architecture & Design",
    desc: "We design the system architecture, database schema, UI/UX flows, and API contracts — ensuring a solid foundation.",
  },
  {
    num: "03",
    title: "Agile Development",
    desc: "We build in sprints with regular demos, keeping you in the loop and allowing for iteration as the product evolves.",
  },
  {
    num: "04",
    title: "QA & Testing",
    desc: "Rigorous unit, integration, and end-to-end testing ensures your product is production-ready and battle-tested.",
  },
  {
    num: "05",
    title: "Deployment & Launch",
    desc: "We deploy to production with zero downtime, configure monitoring, and ensure everything runs flawlessly.",
  },
  {
    num: "06",
    title: "Ongoing Support",
    desc: "Post-launch support, maintenance, performance optimization, and new feature development as your product grows.",
  },
];

export default function AqurionDevPage() {
  return (
    <>
      <style>{`
        /* ─── HERO ─── */
        .dev-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: #040A06;
          padding: 8rem 2rem 5rem;
        }
        .dev-hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .dev-hero-orb {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: #00FF88;
          filter: blur(120px);
          opacity: 0.05;
          top: -200px; right: -200px;
          pointer-events: none;
          animation: dev-float 10s ease-in-out infinite;
        }
        @keyframes dev-float {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(-20px, 30px); }
        }

        .dev-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .dev-terminal {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(0,255,136,0.07);
          border: 1px solid rgba(0,255,136,0.2);
          border-radius: 8px;
          padding: 0.4rem 0.85rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #00FF88;
          margin-bottom: 2rem;
          animation: dev-fade-up 0.5s ease both;
        }
        .dev-terminal-prompt { opacity: 0.5; }

        .dev-hero-h1 {
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          animation: dev-fade-up 0.5s ease 0.1s both;
        }
        .dev-hero-h1 em {
          font-style: normal;
          background: linear-gradient(120deg, #00FF88, #00D4FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dev-hero-h1 span {
          color: rgba(255,255,255,0.25);
          display: block;
          font-size: 0.55em;
          letter-spacing: -0.02em;
          margin-top: 0.25rem;
        }

        .dev-hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255,255,255,0.55);
          max-width: 56ch;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          animation: dev-fade-up 0.5s ease 0.2s both;
        }

        .dev-hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
          animation: dev-fade-up 0.5s ease 0.3s both;
        }
        .dev-btn-primary {
          padding: 0.9rem 2rem;
          background: #00FF88;
          color: #040A06;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
        }
        .dev-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(0,255,136,0.3);
        }
        .dev-btn-secondary {
          padding: 0.9rem 2rem;
          background: rgba(0,255,136,0.07);
          color: #00FF88;
          border: 1px solid rgba(0,255,136,0.25);
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s;
          font-family: 'Inter', sans-serif;
        }
        .dev-btn-secondary:hover {
          background: rgba(0,255,136,0.12);
          transform: translateY(-1px);
        }

        .dev-code-block {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          animation: dev-fade-up 0.5s ease 0.4s both;
        }
        .dev-code-line-num { color: rgba(255,255,255,0.2); margin-right: 1rem; }
        .dev-code-kw { color: #00D4FF; }
        .dev-code-fn { color: #00FF88; }
        .dev-code-str { color: #FFD43B; }
        .dev-code-comment { color: rgba(255,255,255,0.3); }

        @keyframes dev-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ─── SECTION COMMON ─── */
        .dev-section {
          padding: 6rem 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        .dev-section-wrap {
          background: rgba(0,255,136,0.012);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dev-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #00FF88;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .dev-label::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 2px;
          background: #00FF88;
          border-radius: 1px;
        }
        .dev-h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1rem;
          color: #fff;
        }
        .dev-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.5);
          max-width: 54ch;
          line-height: 1.7;
          margin-bottom: 3.5rem;
        }

        /* ─── TECH STACK ─── */
        .dev-stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
        }
        .dev-stack-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.25rem 0.75rem;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.25s;
          cursor: default;
        }
        .dev-stack-item:hover {
          background: rgba(255,255,255,0.065);
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.14);
        }
        .dev-stack-icon {
          font-size: 1.5rem;
        }
        .dev-stack-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          text-align: center;
        }

        /* ─── SERVICES ─── */
        .dev-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.25rem;
        }
        .dev-service-card {
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .dev-service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          right: 0; height: 2px;
          background: linear-gradient(90deg, #00FF88, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .dev-service-card:hover {
          background: rgba(0,255,136,0.04);
          border-color: rgba(0,255,136,0.2);
          transform: translateY(-4px);
        }
        .dev-service-card:hover::before { opacity: 1; }
        .dev-service-icon {
          font-size: 1.5rem;
          color: #00FF88;
          margin-bottom: 1.25rem;
          display: block;
        }
        .dev-service-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.65rem;
        }
        .dev-service-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .dev-service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .dev-service-tag {
          padding: 0.2rem 0.65rem;
          border-radius: 50px;
          background: rgba(0,255,136,0.08);
          border: 1px solid rgba(0,255,136,0.2);
          color: #00FF88;
          font-size: 0.72rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ─── PROCESS ─── */
        .dev-process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 1.25rem;
        }
        .dev-process-card {
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.25s;
        }
        .dev-process-card:hover {
          background: rgba(255,255,255,0.04);
          transform: translateY(-2px);
        }
        .dev-process-num {
          font-size: 3rem;
          font-weight: 900;
          color: rgba(0,255,136,0.15);
          line-height: 1;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 1rem;
          letter-spacing: -0.04em;
        }
        .dev-process-title {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.65rem;
        }
        .dev-process-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
        }

        /* ─── CTA ─── */
        .dev-cta {
          margin: 2rem;
          padding: 5rem 3rem;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,212,255,0.04) 100%);
          border: 1px solid rgba(0,255,136,0.2);
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 2rem;
        }
        .dev-cta h2 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .dev-cta p {
          color: rgba(255,255,255,0.55);
          font-size: 1.1rem;
          max-width: 50ch;
          margin: 0 auto 2.5rem;
        }
        .dev-cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .dev-divider { height: 1px; background: rgba(255,255,255,0.05); }

        @media (max-width: 768px) {
          .dev-services-grid { grid-template-columns: 1fr; }
          .dev-process-grid { grid-template-columns: 1fr; }
          .dev-stack-grid { grid-template-columns: repeat(3, 1fr); }
          .dev-cta { margin: 1rem; padding: 3rem 1.5rem; }
        }
      `}</style>

      <Navbar brand={brand} />

      {/* ── HERO ────────────────────────────────────── */}
      <section className="dev-hero">
        <div className="dev-hero-bg-grid" />
        <div className="dev-hero-orb" />
        <div className="dev-hero-inner">
          <div className="dev-terminal">
            <span className="dev-terminal-prompt">$</span>
            npx create-aqurion-app@latest ./your-next-project
            <span style={{ opacity: 0.5 }}>▮</span>
          </div>

          <h1 className="dev-hero-h1">
            <em>Code That Scales.</em>
            <span>Products That Win.</span>
          </h1>
          <p className="dev-hero-sub">
            Aqurion Development is a full-service software development firm. We architect, build, and launch web applications, mobile apps, and enterprise platforms that drive real business results.
          </p>

          <div className="dev-hero-actions">
            <a href="#contact" className="dev-btn-primary">Start Your Project →</a>
            <a href="#services" className="dev-btn-secondary">Our Services</a>
          </div>

          <div className="dev-code-block">
            <div><span className="dev-code-line-num">1</span><span className="dev-code-comment">// Aqurion Development</span></div>
            <div><span className="dev-code-line-num">2</span><span className="dev-code-kw">const</span> <span className="dev-code-fn">buildYourVision</span> = async (idea) {"=>"} {"{"}</div>
            <div><span className="dev-code-line-num">3</span>&nbsp;&nbsp;<span className="dev-code-kw">const</span> plan = await <span className="dev-code-fn">discovery</span>(idea);</div>
            <div><span className="dev-code-line-num">4</span>&nbsp;&nbsp;<span className="dev-code-kw">const</span> code = await <span className="dev-code-fn">build</span>(plan);</div>
            <div><span className="dev-code-line-num">5</span>&nbsp;&nbsp;<span className="dev-code-kw">const</span> product = await <span className="dev-code-fn">launch</span>(code);</div>
            <div><span className="dev-code-line-num">6</span>&nbsp;&nbsp;<span className="dev-code-kw">return</span> <span className="dev-code-str">"success"</span>;</div>
            <div><span className="dev-code-line-num">7</span>{"}"}</div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ─────────────────────────────── */}
      <div className="dev-divider" />
      <section className="dev-section-wrap">
        <div className="dev-section">
          <div className="dev-label">Technology Stack</div>
          <h2 className="dev-h2">Built With Best-In-Class Tools</h2>
          <p className="dev-sub">
            We use modern, proven technologies that scale — from startup MVPs to enterprise-grade platforms handling millions of users.
          </p>
          <div className="dev-stack-grid">
            {stack.map((s) => (
              <div className="dev-stack-item" key={s.name}>
                <span className="dev-stack-icon" style={{ color: s.color }}>{s.icon}</span>
                <span className="dev-stack-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────── */}
      <div className="dev-divider" />
      <section id="services">
        <div className="dev-section">
          <div className="dev-label">What We Build</div>
          <h2 className="dev-h2">Full-Stack Development Services</h2>
          <p className="dev-sub">
            From frontend interfaces to backend infrastructure, we deliver complete digital products that perform under pressure.
          </p>
          <div className="dev-services-grid">
            {services.map((s) => (
              <div className="dev-service-card" key={s.title}>
                <span className="dev-service-icon">{s.icon}</span>
                <div className="dev-service-title">{s.title}</div>
                <div className="dev-service-desc">{s.desc}</div>
                <div className="dev-service-tags">
                  {s.tags.map((t) => (
                    <span className="dev-service-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────── */}
      <div className="dev-divider" />
      <section className="dev-section-wrap">
        <div className="dev-section">
          <div className="dev-label">How We Work</div>
          <h2 className="dev-h2">Our Development Process</h2>
          <p className="dev-sub">
            A structured, transparent process that keeps your project on track, on time, and on budget — every time.
          </p>
          <div className="dev-process-grid">
            {processSteps.map((s) => (
              <div className="dev-process-card" key={s.num}>
                <div className="dev-process-num">{s.num}</div>
                <div className="dev-process-title">{s.title}</div>
                <div className="dev-process-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <div className="dev-cta">
        <h2>Ready to Launch<br/>Your Next Product?</h2>
        <p>
          Let&apos;s discuss your project. We&apos;ll provide a free technical consultation and proposal within 48 hours.
        </p>
        <div className="dev-cta-actions">
          <a href="#contact" className="dev-btn-primary">Get a Free Quote →</a>
          <a href="https://Aqurion.NET" target="_blank" rel="noopener noreferrer" className="dev-btn-secondary">
            Aqurion Holdings
          </a>
        </div>
      </div>

      {/* ── CONTACT ────────────────────────────────── */}
      <div className="dev-divider" />
      <section id="contact">
        <div className="dev-section" style={{ maxWidth: "700px" }}>
          <div className="dev-label">Start a Project</div>
          <h2 className="dev-h2">Let&apos;s Build Something Great</h2>
          <p className="dev-sub">
            Tell us what you&apos;re building. We&apos;ll get back to you within 24 hours with a plan.
          </p>
          <DevContactForm />
        </div>
      </section>

      <Footer brand={brand} />
    </>
  );
}

function DevContactForm() {
  const [sent, setSent] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent) {
    return (
      <div style={{
        padding: "2rem",
        background: "rgba(0,255,136,0.06)",
        border: "1px solid rgba(0,255,136,0.25)",
        borderRadius: "16px",
        textAlign: "center",
        color: "#00FF88",
        fontWeight: 600,
        fontSize: "1.1rem",
      }}>
        ✓ &nbsp;Message received! We&apos;ll respond within 24 hours.
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Your name"
          required
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email address"
          required
        />
      </div>
      <input
        style={inputStyle}
        type="text"
        placeholder="Project type (e.g. Web App, Mobile App)"
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Budget range (optional)"
      />
      <textarea
        style={{ ...inputStyle, minHeight: "150px", resize: "vertical" }}
        placeholder="Describe your project and goals..."
        required
      />
      <button
        type="submit"
        style={{
          padding: "1rem",
          background: "#00FF88",
          color: "#040A06",
          border: "none",
          borderRadius: "12px",
          fontSize: "0.95rem",
          fontWeight: 800,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.transform = "translateY(-2px)";
          (e.target as HTMLElement).style.boxShadow = "0 15px 40px rgba(0,255,136,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.transform = "";
          (e.target as HTMLElement).style.boxShadow = "";
        }}
      >
        Send Project Brief →
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.9rem 1.25rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "0.9rem",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  width: "100%",
};
