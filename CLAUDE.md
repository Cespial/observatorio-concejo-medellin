# Observatorio Distrital del Concejo de Medellin

## Project Overview
A Next.js 14 data observatory platform for the Concejo de Medellin (city council). Displays open data indicators, legislative initiatives, territorial analysis, and analytical products across 6 thematic lines.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts, Mapbox GL
- **Backend**: Supabase (PostgreSQL), Server Components for data fetching
- **ETL**: Custom TypeScript scripts using SOCRATA API (datos.gov.co) and ArcGIS REST (GeoMedellin)
- **Deployment**: Vercel

## Key Architecture Decisions
- **Hybrid data strategy**: Services layer (`lib/services/`) tries Supabase first, falls back to mock data (`lib/mock-data/`)
- **Server Components**: Pages fetch data server-side, pass to client components as props
- **ETL scripts**: Run via `tsx` (TypeScript execution), orchestrated by `scripts/etl/run-all.ts`
- **GeoJSON**: Real boundaries from GeoMedellin ArcGIS Hub, stored in `public/geojson/`

## Directory Structure
```
app/                    # Next.js App Router pages
  (public)/             # Landing page
  tematicas/[slug]/     # 6 thematic dashboards
  mapa/                 # Choropleth map
  iniciativas/          # Legislative initiatives
  productos/            # Publications
  chat/                 # AI assistant
  api/admin/            # Admin API endpoints
lib/
  services/             # Data service layer (Supabase + mock fallback)
  supabase/             # Supabase client configs
  mock-data/            # Mock data (fallback when DB is empty)
  types/                # TypeScript types including database.ts
scripts/etl/            # ETL pipeline
  config.ts             # Env validation + Supabase admin client
  socrata-client.ts     # SOCRATA/SODA API client
  arcgis-client.ts      # ArcGIS REST API client
  utils.ts              # Shared helpers (normalizeComuna, batchUpsert, etc.)
  load-indicators.ts    # Generic indicator loader
  seguridad/            # Security indicators ETL
  educacion/            # Education indicators ETL
  economia/             # Economy indicators ETL
  movilidad/            # Mobility indicators ETL
  ambiente/             # Environment indicators ETL
  salud/                # Health indicators ETL
  iniciativas/          # Legislative initiatives ETL
supabase/migrations/    # SQL migrations (001-011)
data/                   # CSV data files for seeding
```

## Running ETL
```bash
# Individual phases
npm run etl:geo          # Fetch real GeoJSON boundaries
npm run etl:concejales   # Seed 21 concejales
npm run etl:seguridad    # Load security indicators from datos.gov.co
npm run etl:all          # Run full pipeline
npm run etl:validate     # Validate data integrity
```

## Environment Variables
Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional:
- `SOCRATA_APP_TOKEN` (increases rate limit on datos.gov.co)
- `MAPBOX_ACCESS_TOKEN`

## Database Schema
16 tables across 10 migrations. Key tables:
- `territorios`: 22 rows (MDE + 16 comunas + 5 corregimientos)
- `lineas_tematicas`: 6 thematic lines
- `indicadores`: ~40-50 indicators with slug-based upsert
- `datos_indicador`: Time series data (indicator x territory x period)
- `iniciativas`: Legislative initiatives with trazabilidad (JSONB)
- `autores_iniciativa`: 21 concejales (2024-2027 period)
- `iniciativas_autores`: Many-to-many junction table

## Data Sources
- **datos.gov.co**: SOCRATA/SODA API for homicides, theft, VIF, education, health
- **DANE GEIH**: Pre-aggregated employment/informality data
- **GeoMedellin**: ArcGIS REST for real comuna/corregimiento boundaries
- **SIATA**: Air quality (PM2.5) data
- **Concejo de Medellin**: Initiative data via CSV seed
