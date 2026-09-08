"use client";

/**
 * HERO SYSTEMS VISUALIZATION — signature interaction № 1.
 * Generative art based on distributed systems: a request traverses
 * MODEL → API → SERVICE → QUEUE → CACHE → DATABASE → CLOUD.
 * Canvas 2D — lightweight, dpr-aware, pauses off-screen, honors reduced motion.
 */

import { useEffect, useRef } from "react";

type Accent = "ivory" | "emerald" | "sapphire" | "gold";

type SysNode = {
  id: string;
  label: string;
  x: number; // normalized 0..1
  y: number;
  accent: Accent;
};

type Packet = {
  edge: number; // index into EDGES
  t: number; // 0..1 progress
  speed: number;
  label?: string;
};

const ACCENTS: Record<Accent, string> = {
  ivory: "243, 239, 230",
  emerald: "24, 184, 132",
  sapphire: "65, 105, 225",
  gold: "198, 161, 91",
};

const NODES: SysNode[] = [
  { id: "model", label: "MODEL", x: 0.14, y: 0.3, accent: "emerald" },
  { id: "api", label: "API", x: 0.36, y: 0.62, accent: "ivory" },
  { id: "service", label: "SERVICE", x: 0.56, y: 0.26, accent: "sapphire" },
  { id: "queue", label: "QUEUE", x: 0.78, y: 0.58, accent: "ivory" },
  { id: "cache", label: "CACHE", x: 0.9, y: 0.22, accent: "gold" },
  { id: "database", label: "DATABASE", x: 0.24, y: 0.86, accent: "ivory" },
  { id: "cloud", label: "CLOUD", x: 0.68, y: 0.9, accent: "sapphire" },
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 5],
  [3, 6],
  [2, 4],
];

const PACKETS: Packet[] = [
  { edge: 0, t: 0.1, speed: 0.0016, label: "REQUEST" },
  { edge: 0, t: 0.65, speed: 0.0012 },
  { edge: 1, t: 0.3, speed: 0.0014 },
  { edge: 2, t: 0.5, speed: 0.0011, label: "POST /risk" },
  { edge: 2, t: 0.05, speed: 0.0015 },
  { edge: 3, t: 0.75, speed: 0.0013 },
  { edge: 4, t: 0.4, speed: 0.0009 },
  { edge: 5, t: 0.2, speed: 0.001 },
  { edge: 6, t: 0.55, speed: 0.0008 },
];

const FLOATING_LABELS = [
  { text: "POST /risk", x: 0.3, y: 0.14 },
  { text: "302ms", x: 0.52, y: 0.44 },
  { text: "event.accepted", x: 0.72, y: 0.74 },
  { text: "confidence 0.87", x: 0.12, y: 0.62 },
  { text: "healthy", x: 0.86, y: 0.38 },
  { text: "deployment.ready", x: 0.44, y: 0.76 },
];

export function SystemCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;
    let time = 0;
    const pointer = { x: -1, y: -1, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const px = (n: SysNode) => ({ x: n.x * width, y: n.y * height });

    const nodeGlow = (n: SysNode) => {
      if (!pointer.active) return 0;
      const p = px(n);
      const d = Math.hypot(pointer.x - p.x, pointer.y - p.y);
      return Math.max(0, 1 - d / 140);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // ── edges ──
      for (const [a, b] of EDGES) {
        const pa = px(NODES[a]);
        const pb = px(NODES[b]);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${ACCENTS.ivory}, 0.1)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── packets ──
      for (const p of PACKETS) {
        const [a, b] = EDGES[p.edge];
        const pa = px(NODES[a]);
        const pb = px(NODES[b]);
        const t = p.t;
        const x = pa.x + (pb.x - pa.x) * t;
        const y = pa.y + (pb.y - pa.y) * t;
        const color = NODES[b].accent;
        const pulse = 1.6 + Math.sin(time * 0.004 + p.t * 6) * 0.5;

        ctx.beginPath();
        ctx.arc(x, y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENTS[color]}, 0.85)`;
        ctx.fill();

        // faint trail
        const tt = Math.max(0, t - 0.06);
        const tx = pa.x + (pb.x - pa.x) * tt;
        const ty = pa.y + (pb.y - pa.y) * tt;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${ACCENTS[color]}, 0.18)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (p.label) {
          ctx.font = "500 9px 'IBM Plex Mono', monospace";
          ctx.fillStyle = `rgba(${ACCENTS[color]}, 0.6)`;
          ctx.fillText(p.label, x + 8, y - 6);
        }
      }

      // ── nodes ──
      for (const n of NODES) {
        const p = px(n);
        const glow = nodeGlow(n);
        const breathe = reduced ? 0 : Math.sin(time * 0.0016 + n.x * 9) * 1.2;
        const r = 3.2 + glow * 2 + breathe * 0.3;

        // halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 10 + glow * 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENTS[n.accent]}, ${0.04 + glow * 0.08})`;
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENTS[n.accent]}, ${0.75 + glow * 0.25})`;
        ctx.fill();

        // hairline ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENTS[n.accent]}, ${0.25 + glow * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // label
        ctx.font = "500 10px 'IBM Plex Mono', monospace";
        ctx.fillStyle = `rgba(${ACCENTS.ivory}, ${0.5 + glow * 0.4})`;
        ctx.fillText(n.label, p.x + 12, p.y + 3);
      }

      // ── floating metadata ──
      ctx.font = "400 9px 'IBM Plex Mono', monospace";
      for (const l of FLOATING_LABELS) {
        const drift = reduced ? 0 : Math.sin(time * 0.0008 + l.x * 12) * 3;
        ctx.fillStyle = `rgba(${ACCENTS.gold}, ${0.28 + 0.1 * Math.sin(time * 0.001 + l.y * 7) + 0.05})`;
        ctx.fillText(l.text, l.x * width, l.y * height + drift);
      }
    };

    const step = (now: number) => {
      if (!running) return;
      time = now;
      if (!reduced) {
        for (const p of PACKETS) {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    // Pause when off-screen — performance is credibility.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.02 }
    );

    resize();
    io.observe(canvas);
    raf = requestAnimationFrame(step);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
