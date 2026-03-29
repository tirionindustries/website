export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 px-12 py-5 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent border-b border-line max-md:px-5">
      <a
        href="#"
        className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[6px] text-silver-light no-underline"
      >
        TIRION <span className="text-accent-bright">INDUSTRIES</span>
      </a>
      <ul className="flex gap-10 list-none max-md:hidden">
        {["Archangel", "Capabilities", "Domains", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="font-[family-name:var(--font-share-tech)] text-[11px] text-dim tracking-[3px] uppercase no-underline transition-colors hover:text-accent-bright"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="font-[family-name:var(--font-share-tech)] text-[11px] text-accent-bright border border-accent px-6 py-2.5 tracking-[3px] uppercase no-underline transition-all bg-transparent hover:bg-accent hover:text-white-off"
      >
        Schedule Briefing
      </a>
    </nav>
  );
}
