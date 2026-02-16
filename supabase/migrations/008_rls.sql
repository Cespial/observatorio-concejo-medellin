-- Enable RLS on all tables
ALTER TABLE territorios ENABLE ROW LEVEL SECURITY;
ALTER TABLE lineas_tematicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuentes_datos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comisiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_indicador ENABLE ROW LEVEL SECURITY;
ALTER TABLE indicadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE datos_indicador ENABLE ROW LEVEL SECURITY;
ALTER TABLE autores_iniciativa ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas ENABLE ROW LEVEL SECURITY;
ALTER TABLE iniciativas_autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos_visualizaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE aliados ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos_embeddings ENABLE ROW LEVEL SECURITY;

-- Helper function for admin check
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (current_setting('request.jwt.claims', TRUE)::JSONB ->> 'is_admin')::BOOLEAN,
    FALSE
  );
$$;

-- Public read policies
CREATE POLICY "Public read territorios" ON territorios FOR SELECT USING (TRUE);
CREATE POLICY "Public read lineas_tematicas" ON lineas_tematicas FOR SELECT USING (TRUE);
CREATE POLICY "Public read fuentes_datos" ON fuentes_datos FOR SELECT USING (TRUE);
CREATE POLICY "Public read comisiones" ON comisiones FOR SELECT USING (TRUE);
CREATE POLICY "Public read tags" ON tags FOR SELECT USING (TRUE);
CREATE POLICY "Public read categorias_indicador" ON categorias_indicador FOR SELECT USING (TRUE);
CREATE POLICY "Public read indicadores" ON indicadores FOR SELECT USING (activo = TRUE);
CREATE POLICY "Public read datos_indicador" ON datos_indicador FOR SELECT USING (TRUE);
CREATE POLICY "Public read autores_iniciativa" ON autores_iniciativa FOR SELECT USING (TRUE);
CREATE POLICY "Public read iniciativas" ON iniciativas FOR SELECT USING (TRUE);
CREATE POLICY "Public read iniciativas_autores" ON iniciativas_autores FOR SELECT USING (TRUE);
CREATE POLICY "Public read productos" ON productos FOR SELECT USING (publicado = TRUE);
CREATE POLICY "Public read productos_visualizaciones" ON productos_visualizaciones FOR SELECT USING (TRUE);
CREATE POLICY "Public read aliados" ON aliados FOR SELECT USING (activo = TRUE);
CREATE POLICY "Public read alertas" ON alertas FOR SELECT USING (activa = TRUE AND fecha_inicio <= NOW() AND (fecha_fin IS NULL OR fecha_fin >= NOW()));
CREATE POLICY "Public read documentos_embeddings" ON documentos_embeddings FOR SELECT USING (TRUE);

-- Admin write policies
CREATE POLICY "Admin write territorios" ON territorios FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write lineas_tematicas" ON lineas_tematicas FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write fuentes_datos" ON fuentes_datos FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write comisiones" ON comisiones FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write tags" ON tags FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write categorias_indicador" ON categorias_indicador FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write indicadores" ON indicadores FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write datos_indicador" ON datos_indicador FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write autores_iniciativa" ON autores_iniciativa FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write iniciativas" ON iniciativas FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write iniciativas_autores" ON iniciativas_autores FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write productos" ON productos FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write productos_visualizaciones" ON productos_visualizaciones FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write aliados" ON aliados FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write alertas" ON alertas FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin write documentos_embeddings" ON documentos_embeddings FOR ALL USING (is_admin()) WITH CHECK (is_admin());
