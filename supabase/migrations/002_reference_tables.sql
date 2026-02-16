CREATE TABLE territorios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  tipo tipo_territorio NOT NULL,
  codigo TEXT NOT NULL UNIQUE,
  padre_id UUID REFERENCES territorios(id),
  geojson JSONB,
  poblacion INTEGER,
  area_km2 NUMERIC(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lineas_tematicas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '#1B3A5C',
  icono TEXT NOT NULL DEFAULT 'circle',
  orden INTEGER NOT NULL DEFAULT 0,
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE fuentes_datos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  entidad TEXT NOT NULL,
  url TEXT,
  descripcion TEXT,
  periodicidad periodicidad_tipo,
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE comisiones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  numero INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  categoria TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
