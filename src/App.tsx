import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { CardGrid } from "./components/CardGrid";
import { CardDetails } from "./components/CardDetails";
import { FeaturedCards } from "./components/FeaturedCards";
import { LoadingState } from "./components/states/LoadingState";
import { EmptyState } from "./components/states/EmptyState";
import { ErrorState } from "./components/states/ErrorState";
import { useCardSearch } from "./hooks/useCardSearch";
import { useFeaturedCards } from "./hooks/useFeaturedCards";
import type { Card } from "./types";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { cards, status, retry } = useCardSearch(query);
  const featured = useFeaturedCards();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Card Explorer</h1>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {status === "idle" &&
          (featured.length > 0 ? (
            <FeaturedCards cards={featured} onSelect={setSelectedCard} />
          ) : (
            <EmptyState variant="initial" />
          ))}
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState onRetry={retry} />}
        {status === "success" && cards.length === 0 && (
          <EmptyState variant="no-results" query={query} />
        )}
        {status === "success" && cards.length > 0 && (
          <CardGrid cards={cards} onSelect={setSelectedCard} />
        )}
      </main>

      <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}