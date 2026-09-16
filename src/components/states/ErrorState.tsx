interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-300">
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <p className="mb-2 font-display text-xl font-semibold text-parchment">
        Algo deu errado
      </p>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-quill">
        Não foi possível carregar as cartas. Verifique sua conexão e tente
        novamente.
      </p>
      <button
        onClick={onRetry}
        className="rounded-md border border-gold-dim/60 bg-gold/10 px-5 py-2.5 font-display
                   text-sm font-semibold uppercase tracking-wide text-gold-soft transition
                   hover:bg-gold/20 hover:text-gold focus:outline-none focus:ring-2
                   focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-base"
      >
        Tentar novamente
      </button>
    </div>
  );
}
