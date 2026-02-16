export type KpiMock = {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: number; // percentage vs previous year
  positiveIsGood: boolean;
  sparklineData: number[]; // 11 yearly values 2015-2025
};

export type TimeSeriesRow = {
  year: number;
  [key: string]: number; // dynamic keys for different series
};

export type ComunaComparison = {
  nombre: string;
  codigo: string;
  valor: number;
  poblacion: number;
};

export type HeatmapRow = {
  year: number;
  Ene: number;
  Feb: number;
  Mar: number;
  Abr: number;
  May: number;
  Jun: number;
  Jul: number;
  Ago: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dic: number;
};

export type RadarDimension = {
  dimension: string;
  "2024": number;
  "2025": number;
};

export type GaugeMock = {
  title: string;
  value: number;
  min: number;
  max: number;
  target: number;
  unit: string;
};

export type RelatedInitiative = {
  id: string;
  titulo: string;
  tipo: string;
  estado: string;
  fecha: string;
};

export type ThematicMockData = {
  slug: string;
  name: string;
  description: string;
  kpis: KpiMock[];
  timeSeries: TimeSeriesRow[];
  timeSeriesKeys: { key: string; name: string; color?: string }[];
  comunaComparison: ComunaComparison[];
  areaBreakdown: TimeSeriesRow[];
  areaBreakdownKeys: { key: string; name: string; color?: string }[];
  heatmap: HeatmapRow[];
  radar: RadarDimension[];
  gauges: GaugeMock[];
  relatedInitiatives: RelatedInitiative[];
  annotations: { year: number; label: string }[];
};

export type TerritoryData = {
  codigo: string;
  nombre: string;
  tipo: "comuna" | "corregimiento";
  poblacion: number;
  area_km2: number;
};

export type MapIndicatorData = {
  territorio_codigo: string;
  indicador: string;
  year: number;
  valor: number;
};
