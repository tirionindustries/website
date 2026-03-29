"use client";

import { useEffect, useRef } from "react";

const DOMAINS = [
  { label: "AIR", color: "74, 143, 255", angle: -Math.PI / 2 },
  { label: "SEA", color: "0, 200, 255", angle: -Math.PI / 2 + (Math.PI * 2) / 5 },
  { label: "GND", color: "0, 255, 100", angle: -Math.PI / 2 + (Math.PI * 2 * 2) / 5 },
  { label: "SPC", color: "180, 130, 255", angle: -Math.PI / 2 + (Math.PI * 2 * 3) / 5 },
  { label: "SIG", color: "255, 180, 60", angle: -Math.PI / 2 + (Math.PI * 2 * 4) / 5 },
];

interface CorrelationLink {
  from: number;
  to: number;
  strength: number;
  active: boolean;
  phase: number;
}

export default function CrossDomain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    let animId: number;
    let time = 0;

    // Generate correlation links
    const links: CorrelationLink[] = [];
    for (let i = 0; i < DOMAINS.length; i++) {
      for (let j = i + 1; j < DOMAINS.length; j++) {
        links.push({
          from: i,
          to: j,
          strength: 0.3 + (((i * 7 + j * 13) % 10) / 10) * 0.7,
          active: false,
          phase: (i + j) * 1.3,
        });
      }
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h * 0.48;
      const radius = Math.min(w, h) * 0.32;

      ctx.fillStyle = "rgba(0, 2, 6, 0.12)";
      ctx.fillRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = "rgba(42, 109, 212, 0.03)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += w / 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += h / 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 15, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(42, 109, 212, 0.1)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Domain node positions
      const nodes = DOMAINS.map((d) => ({
        x: cx + Math.cos(d.angle) * radius,
        y: cy + Math.sin(d.angle) * radius,
        ...d,
      }));

      // Correlation links
      links.forEach((link) => {
        const pulse = Math.sin(time * 0.05 + link.phase);
        link.active = pulse > 0.3;

        const from = nodes[link.from];
        const to = nodes[link.to];
        const opacity = link.active
          ? link.strength * 0.6 * ((pulse - 0.3) / 0.7)
          : 0.04;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = link.active
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(42, 109, 212, ${opacity})`;
        ctx.lineWidth = link.active ? 1.5 : 0.5;
        ctx.stroke();

        // Traveling pulse on active links
        if (link.active) {
          const t = ((time * 0.02 + link.phase) % 1);
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;

          const pGlow = ctx.createRadialGradient(px, py, 0, px, py, 6);
          pGlow.addColorStop(0, "rgba(255, 255, 255, 0.8)");
          pGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = pGlow;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Center hub
      const hubPulse = Math.sin(time * 0.03) * 0.2 + 0.8;
      const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 25);
      hubGlow.addColorStop(0, `rgba(74, 143, 255, ${hubPulse * 0.4})`);
      hubGlow.addColorStop(1, "rgba(74, 143, 255, 0)");
      ctx.fillStyle = hubGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(74, 143, 255, ${hubPulse})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = `${Math.max(7, w * 0.016)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("CORRELATE", cx, cy + 35);

      // Domain nodes
      nodes.forEach((n) => {
        // Spokes to center
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = `rgba(${n.color}, 0.08)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Node glow
        const nGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
        nGlow.addColorStop(0, `rgba(${n.color}, 0.4)`);
        nGlow.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx.fillStyle = nGlow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = `rgba(${n.color}, 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Node ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${n.color}, 0.4)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        const labelDist = 26;
        const lx = n.x + Math.cos(n.angle) * labelDist;
        const ly = n.y + Math.sin(n.angle) * labelDist;
        ctx.font = `bold ${Math.max(8, w * 0.02)}px monospace`;
        ctx.fillStyle = `rgba(${n.color}, 0.8)`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, lx, ly + 4);
      });

      ctx.textAlign = "start";

      // Active correlation count
      const activeCount = links.filter((l) => l.active).length;
      ctx.font = `${Math.max(8, w * 0.017)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.4)";
      ctx.fillText(`LINKS: ${activeCount}/${links.length}`, 10, h - 12);

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
