"use client";

import { useEffect, useRef } from "react";

interface NetNode {
  x: number;
  y: number;
  label: string;
  color: string;
  radius: number;
  isCore: boolean;
}

interface NetLink {
  from: number;
  to: number;
  encrypted: boolean;
}

export default function SovereignArch() {
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

    const nodes: NetNode[] = [
      // Core sovereign node
      { x: 0.5, y: 0.45, label: "SOVEREIGN CORE", color: "0, 180, 80", radius: 14, isCore: true },
      // Data nodes
      { x: 0.2, y: 0.2, label: "INGEST-01", color: "74, 143, 255", radius: 6, isCore: false },
      { x: 0.8, y: 0.2, label: "INGEST-02", color: "74, 143, 255", radius: 6, isCore: false },
      { x: 0.15, y: 0.55, label: "PROCESS-A", color: "0, 200, 255", radius: 7, isCore: false },
      { x: 0.85, y: 0.55, label: "PROCESS-B", color: "0, 200, 255", radius: 7, isCore: false },
      { x: 0.3, y: 0.78, label: "STORE-AF", color: "0, 255, 100", radius: 6, isCore: false },
      { x: 0.7, y: 0.78, label: "STORE-ME", color: "0, 255, 100", radius: 6, isCore: false },
      // Shield perimeter nodes
      { x: 0.5, y: 0.12, label: "SHIELD-N", color: "255, 180, 60", radius: 5, isCore: false },
      { x: 0.12, y: 0.38, label: "SHIELD-W", color: "255, 180, 60", radius: 5, isCore: false },
      { x: 0.88, y: 0.38, label: "SHIELD-E", color: "255, 180, 60", radius: 5, isCore: false },
      { x: 0.5, y: 0.92, label: "SHIELD-S", color: "255, 180, 60", radius: 5, isCore: false },
    ];

    const links: NetLink[] = [
      { from: 0, to: 1, encrypted: true }, { from: 0, to: 2, encrypted: true },
      { from: 0, to: 3, encrypted: true }, { from: 0, to: 4, encrypted: true },
      { from: 0, to: 5, encrypted: true }, { from: 0, to: 6, encrypted: true },
      { from: 1, to: 7, encrypted: true }, { from: 2, to: 7, encrypted: true },
      { from: 3, to: 8, encrypted: true }, { from: 4, to: 9, encrypted: true },
      { from: 5, to: 10, encrypted: true }, { from: 6, to: 10, encrypted: true },
      { from: 7, to: 8, encrypted: false }, { from: 7, to: 9, encrypted: false },
      { from: 8, to: 10, encrypted: false }, { from: 9, to: 10, encrypted: false },
    ];

    const draw = () => {
      ctx.fillStyle = "rgba(0, 2, 6, 0.12)";
      ctx.fillRect(0, 0, w, h);

      // Hex grid background
      ctx.strokeStyle = "rgba(0, 180, 80, 0.03)";
      ctx.lineWidth = 0.5;
      const hexSize = 30;
      for (let row = 0; row < h / (hexSize * 1.5) + 1; row++) {
        for (let col = 0; col < w / (hexSize * 1.73) + 1; col++) {
          const hx = col * hexSize * 1.73 + (row % 2) * hexSize * 0.866;
          const hy = row * hexSize * 1.5;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + Math.PI / 6;
            const px = hx + hexSize * 0.5 * Math.cos(angle);
            const py = hy + hexSize * 0.5 * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      // Shield perimeter (dotted circle)
      const shieldR = Math.min(w, h) * 0.42;
      const cx = w * 0.5;
      const cy = h * 0.45;
      const shieldPulse = Math.sin(time * 0.02) * 0.15 + 0.85;

      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, shieldR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 180, 60, ${shieldPulse * 0.2})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);

      // "NO FOREIGN ACCESS" label on perimeter
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.005);
      ctx.font = `${Math.max(7, w * 0.014)}px monospace`;
      ctx.fillStyle = `rgba(255, 180, 60, ${shieldPulse * 0.25})`;
      for (let i = 0; i < 4; i++) {
        const textAngle = (Math.PI * 2 * i) / 4;
        const tx = Math.cos(textAngle) * (shieldR + 12);
        const ty = Math.sin(textAngle) * (shieldR + 12);
        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(textAngle + Math.PI / 2);
        ctx.fillText("◆ NO ITAR ◆ SOVEREIGN ◆", -50, 0);
        ctx.restore();
      }
      ctx.restore();

      // Links with encrypted data flow
      links.forEach((link, li) => {
        const from = nodes[link.from];
        const to = nodes[link.to];
        const fx = from.x * w;
        const fy = from.y * h;
        const tx = to.x * w;
        const ty = to.y * h;

        // Link line
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = link.encrypted
          ? `rgba(0, 180, 80, 0.15)`
          : `rgba(255, 180, 60, 0.1)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Data packets traveling along link
        if (link.encrypted) {
          const t = ((time * 0.015 + li * 0.3) % 1);
          const px = fx + (tx - fx) * t;
          const py = fy + (ty - fy) * t;

          // Lock icon (small square with dot)
          ctx.fillStyle = "rgba(0, 255, 100, 0.6)";
          ctx.fillRect(px - 2, py - 2, 4, 4);

          // Encrypted glow
          const eGlow = ctx.createRadialGradient(px, py, 0, px, py, 6);
          eGlow.addColorStop(0, "rgba(0, 255, 100, 0.3)");
          eGlow.addColorStop(1, "rgba(0, 255, 100, 0)");
          ctx.fillStyle = eGlow;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Nodes
      nodes.forEach((n) => {
        const nx = n.x * w;
        const ny = n.y * h;
        const [r, g, b] = n.color.split(",").map(Number);

        if (n.isCore) {
          // Core node: larger, green, with rotating shield ring
          const corePulse = Math.sin(time * 0.04) * 0.2 + 0.8;

          // Inner glow
          const coreGlow = ctx.createRadialGradient(nx, ny, 0, nx, ny, 30);
          coreGlow.addColorStop(0, `rgba(${n.color}, ${corePulse * 0.4})`);
          coreGlow.addColorStop(1, `rgba(${n.color}, 0)`);
          ctx.fillStyle = coreGlow;
          ctx.beginPath();
          ctx.arc(nx, ny, 30, 0, Math.PI * 2);
          ctx.fill();

          // Rotating arcs
          ctx.save();
          ctx.translate(nx, ny);
          ctx.rotate(time * 0.015);
          ctx.strokeStyle = `rgba(${n.color}, 0.5)`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 20, 0, Math.PI * 0.8);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, 20, Math.PI, Math.PI * 1.8);
          ctx.stroke();
          ctx.restore();

          // Core dot
          ctx.fillStyle = `rgba(${n.color}, ${corePulse})`;
          ctx.beginPath();
          ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Regular nodes
          const nGlow = ctx.createRadialGradient(nx, ny, 0, nx, ny, 14);
          nGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
          nGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = nGlow;
          ctx.beginPath();
          ctx.arc(nx, ny, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${n.color}, 0.8)`;
          ctx.beginPath();
          ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nx, ny, n.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${n.color}, 0.3)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Label
        ctx.font = `${Math.max(7, w * 0.014)}px monospace`;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, nx, ny + n.radius + 14);
      });

      ctx.textAlign = "start";

      // Status
      ctx.font = `${Math.max(8, w * 0.016)}px monospace`;
      ctx.fillStyle = "rgba(0, 255, 100, 0.5)";
      ctx.fillText("SOVEREIGN: ACTIVE", 10, h - 28);
      ctx.fillStyle = "rgba(255, 180, 60, 0.4)";
      ctx.fillText("ITAR: INDEPENDENT", 10, h - 10);

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
