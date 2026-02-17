import { MapPageClient } from "./_components/map-page-client";
import { getMapIndicatorData, getComunasWithIndicators } from "@/lib/services/territorios";

export const metadata = { title: "Mapa Distrital" };

export default async function MapaPage() {
  const [indicatorData, { indicatorOptions }] = await Promise.all([
    getMapIndicatorData(),
    getComunasWithIndicators(),
  ]);

  return (
    <MapPageClient
      serverIndicatorData={indicatorData}
      serverIndicatorOptions={indicatorOptions}
    />
  );
}
