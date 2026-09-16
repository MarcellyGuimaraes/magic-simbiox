import { useState } from "react";
import type { Card } from "../types";
import { getCardImage } from "../utils";
import { ManaCost } from "./ManaCost";

interface CardItemProps {
  card: Card;
  onSelect: (card: Card) => void;
}

export function CardItem({ card, onSelect }: CardItemProps) {
  // `small` (~146px) é o tamanho certo para a grade: leve e rápido de carregar.
  const image = getCardImage(card, "small");
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      onClick={() => onSelect(card)}
      title={card.name}
      className="group relative block overflow-hidden rounded-lg bg-panel text-left
                 ring-1 ring-rule shadow-md shadow-black/40 outline-none transition
                 duration-300 hover:-translate-y-1 hover:shadow-xl
                 hover:shadow-black/60 hover:ring-gold/60
                 focus-visible:-translate-y-1 focus-visible:ring-2
                 focus-visible:ring-gold"
    >
      {image ? (
        <img
          src={image}
          alt={card.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          // A imagem revela-se quando de fato carrega — nada de espera artificial.
          className={`aspect-[5/7] w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div className="flex aspect-[5/7] w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-panel-2 to-panel p-4 text-center">
          <ManaCost cost={card.mana_cost} />
          <span className="font-display text-sm text-quill">{card.name}</span>
        </div>
      )}

      {/* Overlay: só o nome, que surge no hover/foco */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink via-ink/85 to-transparent p-3 pt-10 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <p className="truncate font-display text-sm font-semibold text-parchment">
          {card.name}
        </p>
      </div>
    </button>
  );
}
