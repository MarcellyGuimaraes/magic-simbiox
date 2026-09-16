import type { Card } from "../types";
import { CardGrid } from "./CardGrid";

interface FeaturedCardsProps {
  cards: Card[];
  onSelect: (card: Card) => void;
}

export function FeaturedCards({ cards, onSelect }: FeaturedCardsProps) {
  if (cards.length === 0) return null; // vitrine falhou ou ainda carregando: não mostra

  return (
    <section>
      <div className="mb-5 text-center">
        <h2 className="text-xl font-semibold text-slate-100">
          Cartas em destaque
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Ou busque por uma carta específica acima.
        </p>
      </div>
      <CardGrid cards={cards} onSelect={onSelect} />
    </section>
  );
}