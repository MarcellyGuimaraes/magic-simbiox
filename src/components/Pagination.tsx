interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Janela de páginas com reticências: 1 … 4 5 6 … 12. */
function pageWindow(current: number, total: number): (number | "…")[] {
  const out: (number | "…")[] = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || (p >= current - 1 && p <= current + 1)) {
      out.push(p);
    } else if (out[out.length - 1] !== "…") {
      out.push("…");
    }
  }
  return out;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const base =
    "flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-gold/40";

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Paginação"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={`${base} border-rule text-quill hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-rule disabled:hover:text-quill`}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {pageWindow(page, totalPages).map((item, i) =>
        item === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-quill-dim">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`${base} font-display ${
              item === page
                ? "border-gold/60 bg-gold/10 text-gold-soft"
                : "border-rule text-quill hover:border-gold/50 hover:text-gold"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={`${base} border-rule text-quill hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-rule disabled:hover:text-quill`}
        aria-label="Próxima página"
      >
        ›
      </button>
    </nav>
  );
}
