import { useCallback, useEffect, useState } from "react";
import { searchCards } from "../api/scryfall";
import { useDebounce } from "./useDebounce";
import type { Card } from "../types";

type Status = "idle" | "loading" | "success" | "error";

export function useCardSearch(query: string) {
  const debouncedQuery = useDebounce(query);
  const [cards, setCards] = useState<Card[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  // Incrementado pelo retry para re-disparar o efeito com o mesmo termo.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const term = debouncedQuery.trim();

    /* As transições idle/loading são síncronas de propósito: refletem, na hora,
       a mudança do termo de busca. Os resultados chegam nos callbacks async. */
    /* eslint-disable react-hooks/set-state-in-effect */
    if (!term) {
      setCards([]);
      setStatus("idle");
      return;
    }

    let active = true;
    setStatus("loading");
    /* eslint-enable react-hooks/set-state-in-effect */

    searchCards(term)
      .then((result) => {
        if (active) {
          setCards(result);
          setStatus("success");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false; // ignora respostas de buscas já substituídas
    };
  }, [debouncedQuery, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { cards, status, retry };
}
