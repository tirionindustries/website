export default function Footer() {
  return (
    <footer className="bg-black border-t border-line px-12 py-10 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:text-center max-md:px-5">
      <span className="font-[family-name:var(--font-bebas)] text-lg tracking-[6px] text-silver">
        TIRION INDUSTRIES
      </span>
      <span className="font-[family-name:var(--font-share-tech)] text-[10px] text-accent tracking-[3px]">
        {"// ARCHANGEL // ALL OTHERS WE MONITOR"}
      </span>
      <span className="font-[family-name:var(--font-share-tech)] text-[10px] text-dim tracking-[2px]">
        &copy; 2025 TIRION INDUSTRIES. ALL RIGHTS RESERVED.
      </span>
    </footer>
  );
}
