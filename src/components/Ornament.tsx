/** Divisória ornamental: filete — losango — filete. Estilo compêndio. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 text-gold-dim ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
      <Diamond className="h-2.5 w-2.5" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
    </div>
  );
}

/** Losango simples usado como marcador arcano. */
export function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <path d="M5 0 9 5 5 10 1 5Z" fill="currentColor" />
    </svg>
  );
}

/** Cantoneira ornamental — dois filetes finos formando um canto. */
export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M2 22V8a6 6 0 0 1 6-6h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6 22v-9a4 4 0 0 1 4-4h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
