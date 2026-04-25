import type { ReactNode } from "react";
import type { Startup } from "@/types";
import { formatFunding } from "@/lib/format";
import { countryName } from "@/lib/format";
import styles from "./MetadataRow.module.css";

function FundingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <circle
        cx="7"
        cy="7"
        r="5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M8.7 5.3c-.4-.5-1-.8-1.7-.8-1 0-1.8.6-1.8 1.4 0 .8.7 1.1 1.8 1.3 1.1.2 1.8.5 1.8 1.3 0 .8-.8 1.4-1.8 1.4-.8 0-1.4-.3-1.8-.9M7 3.5v7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function YearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <rect
        x="2"
        y="3"
        width="10"
        height="9"
        rx="1.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4.5 1.8v2.4M9.5 1.8v2.4M2 6h10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M7 12.5s4-3.4 4-6.5a4 4 0 10-8 0c0 3.1 4 6.5 4 6.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle
        cx="7"
        cy="6"
        r="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

interface Props {
  variant: "blocks";
  startup: Startup;
}

function Block({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className={styles.block}>
      <span className={styles.blockIcon} aria-hidden>
        {icon}
      </span>
      <span className={styles.blockBody}>
        <span className={styles.blockLabel}>{label}</span>
        <span className={styles.blockValue}>{value}</span>
      </span>
    </div>
  );
}

export function MetadataRow({ startup }: Props) {
  const funding = formatFunding(startup.fundingAmount);

  return (
    <div className={styles.blocks}>
      <Block
        icon={<FundingIcon />}
        label="Funding"
        value={funding ?? "Sin revelar"}
      />
      <Block
        icon={<YearIcon />}
        label="Fundada"
        value={String(startup.foundedYear)}
      />
      <Block
        icon={<LocationIcon />}
        label="Ubicación"
        value={countryName(startup.country)}
      />
    </div>
  );
}
