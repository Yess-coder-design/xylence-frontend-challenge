import { useFiltersStore } from "@/store/filters";
import styles from "./SearchInput.module.css";

export function SearchInput() {
  const search = useFiltersStore((s) => s.search);
  const setSearch = useFiltersStore((s) => s.setSearch);

  return (
    <label className={styles.root}>
      <svg
        className={styles.icon}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        aria-hidden
      >
        <circle
          cx="6"
          cy="6"
          r="4.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M9.3 9.3L12 12"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="search"
        className={styles.input}
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar startups por nombre"
      />
      {search && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => setSearch("")}
          aria-label="Limpiar búsqueda"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </label>
  );
}
