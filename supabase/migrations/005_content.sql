CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tipo tipo_producto NOT NULL DEFAULT 'informe',
  descripcion TEXT NOT NULL DEFAULT '',
  contenido TEXT,
  imagen_url TEXT,
  archivo_url TEXT,
  linea_tematica_id UUID REFERENCES lineas_tematicas(id),
  publicado BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_publicacion DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE productos_visualizaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  producto_id UUID NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}'::JSONB,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE aliados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  tipo tipo_aliado NOT NULL DEFAULT 'otro',
  descripcion TEXT,
  logo_url TEXT,
  sitio_web TEXT,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE alertas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  tipo tipo_alerta NOT NULL DEFAULT 'info',
  prioridad INTEGER NOT NULL DEFAULT 0,
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_inicio TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  fecha_fin TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
