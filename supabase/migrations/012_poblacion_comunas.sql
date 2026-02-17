-- Population projections per territory per year
-- Source: MEData node 41596 - Poblacion proyecciones 2018-2030 por comuna
CREATE TABLE IF NOT EXISTS poblacion_anual (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  territorio_id uuid NOT NULL REFERENCES territorios(id) ON DELETE CASCADE,
  anio integer NOT NULL,
  poblacion integer NOT NULL,
  fuente text DEFAULT 'MEData - Proyecciones DANE',
  created_at timestamptz DEFAULT now(),
  UNIQUE(territorio_id, anio)
);

-- Index for lookups
CREATE INDEX IF NOT EXISTS idx_poblacion_anual_territorio_anio
  ON poblacion_anual(territorio_id, anio);

-- RLS
ALTER TABLE poblacion_anual ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read poblacion_anual"
  ON poblacion_anual FOR SELECT
  TO anon, authenticated
  USING (true);
