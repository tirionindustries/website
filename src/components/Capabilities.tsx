"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const DataFusion = dynamic(() => import("./tactical/DataFusion"), { ssr: false });
const AnomalyDetection = dynamic(() => import("./tactical/AnomalyDetection"), { ssr: false });
const CrossDomain = dynamic(() => import("./tactical/CrossDomain"), { ssr: false });
const EntityIntel = dynamic(() => import("./tactical/EntityIntel"), { ssr: false });
const GeoOps = dynamic(() => import("./tactical/GeoOps"), { ssr: false });
const SovereignArch = dynamic(() => import("./tactical/SovereignArch"), { ssr: false });

interface Capability {
  num: string;
  title: string;
  desc: string;
  View: ComponentType;
}

const capabilities: Capability[] = [
  { num: "01", title: "Real-Time Data Fusion", desc: "Simultaneous ingestion across all five domains — air, maritime, ground, space, and sensors. Every domain. Every second.", View: DataFusion },
  { num: "02", title: "Anomaly Detection", desc: "Automated pattern recognition across all operational domains. Archangel flags what deviates before operators need to look.", View: AnomalyDetection },
  { num: "03", title: "Cross-Domain Correlation", desc: "An aircraft over a vessel flagged near a known corridor. Archangel connects what siloed systems miss.", View: CrossDomain },
  { num: "04", title: "Entity Intelligence", desc: "Millions of entities tracked daily. Each with history, movement patterns, risk scoring, and evidence-backed alerts.", View: EntityIntel },
  { num: "05", title: "Geospatial Operations", desc: "Every entity, every event, every alert positioned in space and time. Full continental coverage across 54 nations.", View: GeoOps },
  { num: "06", title: "Sovereign Architecture", desc: "Designed for African governments. Data sovereignty by design. No ITAR dependency. No foreign infrastructure control.", View: SovereignArch },
];

export default function Capabilities() {
  return (
    <section className="py-[120px] px-[48px] relative bg-black max-md:px-5 max-md:py-[80px]" id="capabilities">
      <p className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[4px] text-accent uppercase mb-4 before:content-['[_'] after:content-['_]']">
        Core Capabilities
      </p>
      <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(40px,5vw,72px)] tracking-[4px] leading-none mb-6">
        WHAT ARCHANGEL DOES
      </h2>
      <div className="grid grid-cols-3 gap-5 mt-16 max-w-[1200px] mx-auto max-md:grid-cols-1">
        {capabilities.map((cap) => (
          <CapCard key={cap.num} cap={cap} />
        ))}
      </div>
    </section>
  );
}

function CapCard({ cap }: { cap: Capability }) {
  const { num, title, desc, View } = cap;
  return (
    <div className="group border border-line bg-deep/50 overflow-hidden transition-all hover:border-accent relative">
      {/* Left accent bar on hover */}
      <div className="absolute top-0 left-0 w-0.5 h-0 bg-accent-bright transition-all group-hover:h-full z-10" />

      {/* Tactical display header */}
      <div className="flex justify-between items-center px-3 py-2 bg-accent/[0.06] border-b border-line">
        <span className="font-[family-name:var(--font-share-tech)] text-[9px] tracking-[3px] text-accent uppercase">
          {num} {"// LIVE"}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-status-ok rounded-full animate-[pulseDot_1.5s_ease_infinite]" />
          <span className="font-[family-name:var(--font-share-tech)] text-[8px] text-status-ok tracking-[2px]">
            ACTIVE
          </span>
        </div>
      </div>

      {/* Canvas view */}
      <div className="h-[280px] relative bg-black/60">
        <View />
      </div>

      {/* Info footer */}
      <div className="px-5 py-4 border-t border-line">
        <h3 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[3px] text-white-off mb-2 leading-[1.1]">
          {title}
        </h3>
        <p className="text-[13px] font-light leading-[1.7] text-dim tracking-[0.3px]">
          {desc}
        </p>
      </div>
    </div>
  );
}
