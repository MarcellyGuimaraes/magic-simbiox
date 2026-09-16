interface ErrorStateProps {
    onRetry: () => void;
  }
  
  export function ErrorState({ onRetry }: ErrorStateProps) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="mb-2 text-lg font-medium text-slate-200">
          Algo deu errado
        </p>
        <p className="mb-6 max-w-sm text-slate-400">
          Não foi possível carregar as cartas. Verifique sua conexão e tente novamente.
        </p>
        <button
          onClick={onRetry}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white
                     transition hover:bg-emerald-500 focus:outline-none
                     focus:ring-2 focus:ring-emerald-500/40"
        >
          Tentar novamente
        </button>
      </div>
    );
  }