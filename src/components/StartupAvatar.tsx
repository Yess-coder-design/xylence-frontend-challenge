import styles from "./StartupAvatar.module.css";

const PALETTE = [
  "#1e293b",
  "#0f172a",
  "#1d4ed8",
  "#4338ca",
  "#7c3aed",
  "#be185d",
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#16a34a",
  "#0d9488",
  "#0284c7",
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function avatarColor(id: string): string {
  return PALETTE[hash(id) % PALETTE.length]!;
}

interface Props {
  id: string;
  name: string;
  size?: number;
}

export function StartupAvatar({ id, name, size = 44 }: Props) {
  const color = avatarColor(id);
  const letter = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      className={styles.avatar}
      style={{
        background: color,
        width: size,
        height: size,
        fontSize: size * 0.42,
      }}
      aria-hidden
    >
      {letter}
    </div>
  );
}
