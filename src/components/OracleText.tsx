import { manaSymbolUrl } from "../utils";

interface OracleTextProps {
  text: string;
  className?: string;
}

/**
 * Renderiza o texto de regras trocando os tokens {W}, {T}, {2}… pelos ícones
 * oficiais da Scryfall, direto no meio da frase. Quebras de linha preservadas.
 */
export function OracleText({ text, className = "" }: OracleTextProps) {
  // Divide mantendo os tokens: "Kicker {W}{W}" → ["Kicker ", "{W}", "{W}"].
  const parts = text.split(/(\{[^}]+\})/g).filter(Boolean);

  return (
    <p className={`whitespace-pre-line ${className}`}>
      {parts.map((part, i) => {
        const match = part.match(/^\{([^}]+)\}$/);
        if (!match) return <span key={i}>{part}</span>;

        const symbol = match[1];
        return (
          <img
            key={i}
            src={manaSymbolUrl(symbol)}
            alt={symbol}
            title={symbol}
            draggable={false}
            className="mx-px inline-block h-[0.95em] w-[0.95em] align-[-0.12em]"
            onError={(e) => {
              // Símbolo desconhecido: volta a mostrar o texto entre chaves.
              const span = document.createElement("span");
              span.textContent = part;
              e.currentTarget.replaceWith(span);
            }}
          />
        );
      })}
    </p>
  );
}
