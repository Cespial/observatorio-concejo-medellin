-- Seed: Medellin district + 16 comunas + 5 corregimientos
INSERT INTO territorios (nombre, tipo, codigo, poblacion, area_km2) VALUES
  ('Medellin', 'distrito', 'MDE', 2569007, 380.64);

DO $$
DECLARE
  mde_id UUID;
BEGIN
  SELECT id INTO mde_id FROM territorios WHERE codigo = 'MDE';

  INSERT INTO territorios (nombre, tipo, codigo, padre_id, poblacion) VALUES
    ('Popular', 'comuna', 'COM01', mde_id, 131191),
    ('Santa Cruz', 'comuna', 'COM02', mde_id, 111452),
    ('Manrique', 'comuna', 'COM03', mde_id, 160253),
    ('Aranjuez', 'comuna', 'COM04', mde_id, 162585),
    ('Castilla', 'comuna', 'COM05', mde_id, 150284),
    ('Doce de Octubre', 'comuna', 'COM06', mde_id, 194967),
    ('Robledo', 'comuna', 'COM07', mde_id, 174048),
    ('Villa Hermosa', 'comuna', 'COM08', mde_id, 137726),
    ('Buenos Aires', 'comuna', 'COM09', mde_id, 136774),
    ('La Candelaria', 'comuna', 'COM10', mde_id, 85505),
    ('Laureles-Estadio', 'comuna', 'COM11', mde_id, 121234),
    ('La America', 'comuna', 'COM12', mde_id, 96788),
    ('San Javier', 'comuna', 'COM13', mde_id, 138063),
    ('El Poblado', 'comuna', 'COM14', mde_id, 130920),
    ('Guayabal', 'comuna', 'COM15', mde_id, 97479),
    ('Belen', 'comuna', 'COM16', mde_id, 200178),
    ('San Sebastian de Palmitas', 'corregimiento', 'COR50', mde_id, 5412),
    ('San Cristobal', 'corregimiento', 'COR60', mde_id, 67462),
    ('Altavista', 'corregimiento', 'COR70', mde_id, 39441),
    ('San Antonio de Prado', 'corregimiento', 'COR80', mde_id, 106789),
    ('Santa Elena', 'corregimiento', 'COR90', mde_id, 17524);
END $$;

-- Seed: 6 thematic lines
INSERT INTO lineas_tematicas (nombre, slug, descripcion, color, icono, orden) VALUES
  ('Seguridad y Convivencia', 'seguridad', 'Indicadores de seguridad ciudadana, convivencia y paz para el Distrito de Medellin', '#DC2626', 'shield', 1),
  ('Educacion y Cultura', 'educacion', 'Indicadores de cobertura educativa, calidad, cultura y deporte', '#2563EB', 'graduation-cap', 2),
  ('Economia y Empleo', 'economia', 'Indicadores de desarrollo economico, empleo, emprendimiento e innovacion', '#16A34A', 'trending-up', 3),
  ('Movilidad y Transporte', 'movilidad', 'Indicadores de movilidad urbana, transporte publico e infraestructura vial', '#7C3AED', 'bus', 4),
  ('Medio Ambiente', 'ambiente', 'Indicadores ambientales, gestion del riesgo y sostenibilidad', '#059669', 'leaf', 5),
  ('Salud Publica', 'salud', 'Indicadores de salud publica, atencion en salud y bienestar', '#EA580C', 'heart', 6);

-- Seed: 14 data sources
INSERT INTO fuentes_datos (nombre, entidad, url, periodicidad) VALUES
  ('DANE', 'Departamento Administrativo Nacional de Estadistica', 'https://www.dane.gov.co', 'anual'),
  ('SISC', 'Sistema de Informacion para la Seguridad y Convivencia', 'https://www.medellin.gov.co/sisc', 'mensual'),
  ('Secretaria de Educacion', 'Alcaldia de Medellin', 'https://www.medellin.gov.co/educacion', 'semestral'),
  ('Secretaria de Salud', 'Alcaldia de Medellin', 'https://www.medellin.gov.co/salud', 'trimestral'),
  ('Metro de Medellin', 'Empresa de Transporte Masivo del Valle de Aburra', 'https://www.metrodemedellin.gov.co', 'mensual'),
  ('EPM', 'Empresas Publicas de Medellin', 'https://www.epm.com.co', 'trimestral'),
  ('SIMPAD', 'Sistema Municipal de Prevencion y Atencion de Desastres', NULL, 'mensual'),
  ('Camara de Comercio', 'Camara de Comercio de Medellin para Antioquia', 'https://www.camaramedellin.com.co', 'trimestral'),
  ('Area Metropolitana', 'Area Metropolitana del Valle de Aburra', 'https://www.metropol.gov.co', 'semestral'),
  ('SENA', 'Servicio Nacional de Aprendizaje', 'https://www.sena.edu.co', 'trimestral'),
  ('Banco de la Republica', 'Banco de la Republica de Colombia', 'https://www.banrep.gov.co', 'mensual'),
  ('Ministerio de Salud', 'Ministerio de Salud y Proteccion Social', 'https://www.minsalud.gov.co', 'trimestral'),
  ('DNP', 'Departamento Nacional de Planeacion', 'https://www.dnp.gov.co', 'anual'),
  ('Concejo de Medellin', 'Concejo de Medellin', 'https://www.concejodemedellin.gov.co', 'mensual');

-- Seed: 3 commissions
INSERT INTO comisiones (nombre, numero, descripcion) VALUES
  ('Primera Comision', 1, 'Plan de Desarrollo y Ordenamiento Territorial'),
  ('Segunda Comision', 2, 'Presupuesto y Hacienda Publica'),
  ('Tercera Comision', 3, 'Gobierno, Derechos Humanos y Asuntos Institucionales');

-- Seed: 30 tags
INSERT INTO tags (nombre, slug, categoria) VALUES
  ('PDM 2024-2027', 'pdm-2024-2027', 'plan'),
  ('ODS', 'ods', 'marco'),
  ('Presupuesto', 'presupuesto', 'tema'),
  ('Genero', 'genero', 'transversal'),
  ('Juventud', 'juventud', 'poblacion'),
  ('Adulto Mayor', 'adulto-mayor', 'poblacion'),
  ('Discapacidad', 'discapacidad', 'poblacion'),
  ('Primera Infancia', 'primera-infancia', 'poblacion'),
  ('Victimas', 'victimas', 'poblacion'),
  ('Afro', 'afro', 'poblacion'),
  ('Indigena', 'indigena', 'poblacion'),
  ('LGBTIQ+', 'lgbtiq', 'poblacion'),
  ('Habitante de Calle', 'habitante-calle', 'poblacion'),
  ('Calidad del Aire', 'calidad-aire', 'tema'),
  ('Transporte Publico', 'transporte-publico', 'tema'),
  ('Homicidios', 'homicidios', 'tema'),
  ('Desercion Escolar', 'desercion-escolar', 'tema'),
  ('Empleo Formal', 'empleo-formal', 'tema'),
  ('Vivienda', 'vivienda', 'tema'),
  ('Espacio Publico', 'espacio-publico', 'tema'),
  ('Salud Mental', 'salud-mental', 'tema'),
  ('Nutricion', 'nutricion', 'tema'),
  ('Innovacion', 'innovacion', 'tema'),
  ('Cultura Ciudadana', 'cultura-ciudadana', 'tema'),
  ('Participacion', 'participacion', 'tema'),
  ('Control Politico', 'control-politico', 'tema'),
  ('Transparencia', 'transparencia', 'tema'),
  ('Datos Abiertos', 'datos-abiertos', 'tema'),
  ('Gestion del Riesgo', 'gestion-riesgo', 'tema'),
  ('Conectividad', 'conectividad', 'tema');

-- Seed: 20 indicator categories
DO $$
DECLARE
  seg_id UUID;
  edu_id UUID;
  eco_id UUID;
  mov_id UUID;
  amb_id UUID;
  sal_id UUID;
BEGIN
  SELECT id INTO seg_id FROM lineas_tematicas WHERE slug = 'seguridad';
  SELECT id INTO edu_id FROM lineas_tematicas WHERE slug = 'educacion';
  SELECT id INTO eco_id FROM lineas_tematicas WHERE slug = 'economia';
  SELECT id INTO mov_id FROM lineas_tematicas WHERE slug = 'movilidad';
  SELECT id INTO amb_id FROM lineas_tematicas WHERE slug = 'ambiente';
  SELECT id INTO sal_id FROM lineas_tematicas WHERE slug = 'salud';

  INSERT INTO categorias_indicador (nombre, linea_tematica_id, orden) VALUES
    ('Delitos contra la vida', seg_id, 1),
    ('Delitos contra el patrimonio', seg_id, 2),
    ('Convivencia ciudadana', seg_id, 3),
    ('Cobertura educativa', edu_id, 1),
    ('Calidad educativa', edu_id, 2),
    ('Educacion superior', edu_id, 3),
    ('Cultura y deporte', edu_id, 4),
    ('Mercado laboral', eco_id, 1),
    ('Desarrollo empresarial', eco_id, 2),
    ('Innovacion y tecnologia', eco_id, 3),
    ('Comercio exterior', eco_id, 4),
    ('Transporte masivo', mov_id, 1),
    ('Infraestructura vial', mov_id, 2),
    ('Movilidad sostenible', mov_id, 3),
    ('Calidad ambiental', amb_id, 1),
    ('Gestion de residuos', amb_id, 2),
    ('Gestion del riesgo', amb_id, 3),
    ('Morbilidad', sal_id, 1),
    ('Mortalidad', sal_id, 2),
    ('Atencion en salud', sal_id, 3);
END $$;
