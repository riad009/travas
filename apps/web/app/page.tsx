"use client";
import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { AQURION_BRANDS, getBrandsByTier } from "@repo/ui/brand-config";

const tier2 = getBrandsByTier(2);
const tier3 = getBrandsByTier(3);
const allCompanies = [...tier2, ...tier3];

/* ── Dotted Text Component ── */
function DotText({ lines, fontSize = 72 }: { lines: string[]; fontSize?: number }) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number }[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const initDone = useRef(false);

  useEffect(() => {
    const c = cvRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = c.offsetWidth, H = c.offsetHeight;
    c.width = W * dpr; c.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Sample text as dots
    if (!initDone.current) {
      const offC = document.createElement("canvas");
      offC.width = W; offC.height = H;
      const offCtx = offC.getContext("2d")!;
      offCtx.fillStyle = "#fff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      const lineH = fontSize * 1.15;
      const startY = H / 2 - ((lines.length - 1) * lineH) / 2;
      lines.forEach((line, li) => {
        offCtx.font = `800 ${fontSize}px Inter, sans-serif`;
        offCtx.fillText(line, W / 2, startY + li * lineH);
      });
      const img = offCtx.getImageData(0, 0, W, H);
      const pts: typeof particlesRef.current = [];
      const gap = 4;
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          const a = img.data[(y * W + x) * 4 + 3]!;
          if (a > 128) {
            pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, r: 1.2 + Math.random() * 0.6 });
          }
        }
      }
      particlesRef.current = pts;
      initDone.current = true;
    }

    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const radius = 80;
      particlesRef.current.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius && dist > 0) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 3;
          p.vy += Math.sin(angle) * force * 3;
        }
        // Spring back to origin
        p.vx += (p.ox - p.x) * 0.04;
        p.vy += (p.oy - p.y) * 0.04;
        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    c.addEventListener("mousemove", onMove);
    c.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(animId); c.removeEventListener("mousemove", onMove); c.removeEventListener("mouseleave", onLeave); };
  }, [lines, fontSize]);

  const totalH = lines.length * fontSize * 1.15 + 40;
  return <canvas ref={cvRef} style={{ width: "100%", maxWidth: 900, height: totalH, cursor: "default" }} />;
}

/* ── Stable positions for company circles: scattered across viewport ── */
function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

function genCompanyPositions(count: number) {
  const rng = seededRandom(42);
  const pts: { x: number; y: number }[] = [];
  const pad = 0.06;
  for (let i = 0; i < count; i++) {
    let x: number, y: number, ok = false;
    for (let attempt = 0; attempt < 50; attempt++) {
      x = pad + rng() * (1 - pad * 2);
      y = pad + rng() * (1 - pad * 2);
      ok = true;
      for (const p of pts) {
        const dx = (x! - p.x), dy = (y! - p.y);
        if (Math.sqrt(dx * dx + dy * dy) < 0.06) { ok = false; break; }
      }
      if (ok) break;
    }
    pts.push({ x: x!, y: y! });
  }
  return pts;
}
const companyPositions = genCompanyPositions(allCompanies.length);

export default function HomePage() {
  const [active, setActive] = React.useState<number | null>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [formSent, setFormSent] = React.useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starfieldRef = useRef<HTMLElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const dimRef = useRef({ w: 0, h: 0 });
  const hovIdxRef = useRef<number | null>(null);
  const hoverRadii = useRef<number[]>(new Array(allCompanies.length).fill(18));
  const bp = process.env.NODE_ENV === "development" ? "/aqurion-holdings" : "";

  const { scrollYProgress } = useScroll({ target: starfieldRef, offset: ["start start", "end start"] });
  const featuredOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const featuredY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  /* ── Three.js Galaxy/Nebula Background ── */
  useEffect(() => {
    const container = threeRef.current; if (!container) return;
    const W = container.offsetWidth, H = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x010208);
    container.appendChild(renderer.domElement);

    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // ── 1. Nebula ring particles (Helix ring) ──
    const ringCount = 60000;
    const ringGeo = new THREE.BufferGeometry();
    const ringPos = new Float32Array(ringCount * 3);
    const ringCol = new Float32Array(ringCount * 3);
    const ringSz = new Float32Array(ringCount);
    const ringRadius = 2.2;
    const ringThick = 0.6;

    for (let i = 0; i < ringCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = ringRadius + (Math.random() - 0.5) * ringThick * 2;
      const jitter = (Math.random() - 0.5) * ringThick * 1.2;
      ringPos[i * 3] = Math.cos(angle) * r * 1.15 + (Math.random() - 0.5) * 0.15;
      ringPos[i * 3 + 1] = Math.sin(angle) * r * 0.85 + (Math.random() - 0.5) * 0.15;
      ringPos[i * 3 + 2] = jitter * 0.3;

      // Color: gold/amber/orange
      const hue = Math.random();
      if (hue < 0.35) { ringCol[i*3]=0.92+Math.random()*0.08; ringCol[i*3+1]=0.7+Math.random()*0.15; ringCol[i*3+2]=0.15+Math.random()*0.15; }
      else if (hue < 0.65) { ringCol[i*3]=0.85+Math.random()*0.15; ringCol[i*3+1]=0.5+Math.random()*0.2; ringCol[i*3+2]=0.08+Math.random()*0.1; }
      else { ringCol[i*3]=0.7+Math.random()*0.25; ringCol[i*3+1]=0.25+Math.random()*0.2; ringCol[i*3+2]=0.04+Math.random()*0.08; }

      ringSz[i] = 1.5 + Math.random() * 4;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    ringGeo.setAttribute('color', new THREE.BufferAttribute(ringCol, 3));
    ringGeo.setAttribute('size', new THREE.BufferAttribute(ringSz, 1));

    const ringMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d);
          gl_FragColor = vec4(vColor, alpha * 0.7);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ringPoints = new THREE.Points(ringGeo, ringMat);
    galaxyGroup.add(ringPoints);

    // ── 2. Gas clouds (reddish-brown outer wisps) ──
    const gasCount = 15000;
    const gasGeo = new THREE.BufferGeometry();
    const gasPos = new Float32Array(gasCount * 3);
    const gasCol = new Float32Array(gasCount * 3);
    const gasSz = new Float32Array(gasCount);
    for (let i = 0; i < gasCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 3.5;
      gasPos[i*3] = Math.cos(angle) * r * (0.7 + Math.random() * 0.6);
      gasPos[i*3+1] = Math.sin(angle) * r * (0.7 + Math.random() * 0.6);
      gasPos[i*3+2] = (Math.random() - 0.5) * 0.8;
      gasCol[i*3] = 0.3 + Math.random() * 0.35;
      gasCol[i*3+1] = 0.06 + Math.random() * 0.1;
      gasCol[i*3+2] = 0.02 + Math.random() * 0.06;
      gasSz[i] = 3 + Math.random() * 12;
    }
    gasGeo.setAttribute('position', new THREE.BufferAttribute(gasPos, 3));
    gasGeo.setAttribute('color', new THREE.BufferAttribute(gasCol, 3));
    gasGeo.setAttribute('size', new THREE.BufferAttribute(gasSz, 1));
    const gasMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d) * 0.15;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    galaxyGroup.add(new THREE.Points(gasGeo, gasMat));

    // ── 3. Background stars ──
    const starCount = 5000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starSz = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPos[i*3] = (Math.random() - 0.5) * 20;
      starPos[i*3+1] = (Math.random() - 0.5) * 20;
      starPos[i*3+2] = (Math.random() - 0.5) * 10 - 2;
      starSz[i] = 0.5 + Math.random() * 2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSz, 1));
    const starMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── 4. Bright blue stars ──
    const blueCount = 20;
    const blueGeo = new THREE.BufferGeometry();
    const bluePos = new Float32Array(blueCount * 3);
    const blueSz = new Float32Array(blueCount);
    const blueCol = new Float32Array(blueCount * 3);
    for (let i = 0; i < blueCount; i++) {
      bluePos[i*3] = (Math.random() - 0.5) * 12;
      bluePos[i*3+1] = (Math.random() - 0.5) * 8;
      bluePos[i*3+2] = (Math.random() - 0.5) * 2 - 1;
      blueSz[i] = 6 + Math.random() * 10;
      blueCol[i*3] = 0.4 + Math.random() * 0.2;
      blueCol[i*3+1] = 0.6 + Math.random() * 0.2;
      blueCol[i*3+2] = 0.9 + Math.random() * 0.1;
    }
    blueGeo.setAttribute('position', new THREE.BufferAttribute(bluePos, 3));
    blueGeo.setAttribute('size', new THREE.BufferAttribute(blueSz, 1));
    blueGeo.setAttribute('color', new THREE.BufferAttribute(blueCol, 3));
    const blueMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float glow = exp(-d * 4.0);
          float core = smoothstep(0.15, 0.0, d);
          vec3 col = mix(vColor, vec3(1.0), core);
          float alpha = glow * 0.6 + core * 0.8;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(blueGeo, blueMat));

    // ── 5. Center void (dark sphere) ──
    const voidGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const voidMat = new THREE.MeshBasicMaterial({ color: 0x010208, transparent: true, opacity: 0.85 });
    const voidMesh = new THREE.Mesh(voidGeo, voidMat);
    voidMesh.scale.set(1.15, 0.85, 0.3);
    galaxyGroup.add(voidMesh);

    // Mouse tracking for parallax
    const mousePos = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mousePos.x = (e.clientX / W - 0.5) * 2;
      mousePos.y = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // Animation
    let threeAnim: number;
    const clock = new THREE.Clock();
    function animate() {
      threeAnim = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      // Subtle galaxy rotation
      galaxyGroup.rotation.z = elapsed * 0.01;
      // Mouse parallax
      camera.position.x += (mousePos.x * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (-mousePos.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = container.offsetWidth, h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(threeAnim);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);


  /* ── Canvas: company nodes only (galaxy is CSS bg image) ── */
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let W = c.offsetWidth, H = c.offsetHeight;
    c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr);
    dimRef.current = { w: W, h: H };

    let t = 0; let animId: number;

    function draw() {
      if (!ctx) return;
      const W2 = dimRef.current.w, H2 = dimRef.current.h;
      ctx.clearRect(0, 0, W2, H2);

      const mxNow = mouseRef.current;
      let newHov: number | null = null;

      companyPositions.forEach((p, i) => {
        const cx = p.x * W2, cy = p.y * H2;
        const dist = Math.sqrt((mxNow.x - cx) ** 2 + (mxNow.y - cy) ** 2);
        const isHov = dist < 30;
        if (isHov) newHov = i;
        const sx = cx, sy = cy;

        const targetR = isHov ? 30 : 18;
        hoverRadii.current[i] = hoverRadii.current[i]! + (targetR - hoverRadii.current[i]!) * 0.04;
        const r = hoverRadii.current[i]!;
        const hoverFactor = Math.max(0, (r - 18) / 12);
        const accent = allCompanies[i]?.accentColor || '#6C63FF';
        const ar = parseInt(accent.slice(1, 3), 16), ag = parseInt(accent.slice(3, 5), 16), ab = parseInt(accent.slice(5, 7), 16);

        // Glow on hover
        if (hoverFactor > 0.05) {
          const glowG = ctx.createRadialGradient(sx, sy, r * 0.5, sx, sy, r * 2.5);
          glowG.addColorStop(0, `rgba(${ar},${ag},${ab},${0.2 * hoverFactor})`);
          glowG.addColorStop(1, "transparent");
          ctx.fillStyle = glowG; ctx.beginPath(); ctx.arc(sx, sy, r * 2.5, 0, Math.PI * 2); ctx.fill();
        }

        // Ring
        ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.strokeStyle = hoverFactor > 0.05 ? `rgba(${ar},${ag},${ab},${0.3 + hoverFactor * 0.7})` : 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 0.4 + hoverFactor * 1.3;
        ctx.stroke();

        // Dot
        const dotR = 3.5 + hoverFactor * 2;
        ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = hoverFactor > 0.05 ? accent : 'rgba(255,255,255,0.7)';
        ctx.fill();

        // Label
        if (hoverFactor > 0.3 && allCompanies[i]) {
          ctx.save();
          ctx.globalAlpha = Math.min(1, (hoverFactor - 0.3) * 2);
          ctx.font = '700 13px Inter, sans-serif';
          const tw = ctx.measureText(allCompanies[i]!.name).width;
          const lx = sx + r + 8, ly = sy - 10;
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.beginPath(); ctx.roundRect(lx, ly, tw + 16, 24, 6); ctx.fill();
          ctx.fillStyle = accent; ctx.textAlign = 'left';
          ctx.fillText(allCompanies[i]!.name, lx + 8, sy + 5);
          ctx.restore();
        }
      });

      hovIdxRef.current = newHov;
      t++;
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      c.style.cursor = hovIdxRef.current !== null ? 'pointer' : 'default';
    };
    const onClick = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      const mx2 = e.clientX - r.left, my2 = e.clientY - r.top;
      const W2 = dimRef.current.w, H2 = dimRef.current.h;
      for (let i = 0; i < companyPositions.length; i++) {
        const cx = companyPositions[i]!.x * W2, cy = companyPositions[i]!.y * H2;
        if (Math.sqrt((mx2 - cx) ** 2 + (my2 - cy) ** 2) < 25) { setActive(i); return; }
      }
    };
    const resize = () => {
      W = c.offsetWidth; H = c.offsetHeight;
      c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w: W, h: H };
      // resize handled
    };

    c.addEventListener("mousemove", onMove);
    c.addEventListener("click", onClick);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); c.removeEventListener("mousemove", onMove); c.removeEventListener("click", onClick); window.removeEventListener("resize", resize); };
  }, []);

  const company = active !== null ? allCompanies[active] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .hq{background:#020408;color:#fff;min-height:100vh;font-family:'Inter',sans-serif;overflow-x:hidden;}

        .hq-logo{position:fixed;top:1.5rem;left:2rem;z-index:101;display:flex;align-items:center;gap:0.5rem;text-decoration:none;}
        .hq-logo img{width:28px;height:28px;border-radius:6px;}
        .hq-logo-text{font-size:0.85rem;font-weight:700;color:#fff;}
        .hq-nav{position:fixed;top:1.5rem;left:50%;transform:translateX(-50%);z-index:100;display:flex;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:50px;padding:0.3rem;backdrop-filter:blur(20px);}
        .hq-nav a{padding:0.5rem 1.25rem;border-radius:50px;font-size:0.78rem;font-weight:600;color:rgba(255,255,255,0.45);text-decoration:none;transition:all 0.2s;white-space:nowrap;}
        .hq-nav a:hover{background:#fff;color:#000;}

        /* FULL-SCREEN STARFIELD HERO */
        .hq-starfield{position:relative;width:100%;height:100vh;overflow:hidden;
          background:
            radial-gradient(ellipse 40% 35% at 50% 50%, rgba(2,3,12,0.97) 0%, transparent 100%),
            radial-gradient(ellipse 52% 48% at 50% 50%, rgba(212,175,55,0.1) 30%, rgba(180,100,20,0.06) 60%, transparent 100%),
            radial-gradient(ellipse 58% 52% at 50% 50%, transparent 35%, rgba(200,140,30,0.08) 45%, rgba(160,80,15,0.05) 55%, transparent 70%),
            radial-gradient(ellipse 70% 65% at 50% 50%, transparent 50%, rgba(120,40,15,0.06) 65%, rgba(80,20,10,0.04) 80%, transparent 100%),
            radial-gradient(ellipse 85% 80% at 48% 52%, transparent 55%, rgba(90,25,12,0.05) 70%, rgba(50,12,8,0.03) 85%, transparent 100%),
            radial-gradient(circle at 22% 30%, rgba(80,150,240,0.06) 0%, transparent 25%),
            radial-gradient(circle at 80% 35%, rgba(80,150,240,0.05) 0%, transparent 22%),
            radial-gradient(circle at 15% 65%, rgba(60,120,220,0.04) 0%, transparent 18%),
            radial-gradient(circle at 85% 70%, rgba(60,120,220,0.04) 0%, transparent 20%),
            radial-gradient(circle at 35% 15%, rgba(70,140,230,0.03) 0%, transparent 15%),
            radial-gradient(circle at 70% 85%, rgba(70,140,230,0.03) 0%, transparent 15%),
            #020408;}
        .hq-starfield canvas{position:absolute;inset:0;width:100%;height:100%;}
        /* Featured cards at bottom of starfield */
        .hq-featured{position:absolute;bottom:3rem;left:0;right:0;z-index:3;display:flex;gap:1rem;padding:0 3rem;overflow-x:auto;scrollbar-width:none;}
        .hq-featured::-webkit-scrollbar{display:none;}
        .hq-featured-card{position:relative;flex:0 0 200px;height:240px;border-radius:18px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:1.25rem;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(4px);transition:border-color 0.3s;}
        .hq-featured-card:hover{border-color:rgba(108,99,255,0.35);}
        .hq-featured-bg{position:absolute;inset:0;opacity:0.5;transition:opacity 0.3s;}
        .hq-featured-card:hover .hq-featured-bg{opacity:0.8;}
        .hq-featured-icon{position:relative;z-index:1;font-size:2.5rem;margin-bottom:0.75rem;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.4));}
        .hq-featured-name{position:relative;z-index:1;font-size:0.88rem;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,0.5);}
        .hq-hero-section{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 3rem 6rem;}
        .hq-hero-section h1{font-size:clamp(3rem,7vw,5.5rem);font-weight:800;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;max-width:800px;}
        .hq-hero-section h1 span{color:rgba(255,255,255,0.2);}
        .hq-hero-section p{font-size:1rem;color:rgba(255,255,255,0.3);max-width:500px;margin:0 auto 2rem;line-height:1.7;}
        .hq-hero-section .hq-btn{display:inline-block;padding:0.75rem 2rem;border-radius:50px;background:#fff;color:#000;font-weight:700;font-size:0.85rem;border:none;cursor:pointer;text-decoration:none;transition:all 0.2s;}
        .hq-hero-section .hq-btn:hover{transform:scale(1.05);box-shadow:0 4px 25px rgba(255,255,255,0.2);}
        .hq-scroll-hint{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.15);font-size:0.65rem;letter-spacing:0.15em;display:flex;flex-direction:column;align-items:center;gap:0.4rem;}
        .hq-scroll-line{width:1px;height:28px;background:linear-gradient(180deg,rgba(255,255,255,0.2),transparent);animation:sPulse 2s infinite;}
        @keyframes sPulse{0%,100%{opacity:0.3;}50%{opacity:1;}}

        /* COMPANY CARDS SECTION */
        .hq-cards-section{padding:6rem 2rem;max-width:1200px;margin:0 auto;}
        .hq-cards-header{text-align:center;margin-bottom:3rem;}
        .hq-cards-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(255,255,255,0.2);font-family:'Space Mono',monospace;margin-bottom:0.75rem;}
        .hq-cards-title{font-size:clamp(2rem,4vw,3rem);font-weight:800;letter-spacing:-0.03em;}
        .hq-cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;}
        .hq-card{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;transition:border-color 0.3s;}
        .hq-card:hover{border-color:rgba(108,99,255,0.3);}
        .hq-card-bg{position:absolute;inset:0;opacity:0.25;transition:opacity 0.3s;}
        .hq-card:hover .hq-card-bg{opacity:0.4;}
        .hq-card-stars{position:absolute;top:0.75rem;right:0.75rem;display:flex;gap:0.25rem;}
        .hq-card-star{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.3);}
        .hq-card-content{position:relative;z-index:1;}
        .hq-card-name{font-size:1.1rem;font-weight:800;margin-bottom:0.2rem;}
        .hq-card-domain{font-size:0.72rem;color:rgba(255,255,255,0.35);}
        .hq-card-cat{font-size:0.62rem;color:rgba(255,255,255,0.25);margin-top:0.15rem;}

        /* MODAL */
        .hq-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(12px);z-index:200;display:flex;align-items:center;justify-content:center;padding:2rem;}
        .hq-modal{width:100%;max-width:520px;background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:3rem;position:relative;}
        .hq-modal-close{position:absolute;top:1.25rem;right:1.25rem;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);background:transparent;color:rgba(255,255,255,0.5);font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
        .hq-modal-close:hover{background:rgba(255,255,255,0.08);color:#fff;}
        .hq-modal-icon{font-size:3rem;margin-bottom:1.25rem;}
        .hq-modal-name{font-size:1.8rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:0.3rem;}
        .hq-modal-domain{font-size:0.88rem;color:rgba(255,255,255,0.35);margin-bottom:1.25rem;}
        .hq-modal-cat{display:inline-block;padding:0.3rem 1rem;border-radius:50px;font-size:0.72rem;font-weight:600;background:rgba(108,99,255,0.1);color:#8B85FF;border:1px solid rgba(108,99,255,0.15);margin-bottom:1.5rem;}
        .hq-modal-desc{font-size:0.9rem;color:rgba(255,255,255,0.45);line-height:1.8;margin-bottom:2rem;}
        .hq-modal-link{display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 2rem;border-radius:50px;background:#6C63FF;color:#fff;font-weight:700;font-size:0.88rem;text-decoration:none;transition:all 0.2s;}
        .hq-modal-link:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(108,99,255,0.35);}

        /* SECTIONS */
        .hq-section{padding:6rem 2rem;max-width:1100px;margin:0 auto;}
        .hq-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:rgba(255,255,255,0.25);font-family:'Space Mono',monospace;margin-bottom:1rem;}
        .hq-title{font-size:clamp(2rem,4vw,3rem);font-weight:800;letter-spacing:-0.03em;margin-bottom:1.5rem;line-height:1.1;}

        /* Company Directory */
        .hq-dir-grid{display:flex;flex-direction:column;gap:2px;margin-top:1rem;}
        .hq-dir-item{display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:14px;text-decoration:none;color:#fff;transition:all 0.2s;}
        .hq-dir-item:hover{background:rgba(108,99,255,0.06);border-color:rgba(108,99,255,0.2);}
        .hq-dir-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
        .hq-dir-info{flex:1;min-width:0;}
        .hq-dir-name{font-size:0.92rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .hq-dir-domain{font-size:0.72rem;color:rgba(255,255,255,0.3);}
        .hq-dir-cat{font-size:0.65rem;color:rgba(255,255,255,0.3);padding:0.2rem 0.65rem;border-radius:50px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);white-space:nowrap;}
        .hq-dir-arrow{font-size:0.85rem;color:rgba(255,255,255,0.15);transition:color 0.2s;}
        .hq-dir-item:hover .hq-dir-arrow{color:#6C63FF;}

        .hq-about-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.04);border-radius:20px;overflow:hidden;margin-top:3rem;}
        .hq-about-card{background:#0a0a0a;padding:2.5rem 2rem;}
        .hq-about-stat{font-size:2.5rem;font-weight:900;color:#6C63FF;margin-bottom:0.5rem;letter-spacing:-0.03em;}
        .hq-about-card-title{font-size:1rem;font-weight:700;margin-bottom:0.75rem;}
        .hq-about-card-desc{font-size:0.85rem;color:rgba(255,255,255,0.4);line-height:1.7;}

        .hq-faq{max-width:700px;margin-top:2rem;}
        .hq-faq-item{border-bottom:1px solid rgba(255,255,255,0.06);}
        .hq-faq-q{padding:1.25rem 0;font-weight:600;font-size:0.92rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:color 0.2s;}
        .hq-faq-q:hover{color:#6C63FF;}
        .hq-faq-a{padding:0 0 1.25rem;font-size:0.85rem;color:rgba(255,255,255,0.4);line-height:1.7;}

        .hq-careers-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:2rem;}
        .hq-career-card{padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);}
        .hq-career-title{font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;}
        .hq-career-meta{font-size:0.75rem;color:rgba(255,255,255,0.35);margin-bottom:0.75rem;}
        .hq-career-desc{font-size:0.82rem;color:rgba(255,255,255,0.45);line-height:1.6;}

        .hq-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start;}
        .hq-input{padding:0.8rem 1.2rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:0.88rem;font-family:'Inter',sans-serif;outline:none;width:100%;transition:border-color 0.2s;}
        .hq-input:focus{border-color:rgba(108,99,255,0.4);}
        .hq-input::placeholder{color:rgba(255,255,255,0.25);}
        .hq-textarea{min-height:120px;resize:vertical;}
        .hq-form-btn{padding:0.8rem;background:#6C63FF;color:#fff;border:none;border-radius:10px;font-weight:700;font-size:0.88rem;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;width:100%;}
        .hq-form-btn:hover{background:#7C75FF;}

        .hq-footer{padding:4rem 2rem 2rem;border-top:1px solid rgba(255,255,255,0.06);max-width:1100px;margin:0 auto;}
        .hq-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;}
        .hq-footer-brand{font-size:1.1rem;font-weight:800;margin-bottom:0.75rem;}
        .hq-footer-desc{font-size:0.8rem;color:rgba(255,255,255,0.35);line-height:1.6;max-width:280px;}
        .hq-footer-col-title{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin-bottom:1rem;}
        .hq-footer-link{display:block;font-size:0.8rem;color:rgba(255,255,255,0.45);text-decoration:none;padding:0.25rem 0;transition:color 0.2s;}
        .hq-footer-link:hover{color:#6C63FF;}
        .hq-footer-bottom{text-align:center;font-size:0.72rem;color:rgba(255,255,255,0.2);padding-top:2rem;border-top:1px solid rgba(255,255,255,0.05);}

        @media(max-width:768px){.hq-nav{display:none;}.hq-about-grid{grid-template-columns:1fr;}.hq-contact-grid{grid-template-columns:1fr;}.hq-footer-grid{grid-template-columns:1fr 1fr;}.hq-cards-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));}}
      `}</style>

      <div className="hq">
        <a href={`${bp}/`} className="hq-logo"><img src={`${bp}/logos/aqurion-holdings-icon.png`} alt="" /><span className="hq-logo-text">Aqurion</span></a>
        <nav className="hq-nav"><a href="#companies">Companies</a><a href="#about">About</a><a href="#careers">Careers</a><a href="#contact">Contact</a></nav>

        {/* ═══ HERO TEXT — first thing on the page ═══ */}
        <section className="hq-hero-section">
          <DotText lines={["Aqurion is a", "Company Studio"]} fontSize={72} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            We build, invest in, and operate technology companies across 12+ industry verticals.
          </motion.p>
          <motion.a href="#constellation" className="hq-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            Explore Companies ↓
          </motion.a>
          <div className="hq-scroll-hint"><span>SCROLL</span><div className="hq-scroll-line" /></div>
        </section>

        {/* ═══ FULL-SCREEN STARFIELD — scroll to reveal ═══ */}
        <section id="constellation" ref={starfieldRef} className="hq-starfield">
          <div ref={threeRef} className="hq-three-bg" />
          <canvas ref={canvasRef} />
        </section>

        {/* ═══ MODAL ═══ */}
        <AnimatePresence>
          {company && (
            <motion.div className="hq-modal-overlay" onClick={() => setActive(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <motion.div className="hq-modal" onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                <button className="hq-modal-close" onClick={() => setActive(null)}>✕</button>
                <div className="hq-modal-icon"><img src={`${bp}${company.logoUrl || '/logos/aqurion-base-logo.png'}`} alt={company.name} style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'contain' }} /></div>
                <div className="hq-modal-name">{company.name}</div>
                <div className="hq-modal-domain">{company.domain}</div>
                <div className="hq-modal-cat">{company.category}</div>
                <div className="hq-modal-desc">
                  Part of the Aqurion ecosystem, {company.name} provides enterprise-grade solutions for the {company.category?.toLowerCase()} industry. Built with modern technology and designed to scale.
                </div>
                <a href={`https://${company.domain}`} className="hq-modal-link" target="_blank" rel="noopener noreferrer">Visit {company.domain} →</a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ COMPANY DIRECTORY ═══ */}
        <section id="companies" className="hq-section">
          <motion.div className="hq-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Portfolio</motion.div>
          <motion.h2 className="hq-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>All Companies</motion.h2>
          <div className="hq-dir-grid">
            {allCompanies.map((c, i) => (
              <motion.a key={c.id} href={`https://${c.domain}`} target="_blank" rel="noopener noreferrer" className="hq-dir-item"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}>
                <div className="hq-dir-icon" style={{ background: `${c.accentColor}15` }}>
                  <img src={`${bp}${c.logoUrl || '/logos/aqurion-base-logo.png'}`} alt={c.name} style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'contain' }} />
                </div>
                <div className="hq-dir-info">
                  <div className="hq-dir-name">{c.name}</div>
                  <div className="hq-dir-domain">{c.domain}</div>
                </div>
                <div className="hq-dir-cat">{c.category}</div>
                <div className="hq-dir-arrow">→</div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="hq-section" style={{ textAlign: "center" }}>
          <motion.div className="hq-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>About</motion.div>
          <motion.h2 className="hq-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>A Holding Company Built for the Digital Age</motion.h2>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>Aqurion Holdings provides infrastructure for ambitious technology companies. Strategy, capital, and talent under one roof.</p>
          <div className="hq-about-grid">
            {[{ s: "56+", t: "Applications", d: "Active platforms across the ecosystem." }, { s: "12", t: "Verticals", d: "From property to healthcare." }, { s: "79", t: "Domains", d: "Growing digital real estate." }].map((c, i) => (
              <motion.div key={i} className="hq-about-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="hq-about-stat">{c.s}</div><div className="hq-about-card-title">{c.t}</div><div className="hq-about-card-desc">{c.d}</div>
              </motion.div>
            ))}
            {[{ t: "Our Mission", d: "Democratize enterprise-grade tech for SMBs worldwide." }, { t: "Our Approach", d: "Build, invest, operate. Shared infrastructure and AI-first." }, { t: "Global Reach", d: "North and South America, 10+ countries." }].map((c, i) => (
              <motion.div key={i + 3} className="hq-about-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 3) * 0.1 }}>
                <div className="hq-about-card-title">{c.t}</div><div className="hq-about-card-desc">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ CAREERS ═══ */}
        <section id="careers" className="hq-section">
          <motion.div className="hq-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Careers</motion.div>
          <motion.h2 className="hq-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Join the Team</motion.h2>
          <div className="hq-careers-grid">
            {[{ t: "Full-Stack Engineer", d: "React, Next.js, Node.js." }, { t: "AI/ML Engineer", d: "Intelligent models at scale." }, { t: "Growth Marketing Lead", d: "Drive acquisition." }, { t: "Sales Development Rep", d: "Generate leads." }].map((c, i) => (
              <motion.div key={i} className="hq-career-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="hq-career-title">{c.t}</div><div className="hq-career-meta">Remote • Full-time</div><div className="hq-career-desc">{c.d}</div>
              </motion.div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", marginTop: "1.5rem" }}>Email <a href="mailto:careers@aqurion.net" style={{ color: "#6C63FF", textDecoration: "none" }}>careers@aqurion.net</a></p>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="hq-section">
          <div className="hq-label">FAQ</div><h2 className="hq-title">Common Questions</h2>
          <div className="hq-faq">
            {[{ q: "What is Aqurion Holdings?", a: "A next-gen digital holding company across 12+ verticals." }, { q: "How many companies?", a: "56+ applications and platforms." }, { q: "How to partner?", a: "Email info@aqurion.net." }, { q: "Is Aqurion hiring?", a: "Yes! careers@aqurion.net." }].map((f, i) => (
              <div key={i} className="hq-faq-item">
                <div className="hq-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{f.q}<span style={{ color: "#6C63FF", fontSize: "1.2rem" }}>{openFaq === i ? "−" : "+"}</span></div>
                {openFaq === i && <motion.div className="hq-faq-a" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>{f.a}</motion.div>}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="hq-section">
          <div className="hq-contact-grid">
            <div><div className="hq-label">Contact</div><h2 className="hq-title">Let&apos;s Build Together</h2><p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Send us a message.</p></div>
            <div>
              {formSent ? (<div style={{ padding: "2rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 16, textAlign: "center", color: "#22C55E", fontWeight: 600 }}>✓ Sent!</div>) : (
                <form style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} onSubmit={e => { e.preventDefault(); setFormSent(true); }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}><input className="hq-input" placeholder="First name" required /><input className="hq-input" placeholder="Last name" required /></div>
                  <input className="hq-input" type="email" placeholder="Email" required /><textarea className="hq-input hq-textarea" placeholder="Your project..." required />
                  <button type="submit" className="hq-form-btn">Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </section>

        <footer className="hq-footer">
          <div className="hq-footer-grid">
            <div><div className="hq-footer-brand">Aqurion Holdings</div><div className="hq-footer-desc">Building the future of digital business.</div></div>
            <div><div className="hq-footer-col-title">Divisions</div><a href="https://Aqurion.AI" className="hq-footer-link">AI</a><a href="https://AqurionDev.com" className="hq-footer-link">Dev</a><a href="https://AqurionMarketing.com" className="hq-footer-link">Marketing</a><a href="https://AqurionSales.com" className="hq-footer-link">Sales</a></div>
            <div><div className="hq-footer-col-title">Company</div><a href="#about" className="hq-footer-link">About</a><a href="#careers" className="hq-footer-link">Careers</a><a href="#contact" className="hq-footer-link">Contact</a></div>
            <div><div className="hq-footer-col-title">Connect</div><a href="mailto:info@aqurion.net" className="hq-footer-link">Email</a><a href="https://linkedin.com" className="hq-footer-link">LinkedIn</a></div>
          </div>
          <div className="hq-footer-bottom">© {new Date().getFullYear()} Aqurion Holdings. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}
