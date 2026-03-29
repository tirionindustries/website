const rows = [
  { id: "AIS-0041", type: "VESSEL // GULF OF GUINEA", status: "CLEAR", statusClass: "text-status-ok", alert: false },
  { id: "AIR-0088", type: "AIRCRAFT // UNREGISTERED", status: "ALERT", statusClass: "text-status-alert", alert: true },
  { id: "GND-0023", type: "CONVOY // SAHEL CORRIDOR", status: "WATCH", statusClass: "text-status-warn", alert: false },
  { id: "SAT-0012", type: "THERMAL // LAKE CHAD BASIN", status: "CLEAR", statusClass: "text-status-ok", alert: false },
  { id: "SIG-0034", type: "SIGNALS // ANOMALY DETECTED", status: "ALERT", statusClass: "text-status-alert", alert: true },
  { id: "AIS-0055", type: "PORT ENTRY // LAGOS TERMINAL", status: "CLEAR", statusClass: "text-status-ok", alert: false },
  { id: "GND-0067", type: "BORDER EVENT // NORTH NIGER", status: "WATCH", statusClass: "text-status-warn", alert: false },
];

export default function Product() {
  return (
    <section className="py-30 px-12 relative bg-deep border-t border-line max-md:px-5" id="product">
      <div className="grid grid-cols-2 gap-20 items-center max-w-[1200px] mx-auto max-md:grid-cols-1 max-md:gap-10">
        {/* Left content */}
        <div>
          <p className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[4px] text-accent uppercase mb-4 before:content-['[_'] after:content-['_]']">
            Flagship Product
          </p>
          <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(40px,5vw,72px)] tracking-[4px] leading-none mb-6">
            ARCHANGEL
          </h2>
          <div className="inline-block font-[family-name:var(--font-share-tech)] text-[10px] tracking-[4px] text-accent-bright border border-accent px-4 py-1.5 mb-6 uppercase bg-accent/[0.08]">
            Multi-Domain Intelligence Platform
          </div>
          <p className="text-base font-light leading-[1.9] text-silver mb-10 tracking-[0.3px]">
            Archangel is a real-time situational intelligence platform that fuses live air, maritime,
            ground, space, and sensor data into a single operational picture. Built for African
            defense and security commands — delivering clarity where others see noise.
          </p>
          <p className="text-base font-light leading-[1.9] text-silver mb-10 tracking-[0.3px]">
            Not a dashboard. Not a map. An intelligence engine that ingests and processes data
            continuously across every domain, detects anomalies automatically, correlates threats
            across domains, and surfaces what decision-makers need before they ask.
          </p>
          <blockquote className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[6px] text-dim border-t border-line pt-6">
            In God We Trust. <em className="text-accent-bright not-italic">All Others We Monitor.</em>
          </blockquote>
        </div>

        {/* Right display */}
        <div className="relative h-[480px] bg-navy border border-line overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-accent/10 border-b border-line">
            <span className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[3px] text-accent-bright uppercase">
              ARCHANGEL // LIVE FEED
            </span>
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-share-tech)] text-[10px] text-status-ok tracking-[2px]">
              <div className="w-1.5 h-1.5 bg-status-ok rounded-full animate-[pulseDot_1.5s_ease_infinite]" />
              OPERATIONAL
            </div>
          </div>
          <div className="p-4 h-[calc(100%-44px)] flex flex-col gap-2 overflow-hidden">
            {rows.map((row, i) => (
              <div
                key={row.id}
                className={`flex justify-between px-3 py-2 border opacity-0 animate-[rowAppear_0.3s_ease_forwards] ${
                  row.alert
                    ? "border-status-alert/40 bg-status-alert/5"
                    : "border-accent/[0.12] bg-[rgba(8,15,30,0.6)]"
                }`}
                style={{ animationDelay: `${0.1 + i * 0.2}s` }}
              >
                <span className="font-[family-name:var(--font-share-tech)] text-[10px] text-dim tracking-[2px] min-w-[80px]">
                  {row.id}
                </span>
                <span className="font-[family-name:var(--font-share-tech)] text-[10px] text-silver tracking-[1px] flex-1 px-4">
                  {row.type}
                </span>
                <span className={`font-[family-name:var(--font-share-tech)] text-[10px] tracking-[2px] ${row.statusClass}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
