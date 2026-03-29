"use client";

import { useEffect, useRef } from "react";

const BLIPS = [
  { angle: 0.8, dist: 0.6, speed: 0.003 },
  { angle: 2.1, dist: 0.35, speed: -0.002 },
  { angle: 3.7, dist: 0.78, speed: 0.001 },
  { angle: 5.2, dist: 0.5, speed: 0.004 },
  { angle: 1.4, dist: 0.88, speed: -0.001 },
  { angle: 4.5, dist: 0.25, speed: 0.002 },
];

export default function AirRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    let animId: number;
    const blips = BLIPS.map((b) => ({ ...b }));

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) - 10;

      // Fade trail
      ctx.fillStyle = "rgba(0, 4, 8, 0.12)";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(42, 109, 212, 0.2)";
      ctx.lineWidth = 0.5;

      // Concentric range rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * (i / 4), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Bearing lines (every 45 degrees)
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 * i) / 8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.stroke();
      }

      // Sweep beam with gradient
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      // Sweep wedge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxR, -0.15, 0);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxR);
      sweepGrad.addColorStop(0, "rgba(74, 143, 255, 0.3)");
      sweepGrad.addColorStop(1, "rgba(74, 143, 255, 0.02)");
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(maxR, 0);
      ctx.strokeStyle = "rgba(74, 143, 255, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Blips
      blips.forEach((b) => {
        b.angle += b.speed;
        const bx = cx + Math.cos(b.angle) * maxR * b.dist;
        const by = cy + Math.sin(b.angle) * maxR * b.dist;

        // Glow
        const glow = ctx.createRadialGradient(bx, by, 0, bx, by, 6);
        glow.addColorStop(0, "rgba(74, 143, 255, 0.9)");
        glow.addColorStop(1, "rgba(74, 143, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bx, by, 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = "#4a8fff";
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center dot
      ctx.fillStyle = "#4a8fff";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      angle += 0.02;
      animId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(1, 1);
    };

    resize();
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
