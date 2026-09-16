import type { Card } from "./types";

export function getCardImage(card: Card): string | undefined {
  return card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal;
}