import { useEffect, useId, useRef, useState } from "react";
import { useFiltersStore } from "@/store/filters";
import { SORT_OPTIONS } from "@/constants/filters";
import styles from "./SortControl.module.css";

export function SortControl() {
  const sortBy = useFiltersStore((s) => s.sortBy);
  const sortOrder = useFiltersStore((s) => s.sortOrder);
  const setSortBy = useFiltersStore((s) => s.setSortBy);
  const toggleSortOrder = useFiltersStore((s) => s.toggleSortOrder);

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

  const active = SORT_OPTIONS.find((o) => o.key === sortBy) ?? SORT_OPTIONS[0];

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={styles.label}>Sort</span>
        <span className={styles.value}>{active.label}</span>
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
      <button
        type="button"
        className={styles.orderBtn}
        onClick={toggleSortOrder}
        aria-label={
          sortOrder === "desc"
            ? "Ordenando descendente, cambiar a ascendente"
            : "Ordenando ascendente, cambiar a descendente"
        }
        title={sortOrder === "desc" ? "Descendente" : "Ascendente"}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
          data-order={sortOrder}
          className={styles.orderIcon}
        >
          <path
            d="M6 1.5v9M2.5 7L6 10.5 9.5 7"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div id={panelId} className={styles.panel} role="listbox">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              role="option"
              aria-selected={opt.key === sortBy}
              className={styles.option}
              data-active={opt.key === sortBy}
              onClick={() => {
                setSortBy(opt.key);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
