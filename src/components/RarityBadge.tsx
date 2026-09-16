interface RarityBadgeProps {
  rarity: string;
}

// Raridades tratadas como "selos" — do bronze fosco ao dourado mítico.
const RARITY: Record<string, { label: string; className: string }> = {
  common: { label: "Comum", className: "text-quill ring-rule" },
  uncommon: { label: "Incomum", className: "text-slate-300 ring-slate-400/40" },
  rare: { label: "Rara", className: "text-gold-soft ring-gold-dim/60" },
  mythic: { label: "Mítica", className: "text-orange-300 ring-orange-500/50" },
};

export function RarityBadge({ rarity }: RarityBadgeProps) {
  const cfg = RARITY[rarity] ?? { label: rarity, className: "text-quill ring-rule" };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset ${cfg.className}`}
    >
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      {cfg.label}
    </span>
  );
}
