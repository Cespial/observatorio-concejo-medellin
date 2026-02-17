# Observatorio Distrital del Concejo de Medellin

## Project Overview
A Next.js 14 data observatory platform for the Concejo de Medellin (city council). Displays open data indicators, legislative initiatives, territorial analysis, and analytical products across 6 thematic lines.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts, Mapbox GL
- **Backend**: Supabase (PostgreSQL), Server Components for data fetching
- **ETL**: Custom TypeScript scripts using SOCRATA API (datos.gov.co), CKAN API (MEData), and ArcGIS REST (GeoMedellin)
- **Deployment**: Vercel

## Key Architecture Decisions
- **Hybrid data strategy**: Services layer (`lib/services/`) tries Supabase first, falls back to mock data (`lib/mock-data/`)
- **Server Components**: Pages fetch data server-side, pass to client components as props
- **ETL scripts**: Run via `tsx` (TypeScript execution), orchestrated by `scripts/etl/run-all.ts`
- **GeoJSON**: Real boundaries from GeoMedellin ArcGIS Hub, stored in `public/geojson/`
- **Per-comuna data**: MEData CKAN API provides Encuesta de Calidad de Vida and population projections per comuna

## Directory Structure
```
app/                    # Next.js App Router pages
  (public)/             # Landing page (server-fetched ticker, cards, city pulse)
  tematicas/[slug]/     # 6 thematic dashboards
  mapa/                 # Choropleth map (server-fetched indicator data)
  iniciativas/          # Legislative initiatives (service layer)
  productos/            # Publications
  chat/                 # AI assistant (dynamic DB-powered system prompt)
  api/admin/            # Admin API endpoints
lib/
  services/             # Data service layer (Supabase + mock fallback)
    landing.ts          # Landing page data fetcher
    indicadores.ts      # Thematic dashboard data (KPIs, time series, area breakdown, related initiatives)
    iniciativas.ts      # Initiatives + getIniciativaById
    territorios.ts      # Map data (real per-comuna indicator data from DB)
  supabase/             # Supabase client configs
  mock-data/            # Mock data (fallback when DB is empty)
  types/                # TypeScript types including database.ts
data/
  sources.json          # Master data sources config (all 17+ datasets documented)
  iniciativas-2024-2025.csv
scripts/etl/            # ETL pipeline
  config.ts             # Env validation + Supabase admin client
  socrata-client.ts     # SOCRATA/SODA API client
  medata-client.ts      # MEData CKAN API client
  arcgis-client.ts      # ArcGIS REST API client
  utils.ts              # Shared helpers (normalizeComuna, batchUpsert, getFuenteDatosId, etc.)
  load-indicators.ts    # Generic indicator loader (with fuente_datos linking)
  poblacion-comunas.ts  # Population projections per comuna from MEData
  seguridad/            # Security: homicidios, hurtos, VIF, lesiones, extorsion, delitos sexuales
  educacion/            # Education: cobertura, desercion, saber11
  economia/             # Economy: desempleo, informalidad (pre-agg DANE)
  movilidad/            # Mobility: metro, accidentalidad, incidentes viales per-comuna
  ambiente/             # Environment: calidad-aire, areas-verdes, estaciones per-comuna
  salud/                # Health: mortalidad (multiple indicators), vacunacion
  ecv/                  # Encuesta de Calidad de Vida per-comuna indicators
  iniciativas/          # Legislative initiatives ETL
supabase/migrations/    # SQL migrations (001-012)
```

## Running ETL
```bash
# Individual phases
npm run etl:geo          # Fetch real GeoJSON boundaries
npm run etl:concejales   # Seed 21 concejales
npm run etl:seguridad    # Security indicators (6 loaders, all from real APIs)
npm run etl:educacion    # Education indicators (cobertura, desercion, saber11)
npm run etl:economia     # Economy indicators (pre-aggregated DANE GEIH)
npm run etl:movilidad    # Mobility (metro, accidentalidad, incidentes viales per-comuna)
npm run etl:ambiente     # Environment (PM2.5, areas verdes, station-level data)
npm run etl:salud        # Health (multiple mortalidad indicators, vacunacion)
npm run etl:iniciativas  # Legislative initiatives from CSV
npm run etl:poblacion    # Population projections per comuna from MEData
npm run etl:ecv          # Encuesta de Calidad de Vida per-comuna
npm run etl:all          # Run full 11-phase pipeline
npm run etl:validate     # Validate data integrity + per-comuna coverage + freshness
```

## Data Sources
See `data/sources.json` for the complete configuration. Key sources:

| Source | API | Datasets |
|--------|-----|----------|
| datos.gov.co | SOCRATA | Homicidios, hurtos, VIF, lesiones, extorsion, delitos sexuales, educacion, mortalidad, vacunacion, accidentalidad, calidad aire, saber11 |
| MEData | CKAN | ECV per-comuna, poblacion proyecciones, incidentes viales, IPM |
| GeoMedellin | ArcGIS REST | Comuna/corregimiento boundary polygons |
| Area Metropolitana | CKAN | Air quality monitoring stations |
| DANE GEIH | Pre-aggregated | Employment/informality (no API available) |

## Environment Variables
Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional:
- `SOCRATA_APP_TOKEN` (increases rate limit on datos.gov.co from 1k/hr to 50k/hr)
- `NEXT_PUBLIC_MAPBOX_TOKEN` (Mapbox GL JS for map rendering)
- `CLAUDE_API_KEY` (Anthropic API for chat assistant)

## Database Schema
17 tables across 12 migrations. Key tables:
- `territorios`: 22 rows (MDE + 16 comunas + 5 corregimientos)
- `lineas_tematicas`: 6 thematic lines
- `indicadores`: 25+ indicators with slug-based upsert, fuente_datos linked
- `datos_indicador`: Time series data (indicator x territory x period) — includes per-comuna data
- `poblacion_anual`: Population projections per territory per year
- `iniciativas`: Legislative initiatives with trazabilidad (JSONB)
- `autores_iniciativa`: 21 concejales (2024-2027 period)
- `iniciativas_autores`: Many-to-many junction table

## Frontend-DB Connection Strategy
All frontend pages fetch data through the service layer (`lib/services/`):
- **Landing page**: `getLandingPageData()` builds ticker, dashboard cards, and choropleth from DB
- **Thematic dashboards**: `getThematicData()` provides KPIs, time series, area breakdown, territorial comparison, related initiatives
- **Map page**: `getMapIndicatorData()` returns real per-comuna data from DB
- **Initiative detail**: `getIniciativaById()` fetches from Supabase
- **Chat assistant**: Dynamic system prompt built from latest DB indicator values
- All components accept `serverData` props and fall back to mock when DB is empty
