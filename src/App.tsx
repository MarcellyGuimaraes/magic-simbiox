import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { CardGrid } from "./components/CardGrid";
import { LoadingState } from "./components/states/LoadingState";
import { EmptyState } from "./components/states/EmptyState";
import { ErrorState } from "./components/states/ErrorState";
import { useCardSearch } from "./hooks/useCardSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const { cards, status, retry } = useCardSearch(query);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Card Explorer</h1>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {status === "idle" && <EmptyState variant="initial" />}
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState onRetry={retry} />}
        {status === "success" && cards.length === 0 && (
          <EmptyState variant="no-results" query={query} />
        )}
        {status === "success" && cards.length > 0 && <CardGrid cards={cards} />}
      </main>
    </div>
  );
}