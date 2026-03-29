"use client";

import { useEffect, useRef } from "react";

export default function SigSignals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animId: number;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear with slight fade
      ctx.fillStyle = "rgba(2, 4, 8, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(42, 109, 212, 0.08)";
      ctx.lineWidth = 0.5;
      const gridSize = w / 16;
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

      // === TOP HALF: Waveforms ===
      const waveforms = [
        { freq: 0.03, amp: 25, speed: 0.05, color: "rgba(0, 255, 200, 0.7)", yOff: h * 0.15 },
        { freq: 0.05, amp: 18, speed: 0.08, color: "rgba(74, 143, 255, 0.7)", yOff: h * 0.25 },
        { freq: 0.02, amp: 30, speed: 0.03, color: "rgba(0, 255, 136, 0.5)", yOff: h * 0.35 },
      ];

      waveforms.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        for (let x = 0; x < w; x += 2) {
          const y =
            wave.yOff +
            Math.sin(x * wave.freq + time * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 2.5 + time * wave.speed * 1.5) * wave.amp * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // === BOTTOM HALF: Spectrum bars ===
      const barCount = 48;
      const barWidth = (w / barCount) * 0.7;
      const barGap = w / barCount;
      const spectrumBase = h * 0.7;

      for (let i = 0; i < barCount; i++) {
        const barHeight =
          (Math.sin(i * 0.3 + time * 0.06) * 0.5 + 0.5) *
          (Math.sin(i * 0.7 + time * 0.04) * 0.3 + 0.7) *
          h * 0.22;

        const intensity = barHeight / (h * 0.22);
        const r = Math.floor(intensity * 74);
        const g = Math.floor(intensity * 200 + (1 - intensity) * 100);
        const b = Math.floor(intensity * 255);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.fillRect(
          i * barGap + barGap * 0.15,
          spectrumBase - barHeight,
          barWidth,
          barHeight
        );
      }

      // Scrolling hex data at bottom
      ctx.font = `${Math.max(8, w * 0.018)}px monospace`;
      ctx.fillStyle = "rgba(74, 143, 255, 0.3)";
      const hexRow = h * 0.88;
      for (let i = 0; i < 20; i++) {
        const charCode = ((time * 3 + i * 7) % 256) | 0;
        const hex = charCode.toString(16).toUpperCase().padStart(2, "0");
        ctx.fillStyle =
          charCode > 200
            ? "rgba(255, 80, 80, 0.6)"
            : "rgba(74, 143, 255, 0.3)";
        ctx.fillText(hex, i * (w / 20) + 4, hexRow);
      }

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
