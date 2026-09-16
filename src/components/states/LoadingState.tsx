export function LoadingState() {
    // Mesma grade do CardGrid, pra transição suave quando os dados chegarem
    return (
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
        aria-label="Carregando cartas"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[5/7] w-full animate-pulse rounded-xl bg-slate-800"
          />
        ))}
      </div>
    );
  }