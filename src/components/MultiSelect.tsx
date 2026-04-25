import { useEffect, useId, useRef, useState } from "react";
import styles from "./MultiSelect.module.css";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  label: string;
  options: readonly Option<T>[];
  selected: readonly T[];
  onToggle: (value: T) => void;
}

export function MultiSelect<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const count = selected.length;

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        data-active={count > 0}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{label}</span>
        {count > 0 && <span className={styles.count}>{count}</span>}
        <svg
          className={styles.chev}
          data-open={open}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden
        >
          <path
            d="M2 3.5l3 3 3-3"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div
          id={panelId}
          className={styles.panel}
          role="listbox"
          aria-multiselectable="true"
        >
          {options.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={styles.option}
                data-checked={checked}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={checked}
                  onChange={() => onToggle(opt.value)}
                />
                <span className={styles.optionLabel}>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
