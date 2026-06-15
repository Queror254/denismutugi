const SEGMENT = "— DIRECTOR — FILMMAKER — PHOTOGRAPHER — ACTOR — EDITOR ";

export function MarqueeB() {
  const copies = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="overflow-hidden border-y border-white/10 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {copies.map((i) => (
          <span key={i} className="mx-6 font-bebas text-2xl tracking-wider text-white">
            {SEGMENT}
          </span>
        ))}
      </div>
    </div>
  );
}
