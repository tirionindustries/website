export default function CtaSection() {
  return (
    <section
      className="py-30 px-12 relative bg-navy border-t border-line text-center overflow-hidden max-md:px-5"
      id="contact"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(42,109,212,0.12)_0%,transparent_70%)] pointer-events-none" />
      <p className="font-[family-name:var(--font-share-tech)] text-[10px] tracking-[4px] text-accent uppercase mb-6 relative">
        Classified Access
      </p>
      <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(48px,6vw,88px)] tracking-[6px] leading-none mb-6 text-white-off relative">
        SCHEDULE A
        <br />
        BRIEFING
      </h2>
      <p className="text-base font-light text-silver max-w-[480px] mx-auto mb-12 leading-[1.8] relative">
        Archangel is not a product demo. It&apos;s an operational briefing. We show you what we see
        — and what that means for your theater.
      </p>
      <div className="flex max-w-[500px] mx-auto mb-6 relative max-md:flex-col">
        <input
          type="email"
          placeholder="YOUR.EMAIL@MINISTRY.GOV"
          className="flex-1 bg-white/[0.04] border border-line border-r-0 px-5 py-4 font-[family-name:var(--font-share-tech)] text-xs text-white-off tracking-[2px] outline-none transition-colors focus:border-accent placeholder:text-dim max-md:border-r max-md:border-b-0"
        />
        <button className="font-[family-name:var(--font-share-tech)] text-[11px] tracking-[3px] uppercase text-black bg-accent-bright border-none px-7 py-4 cursor-pointer transition-colors hover:bg-white-off whitespace-nowrap">
          Request Access &rarr;
        </button>
      </div>
      <p className="font-[family-name:var(--font-share-tech)] text-[10px] text-dim tracking-[2px] relative">
        {"// All inquiries reviewed within 48 hours. Clearance may be required."}
      </p>
    </section>
  );
}
