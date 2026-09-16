import { manaSymbolUrl } from "../utils";

const COLORS: { code: string; label: string }[] = [
  { code: "W", label: "Branco" },
  { code: "U", label: "Azul" },
  { code: "B", label: "Preto" },
  { code: "R", label: "Vermelho" },
  { code: "G", label: "Verde" },
  { code: "C", label: "Incolor" },
];

interface ColorFilterProps {
  active: string[];
  onToggle: (code: string) => void;
  onClear: () => void;
}

export function ColorFilter({ active, onToggle, onClear }: ColorFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-1">Cor</span>
      {COLORS.map(({ code, label }) => {
        const on = active.includes(code);
        return (
          <button
            key={code}
            onClick={() => onToggle(code)}
            aria-pressed={on}
            aria-label={label}
            title={label}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition
              ${
                on
                  ? "opacity-100 ring-2 ring-gold ring-offset-2 ring-offset-base"
                  : "opacity-40 grayscale hover:opacity-90 hover:grayscale-0"
              }`}
          >
            <img
              src={manaSymbolUrl(code)}
              alt=""
              draggable={false}
              className="h-5 w-5"
            />
          </button>
        );
      })}
      {active.length > 0 && (
        <button
          onClick={onClear}
          className="ml-1 text-xs text-quill-dim underline decoration-rule underline-offset-2 transition hover:text-gold"
        >
          limpar
        </button>
      )}
    </div>
  );
}
