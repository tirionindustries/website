"use client";

import { useEffect, useRef } from "react";

// Simplified Africa continent outline (normalized 0-1 coordinates)
const AFRICA_OUTLINE: [number, number][] = [
  [0.45, 0.05], [0.55, 0.03], [0.65, 0.06], [0.72, 0.12],
  [0.73, 0.18], [0.78, 0.22], [0.80, 0.30], [0.76, 0.36],
  [0.74, 0.42], [0.78, 0.48], [0.80, 0.54], [0.78, 0.60],
  [0.73, 0.66], [0.68, 0.72], [0.62, 0.78], [0.58, 0.85],
  [0.53, 0.90], [0.50, 0.95], [0.46, 0.92], [0.42, 0.86],
  [0.38, 0.80], [0.34, 0.75], [0.30, 0.68], [0.26, 0.62],
  [0.22, 0.55], [0.20, 0.48], [0.18, 0.40], [0.20, 0.32],
  [0.22, 0.26], [0.28, 0.20], [0.32, 0.16], [0.36, 0.12],
  [0.40, 0.08], [0.45, 0.05],
];

interface GeoEvent {
  x: number;
  y: number;
  type: "alert" | "watch" | "clear";
  label: string;
  pulsePhase: number;
}

export default function GeoOps() {
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

    // Events positioned on Africa
    const events: GeoEvent[] = [
      { x: 0.55, y: 0.18, type: "alert", label: "SAHEL-01", pulsePhase: 0 },
      { x: 0.68, y: 0.35, type: "watch", label: "HORN-02", pulsePhase: 1.2 },
      { x: 0.42, y: 0.45, type: "clear", label: "GULF-03", pulsePhase: 2.4 },
      { x: 0.50, y: 0.65, type: "alert", label: "LAKES-04", pulsePhase: 0.8 },
      { x: 0.35, y: 0.30, type: "clear", label: "WEST-05", pulsePhase: 3.1 },
      { x: 0.60, y: 0.50, type: "watch", label: "EAST-06", pulsePhase: 1.8 },
      { x: 0.48, y: 0.80, type: "clear", label: "SOUTH-07", pulsePhase: 4.0 },
      { x: 0.30, y: 0.22, type: "watch", label: "MAGHR-08", pulsePhase: 2.0 },
    ];

    const draw = () => {
      ctx.fillStyle = "rgba(0, 2, 6, 0.12)";
      ctx.fillRect(0, 0, w, h);

      const mapX = w * 0.1;
      const mapY = h * 0.02;
      const mapW = w * 0.8;
      const mapH = h * 0.9;

      // Coordinate grid
      ctx.strokeStyle = "rgba(42, 109, 212, 0.06)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx <= 10; gx++) {
        const x = mapX + (gx / 10) * mapW;
        ctx.beginPath();
        ctx.moveTo(x, mapY);
        ctx.lineTo(x, mapY + mapH);
        ctx.stroke();
      }
      for (let gy = 0; gy <= 12; gy++) {
        const y = mapY + (gy / 12) * mapH;
        ctx.beginPath();
        ctx.moveTo(mapX, y);
        ctx.lineTo(mapX + mapW, y);
        ctx.stroke();
      }

      // Africa outline
      ctx.beginPath();
      AFRICA_OUTLINE.forEach((p, i) => {
        const px = mapX + p[0] * mapW;
        const py = mapY + p[1] * mapH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.strokeStyle = "rgba(74, 143, 255, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "rgba(74, 143, 255, 0.03)";
      ctx.fill();

      // Events
      events.forEach((evt) => {
        const ex = mapX + evt.x * mapW;
        const ey = mapY + evt.y * mapH;
        const pulse = Math.sin(time * 0.06 + evt.pulsePhase) * 0.3 + 0.7;

        let color: string;
        if (evt.type === "alert") color = "255, 80, 80";
        else if (evt.type === "watch") color = "255, 180, 60";
        else color = "0, 255, 100";

        // Expanding ring
        const ringR = 8 + ((time * 0.5 + evt.pulsePhase * 20) % 25);
        const ringOpacity = Math.max(0, 1 - ringR / 25) * 0.3;
        ctx.beginPath();
        ctx.arc(ex, ey, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, ${ringOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glow
        const glow = ctx.createRadialGradient(ex, ey, 0, ex, ey, 12);
        glow.addColorStop(0, `rgba(${color}, ${pulse * 0.5})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ex, ey, 12, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${color}, ${pulse})`;
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = `${Math.max(7, w * 0.015)}px monospace`;
        ctx.fillStyle = `rgba(${color}, ${pulse * 0.7})`;
        ctx.fillText(evt.label, ex + 10, ey - 4);
      });

      // Coordinate labels
      ctx.font = `${Math.max(7, w * 0.013)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.2)";
      ctx.fillText("35°N", mapX - 30, mapY + 10);
      ctx.fillText("35°S", mapX - 30, mapY + mapH);
      ctx.fillText("20°W", mapX, mapY + mapH + 14);
      ctx.fillText("50°E", mapX + mapW - 20, mapY + mapH + 14);

      // Stats
      const alerts = events.filter((e) => e.type === "alert").length;
      const watches = events.filter((e) => e.type === "watch").length;
      ctx.font = `${Math.max(8, w * 0.016)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.4)";
      ctx.fillText("54 NATIONS", 10, h - 28);
      ctx.fillStyle = "rgba(255, 80, 80, 0.5)";
      ctx.fillText(`ALERTS: ${alerts}`, 10, h - 10);
      ctx.fillStyle = "rgba(255, 180, 60, 0.4)";
      ctx.fillText(`WATCH: ${watches}`, w * 0.3, h - 10);

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
