import type { ConvictionSignalType } from "@/types";
import styles from "./SignalItem.module.css";

const TYPE_LABEL: Record<ConvictionSignalType, string> = {
  team: "Team",
  market: "Market",
  traction: "Traction",
  product: "Product",
};

function TypeIcon({ type }: { type: ConvictionSignalType }) {
  switch (type) {
    case "team":
      return (
        <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
          <circle
            cx="5"
            cy="5"
            r="1.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle
            cx="10"
            cy="5.5"
            r="1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M1.5 12c0-2 1.5-3 3.5-3s3.5 1 3.5 3M9 12c0-1.5 1-2.3 2.5-2.3S14 10.5 14 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "market":
      return (
        <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M2 11l3.5-4 2.5 2.5L12 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 5h3v3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "traction":
      return (
        <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M3 11c1-4 4-7 8-7M7 4h4v4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="3" cy="11" r="1.1" fill="currentColor" />
        </svg>
      );
    case "product":
      return (
        <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M7 1.6l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.3l-3.4 1.8.7-3.8L1.5 5.6l3.8-.5L7 1.6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

interface Props {
  type: ConvictionSignalType;
  label: string;
  weight: number;
}

export function SignalItem({ type, label, weight }: Props) {
  const clamped = Math.max(0, Math.min(1, weight));
  const pct = clamped * 100;

  return (
    <div className={styles.item} data-type={type}>
      <div className={styles.head}>
        <span className={styles.titleBox}>
          <span className={styles.iconBox} data-type={type} aria-hidden>
            <TypeIcon type={type} />
          </span>
          <span className={styles.title}>{TYPE_LABEL[type]}</span>
        </span>
        <span className={styles.badge} data-type={type}>
          {weight.toFixed(2)}
        </span>
      </div>
      <p className={styles.label}>{label}</p>
      <div
        className={styles.track}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={clamped}
        aria-label={`${TYPE_LABEL[type]} signal weight`}
      >
        <div
          className={styles.fill}
          data-type={type}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
