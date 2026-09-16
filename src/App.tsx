import { useMemo, useRef, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { CardGrid } from "./components/CardGrid";
import { CardDetails } from "./components/CardDetails";
import { LoadingState } from "./components/states/LoadingState";
import { EmptyState } from "./components/states/EmptyState";
import { ErrorState } from "./components/states/ErrorState";
import { ColorFilter } from "./components/ColorFilter";
import { Pagination } from "./components/Pagination";
import { Flourish, Diamond } from "./components/Ornament";
import { useCardSearch } from "./hooks/useCardSearch";
import { useFeaturedCards } from "./hooks/useFeaturedCards";
import { matchesColors } from "./utils";
import type { Card } from "./types";

// Cartas exibidas por página. Mantém o DOM leve mesmo em buscas grandes.
const PAGE_SIZE = 24;

// Buscas prontas para guiar quem chega sem um termo em mente.
const SUGGESTIONS = ["Black Lotus", "dragon", "angel", "t:planeswalker"];
const SUGGESTION_LABELS: Record<string, string> = {
  "Black Lotus": "Black Lotus",
  dragon: "Dragões",
  angel: "Anjos",
  "t:planeswalker": "Planeswalkers",
};

export default function App() {
  const [query, setQuery] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { cards, status, retry } = useCardSearch(query);
  const featured = useFeaturedCards();

  // Lista base conforme o momento: destaques na entrada, resultados na busca.
  const baseList = useMemo(
    () => (status === "success" ? cards : status === "idle" ? featured : []),
    [status, cards, featured]
  );
  const visible = useMemo(
    () => baseList.filter((c) => matchesColors(c, colors)),
    [baseList, colors]
  );

  const toggleColor = (code: string) =>
    setColors((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );

  // Paginação da exibição — só as cartas da página atual vão ao DOM.
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // Nova busca ou filtro: volta para a primeira página. Ajuste de estado
  // durante o render (padrão recomendado pelo React), sem efeito colateral.
  const filterKey = `${query}|${colors.join(",")}`;
  const [prevKey, setPrevKey] = useState(filterKey);
  if (filterKey !== prevKey) {
    setPrevKey(filterKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageCards = useMemo(
    () => visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [visible, safePage]
  );

  const goToPage = (next: number) => {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showToolbar = baseList.length > 0;
  const isSearch = status === "success" && cards.length > 0;

  return (
    <div className="min-h-screen">
      {/* ------------------------- Masthead ------------------------- */}
      <header className="sticky top-0 z-30 border-b border-gold-dim/30 bg-base/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <a href="/" className="group flex items-center gap-2.5">
            <Diamond className="h-3.5 w-3.5 text-gold transition group-hover:rotate-45" />
            <span className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-parchment">
              Card <span className="text-gold">Explorer</span>
            </span>
          </a>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

      {/* -------------------------- Conteúdo ------------------------ */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Âncora de rolagem ao trocar de página */}
        <div ref={topRef} className="scroll-mt-24" />

        {/* Cabeçalho da seção */}
        {(status === "idle" && featured.length > 0) || isSearch ? (
          <div className="mb-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow mb-1.5">
                  {isSearch ? "Resultados" : "Compêndio"}
                </p>
                <h2 className="font-display text-2xl font-semibold text-parchment">
                  {isSearch ? (
                    <>
                      <span className="text-gold">{visible.length}</span>{" "}
                      {visible.length === 1 ? "carta" : "cartas"}
                      {query.trim() && (
                        <span className="text-quill"> · {query.trim()}</span>
                      )}
                    </>
                  ) : (
                    "Cartas em destaque"
                  )}
                </h2>
              </div>
              {showToolbar && (
                <ColorFilter
                  active={colors}
                  onToggle={toggleColor}
                  onClear={() => setColors([])}
                />
              )}
            </div>

            {!isSearch && (
              <p className="mt-2 text-sm text-quill-dim">
                Experimente:{" "}
                {SUGGESTIONS.map((s, i) => (
                  <span key={s}>
                    {i > 0 && <span className="text-rule"> · </span>}
                    <button
                      onClick={() => setQuery(s)}
                      className="text-quill underline decoration-rule underline-offset-2 transition hover:text-gold"
                    >
                      {SUGGESTION_LABELS[s] ?? s}
                    </button>
                  </span>
                ))}
              </p>
            )}

            <Flourish className="mt-4" />
          </div>
        ) : null}

        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState onRetry={retry} />}
        {status === "success" && cards.length === 0 && (
          <EmptyState variant="no-results" query={query} />
        )}
        {status === "idle" && featured.length === 0 && (
          <EmptyState variant="initial" />
        )}

        {showToolbar &&
          (visible.length > 0 ? (
            <>
              <CardGrid cards={pageCards} onSelect={setSelectedCard} />
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onChange={goToPage}
              />
            </>
          ) : (
            <EmptyState variant="no-color" />
          ))}
      </main>

      <footer className="mt-8 border-t border-rule-soft py-6 text-center text-xs text-quill-dim">
        Dados da{" "}
        <a
          href="https://scryfall.com/docs/api"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-rule underline-offset-2 transition hover:text-gold"
        >
          API pública da Scryfall
        </a>
        {" · "}Desafio técnico Simbiox
      </footer>

      <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
