import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { CardGrid } from "./components/CardGrid";
import { useCardSearch } from "./hooks/useCardSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const { cards, status } = useCardSearch(query);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Card Explorer</h1>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Estados provisórios — no próximo passo viram componentes dedicados */}
        {status === "idle" && (
          <p className="text-center text-slate-400">
            Digite o nome de uma carta para começar.
          </p>
        )}

        {status === "loading" && (
          <p className="text-center text-slate-400">Carregando...</p>
        )}

        {status === "error" && (
          <p className="text-center text-red-400">
            Algo deu errado na busca. Tente novamente.
          </p>
        )}

        {status === "success" && cards.length === 0 && (
          <p className="text-center text-slate-400">
            Nenhuma carta encontrada.
          </p>
        )}

        {status === "success" && cards.length > 0 && <CardGrid cards={cards} />}
      </main>
    </div>
  );
}