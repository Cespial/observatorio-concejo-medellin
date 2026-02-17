"use client";

import { TopTicker } from "@/components/layout/top-ticker";

type TickerItem = {
  label: string;
  value: number;
  change: number;
  unit?: string;
};

type TickerSectionProps = {
  serverData?: TickerItem[];
};

const fallbackData: TickerItem[] = [
  { label: "Homicidios 2025", value: 423, change: -12.3 },
  { label: "Tasa desempleo", value: 10.2, change: -0.8, unit: "%" },
  { label: "Calidad aire PM2.5", value: 28, change: 4.2, unit: " \u00B5g/m\u00B3" },
  { label: "Pasajeros Metro", value: 892000, change: 3.1 },
  { label: "Cobertura educativa", value: 96.8, change: 1.2, unit: "%" },
  { label: "Inversion publica", value: 4200000, change: 8.5 },
  { label: "Hurtos", value: 1247, change: -5.6 },
  { label: "Camas UCI", value: 1840, change: 2.1 },
];

export function TickerSection({ serverData }: TickerSectionProps) {
  const items = serverData?.length ? serverData : fallbackData;
  return <TopTicker items={items} />;
}
