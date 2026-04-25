import styles from "./Pagination.module.css";

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function pageWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("ellipsis");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({ currentPage, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = pageWindow(currentPage, totalPages);
  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onChange(p);
  };

  return (
    <nav className={styles.pagination} aria-label="Paginación de resultados">
      <button
        type="button"
        className={styles.nav}
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹ Anterior
      </button>

      <ul className={styles.pages}>
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <li key={`e-${i}`} className={styles.ellipsis} aria-hidden>
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={styles.page}
                onClick={() => goTo(p)}
                aria-current={p === currentPage ? "page" : undefined}
                data-active={p === currentPage}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={styles.nav}
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        Siguiente ›
      </button>
    </nav>
  );
}
