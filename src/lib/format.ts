export function formatFunding(amount: number | undefined): string | null {
  if (amount == null || amount <= 0) return null;
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const rounded = millions >= 10 ? Math.round(millions) : Math.round(millions * 10) / 10;
    return `$${rounded}M`;
  }
  if (amount >= 1_000) {
    return `$${Math.round(amount / 1_000)}K`;
  }
  return `$${amount}`;
}

const COUNTRY_NAMES: Record<string, string> = {
  MX: "México",
  BR: "Brasil",
  CO: "Colombia",
  AR: "Argentina",
  CL: "Chile",
  PE: "Perú",
};

export function countryName(code: string): string {
  return COUNTRY_NAMES[code] ?? code;
}
