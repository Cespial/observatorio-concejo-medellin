import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load .env from project root
dotenv.config();

// ── Env Validation ───────────────────────────────────────────

const REQUIRED_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];

const OPTIONAL_VARS = [
  "SOCRATA_APP_TOKEN",
  "MAPBOX_ACCESS_TOKEN",
];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.error(`Missing required environment variables:\n  ${missing.join("\n  ")}`);
    console.error("\nCreate a .env file in the project root with these variables.");
    process.exit(1);
  }

  const missingOptional = OPTIONAL_VARS.filter((v) => !process.env[v]);
  if (missingOptional.length > 0) {
    console.warn(`Optional env vars not set (functionality may be limited):\n  ${missingOptional.join("\n  ")}`);
  }
}

validateEnv();

// ── Supabase Admin Client ────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── Logger ───────────────────────────────────────────────────

export function log(level: "info" | "warn" | "error", message: string, data?: unknown) {
  const timestamp = new Date().toISOString();
  const prefix = { info: "INFO", warn: "WARN", error: "ERROR" }[level];
  const emoji = { info: "ℹ️", warn: "⚠️", error: "❌" }[level];
  console.log(`[${timestamp}] ${emoji} ${prefix} ${message}`, data ?? "");
}

// ── Timing Helper ────────────────────────────────────────────

export function startTimer(): () => number {
  const start = Date.now();
  return () => Date.now() - start;
}
