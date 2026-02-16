CREATE TABLE autores_iniciativa (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  cargo TEXT,
  partido TEXT,
  foto_url TEXT,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE iniciativas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numero_radicado TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT '',
  tipo tipo_iniciativa NOT NULL DEFAULT 'otro',
  estado estado_iniciativa NOT NULL DEFAULT 'radicada',
  fecha_radicacion DATE NOT NULL,
  comision_id UUID REFERENCES comisiones(id),
  linea_tematica_id UUID REFERENCES lineas_tematicas(id),
  tags TEXT[] NOT NULL DEFAULT '{}',
  trazabilidad JSONB NOT NULL DEFAULT '[]'::JSONB,
  documento_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE iniciativas_autores (
  iniciativa_id UUID NOT NULL REFERENCES iniciativas(id) ON DELETE CASCADE,
  autor_id UUID NOT NULL REFERENCES autores_iniciativa(id) ON DELETE CASCADE,
  rol TEXT NOT NULL DEFAULT 'autor',
  PRIMARY KEY (iniciativa_id, autor_id)
);
