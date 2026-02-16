import type { MapIndicatorData } from "./types";

// Base values per territory for each indicator (2025 values), reflecting realistic spatial variation
// Higher crime in peripheral/lower-income comunas, lower in El Poblado/Laureles
const BASE_VALUES: Record<string, Record<string, number>> = {
  "1":  { homicidios_tasa: 28.4, hurtos_total: 1_420, cobertura_educativa: 92.4, desempleo: 16.8, pm25: 34.2, accidentes: 1_850, vacunacion: 90.2, satisfaccion_transporte: 38.2 },
  "2":  { homicidios_tasa: 25.1, hurtos_total: 1_180, cobertura_educativa: 93.1, desempleo: 15.2, pm25: 33.1, accidentes: 1_620, vacunacion: 91.0, satisfaccion_transporte: 42.5 },
  "3":  { homicidios_tasa: 22.7, hurtos_total: 1_540, cobertura_educativa: 93.8, desempleo: 14.5, pm25: 31.5, accidentes: 1_780, vacunacion: 91.8, satisfaccion_transporte: 40.1 },
  "4":  { homicidios_tasa: 19.3, hurtos_total: 1_320, cobertura_educativa: 95.2, desempleo: 12.3, pm25: 30.8, accidentes: 1_560, vacunacion: 92.5, satisfaccion_transporte: 45.3 },
  "5":  { homicidios_tasa: 14.8, hurtos_total: 1_080, cobertura_educativa: 96.5, desempleo: 10.8, pm25: 29.4, accidentes: 1_340, vacunacion: 93.2, satisfaccion_transporte: 52.8 },
  "6":  { homicidios_tasa: 20.5, hurtos_total: 1_450, cobertura_educativa: 94.7, desempleo: 13.1, pm25: 30.2, accidentes: 1_680, vacunacion: 92.0, satisfaccion_transporte: 48.5 },
  "7":  { homicidios_tasa: 16.2, hurtos_total: 1_200, cobertura_educativa: 95.9, desempleo: 11.4, pm25: 28.8, accidentes: 1_420, vacunacion: 93.5, satisfaccion_transporte: 55.2 },
  "8":  { homicidios_tasa: 23.9, hurtos_total: 1_380, cobertura_educativa: 93.5, desempleo: 14.9, pm25: 32.4, accidentes: 1_720, vacunacion: 91.2, satisfaccion_transporte: 39.4 },
  "9":  { homicidios_tasa: 18.6, hurtos_total: 1_260, cobertura_educativa: 94.8, desempleo: 12.7, pm25: 29.1, accidentes: 1_480, vacunacion: 92.8, satisfaccion_transporte: 50.6 },
  "10": { homicidios_tasa: 21.4, hurtos_total: 2_180, cobertura_educativa: 96.1, desempleo: 9.8, pm25: 35.6, accidentes: 2_340, vacunacion: 93.0, satisfaccion_transporte: 68.4 },
  "11": { homicidios_tasa: 8.3,  hurtos_total: 1_650, cobertura_educativa: 99.1, desempleo: 6.2, pm25: 26.3, accidentes: 1_890, vacunacion: 96.5, satisfaccion_transporte: 72.1 },
  "12": { homicidios_tasa: 9.7,  hurtos_total: 1_120, cobertura_educativa: 98.4, desempleo: 7.5, pm25: 27.1, accidentes: 1_280, vacunacion: 95.8, satisfaccion_transporte: 65.8 },
  "13": { homicidios_tasa: 26.8, hurtos_total: 1_480, cobertura_educativa: 93.2, desempleo: 15.6, pm25: 31.8, accidentes: 1_740, vacunacion: 90.8, satisfaccion_transporte: 44.7 },
  "14": { homicidios_tasa: 5.2,  hurtos_total: 2_450, cobertura_educativa: 99.5, desempleo: 4.8, pm25: 22.5, accidentes: 2_120, vacunacion: 97.2, satisfaccion_transporte: 75.4 },
  "15": { homicidios_tasa: 11.4, hurtos_total: 980,   cobertura_educativa: 97.3, desempleo: 8.9, pm25: 33.8, accidentes: 1_520, vacunacion: 94.5, satisfaccion_transporte: 58.9 },
  "16": { homicidios_tasa: 10.1, hurtos_total: 1_340, cobertura_educativa: 98.0, desempleo: 7.1, pm25: 25.9, accidentes: 1_680, vacunacion: 95.2, satisfaccion_transporte: 64.2 },
  // Corregimientos
  "50": { homicidios_tasa: 4.2,  hurtos_total: 45,    cobertura_educativa: 88.5, desempleo: 12.4, pm25: 18.2, accidentes: 120,   vacunacion: 86.5, satisfaccion_transporte: 28.5 },
  "60": { homicidios_tasa: 14.8, hurtos_total: 580,   cobertura_educativa: 90.2, desempleo: 14.2, pm25: 24.5, accidentes: 820,   vacunacion: 88.2, satisfaccion_transporte: 32.4 },
  "70": { homicidios_tasa: 18.5, hurtos_total: 320,   cobertura_educativa: 89.8, desempleo: 15.8, pm25: 26.8, accidentes: 540,   vacunacion: 87.5, satisfaccion_transporte: 30.1 },
  "80": { homicidios_tasa: 12.6, hurtos_total: 890,   cobertura_educativa: 91.5, desempleo: 11.8, pm25: 22.1, accidentes: 980,   vacunacion: 90.8, satisfaccion_transporte: 42.8 },
  "90": { homicidios_tasa: 3.8,  hurtos_total: 120,   cobertura_educativa: 89.0, desempleo: 10.5, pm25: 16.5, accidentes: 280,   vacunacion: 87.0, satisfaccion_transporte: 25.2 },
};

// Year multipliers to simulate temporal trends (general improvement over the 3 years)
const YEAR_FACTORS: Record<string, Record<number, number>> = {
  homicidios_tasa:          { 2023: 1.08, 2024: 1.04, 2025: 1.00 },
  hurtos_total:             { 2023: 0.97, 2024: 0.98, 2025: 1.00 },
  cobertura_educativa:      { 2023: 0.995, 2024: 0.998, 2025: 1.00 },
  desempleo:                { 2023: 1.12, 2024: 1.06, 2025: 1.00 },
  pm25:                     { 2023: 1.06, 2024: 1.03, 2025: 1.00 },
  accidentes:               { 2023: 1.05, 2024: 1.03, 2025: 1.00 },
  vacunacion:               { 2023: 0.99, 2024: 0.995, 2025: 1.00 },
  satisfaccion_transporte:  { 2023: 0.94, 2024: 0.97, 2025: 1.00 },
};

const TERRITORY_CODES = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16",
  "50", "60", "70", "80", "90",
];

const INDICATORS = [
  "homicidios_tasa",
  "hurtos_total",
  "cobertura_educativa",
  "desempleo",
  "pm25",
  "accidentes",
  "vacunacion",
  "satisfaccion_transporte",
];

const YEARS = [2023, 2024, 2025];

function generateMapIndicators(): MapIndicatorData[] {
  const data: MapIndicatorData[] = [];

  for (const codigo of TERRITORY_CODES) {
    for (const indicador of INDICATORS) {
      for (const year of YEARS) {
        const baseValue = BASE_VALUES[codigo][indicador];
        const yearFactor = YEAR_FACTORS[indicador][year];
        const valor = Math.round(baseValue * yearFactor * 100) / 100;

        data.push({
          territorio_codigo: codigo,
          indicador,
          year,
          valor,
        });
      }
    }
  }

  return data;
}

export const MAP_INDICATORS_DATA: MapIndicatorData[] = generateMapIndicators();

export type MapIndicatorOption = {
  value: string;
  label: string;
  unit: string;
  colorScale: string[];
  positiveIsGood: boolean;
};

export const MAP_INDICATOR_OPTIONS: MapIndicatorOption[] = [
  {
    value: "homicidios_tasa",
    label: "Tasa de Homicidios",
    unit: "por 100k hab",
    colorScale: ["#FEE2E2", "#FECACA", "#FCA5A5", "#F87171", "#EF4444", "#DC2626", "#B91C1C"],
    positiveIsGood: false,
  },
  {
    value: "hurtos_total",
    label: "Hurtos Totales",
    unit: "casos",
    colorScale: ["#FFF7ED", "#FFEDD5", "#FED7AA", "#FDBA74", "#FB923C", "#F97316", "#EA580C"],
    positiveIsGood: false,
  },
  {
    value: "cobertura_educativa",
    label: "Cobertura Educativa",
    unit: "%",
    colorScale: ["#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8"],
    positiveIsGood: true,
  },
  {
    value: "desempleo",
    label: "Tasa de Desempleo",
    unit: "%",
    colorScale: ["#FEF9C3", "#FEF08A", "#FDE047", "#FACC15", "#EAB308", "#CA8A04", "#A16207"],
    positiveIsGood: false,
  },
  {
    value: "pm25",
    label: "PM2.5 Promedio",
    unit: "ug/m3",
    colorScale: ["#F0FDF4", "#DCFCE7", "#BBF7D0", "#86EFAC", "#4ADE80", "#22C55E", "#16A34A"],
    positiveIsGood: false,
  },
  {
    value: "accidentes",
    label: "Accidentes de Transito",
    unit: "casos",
    colorScale: ["#EDE9FE", "#DDD6FE", "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED", "#6D28D9"],
    positiveIsGood: false,
  },
  {
    value: "vacunacion",
    label: "Cobertura de Vacunacion",
    unit: "%",
    colorScale: ["#D1FAE5", "#A7F3D0", "#6EE7B7", "#34D399", "#10B981", "#059669", "#047857"],
    positiveIsGood: true,
  },
  {
    value: "satisfaccion_transporte",
    label: "Satisfaccion con el Transporte",
    unit: "%",
    colorScale: ["#CFFAFE", "#A5F3FC", "#67E8F9", "#22D3EE", "#06B6D4", "#0891B2", "#0E7490"],
    positiveIsGood: true,
  },
];
