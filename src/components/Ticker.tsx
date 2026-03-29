"use client";

const items = [
  "Air Domain Active",
  "Maritime Surveillance Online",
  "Ground Intelligence Active",
  "Space Domain Connected",
  "Sensor Network Online",
  "Anomaly Detection Running",
  "Cross-Domain Correlation Active",
  "West Africa Region Monitored",
  "East Africa Coverage Active",
];

export default function Ticker() {
  return (
    <div className="bg-steel border-y border-line py-3 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-[ticker_25s_linear_infinite]">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-share-tech)] text-[11px] tracking-[3px] text-dim uppercase px-10"
          >
            <span className="text-accent-bright mr-2">&#9670;</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
