import styles from "./EmptyState.module.css";

interface Props {
  onReset: () => void;
}

export function EmptyState({ onReset }: Props) {
  return (
    <div className={styles.empty} role="status">
      <svg
        className={styles.icon}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        aria-hidden
      >
        <circle
          cx="17"
          cy="17"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M25.5 25.5l6.5 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M13 17h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
      <h3 className={styles.title}>Sin resultados</h3>
      <p className={styles.body}>
        Ninguna startup coincide con los filtros actuales. Ajusta los criterios
        o empieza de cero.
      </p>
      <button type="button" className={styles.reset} onClick={onReset}>
        Limpiar filtros
      </button>
    </div>
  );
}
