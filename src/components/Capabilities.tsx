const capabilities = [
  { num: "01", title: "Real-Time Data Fusion", desc: "Simultaneous ingestion across all five domains — air, maritime, ground, space, and sensors. Every domain. Every second." },
  { num: "02", title: "Anomaly Detection", desc: "Automated pattern recognition across all operational domains. Archangel flags what deviates before operators need to look." },
  { num: "03", title: "Cross-Domain Correlation", desc: "An aircraft over a vessel flagged near a known corridor. Archangel connects what siloed systems miss." },
  { num: "04", title: "Entity Intelligence", desc: "Millions of entities tracked daily. Each with history, movement patterns, risk scoring, and evidence-backed alerts." },
  { num: "05", title: "Geospatial Operations", desc: "Every entity, every event, every alert positioned in space and time. Full continental coverage across 54 nations." },
  { num: "06", title: "Sovereign Architecture", desc: "Designed for African governments. Data sovereignty by design. No ITAR dependency. No foreign infrastructure control." },
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
      <div className="grid grid-cols-3 gap-px bg-line mt-16 max-w-[1200px] mx-auto max-md:grid-cols-1">
        {capabilities.map((cap) => (
          <div
            key={cap.num}
            className="group bg-black px-8 py-10 relative overflow-hidden transition-colors hover:bg-deep"
          >
            <div className="absolute top-0 left-0 w-0.5 h-0 bg-accent-bright transition-all group-hover:h-full" />
            <p className="font-[family-name:var(--font-share-tech)] text-[10px] text-accent tracking-[3px] mb-5">
              {cap.num} {"//"}

            </p>
            <h3 className="font-[family-name:var(--font-bebas)] text-[26px] tracking-[3px] text-white-off mb-4 leading-[1.1]">
              {cap.title}
            </h3>
            <p className="text-sm font-light leading-[1.8] text-dim tracking-[0.3px]">
              {cap.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
