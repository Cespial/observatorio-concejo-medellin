import { sleep, rateLimiter } from "./utils";
import { log } from "./config";

const MEDATA_BASE = "https://medata.gov.co";
const MAX_RETRIES = 3;
const throttle = rateLimiter(1); // 1 request/second for CKAN

type CKANPackage = {
  success: boolean;
  result: {
    id: string;
    title: string;
    resources: CKANResource[];
  };
};

type CKANResource = {
  id: string;
  name: string;
  format: string;
  url: string;
  last_modified: string | null;
};

type CKANDatastoreResult = {
  success: boolean;
  result: {
    records: Record<string, string | number | null>[];
    total: number;
    fields: { id: string; type: string }[];
  };
};

/**
 * Get metadata for a CKAN dataset (package) by node_id.
 * MEData uses /api/3/action/package_show?id={node_id}
 */
export async function getMedataPackage(nodeId: string): Promise<CKANPackage["result"] | null> {
  await throttle();

  const url = `${MEDATA_BASE}/api/3/action/package_show?id=${nodeId}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`MEData ${response.status}: ${(await response.text()).slice(0, 200)}`);
      }
      const data = (await response.json()) as CKANPackage;
      if (!data.success) throw new Error("MEData returned success=false");
      log("info", `MEData: fetched package ${nodeId} (${data.result.title})`);
      return data.result;
    } catch (err) {
      log("warn", `MEData attempt ${attempt}/${MAX_RETRIES} failed for node ${nodeId}`, (err as Error).message);
      if (attempt < MAX_RETRIES) await sleep(Math.pow(2, attempt) * 1000);
    }
  }

  log("error", `MEData: failed to fetch package ${nodeId}`);
  return null;
}

/**
 * Download CSV data from a CKAN resource via the datastore API.
 * Returns raw records as key-value pairs.
 */
export async function getMedataRecords(
  resourceId: string,
  options: { limit?: number; offset?: number; filters?: Record<string, string>; q?: string } = {}
): Promise<Record<string, string | number | null>[]> {
  const allRecords: Record<string, string | number | null>[] = [];
  const limit = options.limit ?? 5000;
  let offset = options.offset ?? 0;
  let hasMore = true;

  while (hasMore) {
    await throttle();

    const params = new URLSearchParams({
      resource_id: resourceId,
      limit: String(limit),
      offset: String(offset),
    });

    if (options.filters) {
      params.set("filters", JSON.stringify(options.filters));
    }
    if (options.q) {
      params.set("q", options.q);
    }

    const url = `${MEDATA_BASE}/api/3/action/datastore_search?${params}`;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`MEData datastore ${response.status}: ${(await response.text()).slice(0, 200)}`);
        }
        const data = (await response.json()) as CKANDatastoreResult;
        if (!data.success) throw new Error("MEData datastore returned success=false");

        allRecords.push(...data.result.records);

        if (data.result.records.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
        break;
      } catch (err) {
        log("warn", `MEData datastore attempt ${attempt}/${MAX_RETRIES} failed`, (err as Error).message);
        if (attempt < MAX_RETRIES) {
          await sleep(Math.pow(2, attempt) * 1000);
        } else {
          hasMore = false;
        }
      }
    }
  }

  log("info", `MEData: fetched ${allRecords.length} records from resource ${resourceId}`);
  return allRecords;
}

/**
 * Download raw CSV from a MEData resource URL.
 */
export async function downloadMedataCsv(url: string): Promise<string> {
  await throttle();

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Download CSV ${response.status}`);
      }
      return await response.text();
    } catch (err) {
      log("warn", `CSV download attempt ${attempt}/${MAX_RETRIES} failed`, (err as Error).message);
      if (attempt < MAX_RETRIES) await sleep(Math.pow(2, attempt) * 1000);
    }
  }

  throw new Error(`Failed to download CSV from ${url}`);
}

/**
 * Find the first CSV resource in a package.
 */
export function findCsvResource(resources: CKANResource[]): CKANResource | undefined {
  return resources.find(
    (r) => r.format.toLowerCase() === "csv" || r.url.toLowerCase().endsWith(".csv")
  );
}
