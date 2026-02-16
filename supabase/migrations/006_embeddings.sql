CREATE TABLE documentos_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contenido TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  fuente_tipo TEXT NOT NULL,
  fuente_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION match_documentos(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.78,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  contenido TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    de.id,
    de.contenido,
    de.metadata,
    1 - (de.embedding <=> query_embedding) AS similarity
  FROM documentos_embeddings de
  WHERE 1 - (de.embedding <=> query_embedding) > match_threshold
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
