import { useEffect, useRef } from "react";
import type { Card } from "../types";
import { getCardImage } from "../utils";

interface CardDetailsProps {
  card: Card | null;
  onClose: () => void;
}

const RARITY_STYLE: Record<string, string> = {
  common: "bg-slate-600 text-slate-100",
  uncommon: "bg-slate-400 text-slate-900",
  rare: "bg-amber-400 text-amber-950",
  mythic: "bg-orange-500 text-orange-950",
};

export function CardDetails({ card, onClose }: CardDetailsProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fecha no Esc + trava o scroll do fundo enquanto o modal está aberto
  useEffect(() => {
    if (!card) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus(); // leva o foco pro modal ao abrir

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [card, onClose]);

  if (!card) return null;

  const image = getCardImage(card);
  // Cartas de duas faces trazem o texto em card_faces; as normais, no topo.
  const faces = card.card_faces ?? [card];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose} // clicar no fundo escuro fecha
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-details-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto
                   rounded-2xl bg-slate-800 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // clique dentro não fecha
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center
                     rounded-full bg-slate-700 text-slate-200 transition
                     hover:bg-slate-600 focus:outline-none focus:ring-2
                     focus:ring-emerald-500/40"
        >
          ✕
        </button>

        <div className="flex flex-col gap-6 md:flex-row">
          {image && (
            <img
              src={image}
              alt={card.name}
              className="mx-auto w-56 flex-shrink-0 rounded-xl md:mx-0"
            />
          )}

          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-start justify-between gap-3 pr-8">
              <h2 id="card-details-title" className="text-2xl font-bold">
                {card.name}
              </h2>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              <span
                className={`rounded-full px-3 py-1 font-medium capitalize ${
                  RARITY_STYLE[card.rarity] ?? "bg-slate-600 text-slate-100"
                }`}
              >
                {card.rarity}
              </span>
              <span className="text-slate-400">{card.set_name}</span>
              {card.prices?.usd && (
                <span className="text-slate-400">· US$ {card.prices.usd}</span>
              )}
            </div>

            {/* Uma seção por face — cobre carta normal e de duas faces */}
            {faces.map((face, i) => (
              <div key={i} className="mb-4 border-t border-slate-700 pt-4 first:border-0 first:pt-0">
                {faces.length > 1 && (
                  <p className="mb-1 font-semibold text-slate-200">{face.name}</p>
                )}
                <div className="mb-2 flex flex-wrap gap-x-4 text-sm text-slate-400">
                  {face.type_line && <span>{face.type_line}</span>}
                  {face.mana_cost && <span>{face.mana_cost}</span>}
                </div>
                {face.oracle_text && (
                  <p className="whitespace-pre-line text-slate-200">
                    {face.oracle_text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}