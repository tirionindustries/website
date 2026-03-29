"use client";

import { useEffect, useRef } from "react";

interface Entity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  risk: number;
  id: string;
  type: string;
}

const ENTITY_TYPES = ["VES", "AIR", "GND", "SIG"];

export default function EntityIntel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    const w = canvas.width;
    const h = canvas.height;
    let animId: number;
    let time = 0;

    // Generate entities
    const entities: Entity[] = [];
    for (let i = 0; i < 18; i++) {
      const risk = ((i * 37 + 13) % 100) / 100;
      entities.push({
        x: (((i * 73 + 29) % 90) / 100) * w * 0.85 + w * 0.075,
        y: (((i * 41 + 7) % 85) / 100) * h * 0.7 + h * 0.08,
        vx: (((i * 17) % 10) - 5) * 0.15,
        vy: (((i * 23) % 10) - 5) * 0.12,
        trail: [],
        risk,
        id: `${ENTITY_TYPES[i % 4]}-${String(i * 13 + 100).padStart(4, "0")}`,
        type: ENTITY_TYPES[i % 4],
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 2, 6, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(42, 109, 212, 0.04)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < w; gx += w / 20) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += h / 14) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      entities.forEach((e) => {
        // Update position
        e.x += e.vx;
        e.y += e.vy;

        // Bounce off edges
        if (e.x < 20 || e.x > w - 20) e.vx *= -1;
        if (e.y < 20 || e.y > h - 50) e.vy *= -1;

        // Store trail
        e.trail.push({ x: e.x, y: e.y });
        if (e.trail.length > 40) e.trail.shift();

        const isHighRisk = e.risk > 0.7;
        const baseColor = isHighRisk ? "255, 80, 80" : "74, 143, 255";

        // Draw trail
        if (e.trail.length > 1) {
          for (let t = 1; t < e.trail.length; t++) {
            const alpha = (t / e.trail.length) * 0.3;
            ctx.beginPath();
            ctx.moveTo(e.trail[t - 1].x, e.trail[t - 1].y);
            ctx.lineTo(e.trail[t].x, e.trail[t].y);
            ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Entity dot
        ctx.fillStyle = `rgba(${baseColor}, 0.9)`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, isHighRisk ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        const glow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, 10);
        glow.addColorStop(0, `rgba(${baseColor}, 0.3)`);
        glow.addColorStop(1, `rgba(${baseColor}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Heading line
        ctx.beginPath();
        ctx.moveTo(e.x, e.y);
        ctx.lineTo(e.x + e.vx * 15, e.y + e.vy * 15);
        ctx.strokeStyle = `rgba(${baseColor}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Risk badge for high-risk entities
        if (isHighRisk) {
          const pulse = Math.sin(time * 0.08 + e.risk * 10) * 0.3 + 0.7;

          // Warning ring
          ctx.beginPath();
          ctx.arc(e.x, e.y, 12 + pulse * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 80, 80, ${pulse * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Risk score label
          ctx.font = `${Math.max(7, w * 0.015)}px monospace`;
          ctx.fillStyle = `rgba(255, 80, 80, ${pulse * 0.8})`;
          ctx.fillText(
            `${e.id} [${Math.round(e.risk * 100)}%]`,
            e.x + 14,
            e.y - 6
          );
        }
      });

      // Stats bar
      const highRisk = entities.filter((e) => e.risk > 0.7).length;
      ctx.font = `${Math.max(8, w * 0.017)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.4)";
      ctx.fillText(`TRACKING: ${entities.length}`, 10, h - 28);
      ctx.fillStyle = "rgba(255, 80, 80, 0.5)";
      ctx.fillText(`HIGH RISK: ${highRisk}`, 10, h - 10);
      ctx.fillStyle = "rgba(0, 255, 100, 0.4)";
      ctx.fillText(`CLEAR: ${entities.length - highRisk}`, w * 0.35, h - 10);

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
