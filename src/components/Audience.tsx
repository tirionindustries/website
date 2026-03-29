const audiences = [
  {
    label: "01 // Government",
    title: "Defense Ministries",
    desc: "National security commands requiring persistent continental awareness and actionable threat intelligence.",
    items: [
      "National security operations",
      "Border and maritime command",
      "Multi-agency coordination",
      "Strategic threat assessment",
    ],
  },
  {
    label: "02 // Military",
    title: "Armed Forces",
    desc: "Field commanders and intelligence units requiring real-time multi-domain situational awareness at operational scale.",
    items: [
      "Theater-level intelligence",
      "Force protection operations",
      "Joint operations coordination",
      "Adversary pattern analysis",
    ],
  },
  {
    label: "03 // Investors",
    title: "Strategic Partners",
    desc: "Defense-focused investors backing Africa's first sovereign intelligence infrastructure company at the earliest stage.",
    items: [
      "$52B+ African defense market",
      "No dominant local competitor",
      "ITAR blocks US platforms",
      "Proprietary data moat",
    ],
  },
];

export default function Audience() {
  return (
    <section className="py-[120px] px-[48px] relative bg-black border-t border-line max-md:px-5 max-md:py-[80px]">
      <p className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[4px] text-accent uppercase mb-4 before:content-['[_'] after:content-['_]']">
        Who We Serve
      </p>
      <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(40px,5vw,72px)] tracking-[4px] leading-none mb-6">
        BUILT FOR THOSE
        <br />
        WHO PROTECT
      </h2>
      <div className="grid grid-cols-3 gap-6 mt-16 max-w-[1200px] max-md:grid-cols-1">
        {audiences.map((a) => (
          <div
            key={a.label}
            className="border border-line p-8 bg-deep relative transition-colors hover:border-accent"
          >
            <p className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[3px] text-accent uppercase mb-5">
              {a.label}
            </p>
            <h3 className="font-[family-name:var(--font-bebas)] text-[28px] tracking-[3px] text-white-off mb-4 leading-[1.1]">
              {a.title}
            </h3>
            <p className="text-sm font-light leading-[1.8] text-dim">{a.desc}</p>
            <ul className="list-none mt-6 flex flex-col gap-2.5">
              {a.items.map((item) => (
                <li
                  key={item}
                  className="font-[family-name:var(--font-share-tech)] text-[11px] text-silver tracking-[1px] pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-accent-bright"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
