export type DataPoint = {
  label: string;
  value: number;
  color?: string;
};

export type TimeSeriesPoint = {
  date: string;
  value: number;
  [key: string]: string | number;
};

export type MultiSeriesData = {
  name: string;
  color: string;
  data: TimeSeriesPoint[];
};

export type ChoroplethDatum = {
  codigo: string;
  nombre: string;
  valor: number;
  color?: string;
};

export type GaugeData = {
  value: number;
  min: number;
  max: number;
  target?: number;
  label: string;
  unit: string;
};

export type HeatmapCell = {
  x: string;
  y: string;
  value: number;
};

export type TreemapNode = {
  name: string;
  value: number;
  color?: string;
  children?: TreemapNode[];
};

export type BaseChartProps = {
  title?: string;
  source?: string;
  height?: number;
  className?: string;
  loading?: boolean;
};
