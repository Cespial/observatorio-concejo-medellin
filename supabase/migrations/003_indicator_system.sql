CREATE TABLE categorias_indicador (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  linea_tematica_id UUID NOT NULL REFERENCES lineas_tematicas(id) ON DELETE CASCADE,
  descripcion TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE indicadores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT NOT NULL DEFAULT '',
  unidad_medida TEXT NOT NULL DEFAULT 'unidades',
  periodicidad periodicidad_tipo NOT NULL DEFAULT 'anual',
  linea_tematica_id UUID NOT NULL REFERENCES lineas_tematicas(id) ON DELETE CASCADE,
  categoria_id UUID REFERENCES categorias_indicador(id),
  fuente_datos_id UUID REFERENCES fuentes_datos(id),
  ficha_tecnica JSONB NOT NULL DEFAULT '{}'::JSONB,
  ultimo_valor NUMERIC,
  variacion_porcentual NUMERIC,
  tendencia tendencia_tipo,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE datos_indicador (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  indicador_id UUID NOT NULL REFERENCES indicadores(id) ON DELETE CASCADE,
  territorio_id UUID NOT NULL REFERENCES territorios(id) ON DELETE CASCADE,
  periodo TEXT NOT NULL,
  valor NUMERIC NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(indicador_id, territorio_id, periodo)
);
