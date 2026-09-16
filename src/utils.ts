import type { Card, ImageUris } from "./types";

/**
 * URL da imagem da carta no tamanho pedido. `small` (~146px) é ideal para a
 * grade — leve e rápido; `normal`/`large` ficam para o detalhe.
 */
export function getCardImage(
  card: Card,
  size: keyof ImageUris = "normal"
): string | undefined {
  return card.image_uris?.[size] ?? card.card_faces?.[0]?.image_uris?.[size];
}

/**
 * Quebra um custo de mana da Scryfall ("{2}{W}{U}") numa lista de símbolos
 * ["2", "W", "U"], para renderizarmos cada um com seu ícone oficial.
 */
export function parseManaCost(cost?: string): string[] {
  if (!cost) return [];
  return [...cost.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
}

/**
 * URL do ícone SVG oficial do símbolo, servido pela própria Scryfall.
 * Ex.: "W" → .../W.svg, "W/U" (híbrido) → .../WU.svg.
 */
export function manaSymbolUrl(symbol: string): string {
  const code = symbol.replace(/\//g, "").toUpperCase();
  return `https://svgs.scryfall.io/card-symbols/${code}.svg`;
}

const COLOR_NAMES: Record<string, string> = {
  W: "Branco",
  U: "Azul",
  B: "Preto",
  R: "Vermelho",
  G: "Verde",
};

/** Nome legível da identidade de cor da carta (para acessibilidade/legenda). */
export function colorLabel(colors?: string[]): string {
  if (!colors || colors.length === 0) return "Incolor";
  return colors.map((c) => COLOR_NAMES[c] ?? c).join(" · ");
}

/**
 * A carta bate com o filtro de cores selecionado?
 * Sem filtro → sempre. "C" cobre cartas incolores; as demais casam por união
 * (a carta contém ao menos uma das cores marcadas).
 */
export function matchesColors(card: Card, active: string[]): boolean {
  if (active.length === 0) return true;
  const cardColors = card.colors ?? [];
  return active.some((code) =>
    code === "C" ? cardColors.length === 0 : cardColors.includes(code)
  );
}
