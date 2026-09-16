import { Diamond } from "../Ornament";

interface EmptyStateProps {
  variant: "initial" | "no-results" | "no-color";
  query?: string;
}

export function EmptyState({ variant, query }: EmptyStateProps) {
  const content =
    variant === "initial"
      ? {
          title: "O compêndio aguarda",
          message:
            'Busque pelo nome de uma carta — como "Black Lotus" — para começar a explorar.',
        }
      : variant === "no-color"
      ? {
          title: "Nada nessas cores",
          message: "Nenhuma das cartas atuais bate com o filtro de cor. Ajuste a seleção.",
        }
      : {
          title: "Nenhuma carta encontrada",
          message: query
            ? `Não achamos nada para "${query}". Tente outro termo.`
            : "Tente ajustar sua busca.",
        };

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold-dim/40 text-gold">
        <Diamond className="h-4 w-4" />
      </div>
      <p className="mb-2 font-display text-xl font-semibold text-parchment">
        {content.title}
      </p>
      <p className="max-w-sm text-sm leading-relaxed text-quill">
        {content.message}
      </p>
    </div>
  );
}
