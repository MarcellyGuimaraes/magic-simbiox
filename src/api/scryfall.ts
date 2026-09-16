import type { Card, CardSearchResponse } from "../types";

const BASE_URL = "https://api.scryfall.com";

export class ScryfallError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ScryfallError";
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: "application/json;q=0.9,*/*;q=0.8" },
  });

  if (!res.ok) {
    throw new ScryfallError(res.status, `Scryfall respondeu ${res.status}`);
  }

  return res.json();
}

export async function searchCards(query: string): Promise<Card[]> {
  const q = query.trim();
  if (!q) return [];

  try {
    const result = await request<CardSearchResponse>(
      `/cards/search?q=${encodeURIComponent(q)}`
    );
    return result.data;
  } catch (error) {
    // A Scryfall retorna 404 quando a busca não casa com nenhuma carta.
    // Isso é "nenhum resultado", não um erro de verdade.
    if (error instanceof ScryfallError && error.status === 404) {
      return [];
    }
    throw error; // 500, rede caída, etc. — aí sim é erro pra tela.
  }
}

export function getCardById(id: string): Promise<Card> {
  return request<Card>(`/cards/${id}`);
}