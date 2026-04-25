import type { Trend } from "@/types";
import { TrendIndicator } from "./TrendIndicator";
import styles from "./ScoreIndicator.module.css";

interface Props {
  score: number;
  trend: Trend;
}

export function ScoreIndicator({ score, trend }: Props) {
  const clamped = Math.max(0, Math.min(100, score));
  return (
    <div className={styles.root}>
      <span className={styles.label}>Conviction Score</span>
      <span
        className={styles.value}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
        aria-label="Conviction score"
      >
        {Math.round(clamped)}
      </span>
      <TrendIndicator trend={trend} />
    </div>
  );
}
