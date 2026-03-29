"use client";

import { useEffect, useRef } from "react";

const VESSELS = [
  { x: 0.3, y: 0.25, heading: 0.5, size: 4 },
  { x: 0.7, y: 0.4, heading: 2.1, size: 3 },
  { x: 0.5, y: 0.7, heading: 4.2, size: 5 },
  { x: 0.2, y: 0.6, heading: 1.2, size: 3 },
  { x: 0.8, y: 0.75, heading: 3.5, size: 4 },
];

export default function SeaSonar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animId: number;
    const pingPhases = [0, 0.33, 0.66];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) - 10;

      // Fade
      ctx.fillStyle = "rgba(2, 4, 12, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(0, 136, 255, 0.1)";
      ctx.lineWidth = 0.5;
      const gridSize = w / 10;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Range rings
      ctx.strokeStyle = "rgba(0, 136, 255, 0.15)";
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * (i / 3), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Expanding ping rings
      pingPhases.forEach((phase) => {
        const pingProgress = ((time * 0.008 + phase) % 1);
        const pingR = pingProgress * maxR;
        const opacity = (1 - pingProgress) * 0.5;

        ctx.beginPath();
        ctx.arc(cx, cy, pingR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Vessel contacts
      VESSELS.forEach((v) => {
        const vx = v.x * w;
        const vy = v.y * h;

        // Diamond shape
        ctx.save();
        ctx.translate(vx, vy);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = "rgba(0, 220, 255, 0.8)";
        ctx.fillRect(-v.size, -v.size, v.size * 2, v.size * 2);
        ctx.restore();

        // Heading line
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(
          vx + Math.cos(v.heading) * 20,
          vy + Math.sin(v.heading) * 20
        );
        ctx.strokeStyle = "rgba(0, 220, 255, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glow
        const glow = ctx.createRadialGradient(vx, vy, 0, vx, vy, 12);
        glow.addColorStop(0, "rgba(0, 200, 255, 0.3)");
        glow.addColorStop(1, "rgba(0, 200, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(vx, vy, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center crosshair
      ctx.strokeStyle = "rgba(0, 200, 255, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();

      time++;
      animId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };

    resize();
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
