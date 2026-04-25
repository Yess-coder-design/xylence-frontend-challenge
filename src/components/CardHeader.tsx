import type { Startup } from "@/types";
import { StartupAvatar } from "./StartupAvatar";
import styles from "./CardHeader.module.css";

interface Props {
  startup: Startup;
}

export function CardHeader({ startup }: Props) {
  return (
    <div className={styles.header}>
      <StartupAvatar id={startup.id} name={startup.name} />
      <div className={styles.text}>
        <h2 className={styles.name}>{startup.name}</h2>
        <div className={styles.meta}>
          <span className={styles.stage}>{startup.stage}</span>
        </div>
      </div>
    </div>
  );
}
