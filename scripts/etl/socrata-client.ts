import { sleep, rateLimiter } from "./utils";
import { log } from "./config";
import type { SocrataRow } from "./types";

const SOCRATA_BASE = "https://www.datos.gov.co/resource";
const MAX_RETRIES = 3;
const DEFAULT_LIMIT = 50000;

const throttle = rateLimiter(2); // 2 requests/second

type SocrataParams = {
  $where?: string;
  $select?: string;
  $group?: string;
  $order?: string;
  $limit?: number;
  $offset?: number;
  $$app_token?: string;
};

export async function fetchSocrata(
  datasetId: string,
  params: SocrataParams = {}
): Promise<SocrataRow[]> {
  const allRows: SocrataRow[] = [];
  const limit = params.$limit ?? DEFAULT_LIMIT;
  let offset = params.$offset ?? 0;
  let hasMore = true;

  while (hasMore) {
    await throttle();

    const queryParams: Record<string, string> = {};
    if (params.$where) queryParams.$where = params.$where;
    if (params.$select) queryParams.$select = params.$select;
    if (params.$group) queryParams.$group = params.$group;
    if (params.$order) queryParams.$order = params.$order;
    queryParams.$limit = String(limit);
    queryParams.$offset = String(offset);

    // Add app token if available
    const appToken = process.env.SOCRATA_APP_TOKEN;
    if (appToken) queryParams.$$app_token = appToken;

    const url = `${SOCRATA_BASE}/${datasetId}.json?${new URLSearchParams(queryParams)}`;

    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const body = await response.text();
          throw new Error(`SOCRATA ${response.status}: ${body.slice(0, 200)}`);
        }
        const data = (await response.json()) as SocrataRow[];
        allRows.push(...data);

        // If we got fewer rows than limit, we're done
        if (data.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
        lastError = null;
        break;
      } catch (err) {
        lastError = err as Error;
        log("warn", `SOCRATA attempt ${attempt}/${MAX_RETRIES} failed for ${datasetId}`, lastError.message);
        if (attempt < MAX_RETRIES) {
          await sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      }
    }

    if (lastError) {
      log("error", `SOCRATA fetch failed after ${MAX_RETRIES} retries for ${datasetId}`, lastError.message);
      throw lastError;
    }
  }

  log("info", `SOCRATA: fetched ${allRows.length} rows from ${datasetId}`);
  return allRows;
}

// Convenience: fetch with SoQL aggregation (returns all pages)
export async function fetchSocrataAggregated(
  datasetId: string,
  options: {
    select: string;
    where?: string;
    group: string;
    order?: string;
  }
): Promise<SocrataRow[]> {
  return fetchSocrata(datasetId, {
    $select: options.select,
    $where: options.where,
    $group: options.group,
    $order: options.order ?? options.group,
    $limit: DEFAULT_LIMIT,
  });
}
