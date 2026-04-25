import styles from "./StartupCardSkeleton.module.css";

export function StartupCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <div className={`${styles.shimmer} ${styles.avatar}`} />
      <div className={styles.body}>
        <div className={`${styles.shimmer} ${styles.name}`} />
        <div className={styles.metaRow}>
          <div className={`${styles.shimmer} ${styles.chip}`} />
          <div
            className={`${styles.shimmer} ${styles.chip}`}
            style={{ width: 28 }}
          />
        </div>
        <div
          className={`${styles.shimmer} ${styles.line}`}
          style={{ width: "92%" }}
        />
        <div className={`${styles.shimmer} ${styles.funding}`} />
      </div>
      <div className={styles.side}>
        <div className={`${styles.shimmer} ${styles.scoreLabel}`} />
        <div className={`${styles.shimmer} ${styles.scoreValue}`} />
        <div className={`${styles.shimmer} ${styles.trend}`} />
        <div className={`${styles.shimmer} ${styles.cta}`} />
      </div>
    </div>
  );
}
