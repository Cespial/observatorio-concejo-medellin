export const INSTITUTIONAL_COLORS = [
  "#1B3A5C",
  "#C9A94E",
  "#E8632B",
  "#2563EB",
  "#16A34A",
  "#7C3AED",
  "#059669",
  "#EA580C",
  "#DC2626",
  "#0891B2",
];

export const SEQUENTIAL_BLUE = [
  "#EFF3F7",
  "#D4DDE8",
  "#A9BBD1",
  "#7E99BA",
  "#5377A3",
  "#1B3A5C",
];

export const DIVERGING = [
  "#DC2626",
  "#F87171",
  "#FECACA",
  "#D1FAE5",
  "#6EE7B7",
  "#16A34A",
];

export function getColor(index: number): string {
  return INSTITUTIONAL_COLORS[index % INSTITUTIONAL_COLORS.length];
}

export function getSequentialColor(value: number, min: number, max: number): string {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  const idx = Math.floor(normalized * (SEQUENTIAL_BLUE.length - 1));
  return SEQUENTIAL_BLUE[idx];
}
