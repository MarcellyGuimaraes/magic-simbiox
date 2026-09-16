import { useEffect, useRef } from "react";
import type { Card } from "../types";
import { getCardImage, colorLabel } from "../utils";
import { ManaCost } from "./ManaCost";
import { OracleText } from "./OracleText";
import { RarityBadge } from "./RarityBadge";
import { Corner } from "./Ornament";

interface CardDetailsProps {
  card: Card | null;
  onClose: () => void;
}

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
  const prices = [
    card.prices?.usd && { label: "USD", value: `$${card.prices.usd}` },
    card.prices?.eur && { label: "EUR", value: `€${card.prices.eur}` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-details-title"
    >
      <div
        className="parchment animate-pop-in relative max-h-[90vh] w-full max-w-3xl overflow-y-auto
                   rounded-xl border border-gold-dim/40 bg-panel p-6 shadow-2xl
                   ring-1 ring-black/40 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cantoneiras ornamentais */}
        <Corner className="pointer-events-none absolute left-2 top-2 h-6 w-6 text-gold-dim/50" />
        <Corner className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 rotate-180 text-gold-dim/50" />

        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center
                     rounded-full bg-black/40 text-quill ring-1 ring-rule transition
                     hover:text-gold hover:ring-gold/50 focus:outline-none
                     focus:ring-2 focus:ring-gold/50"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className="relative flex flex-col gap-6 md:flex-row md:gap-8">
          {image && (
            <div className="mx-auto w-56 flex-shrink-0 md:mx-0">
              <img
                src={image}
                alt={card.name}
                className="w-full rounded-lg shadow-xl shadow-black/50 ring-1 ring-gold-dim/30"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="pr-8">
              <h2
                id="card-details-title"
                className="font-display text-2xl font-bold leading-tight text-parchment"
              >
                {card.name}
              </h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-quill">
                {card.mana_cost && <ManaCost cost={card.mana_cost} />}
                <span>{colorLabel(card.colors)}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <RarityBadge rarity={card.rarity} />
              <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-quill ring-1 ring-inset ring-rule">
                {card.set_name}
              </span>
              {prices.map((p) => (
                <span
                  key={p.label}
                  className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-soft ring-1 ring-inset ring-gold-dim/40"
                >
                  {p.value}
                </span>
              ))}
            </div>

            {/* Uma seção por face — cobre carta normal e de duas faces */}
            <div className="mt-5 space-y-3">
              {faces.map((face, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-rule bg-ink/40 p-4"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      {faces.length > 1 && (
                        <p className="font-display font-semibold text-parchment">
                          {face.name}
                        </p>
                      )}
                      {face.type_line && (
                        <p className="text-sm italic text-quill">{face.type_line}</p>
                      )}
                    </div>
                    {face.mana_cost && <ManaCost cost={face.mana_cost} />}
                  </div>
                  {face.oracle_text && (
                    <OracleText
                      text={face.oracle_text}
                      className="text-[0.95rem] leading-relaxed text-parchment/90"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
