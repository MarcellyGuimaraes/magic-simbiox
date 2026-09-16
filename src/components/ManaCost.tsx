import { parseManaCost, manaSymbolUrl } from "../utils";

interface ManaCostProps {
  cost?: string;
  className?: string;
  /** Tamanho de cada símbolo (qualquer unidade CSS). Padrão: 1em. */
  size?: string;
}

/** Custo de mana com os ícones SVG oficiais da Scryfall (ex.: {1}{W}{U}). */
export function ManaCost({ cost, className = "", size = "1em" }: ManaCostProps) {
  const symbols = parseManaCost(cost);
  if (symbols.length === 0) return null;

  return (
    <span className={`inline-flex flex-wrap items-center gap-0.5 ${className}`}>
      {symbols.map((symbol, i) => (
        <img
          key={i}
          src={manaSymbolUrl(symbol)}
          alt={symbol}
          title={`Mana: ${symbol}`}
          loading="lazy"
          draggable={false}
          style={{ width: size, height: size }}
          className="inline-block drop-shadow-sm"
          // Símbolos raros/desconhecidos: some em vez de mostrar imagem quebrada.
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ))}
    </span>
  );
}
