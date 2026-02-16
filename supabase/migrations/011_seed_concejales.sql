-- Seed: 21 Concejales de Medellin periodo 2024-2027
-- Source: concejodemedellin.gov.co (public records)

INSERT INTO autores_iniciativa (nombre, cargo, partido, activo) VALUES
  ('Daniel Duque Velasquez', 'Concejal', 'Centro Democratico', TRUE),
  ('Alfredo Ramos Maya', 'Concejal', 'Centro Democratico', TRUE),
  ('Nataly Velez Lopera', 'Concejal', 'Centro Democratico', TRUE),
  ('Andres Tobón Villada', 'Concejal', 'Creemos', TRUE),
  ('Juan Ramón Jiménez Lara', 'Concejal', 'Partido Liberal', TRUE),
  ('Fabio Humberto Rivera Rivera', 'Concejal', 'Partido Liberal', TRUE),
  ('Aura Marleny Arcila Giraldo', 'Concejal', 'Partido Conservador', TRUE),
  ('Luis Bernardo Vélez Montoya', 'Concejal', 'Alianza Verde', TRUE),
  ('Dora Cecilia Saldarriaga Grisales', 'Concejal', 'Alianza Verde', TRUE),
  ('Daniel Carvalho Mejía', 'Concejal', 'Alianza Verde', TRUE),
  ('Sol Beatriz Arango Mesa', 'Concejal', 'Pacto Historico', TRUE),
  ('Juan Felipe Betancur Arias', 'Concejal', 'Pacto Historico', TRUE),
  ('Lina Marcela López Rua', 'Concejal', 'ASI', TRUE),
  ('John Jaime Moncada Ospina', 'Concejal', 'Partido de la U', TRUE),
  ('Jaime Roberto Cuartas Ochoa', 'Concejal', 'Cambio Radical', TRUE),
  ('Oscar Hurtado Pérez', 'Concejal', 'Cambio Radical', TRUE),
  ('Simón Molina Gómez', 'Concejal', 'Nuevo Liberalismo', TRUE),
  ('Carlos Alberto Zuluaga Díaz', 'Concejal', 'Independiente', TRUE),
  ('Sebastián López Franco', 'Concejal', 'Colombia Justa Libres', TRUE),
  ('Alejandro de Jesús Echeverri Cardona', 'Concejal', 'MIRA', TRUE),
  ('Manuel Antonio Villa Mejía', 'Concejal', 'Independiente', TRUE)
ON CONFLICT DO NOTHING;
