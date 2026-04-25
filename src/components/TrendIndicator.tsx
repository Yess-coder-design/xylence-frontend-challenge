import type { Trend } from "@/types";
import styles from "./TrendIndicator.module.css";

const LABELS: Record<Trend, string> = {
  up: "Up",
  down: "Down",
  neutral: "Stable",
};

const ARIA: Record<Trend, string> = {
  up: "Trending up",
  down: "Trending down",
  neutral: "Stable",
};

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up") {
    return (
      <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
        <path
          d="M2 8l3-3 2 2 2.5-3.5M7 3.5h2.5V6"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (trend === "down") {
    return (
      <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
        <path
          d="M2 3l3 3 2-2 2.5 3.5M7 7.5h2.5V5"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
      <path
        d="M2 5.5h7"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrendIndicator({ trend }: { trend: Trend }) {
  return (
    <span className={styles.pill} data-trend={trend} aria-label={ARIA[trend]}>
      <TrendIcon trend={trend} />
      {LABELS[trend]}
    </span>
  );
}
