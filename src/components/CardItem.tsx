import type { Card } from "../types";
import { getCardImage } from "../utils";

interface CardItemProps {
  card: Card;
}

export function CardItem({ card }: CardItemProps) {
  const image = getCardImage(card);

  return (
    <div className="group overflow-hidden rounded-xl bg-slate-800 shadow-md
                    transition hover:-translate-y-1 hover:shadow-xl">
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
    </div>
  );
}