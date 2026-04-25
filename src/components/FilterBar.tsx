import { COUNTRIES, SECTORS, STAGES } from "@/constants/filters";
import { useFiltersStore } from "@/store/filters";
import { MultiSelect } from "./MultiSelect";
import { SearchInput } from "./SearchInput";
import { SortControl } from "./SortControl";
import styles from "./FilterBar.module.css";

const STAGE_OPTIONS = STAGES.map((s) => ({ value: s, label: s }));
const SECTOR_OPTIONS = SECTORS.map((s) => ({ value: s, label: s }));
const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({ value: c.code, label: c.name }));

export function FilterBar() {
  const stages = useFiltersStore((s) => s.stages);
  const sectors = useFiltersStore((s) => s.sectors);
  const countries = useFiltersStore((s) => s.countries);
  const toggleStage = useFiltersStore((s) => s.toggleStage);
  const toggleSector = useFiltersStore((s) => s.toggleSector);
  const toggleCountry = useFiltersStore((s) => s.toggleCountry);
  const resetFilters = useFiltersStore((s) => s.resetFilters);

  const activeCount = stages.length + sectors.length + countries.length;

  return (
    <div className={styles.bar}>
      <div className={styles.group}>
        <SearchInput />
        <MultiSelect
          label="Stage"
          options={STAGE_OPTIONS}
          selected={stages}
          onToggle={toggleStage}
        />
        <MultiSelect
          label="Sector"
          options={SECTOR_OPTIONS}
          selected={sectors}
          onToggle={toggleSector}
        />
        <MultiSelect
          label="País"
          options={COUNTRY_OPTIONS}
          selected={countries}
          onToggle={toggleCountry}
        />
      </div>
      <div className={styles.group}>
        {activeCount > 0 && (
          <button
            type="button"
            className={styles.reset}
            onClick={resetFilters}
          >
            Limpiar ({activeCount})
          </button>
        )}
        <SortControl />
      </div>
    </div>
  );
}
