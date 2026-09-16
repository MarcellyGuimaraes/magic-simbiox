export function LoadingState() {
  // Mesma grade do CardGrid, pra transição suave quando os dados chegarem
  return (
    <div
      className="grid gap-4 sm:gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
      aria-label="Carregando cartas"
      aria-busy="true"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="skeleton aspect-[5/7] w-full rounded-lg ring-1 ring-rule"
        />
      ))}
    </div>
  );
}
