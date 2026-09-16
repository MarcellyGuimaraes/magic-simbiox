import type { Card } from "../types";
import { CardItem } from "./CardItem";

interface CardGridProps {
  cards: Card[];
  onSelect: (card: Card) => void;
}

export function CardGrid({ cards, onSelect }: CardGridProps) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
    >
      {cards.map((card) => (
        <CardItem key={card.id} card={card} onSelect={onSelect} />
      ))}
    </div>
  );
}