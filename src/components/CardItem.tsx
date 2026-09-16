import type { Card } from "../types";
import { getCardImage } from "../utils";

interface CardItemProps {
  card: Card;
  onSelect: (card: Card) => void;
}

export function CardItem({ card, onSelect }: CardItemProps) {
  const image = getCardImage(card);

  return (
    <button
      onClick={() => onSelect(card)}
      className="group block overflow-hidden rounded-xl bg-slate-800 text-left
                 shadow-md transition hover:-translate-y-1 hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
    >
      {image ? (
        <img
          src={image}
          alt={card.name}
          loading="lazy"
          className="aspect-[5/7] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[5/7] w-full items-center justify-center
                        p-3 text-center text-sm text-slate-400">
          {card.name}
        </div>
      )}
    </button>
  );
}