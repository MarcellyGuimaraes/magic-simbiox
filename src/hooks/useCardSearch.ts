import { useEffect, useState } from "react";
import { searchCards } from "../api/scryfall";
import { useDebounce } from "./useDebounce";
import type { Card } from "../types";

type Status = "idle" | "loading" | "success" | "error";

export function useCardSearch(query: string) {
  const debouncedQuery = useDebounce(query);
  const [cards, setCards] = useState<Card[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const q = debouncedQuery.trim();

    // Sem busca ainda: estado inicial, não dispara request.
    if (!q) {
      setCards([]);
      setStatus("idle");
      return;
    }

    let active = true; // guarda contra respostas fora de ordem
    setStatus("loading");

    searchCards(q)
      .then((result) => {
        if (!active) return;
        setCards(result);
        setStatus("success");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false; // ignora a resposta se o termo mudou nesse meio-tempo
    };
  }, [debouncedQuery]);

  return { cards, status };
}