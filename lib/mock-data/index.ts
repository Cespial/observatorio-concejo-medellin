import { SEGURIDAD_DATA } from "./seguridad";
import { EDUCACION_DATA } from "./educacion";
import { ECONOMIA_DATA } from "./economia";
import { MOVILIDAD_DATA } from "./movilidad";
import { AMBIENTE_DATA } from "./ambiente";
import { SALUD_DATA } from "./salud";
import type { ThematicMockData } from "./types";

const ALL_MOCK_DATA: ThematicMockData[] = [
  SEGURIDAD_DATA,
  EDUCACION_DATA,
  ECONOMIA_DATA,
  MOVILIDAD_DATA,
  AMBIENTE_DATA,
  SALUD_DATA,
];

export function getMockDataBySlug(slug: string): ThematicMockData | undefined {
  return ALL_MOCK_DATA.find((d) => d.slug === slug);
}

export function getAllThematicData(): ThematicMockData[] {
  return ALL_MOCK_DATA;
}

// Re-export all thematic data
export { SEGURIDAD_DATA } from "./seguridad";
export { EDUCACION_DATA } from "./educacion";
export { ECONOMIA_DATA } from "./economia";
export { MOVILIDAD_DATA } from "./movilidad";
export { AMBIENTE_DATA } from "./ambiente";
export { SALUD_DATA } from "./salud";

// Re-export productos
export { MOCK_PRODUCTOS } from "./productos";
export type { ProductoMock } from "./productos";

// Re-export territories
export { TERRITORIES } from "./territories";

// Re-export map indicators
export { MAP_INDICATORS_DATA, MAP_INDICATOR_OPTIONS } from "./map-indicators";
export type { MapIndicatorOption } from "./map-indicators";

// Re-export types
export type {
  ThematicMockData,
  KpiMock,
  TimeSeriesRow,
  ComunaComparison,
  HeatmapRow,
  RadarDimension,
  GaugeMock,
  RelatedInitiative,
  TerritoryData,
  MapIndicatorData,
} from "./types";
