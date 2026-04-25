import { useQuery } from "@tanstack/react-query";
import { fetchStartups } from "@/api/mock";
import type { StartupFilters } from "@/types";

export function useStartups(filters: StartupFilters) {
  return useQuery({
    queryKey: ["startups", filters] as const,
    queryFn: () => fetchStartups(filters),
    placeholderData: (previous) => previous,
  });
}
