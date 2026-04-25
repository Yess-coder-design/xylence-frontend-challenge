import { useMemo } from "react";
import type { ConvictionSignal, ConvictionSignalType } from "@/types";
import { SignalItem } from "./SignalItem";
import styles from "./SignalsSection.module.css";

const ORDER: ConvictionSignalType[] = [
  "team",
  "market",
  "traction",
  "product",
];

interface Props {
  signals: ConvictionSignal[];
}

function pickTopPerType(
  signals: ConvictionSignal[],
): Map<ConvictionSignalType, ConvictionSignal> {
  const map = new Map<ConvictionSignalType, ConvictionSignal>();
  for (const signal of signals) {
    const existing = map.get(signal.type);
    if (!existing || signal.weight > existing.weight) {
      map.set(signal.type, signal);
    }
  }
  return map;
}

export function SignalsSection({ signals }: Props) {
  const items = useMemo(() => {
    const top = pickTopPerType(signals);
    return ORDER.map((type) => top.get(type)).filter(
      (signal): signal is ConvictionSignal => signal !== undefined,
    );
  }, [signals]);

  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Desglose de señales">
      <h3 className={styles.title}>Señales</h3>
      <div className={styles.grid}>
        {items.map((signal) => (
          <SignalItem
            key={signal.type}
            type={signal.type}
            label={signal.label}
            weight={signal.weight}
          />
        ))}
      </div>
    </section>
  );
}
