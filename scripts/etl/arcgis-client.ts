import { sleep, rateLimiter } from "./utils";
import { log } from "./config";
import type { ArcGISFeature, ArcGISFeatureCollection } from "./types";

const MAX_RETRIES = 3;
const DEFAULT_RESULT_RECORD_COUNT = 2000;

const throttle = rateLimiter(2);

type ArcGISQueryParams = {
  where?: string;
  outFields?: string;
  outSR?: number;
  f?: string;
  resultOffset?: number;
  resultRecordCount?: number;
  returnGeometry?: boolean;
};

export async function fetchArcGISFeatures(
  serviceUrl: string,
  params: ArcGISQueryParams = {}
): Promise<ArcGISFeature[]> {
  const allFeatures: ArcGISFeature[] = [];
  let offset = params.resultOffset ?? 0;
  let hasMore = true;
  const recordCount = params.resultRecordCount ?? DEFAULT_RESULT_RECORD_COUNT;

  while (hasMore) {
    await throttle();

    const queryParams: Record<string, string> = {
      where: params.where ?? "1=1",
      outFields: params.outFields ?? "*",
      outSR: String(params.outSR ?? 4326),
      f: params.f ?? "geojson",
      resultOffset: String(offset),
      resultRecordCount: String(recordCount),
      returnGeometry: String(params.returnGeometry !== false),
    };

    const url = `${serviceUrl}/query?${new URLSearchParams(queryParams)}`;

    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`ArcGIS ${response.status}: ${await response.text().then(t => t.slice(0, 200))}`);
        }

        const data = (await response.json()) as ArcGISFeatureCollection;

        if (!data.features) {
          // ArcGIS sometimes returns error as JSON without 'features'
          throw new Error(`ArcGIS response missing features: ${JSON.stringify(data).slice(0, 200)}`);
        }

        allFeatures.push(...data.features);

        if (data.features.length < recordCount) {
          hasMore = false;
        } else {
          offset += recordCount;
        }
        lastError = null;
        break;
      } catch (err) {
        lastError = err as Error;
        log("warn", `ArcGIS attempt ${attempt}/${MAX_RETRIES} failed`, lastError.message);
        if (attempt < MAX_RETRIES) {
          await sleep(Math.pow(2, attempt) * 1000);
        }
      }
    }

    if (lastError) {
      log("error", `ArcGIS fetch failed after ${MAX_RETRIES} retries`, lastError.message);
      throw lastError;
    }
  }

  log("info", `ArcGIS: fetched ${allFeatures.length} features from ${serviceUrl}`);
  return allFeatures;
}
