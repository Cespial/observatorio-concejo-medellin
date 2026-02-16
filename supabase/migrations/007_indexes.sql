-- Territories
CREATE INDEX idx_territorios_tipo ON territorios(tipo);
CREATE INDEX idx_territorios_padre ON territorios(padre_id);
CREATE INDEX idx_territorios_codigo ON territorios(codigo);

-- Thematic lines
CREATE INDEX idx_lineas_tematicas_slug ON lineas_tematicas(slug);
CREATE INDEX idx_lineas_tematicas_orden ON lineas_tematicas(orden);

-- Indicators
CREATE INDEX idx_indicadores_linea ON indicadores(linea_tematica_id);
CREATE INDEX idx_indicadores_categoria ON indicadores(categoria_id);
CREATE INDEX idx_indicadores_slug ON indicadores(slug);
CREATE INDEX idx_indicadores_activo ON indicadores(activo) WHERE activo = TRUE;

-- Indicator data
CREATE INDEX idx_datos_indicador_indicador ON datos_indicador(indicador_id);
CREATE INDEX idx_datos_indicador_territorio ON datos_indicador(territorio_id);
CREATE INDEX idx_datos_indicador_periodo ON datos_indicador(periodo);
CREATE INDEX idx_datos_indicador_compuesto ON datos_indicador(indicador_id, territorio_id, periodo);

-- Initiatives
CREATE INDEX idx_iniciativas_estado ON iniciativas(estado);
CREATE INDEX idx_iniciativas_tipo ON iniciativas(tipo);
CREATE INDEX idx_iniciativas_linea ON iniciativas(linea_tematica_id);
CREATE INDEX idx_iniciativas_fecha ON iniciativas(fecha_radicacion DESC);
CREATE INDEX idx_iniciativas_tags ON iniciativas USING GIN(tags);
CREATE INDEX idx_iniciativas_trazabilidad ON iniciativas USING GIN(trazabilidad);

-- Products
CREATE INDEX idx_productos_slug ON productos(slug);
CREATE INDEX idx_productos_tipo ON productos(tipo);
CREATE INDEX idx_productos_publicado ON productos(publicado) WHERE publicado = TRUE;
CREATE INDEX idx_productos_fecha ON productos(fecha_publicacion DESC);

-- Embeddings
CREATE INDEX idx_embeddings_vector ON documentos_embeddings USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
CREATE INDEX idx_embeddings_fuente ON documentos_embeddings(fuente_tipo, fuente_id);

-- Trigram indexes for fuzzy text search
CREATE INDEX idx_indicadores_nombre_trgm ON indicadores USING GIN(nombre gin_trgm_ops);
CREATE INDEX idx_iniciativas_titulo_trgm ON iniciativas USING GIN(titulo gin_trgm_ops);
CREATE INDEX idx_productos_titulo_trgm ON productos USING GIN(titulo gin_trgm_ops);

-- JSONB indexes
CREATE INDEX idx_indicadores_ficha ON indicadores USING GIN(ficha_tecnica);
