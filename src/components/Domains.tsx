"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const AirRadar = dynamic(() => import("./tactical/AirRadar"), { ssr: false });
const SeaSonar = dynamic(() => import("./tactical/SeaSonar"), { ssr: false });
const GndTerrain = dynamic(() => import("./tactical/GndTerrain"), { ssr: false });
const SpcOrbital = dynamic(() => import("./tactical/SpcOrbital"), { ssr: false });
const SigSignals = dynamic(() => import("./tactical/SigSignals"), { ssr: false });

interface DomainData {
  icon: string;
  name: string;
  sub: string;
  View: ComponentType;
}

const domains: DomainData[] = [
  { icon: "AIR", name: "Air Domain", sub: "Aircraft · Flight Patterns · Airspace", View: AirRadar },
  { icon: "SEA", name: "Maritime", sub: "Vessels · Ports · Coastal Activity", View: SeaSonar },
  { icon: "GND", name: "Ground", sub: "Events · Movements · Border Activity", View: GndTerrain },
  { icon: "SPC", name: "Space", sub: "Satellite Imagery · Thermal · Environmental", View: SpcOrbital },
  { icon: "SIG", name: "Sensors", sub: "Signals · Open Source · Pattern Analysis", View: SigSignals },
];

export default function Domains() {
  return (
    <section className="py-[120px] px-[48px] relative bg-deep border-t border-line max-md:px-5 max-md:py-[80px]" id="domains">
      <div className="max-w-[600px] mb-16">
        <p className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[4px] text-accent uppercase mb-4 before:content-['[_'] after:content-['_]']">
          Intelligence Domains
        </p>
        <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(40px,5vw,72px)] tracking-[4px] leading-none mb-6">
          FULL SPECTRUM COVERAGE
        </h2>
        <p className="text-base font-light leading-[1.8] text-silver">
          Archangel monitors every domain of operation simultaneously. No blind spots. No gaps. One
          unified operational picture.
        </p>
      </div>

      {/* Tactical view grid */}
      <div className="grid grid-cols-3 gap-5 max-w-[1200px] mb-12 max-md:grid-cols-1">
        {domains.slice(0, 3).map((d) => (
          <DomainCard key={d.icon} domain={d} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5 max-w-[800px] mx-auto max-md:grid-cols-1">
        {domains.slice(3).map((d) => (
          <DomainCard key={d.icon} domain={d} />
        ))}
      </div>
    </section>
  );
}

function DomainCard({ domain }: { domain: DomainData }) {
  const { icon, name, sub, View } = domain;
  return (
    <div className="group border border-line bg-navy/50 overflow-hidden transition-all hover:border-accent">
      {/* Tactical display header */}
      <div className="flex justify-between items-center px-3 py-2 bg-accent/[0.08] border-b border-line">
        <span className="font-[family-name:var(--font-share-tech)] text-[9px] tracking-[3px] text-accent-bright uppercase">
          {icon} {"// LIVE"}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-status-ok rounded-full animate-[pulseDot_1.5s_ease_infinite]" />
          <span className="font-[family-name:var(--font-share-tech)] text-[8px] text-status-ok tracking-[2px]">
            ACTIVE
          </span>
        </div>
      </div>

      {/* Canvas/3D view */}
      <div className="h-[240px] relative bg-black/40">
        <View />
      </div>

      {/* Info footer */}
      <div className="px-4 py-3 border-t border-line">
        <p className="font-[family-name:var(--font-rajdhani)] text-[13px] font-semibold tracking-[4px] text-silver-light uppercase mb-1">
          {name}
        </p>
        <p className="font-[family-name:var(--font-share-tech)] text-[10px] text-dim tracking-[1px]">
          {sub}
        </p>
      </div>
    </div>
  );
}
