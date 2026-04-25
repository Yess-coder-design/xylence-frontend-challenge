import { useId, useState } from "react";
import type { Startup } from "@/types";
import { CardHeader } from "./CardHeader";
import { MetadataRow } from "./MetadataRow";
import { ScoreIndicator } from "./ScoreIndicator";
import { SignalsSection } from "./SignalsSection";
import styles from "./StartupCard.module.css";

interface Props {
  startup: Startup;
  index?: number;
  isExpanded?: boolean;
  onToggle?: (id: string) => void;
}

export function StartupCard({ startup, index = 0, isExpanded, onToggle }: Props) {
  const [localExpanded, setLocalExpanded] = useState(false);
  const panelId = useId();

  const controlled = typeof isExpanded === "boolean";
  const expanded = controlled ? isExpanded : localExpanded;

  const hasSignals = startup.signals.length > 0;
  const animationDelay = `${Math.min(index, 12) * 30}ms`;

  const toggle = () => {
    if (controlled) {
      onToggle?.(startup.id);
    } else {
      setLocalExpanded((v) => !v);
    }
  };

  return (
    <article
      className={styles.card}
      style={{ animationDelay }}
      data-expanded={expanded}
    >
      <div className={styles.top}>
        <div className={styles.leading}>
          <CardHeader startup={startup} />
          <p className={styles.description}>{startup.description}</p>
        </div>

        <div className={styles.trailing}>
          <ScoreIndicator
            score={startup.convictionScore}
            trend={startup.trend}
          />
          {hasSignals && (
            <button
              type="button"
              className={styles.cta}
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls={panelId}
            >
              <span>{expanded ? "Ocultar señales" : "Ver señales"}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden
                data-open={expanded}
                className={styles.ctaChev}
              >
                <path
                  d="M2 3.5l3 3 3-3"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {hasSignals && (
        <div
          id={panelId}
          className={styles.expandContainer}
          data-open={expanded}
          aria-hidden={!expanded}
        >
          <div className={styles.expandInner}>
            <div className={styles.divider} />
            <MetadataRow variant="blocks" startup={startup} />
            <SignalsSection signals={startup.signals} />
          </div>
        </div>
      )}
    </article>
  );
}
