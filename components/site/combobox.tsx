"use client";

import { useEffect, useRef, useState } from "react";
import { normalizeSearch } from "@/lib/utils";

export interface ComboboxOption {
  label: string;
  value: string;
}

export function Combobox({
  label,
  options,
  value,
  onSelect,
  placeholder,
  disabled,
  required,
  disabledHint,
}: {
  label: string;
  options: ComboboxOption[];
  value: string;
  onSelect: (option: ComboboxOption) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  disabledHint?: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Riallinea il testo digitato al valore confermato quando cambia
    // dall'esterno (es. la città seleziona anche provincia/CAP).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(value);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [value]);

  const filtered = query.trim()
    ? options.filter((o) => normalizeSearch(o.label).includes(normalizeSearch(query))).slice(0, 8)
    : options.slice(0, 8);

  return (
    <div ref={containerRef} className="relative">
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">{label}</span>
        <input
          type="text"
          value={query}
          disabled={disabled}
          required={required}
          placeholder={disabled ? disabledHint : placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
          className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro disabled:opacity-40"
        />
      </label>
      {open && !disabled && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-notte/10 bg-avorio shadow-lg">
          {filtered.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(o);
                  setQuery(o.label);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm text-notte hover:bg-sabbia/40"
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
