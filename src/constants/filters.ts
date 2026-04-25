import type { Country, Sector, Stage, StartupFilters } from "@/types";

export const STAGES: readonly Stage[] = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B+",
] as const;

export const SECTORS: readonly Sector[] = [
  "FinTech",
  "B2B SaaS",
  "Marketplace",
  "HealthTech",
  "ClimaTech",
  "AgriTech",
  "LogiTech",
  "PropTech",
  "EdTech",
  "Consumer",
] as const;

export const COUNTRIES: readonly { code: Country; name: string }[] = [
  { code: "MX", name: "México" },
  { code: "BR", name: "Brasil" },
  { code: "CO", name: "Colombia" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Perú" },
] as const;

export type SortKey = NonNullable<StartupFilters["sortBy"]>;

export const SORT_OPTIONS: readonly { key: SortKey; label: string }[] = [
  { key: "convictionScore", label: "Conviction" },
  { key: "fundingAmount", label: "Funding" },
  { key: "foundedYear", label: "Founded" },
] as const;
