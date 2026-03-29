"use client";

import { useEffect, useRef } from "react";

interface DataPoint {
  x: number;
  y: number;
  value: number;
  anomaly: boolean;
  pulsePhase: number;
}

export default function AnomalyDetection() {
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
    let scanX = 0;

    // Generate data field
    const w = canvas.width;
    const h = canvas.height;
    const points: DataPoint[] = [];

    for (let i = 0; i < 120; i++) {
      const isAnomaly = Math.random() < 0.08;
      points.push({
        x: Math.random() * w * 0.9 + w * 0.05,
        y: Math.random() * h * 0.75 + h * 0.1,
        value: isAnomaly ? 0.8 + Math.random() * 0.2 : Math.random() * 0.4,
        anomaly: isAnomaly,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 2, 6, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(42, 109, 212, 0.04)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < w; gx += w / 24) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += h / 16) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      // Scanning line
      scanX = (scanX + 2) % w;
      ctx.strokeStyle = "rgba(74, 143, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.stroke();

      // Scan glow
      const scanGrad = ctx.createLinearGradient(scanX - 40, 0, scanX, 0);
      scanGrad.addColorStop(0, "rgba(74, 143, 255, 0)");
      scanGrad.addColorStop(1, "rgba(74, 143, 255, 0.06)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanX - 40, 0, 40, h);

      // Data points
      points.forEach((p) => {
        const scanned = p.x < scanX;

        if (p.anomaly) {
          // Anomaly: pulsing red with crosshair
          const pulse = Math.sin(time * 0.08 + p.pulsePhase) * 0.3 + 0.7;
          const radius = 8 + pulse * 4;

          // Outer warning ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 60, 60, ${pulse * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Glow
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
          glow.addColorStop(0, `rgba(255, 60, 60, ${pulse * 0.6})`);
          glow.addColorStop(1, "rgba(255, 60, 60, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = `rgba(255, 80, 80, ${pulse})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Crosshair
          if (scanned) {
            ctx.strokeStyle = `rgba(255, 80, 80, ${pulse * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x - 14, p.y);
            ctx.lineTo(p.x - 5, p.y);
            ctx.moveTo(p.x + 5, p.y);
            ctx.lineTo(p.x + 14, p.y);
            ctx.moveTo(p.x, p.y - 14);
            ctx.lineTo(p.x, p.y - 5);
            ctx.moveTo(p.x, p.y + 5);
            ctx.lineTo(p.x, p.y + 14);
            ctx.stroke();

            // "ANOMALY" tag
            ctx.font = `${Math.max(7, w * 0.015)}px monospace`;
            ctx.fillStyle = `rgba(255, 80, 80, ${pulse * 0.8})`;
            ctx.fillText("ANOMALY", p.x + 12, p.y - 8);
          }
        } else {
          // Normal points: small blue/green dots
          const opacity = scanned ? 0.5 : 0.2;
          ctx.fillStyle = `rgba(74, 143, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Bottom waveform (pattern baseline)
      const waveY = h * 0.88;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(74, 143, 255, 0.3)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 2) {
        const y = waveY + Math.sin(x * 0.04 + time * 0.03) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Anomaly spikes in waveform
      points.forEach((p) => {
        if (p.anomaly) {
          const spike = Math.sin(time * 0.08 + p.pulsePhase) * 20;
          ctx.strokeStyle = "rgba(255, 60, 60, 0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, waveY);
          ctx.lineTo(p.x, waveY + spike);
          ctx.stroke();
        }
      });

      // Stats overlay
      const anomalyCount = points.filter((p) => p.anomaly).length;
      ctx.font = `${Math.max(8, w * 0.018)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.4)";
      ctx.fillText(`ENTITIES: ${points.length}`, 10, h - 30);
      ctx.fillStyle = "rgba(255, 80, 80, 0.6)";
      ctx.fillText(`ANOMALIES: ${anomalyCount}`, 10, h - 12);

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
