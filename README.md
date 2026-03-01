# Observatorio Distrital del Concejo de Medellin

Plataforma civica de datos abiertos para el Concejo de Medellin. Agrega, visualiza y analiza datos publicos de 6 lineas tematicas, rastrea iniciativas legislativas de los 21 concejales (periodo 2024-2027) y ofrece desgloses territoriales por comunas y corregimientos.

**Live:** [observatorio-concejo-medellin.vercel.app](https://observatorio-concejo-medellin.vercel.app)

## Funcionalidades

### 6 Dashboards Tematicos
- **Seguridad y Convivencia** — Homicidios, hurtos, violencia intrafamiliar, delitos sexuales, extorsion
- **Educacion y Cultura** — Cobertura, desercion, resultados Saber 11
- **Economia y Empleo** — Desempleo, informalidad (DANE GEIH)
- **Movilidad y Transporte** — Pasajeros Metro, accidentalidad, incidentes viales por comuna
- **Medio Ambiente** — PM2.5 calidad del aire, areas verdes, estaciones de monitoreo
- **Salud Publica** — Indicadores de mortalidad, vacunacion

Cada dashboard incluye: KPIs, series de tiempo, heatmaps, graficas radar, tablas territoriales e iniciativas legislativas relacionadas.

### Mapa Coropletico Interactivo
- Mapbox GL con GeoJSON real de 16 comunas y 5 corregimientos (GeoMedellin ArcGIS)
- Selector de indicador, slider temporal, modo comparacion, panel de detalle por comuna

### Rastreador de Iniciativas Legislativas
- Acuerdos, proposiciones y proyectos de los 21 concejales
- Trazabilidad JSONB, filtros por autor, linea tematica y estado

### Asistente IA
- Chat con Claude Sonnet 4.5 (Anthropic API)
- System prompt dinamico que consulta la base de datos en cada request para inyectar valores actualizados de indicadores

### Pipeline ETL
- 11 fases orquestadas: SOCRATA API (datos.gov.co), MEData CKAN, GeoMedellin ArcGIS REST, DANE GEIH pre-agregado
- 17+ datasets de fuentes oficiales colombianas
- Estrategia hibrida: Supabase primero, fallback a mock data para desarrollo local

## Stack

| Capa | Tecnologia |
|------|-----------|
| Framework | Next.js 14 (App Router, Server Components) |
| UI | Tailwind CSS, Radix UI, Framer Motion, shadcn/ui |
| Graficas | Recharts, D3.js |
| Mapas | Mapbox GL JS |
| Base de datos | Supabase (PostgreSQL, 17 tablas, 12 migraciones SQL, RLS) |
| IA | Claude Sonnet 4.5 (Anthropic API) |
| ETL | TypeScript scripts (SOCRATA, CKAN, ArcGIS clients) |
| Deploy | Vercel (region iad1) |

## Desarrollo Local

```bash
git clone https://github.com/Cespial/observatorio-concejo-medellin.git
cd observatorio-concejo-medellin
npm install
cp .env.example .env.local
# Configurar: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_MAPBOX_TOKEN, CLAUDE_API_KEY
npm run dev
```

Funciona sin base de datos gracias a la estrategia de fallback a mock data.

## Base de Datos

17 tablas en Supabase: territorios (22 rows), lineas tematicas (6), indicadores (25+), datos por indicador (series de tiempo por territorio), poblacion anual, iniciativas, autores, productos, fuentes de datos, embeddings.
