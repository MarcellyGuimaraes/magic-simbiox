import { useEffect, useState } from "react";
import { searchCards } from "../api/scryfall";
import type { Card } from "../types";

export function useFeaturedCards(limit = 15) {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    let active = true;

    // Cartas populares para preencher a tela inicial.
    searchCards("is:commander order:edhrec")
      .then((result) => {
        if (active) setCards(result.slice(0, limit));
      })
      .catch(() => {
        // A vitrine é decorativa — se falhar, silenciosamente não mostra nada.
        // Não faz sentido bloquear a tela inicial por causa dela.
      });

    return () => {
      active = false;
    };
  }, [limit]);

  return cards;
}