import { create } from "zustand";
import type { Country, Sector, Stage } from "@/types";
import type { SortKey } from "@/constants/filters";

type SortOrder = "asc" | "desc";

interface FiltersState {
  stages: Stage[];
  sectors: Sector[];
  countries: Country[];
  search: string;
  sortBy: SortKey;
  sortOrder: SortOrder;
  toggleStage: (value: Stage) => void;
  toggleSector: (value: Sector) => void;
  toggleCountry: (value: Country) => void;
  setSearch: (value: string) => void;
  setSortBy: (key: SortKey) => void;
  toggleSortOrder: () => void;
  resetFilters: () => void;
}

const toggleItem = <T>(list: T[], item: T): T[] =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

export const useFiltersStore = create<FiltersState>((set) => ({
  stages: [],
  sectors: [],
  countries: [],
  search: "",
  sortBy: "convictionScore",
  sortOrder: "desc",
  toggleStage: (value) => set((s) => ({ stages: toggleItem(s.stages, value) })),
  toggleSector: (value) => set((s) => ({ sectors: toggleItem(s.sectors, value) })),
  toggleCountry: (value) => set((s) => ({ countries: toggleItem(s.countries, value) })),
  setSearch: (value) => set({ search: value }),
  setSortBy: (key) => set({ sortBy: key }),
  toggleSortOrder: () => set((s) => ({ sortOrder: s.sortOrder === "asc" ? "desc" : "asc" })),
  resetFilters: () => set({ stages: [], sectors: [], countries: [], search: "" }),
}));
