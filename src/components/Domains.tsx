const domains = [
  { icon: "AIR", name: "Air Domain", sub: "Aircraft · Flight Patterns · Airspace" },
  { icon: "SEA", name: "Maritime", sub: "Vessels · Ports · Coastal Activity" },
  { icon: "GND", name: "Ground", sub: "Events · Movements · Border Activity" },
  { icon: "SPC", name: "Space", sub: "Satellite Imagery · Thermal · Environmental" },
  { icon: "SIG", name: "Sensors", sub: "Signals · Open Source · Pattern Analysis" },
];

export default function Domains() {
  return (
    <section className="py-30 px-12 relative bg-deep border-t border-line max-md:px-5" id="domains">
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
      <div className="flex border border-line max-w-[1200px] max-md:flex-col">
        {domains.map((d, i) => (
          <div
            key={d.icon}
            className={`flex-1 px-6 py-10 transition-colors cursor-default hover:bg-accent/[0.06] ${
              i < domains.length - 1 ? "border-r border-line max-md:border-r-0 max-md:border-b" : ""
            }`}
          >
            <div className="font-[family-name:var(--font-bebas)] text-4xl text-accent-bright opacity-60 mb-4 tracking-[2px]">
              {d.icon}
            </div>
            <p className="font-[family-name:var(--font-rajdhani)] text-[13px] font-semibold tracking-[4px] text-silver-light uppercase mb-2">
              {d.name}
            </p>
            <p className="font-[family-name:var(--font-share-tech)] text-[10px] text-dim tracking-[1px]">
              {d.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
