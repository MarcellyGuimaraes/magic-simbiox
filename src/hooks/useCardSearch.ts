import { useCallback, useEffect, useState } from "react";
import { searchCards } from "../api/scryfall";
import { useDebounce } from "./useDebounce";
import type { Card } from "../types";

type Status = "idle" | "loading" | "success" | "error";

export function useCardSearch(query: string) {
  const debouncedQuery = useDebounce(query);
  const [cards, setCards] = useState<Card[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const runSearch = useCallback((q: string) => {
    const term = q.trim();

    if (!term) {
      setCards([]);
      setStatus("idle");
      return;
    }

    setStatus("loading");
    searchCards(term)
      .then((result) => {
        setCards(result);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    let active = true;
    const term = debouncedQuery.trim();

    if (!term) {
      setCards([]);
      setStatus("idle");
      return;
    }

    setStatus("loading");
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
      active = false;
    };
  }, [debouncedQuery]);

  const retry = useCallback(
    () => runSearch(debouncedQuery),
    [runSearch, debouncedQuery]
  );

  return { cards, status, retry };
}