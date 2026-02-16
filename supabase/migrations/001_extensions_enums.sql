-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Enum types
CREATE TYPE tipo_territorio AS ENUM ('distrito', 'comuna', 'corregimiento', 'barrio');
CREATE TYPE periodicidad_tipo AS ENUM ('mensual', 'trimestral', 'semestral', 'anual');
CREATE TYPE tendencia_tipo AS ENUM ('alza', 'baja', 'estable');
CREATE TYPE tipo_iniciativa AS ENUM ('acuerdo', 'proposicion', 'resolucion', 'debate', 'otro');
CREATE TYPE estado_iniciativa AS ENUM ('radicada', 'en_comision', 'primer_debate', 'segundo_debate', 'aprobada', 'archivada', 'retirada');
CREATE TYPE tipo_producto AS ENUM ('informe', 'boletin', 'infografia', 'video', 'podcast', 'otro');
CREATE TYPE tipo_aliado AS ENUM ('universidad', 'gobierno', 'ong', 'empresa', 'organismo_internacional', 'otro');
CREATE TYPE tipo_alerta AS ENUM ('info', 'exito', 'advertencia', 'error');
