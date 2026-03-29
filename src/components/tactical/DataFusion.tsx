"use client";

import { useEffect, useRef } from "react";

const STREAMS = [
  { label: "AIR", color: "74, 143, 255", startX: 0.05, startY: 0.15 },
  { label: "SEA", color: "0, 200, 255", startX: 0.05, startY: 0.35 },
  { label: "GND", color: "0, 255, 100", startX: 0.05, startY: 0.55 },
  { label: "SPC", color: "180, 130, 255", startX: 0.05, startY: 0.75 },
  { label: "SIG", color: "255, 180, 60", startX: 0.05, startY: 0.90 },
];

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  speed: number;
  stream: number;
  progress: number;
}

export default function DataFusion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const particles: Particle[] = [];

    const spawnParticle = (w: number, h: number) => {
      const si = Math.floor(Math.random() * STREAMS.length);
      const s = STREAMS[si];
      particles.push({
        x: s.startX * w,
        y: s.startY * h,
        tx: w * 0.78,
        ty: h * 0.5,
        speed: 0.008 + Math.random() * 0.008,
        stream: si,
        progress: 0,
      });
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "rgba(0, 2, 6, 0.12)";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(42, 109, 212, 0.05)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += w / 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += h / 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Stream source labels and lines
      STREAMS.forEach((s) => {
        const sx = s.startX * w;
        const sy = s.startY * h;
        const fx = w * 0.78;
        const fy = h * 0.5;

        // Curved path line
        ctx.beginPath();
        ctx.moveTo(sx + 30, sy);
        ctx.bezierCurveTo(
          w * 0.35, sy,
          w * 0.55, fy,
          fx, fy
        );
        ctx.strokeStyle = `rgba(${s.color}, 0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Source dot
        ctx.fillStyle = `rgba(${s.color}, 0.6)`;
        ctx.beginPath();
        ctx.arc(sx + 10, sy, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = `${Math.max(8, w * 0.022)}px monospace`;
        ctx.fillStyle = `rgba(${s.color}, 0.7)`;
        ctx.fillText(s.label, sx + 20, sy + 3);
      });

      // Fusion center
      const fx = w * 0.78;
      const fy = h * 0.5;
      const pulseR = 20 + Math.sin(time * 0.04) * 6;

      // Outer glow
      const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, pulseR * 2.5);
      glow.addColorStop(0, "rgba(74, 143, 255, 0.25)");
      glow.addColorStop(0.5, "rgba(74, 143, 255, 0.08)");
      glow.addColorStop(1, "rgba(74, 143, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(fx, fy, pulseR * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = "rgba(74, 143, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(fx, fy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Rotating ring
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(time * 0.02);
      ctx.strokeStyle = "rgba(74, 143, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, 0, Math.PI * 1.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, Math.PI, Math.PI * 2.2);
      ctx.stroke();
      ctx.restore();

      // "FUSED" label
      ctx.font = `${Math.max(9, w * 0.024)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.6)";
      ctx.fillText("FUSED OUTPUT", fx - 36, fy + pulseR + 18);

      // Spawn & update particles
      if (time % 3 === 0) spawnParticle(w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const s = STREAMS[p.stream];
        const sx = s.startX * w + 30;
        const sy = s.startY * h;
        const t = p.progress;

        // Bezier position
        const mt = 1 - t;
        const px =
          mt * mt * mt * sx +
          3 * mt * mt * t * (w * 0.35) +
          3 * mt * t * t * (w * 0.55) +
          t * t * t * fx;
        const py =
          mt * mt * mt * sy +
          3 * mt * mt * t * sy +
          3 * mt * t * t * fy +
          t * t * t * fy;

        // Particle glow
        const pGlow = ctx.createRadialGradient(px, py, 0, px, py, 5);
        pGlow.addColorStop(0, `rgba(${s.color}, 0.9)`);
        pGlow.addColorStop(1, `rgba(${s.color}, 0)`);
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${s.color}, 1)`;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      time++;
      animId = requestAnimationFrame(draw);
    };

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
