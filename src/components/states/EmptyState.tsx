interface EmptyStateProps {
    variant: "initial" | "no-results";
    query?: string;
  }
  
  export function EmptyState({ variant, query }: EmptyStateProps) {
    const content =
      variant === "initial"
        ? {
            title: "Explore cartas de Magic",
            message: 'Comece buscando pelo nome de uma carta, como "Black Lotus".',
          }
        : {
            title: "Nenhuma carta encontrada",
            message: query
              ? `Não achamos nada para "${query}". Tente outro termo.`
              : "Tente ajustar sua busca.",
          };
  
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="mb-2 text-lg font-medium text-slate-200">{content.title}</p>
        <p className="max-w-sm text-slate-400">{content.message}</p>
      </div>
    );
  }