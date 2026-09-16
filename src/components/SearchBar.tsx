import { useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Atalho "/" foca a busca de qualquer lugar (padrão comum em apps de consulta).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full sm:max-w-sm">
      <label htmlFor="card-search" className="sr-only">
        Buscar cartas
      </label>
      <div className="group relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-quill-dim transition-colors group-focus-within:text-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          id="card-search"
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar cartas..."
          autoComplete="off"
          className="w-full rounded-md border border-rule bg-panel/70 py-2.5 pl-9 pr-16
                     text-sm text-parchment placeholder-quill-dim outline-none transition
                     focus:border-gold/60 focus:bg-panel focus:ring-1 focus:ring-gold/40
                     [&::-webkit-search-cancel-button]:hidden"
        />

        {value ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            aria-label="Limpar busca"
            className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center
                       justify-center rounded text-quill transition hover:bg-panel-2
                       hover:text-parchment focus:outline-none focus:ring-1 focus:ring-gold/40"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        ) : (
          <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 select-none rounded border border-rule bg-panel-2 px-1.5 py-0.5 text-[0.65rem] text-quill-dim sm:block">
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
