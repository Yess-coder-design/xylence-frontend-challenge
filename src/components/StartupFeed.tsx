import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useStartups } from "@/hooks/useStartups";
import { useFiltersStore } from "@/store/filters";
import type { StartupFilters } from "@/types";
import { EmptyState } from "./EmptyState";
import { FilterBar } from "./FilterBar";
import { Pagination } from "./Pagination";
import { StartupCard } from "./StartupCard";
import { StartupCardSkeleton } from "./StartupCardSkeleton";
import styles from "./StartupFeed.module.css";

const PAGE_SIZE = 9;
const SKELETON_COUNT = PAGE_SIZE;

export function StartupFeed() {
  const stages = useFiltersStore((s) => s.stages);
  const sectors = useFiltersStore((s) => s.sectors);
  const countries = useFiltersStore((s) => s.countries);
  const search = useFiltersStore((s) => s.search);
  const sortBy = useFiltersStore((s) => s.sortBy);
  const sortOrder = useFiltersStore((s) => s.sortOrder);
  const resetFilters = useFiltersStore((s) => s.resetFilters);

  const debouncedSearch = useDebounce(search, 250);

  const filters: StartupFilters = {
    stages: stages.length ? stages : undefined,
    sectors: sectors.length ? sectors : undefined,
    countries: countries.length ? countries : undefined,
    search: debouncedSearch.trim() || undefined,
    sortBy,
    sortOrder,
  };

  const { data, isLoading, isError, isFetching, refetch } = useStartups(filters);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setActiveCardId(null);
  }, [
    debouncedSearch,
    stages,
    sectors,
    countries,
    sortBy,
    sortOrder,
  ]);

  const total = data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (safePage !== currentPage) setCurrentPage(safePage);
  }, [safePage, currentPage]);

  const pageItems = useMemo(() => {
    if (!data) return [];
    const start = (safePage - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, safePage]);

  const handleToggle = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setActiveCardId(null);
  };

  const showSkeletons = isLoading;
  const showEmpty = !isLoading && !isError && data && data.length === 0;
  const showError = isError;

  return (
    <section className={styles.feed} aria-busy={isFetching}>
      <FilterBar />

      <div className={styles.header}>
        <span className={styles.count}>
          {data ? `${data.length} resultado${data.length === 1 ? "" : "s"}` : "—"}
        </span>
        {isFetching && !isLoading && (
          <span className={styles.refetching} aria-live="polite">
            Actualizando…
          </span>
        )}
      </div>

      {showError && (
        <div className={styles.error} role="alert">
          <p className={styles.errorTitle}>No pudimos cargar el feed.</p>
          <button
            type="button"
            className={styles.retry}
            onClick={() => refetch()}
          >
            Reintentar
          </button>
        </div>
      )}

      {showSkeletons && (
        <div className={styles.grid}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <StartupCardSkeleton key={i} />
          ))}
        </div>
      )}

      {showEmpty && <EmptyState onReset={resetFilters} />}

      {!showSkeletons && !showEmpty && !showError && data && data.length > 0 && (
        <>
          <div className={styles.grid}>
            {pageItems.map((startup, i) => (
              <StartupCard
                key={startup.id}
                startup={startup}
                index={i}
                isExpanded={activeCardId === startup.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
