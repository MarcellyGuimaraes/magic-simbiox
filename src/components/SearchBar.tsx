interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <label htmlFor="card-search" className="sr-only">
          Buscar cartas
        </label>
        <input
          id="card-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar cartas... (ex: Black Lotus)"
          autoComplete="off"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3
                     text-slate-100 placeholder-slate-500 outline-none transition
                     focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>
    );
  }