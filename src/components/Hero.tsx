export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start px-12 relative overflow-hidden bg-[radial-gradient(ellipse_at_60%_40%,rgba(10,25,48,0.9)_0%,#000_70%)] max-md:px-5">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,109,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(42,109,212,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Radar SVG */}
      <svg
        className="absolute -right-[100px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.08]"
        viewBox="0 0 700 700"
      >
        <circle cx="350" cy="350" r="80" fill="none" stroke="#4a8fff" strokeWidth="0.5" />
        <circle cx="350" cy="350" r="160" fill="none" stroke="#4a8fff" strokeWidth="0.5" />
        <circle cx="350" cy="350" r="240" fill="none" stroke="#4a8fff" strokeWidth="0.5" />
        <circle cx="350" cy="350" r="320" fill="none" stroke="#4a8fff" strokeWidth="0.5" />
        <circle cx="350" cy="350" r="340" fill="none" stroke="#4a8fff" strokeWidth="0.5" />
        <line x1="350" y1="10" x2="350" y2="350" stroke="#4a8fff" strokeWidth="0.5" opacity="0.6" />
        <line
          x1="350" y1="350" x2="650" y2="350"
          stroke="#4a8fff" strokeWidth="0.5" opacity="0.2"
          className="origin-[350px_350px] animate-[radarSweep_4s_linear_infinite]"
        />
      </svg>

      <p className="font-[family-name:var(--font-share-tech)] text-[11px] text-accent-bright tracking-[4px] uppercase mb-6 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.3s] before:content-['//_'] before:text-dim">
        Africa&apos;s Sovereign Intelligence Infrastructure
      </p>

      <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(64px,8vw,120px)] leading-[0.9] tracking-[4px] text-white-off mb-2 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.5s]">
        THE <span className="text-transparent" style={{ WebkitTextStroke: "1px #4a8fff" }}>WATCHTOWER</span>
        <br />FOR A CONTINENT
      </h1>

      <p className="font-[family-name:var(--font-bebas)] text-[clamp(32px,4vw,56px)] tracking-[8px] text-silver mb-10 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.7s]">
        Tirion Industries
      </p>

      <p className="max-w-[560px] text-base font-light leading-[1.8] text-silver mb-12 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.9s] tracking-[0.5px]">
        Multi-domain situational intelligence for defense and security forces across Africa and the
        Middle East. Real-time fusion of air, maritime, ground, satellite, and signals data — unified
        into a single operational picture.
      </p>

      <div className="flex gap-4 items-center opacity-0 animate-[fadeUp_0.8s_ease_forwards_1.1s]">
        <a
          href="#contact"
          className="font-[family-name:var(--font-share-tech)] text-xs tracking-[3px] uppercase text-black bg-accent-bright py-4 px-9 no-underline transition-all hover:bg-white-off hover:-translate-y-px"
          style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
        >
          Schedule a Briefing
        </a>
        <a
          href="#product"
          className="font-[family-name:var(--font-share-tech)] text-[11px] tracking-[3px] uppercase text-dim no-underline flex items-center gap-2 transition-colors hover:text-silver-light after:content-['→'] after:text-sm"
        >
          See Archangel
        </a>
      </div>

      {/* Stats */}
      <div className="absolute bottom-12 left-12 flex gap-12 opacity-0 animate-[fadeUp_0.8s_ease_forwards_1.3s] max-md:left-5 max-md:gap-6">
        {[
          { num: "5", label: "Intelligence Domains" },
          { num: "54", label: "Nations Covered" },
          { num: "24/7", label: "Continuous Operations" },
          { num: "ONE", label: "Operational Picture" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 border-l border-line pl-5">
            <span className="font-[family-name:var(--font-bebas)] text-[32px] tracking-[2px] text-accent-bright">
              {stat.num}
            </span>
            <span className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[2px] text-dim uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
