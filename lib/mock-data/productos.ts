export type ProductoMock = {
  id: string;
  titulo: string;
  slug: string;
  tipo: "informe" | "boletin" | "infografia" | "video" | "podcast" | "otro";
  descripcion: string;
  contenido: string; // Full markdown content (500-1000 words each)
  imagen_url: string | null;
  linea_tematica: string; // slug
  fecha_publicacion: string;
  tags: string[];
  autor: string;
  descargas: number;
  paginas?: number;
};

export const MOCK_PRODUCTOS: ProductoMock[] = [
  // ─── 1. Informe Anual de Seguridad Ciudadana 2025 ─────────────────────
  {
    id: "prod-001",
    titulo: "Informe Anual de Seguridad Ciudadana 2025",
    slug: "informe-anual-seguridad-ciudadana-2025",
    tipo: "informe",
    descripcion:
      "Análisis integral de los indicadores de seguridad y convivencia en el Distrito de Medellín durante el año 2025, con énfasis en homicidios, hurtos y percepción ciudadana.",
    contenido: `## Resumen Ejecutivo

El presente informe consolida los principales indicadores de seguridad y convivencia ciudadana del Distrito Especial de Medellín para el año 2025. A lo largo de las 16 comunas y 5 corregimientos se recopilaron datos de fuentes oficiales incluyendo la Policía Metropolitana del Valle de Aburrá, la Fiscalía General de la Nación, Medicina Legal y la Encuesta de Percepción Ciudadana de Medellín Cómo Vamos.

Los resultados muestran una **reducción del 8,3% en la tasa de homicidios** respecto a 2024, alcanzando una tasa de 14,2 por cada 100.000 habitantes. Sin embargo, los **hurtos a personas aumentaron un 5,1%**, concentrándose principalmente en las comunas La Candelaria (10), Laureles-Estadio (11) y El Poblado (14). La percepción de seguridad mejoró levemente, pasando de 38% a 41% de ciudadanos que se sienten seguros.

## Principales Hallazgos

### Homicidios

- La tasa de homicidios se ubicó en **14,2 por cada 100.000 habitantes**, la más baja en la última década.
- Se registraron **347 homicidios** en todo el distrito, frente a 379 en 2024.
- Las comunas con mayor incidencia fueron **San Javier (13)** con 38 casos, **Popular (1)** con 31 casos y **Manrique (3)** con 29 casos.
- El **72% de las víctimas** fueron hombres entre 18 y 35 años.
- Los fines de semana concentraron el **58% de los eventos**, con picos entre las 10:00 p.m. y las 2:00 a.m.

### Hurtos

- Se reportaron **28.450 hurtos a personas**, un incremento del 5,1% respecto al año anterior.
- El hurto de celulares representó el **63% del total**, seguido por documentos personales (14%) y efectivo (11%).
- La comuna **La Candelaria** registró el mayor número con 4.230 casos, seguida de **Laureles-Estadio** con 3.180 casos.
- El **Sistema Integrado de Emergencias y Seguridad (SIES)** reportó un tiempo promedio de respuesta de 8,2 minutos.

### Violencia Intrafamiliar

- Se registraron **12.340 casos** de violencia intrafamiliar, una reducción del 3,7%.
- El **78% de las víctimas** fueron mujeres.
- Las comunas **Doce de Octubre (6)** y **Robledo (7)** presentaron las mayores tasas per cápita.
- Se activaron **3.200 rutas de atención** a través de las Comisarías de Familia.

## Análisis por Comunas

### Zona Nororiental (Comunas 1-4)

La zona nororiental continúa concentrando una proporción significativa de los eventos de violencia. La comuna **Popular (1)** mostró una reducción del 12% en homicidios gracias a la intervención del programa *Medellín Me Cuida*. En contraste, **Manrique (3)** registró un aumento del 4% en hurtos a residencias, asociado a dinámicas de microtráfico en sectores como La Cruz y Versalles.

### Zona Noroccidental (Comunas 5-7)

**Castilla (5)** se destacó por una reducción del 15% en lesiones personales, atribuida al fortalecimiento de la estrategia de mediadores comunitarios. La comuna **Doce de Octubre (6)** mantiene altos índices de violencia intrafamiliar, requiriendo intervenciones focalizadas.

### Zona Centro-Oriental y Centro-Occidental (Comunas 8-13)

**San Javier (13)** sigue siendo la comuna con mayores desafíos en seguridad, registrando la tasa de homicidios más alta del distrito. Las intervenciones del programa *Paz y Salvo* redujeron los enfrentamientos entre grupos en un 20% durante el segundo semestre.

### Zona Sur (Comunas 14-16)

**El Poblado (14)** presenta los mayores índices de hurto a personas por concentración de actividad comercial y turística. **Belén (16)**, pese a ser la comuna más poblada, mantiene tasas de criminalidad moderadas.

## Recomendaciones

1. **Fortalecer la vigilancia tecnológica** en corredores de alta concentración de hurtos, especialmente en La Candelaria y Laureles-Estadio, mediante la ampliación del sistema de cámaras y la integración con inteligencia artificial.
2. **Ampliar los programas de prevención** de violencia juvenil en las comunas Popular, Manrique y San Javier, con énfasis en alternativas de formación y empleo.
3. **Implementar estrategias diferenciadas** para la violencia intrafamiliar en Doce de Octubre y Robledo, incluyendo casas refugio y acompañamiento psicosocial.
4. **Consolidar el modelo de Justicia Cercana al Ciudadano** en las 16 comunas para descongestionar las Comisarías de Familia y mejorar los tiempos de respuesta.
5. **Realizar evaluaciones de impacto** de los programas *Medellín Me Cuida* y *Paz y Salvo* para identificar buenas prácticas replicables.`,
    imagen_url: null,
    linea_tematica: "seguridad",
    fecha_publicacion: "2025-12-15",
    tags: ["seguridad", "homicidios", "hurtos", "convivencia", "comunas"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 4823,
    paginas: 68,
  },

  // ─── 2. Boletín Estadístico de Educación - Enero 2026 ─────────────────
  {
    id: "prod-002",
    titulo: "Boletín Estadístico de Educación - Enero 2026",
    slug: "boletin-estadistico-educacion-enero-2026",
    tipo: "boletin",
    descripcion:
      "Datos actualizados sobre cobertura educativa, deserción escolar, resultados de pruebas Saber y avances en infraestructura educativa del Distrito de Medellín.",
    contenido: `## Panorama General

El Boletín Estadístico de Educación correspondiente a enero de 2026 presenta el cierre del año escolar 2025 y las perspectivas para el ciclo 2026. Este documento es elaborado por el Observatorio Distrital del Concejo de Medellín con base en datos suministrados por la Secretaría de Educación y el Ministerio de Educación Nacional.

El Distrito de Medellín cuenta con **448 instituciones educativas oficiales** que atienden a una población de **385.200 estudiantes** en los niveles de preescolar, básica primaria, básica secundaria y media. Adicionalmente, **134 instituciones privadas** atienden a 142.000 estudiantes.

## Indicadores de Cobertura

### Matrícula 2025

| Nivel | Matrícula | Variación vs. 2024 |
|-------|-----------|-------------------|
| Preescolar | 42.100 | +2,1% |
| Básica Primaria | 148.300 | -0,8% |
| Básica Secundaria | 112.500 | +1,3% |
| Media | 82.300 | +3,5% |
| **Total** | **385.200** | **+1,2%** |

- La **tasa de cobertura bruta** en educación media alcanzó el **87,4%**, un avance de 2,1 puntos porcentuales frente a 2024.
- La **cobertura en primera infancia** (Buen Comienzo) atendió a **98.500 niños y niñas**, consolidando a Medellín como referente nacional.
- La matrícula en programas de **doble titulación** (media técnica articulada con el SENA) creció un **18,3%**, con 14.200 estudiantes.

### Deserción Escolar

- La tasa de deserción intra-anual se ubicó en **3,2%**, una reducción frente al 3,8% de 2024.
- Las comunas con mayor deserción fueron **Popular (1)** con 5,4% y **Santa Cruz (2)** con 4,9%.
- Las principales causas identificadas fueron: dificultades económicas (**34%**), embarazo adolescente (**12%**), cambio de domicilio (**18%**) y conflicto armado/amenazas (**8%**).
- El programa **Becas Futuro Medellín** benefició a 8.400 estudiantes en riesgo de deserción.

## Resultados Pruebas Saber 11 - 2025

Los resultados de las Pruebas Saber 11 mostraron una mejora significativa:

- El **puntaje promedio global** de las instituciones oficiales fue de **268 puntos**, un incremento de 7 puntos frente a 2024.
- **23 instituciones oficiales** se ubicaron en la categoría A y A+, frente a 18 en 2024.
- El área con mayor avance fue **Matemáticas**, con un incremento de 4,2 puntos en promedio.
- El área con menor desempeño sigue siendo **Inglés**, con un promedio de 49,3 puntos sobre 100.
- La brecha entre instituciones oficiales y privadas se redujo en **3,1 puntos**, pasando de 42 a 38,9 puntos de diferencia.

### Mejores Instituciones Oficiales (Saber 11)

1. **INEM José Félix de Restrepo** - Comuna 14 - 312 puntos
2. **IE Colegio Loyola** - Comuna 10 - 305 puntos
3. **IE San José de La Salle** - Comuna 10 - 298 puntos
4. **IE Javiera Londoño** - Comuna 4 - 291 puntos
5. **IE Pedro Justo Berrío** - Comuna 10 - 288 puntos

## Infraestructura Educativa

- Se entregaron **12 nuevas aulas** en las comunas Popular, Manrique y San Javier.
- Se completó la remodelación de **8 instituciones educativas** dentro del programa *Colegios de Calidad*.
- Se invirtieron **$47.200 millones** en mantenimiento de infraestructura educativa.
- Se instalaron **320 laboratorios de tecnología** con equipos de cómputo actualizados.
- **96% de las instituciones oficiales** cuentan con conectividad a internet de banda ancha.

## Educación Superior

- El programa **Sapiencia** otorgó **14.800 becas** para educación superior, un incremento del 22% frente a 2024.
- La **Universidad Digital de Antioquia** matriculó a 6.300 nuevos estudiantes en programas virtuales.
- Se articularon **28 convenios** con universidades para prácticas profesionales en entidades del distrito.

## Perspectivas 2026

El Plan de Desarrollo Educativo 2026 establece como metas prioritarias: alcanzar una tasa de cobertura neta en media del **82%**, reducir la deserción al **2,5%** y cerrar la brecha de calidad entre instituciones oficiales y privadas en **5 puntos adicionales**.`,
    imagen_url: null,
    linea_tematica: "educacion",
    fecha_publicacion: "2026-01-20",
    tags: ["educacion", "cobertura", "desercion", "saber-11", "infraestructura"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 1245,
    paginas: 24,
  },

  // ─── 3. Infografía: Calidad del Aire en Medellín ──────────────────────
  {
    id: "prod-003",
    titulo: "Infografía: Calidad del Aire en Medellín",
    slug: "infografia-calidad-aire-medellin",
    tipo: "infografia",
    descripcion:
      "Visualización de los datos más relevantes sobre la calidad del aire en el Valle de Aburrá durante 2025, incluyendo niveles de PM2.5, episodios de contingencia y medidas adoptadas.",
    contenido: `## Calidad del Aire en Medellín - Resumen Visual 2025

### Contexto Geográfico

El Valle de Aburrá, donde se ubica el Distrito de Medellín, presenta condiciones topográficas que dificultan la dispersión de contaminantes atmosféricos. Rodeado por montañas con altitudes superiores a los 2.500 m.s.n.m., el valle funciona como una cuenca cerrada donde los fenómenos de inversión térmica atrapan los contaminantes, especialmente durante los meses de **marzo-abril** y **septiembre-octubre**.

### Red de Monitoreo

El Sistema de Alerta Temprana del Valle de Aburrá (SIATA) opera **22 estaciones de monitoreo** de calidad del aire distribuidas en todo el valle metropolitano. De estas, **8 estaciones** se encuentran en el perímetro urbano de Medellín:

- **Estación Universidad Nacional** (Comuna 10) - Zona centro
- **Estación Politécnico Jaime Isaza Cadavid** (Comuna 14) - Zona sur
- **Estación Museo de Antioquia** (Comuna 10) - Zona centro
- **Estación Poblado** (Comuna 14) - Zona sur
- **Estación Aguinaga** (Comuna 11) - Zona centro-occidente
- **Estación Itagüí** - Área metropolitana sur
- **Estación Tráfico Centro** (Comuna 10) - Zona centro
- **Estación MedellínESE** (Comuna 16) - Zona sur

### Indicadores Clave 2025

**PM2.5 (Material Particulado Fino)**
- Promedio anual: **24,8 µg/m³** (límite OMS: 15 µg/m³ anual)
- Días con calidad del aire **buena**: 142 (39%)
- Días con calidad **moderada**: 156 (43%)
- Días con calidad **dañina para grupos sensibles**: 52 (14%)
- Días con calidad **dañina**: 15 (4%)
- Concentración máxima registrada: **87,3 µg/m³** (marzo 18, estación Tráfico Centro)

**PM10 (Material Particulado Grueso)**
- Promedio anual: **41,2 µg/m³**
- Reducción del **6,3%** frente a 2024

**Ozono Troposférico (O3)**
- Promedio anual: **38,4 µg/m³**
- Se mantiene dentro de los límites normativos

### Episodios de Contingencia Ambiental

Durante 2025 se declararon **3 episodios de contingencia** ambiental:

1. **Marzo 15-28**: 14 días de contingencia, nivel naranja. Se activó el protocolo de pico y placa ambiental para vehículos diésel con más de 10 años de antigüedad.
2. **Abril 2-9**: 8 días de contingencia, nivel naranja. Se restringió la circulación de volquetas y vehículos de carga pesada en horario diurno.
3. **Octubre 5-11**: 7 días de contingencia, nivel amarillo. Se realizaron jornadas de monitoreo intensivo y se emitieron alertas sanitarias.

### Fuentes de Contaminación

Según el inventario de emisiones del Área Metropolitana del Valle de Aburrá:

- **Fuentes móviles (transporte)**: 78% del total de emisiones de PM2.5
  - Vehículos diésel: 42%
  - Motocicletas: 21%
  - Vehículos a gasolina: 15%
- **Industria**: 14%
- **Fuentes naturales y otras**: 8%

### Medidas Implementadas

- Chatarrización de **1.200 vehículos** de carga pesada con más de 20 años.
- Incorporación de **64 buses eléctricos** al sistema de transporte público del Metro de Medellín.
- Siembra de **45.000 árboles** en el programa *Más Bosques* en laderas del valle.
- Instalación de **8 estaciones de bicicletas públicas** EnCicla en nuevos puntos.
- Inversión total en calidad del aire: **$32.500 millones** en 2025.`,
    imagen_url: null,
    linea_tematica: "ambiente",
    fecha_publicacion: "2025-11-30",
    tags: ["calidad-del-aire", "pm25", "contaminacion", "siata", "medio-ambiente"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 2310,
  },

  // ─── 4. Análisis de Movilidad Sostenible en el Valle de Aburrá ────────
  {
    id: "prod-004",
    titulo: "Análisis de Movilidad Sostenible en el Valle de Aburrá",
    slug: "analisis-movilidad-sostenible-valle-aburra",
    tipo: "informe",
    descripcion:
      "Evaluación del estado actual de la movilidad sostenible en Medellín y el Área Metropolitana, incluyendo transporte público, ciclorrutas, electromovilidad y planes de expansión.",
    contenido: `## Introducción

La movilidad sostenible se ha convertido en uno de los ejes estratégicos del desarrollo del Distrito Especial de Medellín. Este informe analiza los avances, desafíos y oportunidades del sistema de transporte en el Valle de Aburrá durante 2025, con especial énfasis en las alternativas de transporte público masivo, movilidad activa y electromovilidad.

El Área Metropolitana del Valle de Aburrá, con una población estimada de **4,1 millones de habitantes**, genera aproximadamente **6,8 millones de viajes diarios**, de los cuales el **32% se realiza en transporte público**, el **28% en vehículo particular**, el **18% a pie**, el **14% en motocicleta** y el **8% en bicicleta y otros modos**.

## Sistema Integrado de Transporte Masivo

### Metro de Medellín

El Metro de Medellín, columna vertebral del transporte público, operó durante 2025 con los siguientes resultados:

- **Pasajeros transportados**: 298 millones (crecimiento del 4,2% vs. 2024)
- **Líneas en operación**: Línea A (Niquía-La Estrella), Línea B (San Antonio-San Javier), Línea 1 del Tranvía (San Antonio-Oriente), Líneas K, J, H, M y L de Metrocable
- **Estaciones totales**: 67 (incluyendo estaciones de cable y tranvía)
- **Índice de satisfacción del usuario**: 87,3%
- **Tarifa integrada promedio**: $3.200 COP

### Metroplús (BRT)

- **Pasajeros transportados**: 42 millones
- **Rutas**: Línea 1 (Universidad de Medellín - Aranjuez), Línea 2 (Parque de Berrío - Belén Las Playas)
- Se avanzó en un **35% la construcción** de la Línea 3 (conexión con Envigado)

### Buses Convencionales e Integrados

- **Flota total**: 3.840 vehículos en operación
- **Rutas alimentadoras del Metro**: 78 rutas
- **Pasajeros en buses integrados**: 185 millones
- **Edad promedio de la flota**: 8,3 años (reducción de 1,2 años vs. 2024)

## Movilidad Activa

### Sistema EnCicla

El sistema público de bicicletas compartidas **EnCicla** consolidó su posición como el más grande de Colombia:

- **Estaciones**: 78 (12 nuevas en 2025)
- **Bicicletas disponibles**: 2.800 (incluyendo 400 eléctricas)
- **Viajes realizados en 2025**: 8,2 millones (+15% vs. 2024)
- **Usuarios registrados**: 245.000
- **Tiempo promedio de viaje**: 22 minutos

### Infraestructura Ciclista

- **Kilómetros de ciclorrutas**: 128 km (ampliación de 18 km en 2025)
- **Cicloparqueaderos**: 340 puntos con capacidad para 6.800 bicicletas
- Las comunas con mayor infraestructura ciclista son **Laureles-Estadio (11)**, **La Candelaria (10)** y **El Poblado (14)**
- Se completó el **corredor verde de la quebrada La Hueso**, conectando las comunas 11, 12 y 16 con ciclovía protegida

### Peatonalización

- Se peatonalizaron **4,2 km adicionales** en el centro de Medellín (Carrera Carabobo y alrededores del Parque de Berrío)
- Se ampliaron andenes en **23 tramos** de las comunas 10, 11 y 14
- El programa *Calles para la Vida* implementó **15 zonas 30** (velocidad reducida) en entornos escolares

## Electromovilidad

- **Buses eléctricos en operación**: 128 unidades (64 nuevas en 2025)
- **Taxis eléctricos registrados**: 420
- **Puntos de carga pública**: 85 (42 nuevos en 2025)
- **Motos eléctricas registradas**: 3.200 (+145% vs. 2024)
- Meta 2030: lograr que el **40% de la flota de transporte público** sea eléctrica

## Recomendaciones

1. **Acelerar la construcción** de la Línea 3 de Metroplús y priorizar el corredor de la 80 para integrar transporte masivo.
2. **Expandir el sistema EnCicla** hacia las comunas periféricas, especialmente Robledo (7), Castilla (5) y Buenos Aires (9).
3. **Implementar incentivos tributarios** para la adquisición de vehículos eléctricos particulares y flotas empresariales.
4. **Fortalecer la seguridad vial** en zonas de alta siniestralidad, particularmente para motociclistas y ciclistas.
5. **Diseñar un plan maestro de peatonalización** para el centro expandido que conecte los principales equipamientos culturales.`,
    imagen_url: null,
    linea_tematica: "movilidad",
    fecha_publicacion: "2025-10-05",
    tags: ["movilidad", "transporte-publico", "metro", "encicla", "electromovilidad"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 3156,
    paginas: 52,
  },

  // ─── 5. Podcast: Diálogos sobre Salud Pública ─────────────────────────
  {
    id: "prod-005",
    titulo: "Podcast: Diálogos sobre Salud Pública",
    slug: "podcast-dialogos-salud-publica",
    tipo: "podcast",
    descripcion:
      "Serie de conversaciones con expertos en salud pública sobre los principales desafíos sanitarios de Medellín: salud mental, enfermedades crónicas, cobertura y atención primaria.",
    contenido: `## Diálogos sobre Salud Pública - Temporada 1

### Sobre el Podcast

**Diálogos sobre Salud Pública** es una producción del Observatorio Distrital del Concejo de Medellín que busca acercar a la ciudadanía las discusiones más relevantes sobre la situación sanitaria del distrito. A través de conversaciones con expertos, funcionarios y líderes comunitarios, el podcast aborda los desafíos y oportunidades del sistema de salud en Medellín.

La primera temporada consta de **8 episodios** con una duración promedio de 45 minutos cada uno, publicados quincenalmente entre julio y noviembre de 2025.

### Episodio 1: El Estado de la Salud en Medellín

**Invitado**: Dra. Claudia Patricia Arango, Secretaria de Salud del Distrito

En este episodio inaugural se presenta un panorama general de la salud en Medellín. Algunos datos destacados:

- **Esperanza de vida al nacer**: 77,4 años (hombres: 74,1; mujeres: 80,8)
- **Tasa de mortalidad infantil**: 7,2 por cada 1.000 nacidos vivos
- **Cobertura del sistema de salud**: 96,3% de la población afiliada
- **Red hospitalaria pública**: 4 hospitales de alta complejidad, 12 de mediana complejidad y 54 centros de salud
- **Inversión en salud pública 2025**: $1,2 billones COP

### Episodio 2: Salud Mental, la Epidemia Silenciosa

**Invitada**: Psicóloga María Elena Villegas, directora del programa *Medellín se toma la Salud Mental*

La salud mental se ha convertido en una de las principales preocupaciones sanitarias:

- **42.000 atenciones** por trastornos de salud mental en 2025
- La **ansiedad** fue el diagnóstico más frecuente (31%), seguida de **depresión** (24%) y **trastornos relacionados con sustancias** (18%)
- Los intentos de suicidio registraron un incremento del **12%** en jóvenes de 15 a 24 años
- La línea de atención **Línea Amiga 444 44 48** recibió **67.000 llamadas** en 2025
- Se capacitaron **2.300 promotores comunitarios** en primeros auxilios psicológicos

### Episodio 3: Enfermedades Crónicas No Transmisibles

**Invitado**: Dr. Juan Carlos Mejía, epidemiólogo de la Universidad de Antioquia

Las enfermedades crónicas representan el **68% de la mortalidad** en Medellín:

- **Enfermedades cardiovasculares**: 4.200 defunciones (tasa de 168 por 100.000 hab.)
- **Cáncer**: 2.800 defunciones; los más prevalentes fueron pulmón, mama, estómago y colon
- **Diabetes**: 1.100 defunciones; se estima que **125.000 personas** viven con diabetes en el distrito
- **Enfermedades respiratorias crónicas**: 980 defunciones, asociadas en parte a la calidad del aire
- El programa de **Rutas Integrales de Atención en Salud (RIAS)** atendió a 180.000 pacientes crónicos

### Episodio 4: Atención Primaria y Centros de Salud

**Invitada**: Enfermera Sandra Milena Restrepo, coordinadora de Atención Primaria de Metrosalud

La ESE Metrosalud opera la red pública de primer nivel:

- **54 centros de salud** distribuidos en las 16 comunas y 5 corregimientos
- **2,8 millones de consultas** realizadas en 2025
- Tiempo promedio de espera para consulta general: **4,3 días**
- Se implementó la **telemedicina** en 32 centros, atendiendo **145.000 teleconsultas**
- Se inauguraron **3 nuevos centros de salud** en las comunas Popular, Villa Hermosa y San Antonio de Prado

### Episodio 5: Vacunación y Enfermedades Prevenibles

**Invitado**: Dr. Héctor Fabio Ospina, coordinador del PAI Medellín

- Cobertura de vacunación en menores de 1 año: **93,4%** (meta: 95%)
- Se aplicaron **1,8 millones de dosis** del esquema regular en 2025
- La vacunación contra COVID-19 alcanzó el **82% de la población** con esquema completo
- Se identificaron **14 microterritorios** con coberturas inferiores al 80%, concentrados en zonas de difícil acceso

### Episodios 6-8

Los episodios restantes abordan temas de **seguridad alimentaria y nutrición**, **salud materno-infantil** y **desafíos del aseguramiento en salud**, completando un panorama integral de la salud pública en el Distrito de Medellín.

### Dónde Escuchar

El podcast está disponible en Spotify, Apple Podcasts, Google Podcasts y en la página web del Observatorio Distrital. Todos los episodios incluyen transcripciones completas accesibles.`,
    imagen_url: null,
    linea_tematica: "salud",
    fecha_publicacion: "2025-07-15",
    tags: ["salud", "podcast", "salud-mental", "enfermedades-cronicas", "atencion-primaria"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 876,
  },

  // ─── 6. Balance Económico del Distrito 2025 ───────────────────────────
  {
    id: "prod-006",
    titulo: "Balance Económico del Distrito 2025",
    slug: "balance-economico-distrito-2025",
    tipo: "informe",
    descripcion:
      "Informe sobre el desempeño económico del Distrito de Medellín en 2025: PIB, empleo, inversión extranjera, emprendimiento y dinámica empresarial.",
    contenido: `## Resumen Ejecutivo

El presente Balance Económico consolida los principales indicadores de desempeño económico del Distrito Especial de Medellín durante 2025. El análisis comprende las dimensiones de crecimiento económico, mercado laboral, dinámica empresarial, inversión extranjera directa y emprendimiento, con base en datos del DANE, Banco de la República, Cámara de Comercio de Medellín para Antioquia y ProColombia.

Medellín consolidó su posición como la segunda economía del país, con un **PIB estimado de $98,4 billones COP** (precios corrientes), equivalente al **7,2% del PIB nacional**. La tasa de crecimiento económico se situó en **3,8%**, superando el promedio nacional de 3,1%.

## Crecimiento Económico

### PIB y Sectores Productivos

- **PIB del Valle de Aburrá**: $142,6 billones COP
- **PIB per cápita de Medellín**: $39,2 millones COP (aprox. USD 9.800)
- **Inflación acumulada a diciembre 2025**: 5,2% (vs. 6,8% en 2024)

**Sectores con mayor crecimiento**:
1. **Tecnología y servicios digitales**: +12,4% — Medellín se consolida como hub tecnológico de América Latina
2. **Turismo y hostelería**: +8,7% — La ciudad recibió 1,4 millones de turistas internacionales
3. **Construcción**: +5,2% — Impulsada por proyectos de infraestructura pública (Metro de la 80, renovación del centro)
4. **Industria manufacturera**: +2,8% — Recuperación moderada con énfasis en textiles y alimentos
5. **Comercio**: +3,1% — Estabilización tras ajustes post-pandemia

**Sectores con menor dinamismo**:
- **Agricultura y minería**: -1,2% — Impacto de fenómenos climáticos en los corregimientos
- **Servicios financieros**: +1,4% — Estancamiento por altas tasas de interés

### Inversión Pública

- **Presupuesto distrital ejecutado**: $8,7 billones COP
- **Inversión en infraestructura**: $2,3 billones COP
- **Ejecución presupuestal**: 89,4%

## Mercado Laboral

### Indicadores de Empleo

El mercado laboral de Medellín mostró señales mixtas durante 2025:

- **Tasa de desempleo promedio**: 10,2% (reducción de 0,8 puntos vs. 2024)
- **Tasa de ocupación**: 57,8%
- **Tasa de informalidad**: 42,1% (reducción de 1,3 puntos)
- **Población ocupada**: 1.420.000 personas
- **Ingreso laboral promedio**: $1.890.000 COP mensuales

### Brechas de Género

- Tasa de desempleo **mujeres**: 13,1% vs. **hombres**: 7,8%
- Brecha salarial de género: **18,4%** (las mujeres ganan en promedio 18,4% menos que los hombres en ocupaciones equivalentes)
- La participación laboral femenina fue del **52,3%**, frente al **73,1%** masculina

### Empleo Joven

- Tasa de desempleo juvenil (18-28 años): **18,7%**
- El programa **Empleo Joven Medellín** vinculó a **6.200 jóvenes** con su primer empleo formal
- **Ruta N** generó **3.400 empleos** directos en el ecosistema de innovación

## Dinámica Empresarial

### Creación de Empresas

- Se crearon **28.400 nuevas empresas**, un crecimiento del 6,3% frente a 2024
- El **87% fueron microempresas** con capital inferior a $50 millones COP
- Los sectores con mayor dinamismo en creación empresarial fueron: **comercio al por menor** (22%), **servicios profesionales** (18%), **tecnología** (14%) y **alimentos y bebidas** (12%)
- La tasa de supervivencia empresarial a 3 años se ubicó en **43%**, mejorando 2 puntos frente al período anterior

### Inversión Extranjera Directa

- **IED recibida**: USD 1.850 millones (crecimiento del 14,2%)
- Principales sectores: tecnología (32%), servicios empresariales (24%), manufactura (18%) e infraestructura (15%)
- Principales países de origen: **Estados Unidos** (28%), **España** (16%), **Chile** (12%) y **México** (9%)
- **Ruta N** atrajo a **42 nuevas empresas extranjeras** al ecosistema de innovación

## Recomendaciones

1. **Fortalecer la formación para el empleo** con énfasis en competencias digitales y bilingüismo para reducir la brecha entre oferta y demanda laboral.
2. **Ampliar los incentivos tributarios** para empresas que contraten jóvenes y mujeres cabeza de hogar.
3. **Consolidar el ecosistema de emprendimiento** tecnológico a través de Ruta N, Parque E y las incubadoras universitarias.
4. **Reducir la informalidad** mediante la simplificación de trámites de formalización y el acceso a microcrédito.
5. **Promover la internacionalización** de las pymes medellinenses a través de alianzas con ProColombia y la red de ciudades hermanas.`,
    imagen_url: null,
    linea_tematica: "economia",
    fecha_publicacion: "2025-12-30",
    tags: ["economia", "empleo", "pib", "inversion", "emprendimiento"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 3892,
    paginas: 84,
  },

  // ─── 7. Boletín de Iniciativas Legislativas Q4 2025 ───────────────────
  {
    id: "prod-007",
    titulo: "Boletín de Iniciativas Legislativas Q4 2025",
    slug: "boletin-iniciativas-legislativas-q4-2025",
    tipo: "boletin",
    descripcion:
      "Seguimiento a las iniciativas legislativas del Concejo de Medellín durante el cuarto trimestre de 2025, incluyendo acuerdos aprobados, proyectos en trámite y debates de control político.",
    contenido: `## Actividad Legislativa - Octubre a Diciembre 2025

### Panorama General del Trimestre

El cuarto trimestre de 2025 fue uno de los períodos de mayor actividad legislativa del Concejo de Medellín en los últimos cinco años. Se tramitaron **47 proyectos de acuerdo**, de los cuales **18 fueron aprobados**, **12 archivados**, **8 retirados** por sus autores y **9 quedaron pendientes** para el primer período de 2026.

El Concejo, integrado por **21 concejales** electos para el período 2024-2027, sesionó durante **42 días hábiles** en sesiones ordinarias y **6 días** en sesiones extraordinarias convocadas por la Alcaldía del Distrito.

### Acuerdos Aprobados

#### Seguridad y Convivencia

1. **Acuerdo 089 de 2025** - Por el cual se establece el Sistema Distrital de Cámaras de Vigilancia y Seguridad.
   - Inversión aprobada: **$28.000 millones COP**
   - Meta: instalar **2.000 cámaras adicionales** en zonas críticas
   - Votación: 18 votos a favor, 3 en contra

2. **Acuerdo 092 de 2025** - Por el cual se crea el programa *Medellín Convive* para la mediación comunitaria de conflictos.
   - Formación de **500 mediadores comunitarios** en las 16 comunas
   - Aprobado por unanimidad

#### Educación y Cultura

3. **Acuerdo 094 de 2025** - Por el cual se amplía el programa de alimentación escolar para incluir cena en jornada extendida.
   - Beneficia a **45.000 estudiantes** en 120 instituciones educativas
   - Inversión: **$18.500 millones COP** anuales

4. **Acuerdo 097 de 2025** - Por el cual se crea el Fondo Distrital de Becas para Educación Superior.
   - Recursos: **$50.000 millones COP** para el cuatrienio
   - Meta: **20.000 becas** en pregrado y posgrado

#### Movilidad

5. **Acuerdo 101 de 2025** - Por el cual se adopta la Política Pública de Movilidad Sostenible 2025-2035.
   - Establece metas de reducción de emisiones del transporte en **40% para 2035**
   - Crea incentivos para la electromovilidad y la movilidad activa

### Debates de Control Político

Durante el trimestre se realizaron **14 debates de control político**. Los más relevantes fueron:

- **Debate sobre ejecución del Plan de Desarrollo** (octubre 15-16): Se evaluó el avance del 58% de las metas del Plan de Desarrollo *Medellín Futuro* a mitad de período. La Secretaría de Hacienda reportó una ejecución presupuestal del 72%.

- **Debate sobre seguridad en el centro de Medellín** (noviembre 5): Citados el Secretario de Seguridad y el Comandante de la Policía Metropolitana. Se discutió la situación de microtráfico en el sector de Barbacoas y Prado.

- **Debate sobre calidad del aire** (noviembre 20): Se evaluaron las medidas adoptadas durante los episodios de contingencia y se exigió un plan de chatarrización más agresivo para vehículos diésel.

- **Debate sobre vivienda de interés social** (diciembre 3): Se cuestionó el rezago en la entrega de **3.200 viviendas** del programa *Mi Casa Ya Medellín* y se solicitó cronograma de cumplimiento.

### Proyectos en Trámite para 2026

Entre los proyectos pendientes más relevantes se encuentran:

- **Proyecto de Acuerdo 115**: Creación del Observatorio Distrital de Violencia de Género
- **Proyecto de Acuerdo 118**: Regulación de plataformas de movilidad (apps de transporte)
- **Proyecto de Acuerdo 122**: Sistema de presupuesto participativo digital
- **Proyecto de Acuerdo 125**: Política pública de economía circular

### Indicadores de Gestión Legislativa

| Indicador | Q4 2025 | Q4 2024 | Variación |
|-----------|---------|---------|-----------|
| Proyectos radicados | 47 | 38 | +23,7% |
| Acuerdos aprobados | 18 | 14 | +28,6% |
| Debates control político | 14 | 11 | +27,3% |
| Asistencia promedio concejales | 89,4% | 85,1% | +4,3 pp |
| Sesiones realizadas | 48 | 41 | +17,1% |`,
    imagen_url: null,
    linea_tematica: "seguridad",
    fecha_publicacion: "2026-01-10",
    tags: ["legislativo", "concejo", "acuerdos", "control-politico", "iniciativas"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 987,
    paginas: 32,
  },

  // ─── 8. Video: Rendición de Cuentas 2025 ──────────────────────────────
  {
    id: "prod-008",
    titulo: "Video: Rendición de Cuentas 2025",
    slug: "video-rendicion-cuentas-2025",
    tipo: "video",
    descripcion:
      "Registro en video de la Audiencia Pública de Rendición de Cuentas del Concejo de Medellín, con presentación de logros, inversiones y participación ciudadana.",
    contenido: `## Rendición de Cuentas 2025 - Concejo de Medellín

### Información del Evento

- **Fecha**: 18 de diciembre de 2025
- **Lugar**: Recinto del Concejo de Medellín, Edificio Plaza de la Libertad
- **Duración**: 3 horas 24 minutos
- **Asistentes presenciales**: 450 personas
- **Visualizaciones en streaming**: 12.300
- **Transmisión**: Canal oficial de YouTube del Concejo de Medellín y Facebook Live

### Agenda del Evento

**Apertura (0:00 - 0:15)**
Palabras de bienvenida por parte del Presidente del Concejo de Medellín. Se destacó el compromiso con la transparencia y la participación ciudadana como pilares de la gestión legislativa del período 2024-2027.

**Presentación de Gestión Legislativa (0:15 - 1:00)**
El Secretario General del Concejo presentó los principales logros del año:

- **72 acuerdos aprobados** durante 2025 (récord en los últimos 10 años)
- **38 debates de control político** realizados
- **156 sesiones** ordinarias y extraordinarias
- **$8,7 billones COP** en presupuesto aprobado para el Distrito
- **Asistencia promedio de concejales**: 88,7%

**Presentación Financiera (1:00 - 1:30)**
La Dirección Administrativa presentó la ejecución del presupuesto del Concejo:

- **Presupuesto asignado**: $42.000 millones COP
- **Ejecución**: 94,2%
- **Ahorro en gastos operativos**: $1.800 millones COP por digitalización de procesos
- Se implementó el sistema de **sesiones virtuales** que permitió reducir gastos logísticos en un 32%

**Observatorio Distrital - Resultados (1:30 - 2:00)**
El equipo del Observatorio Distrital presentó los avances de la plataforma de datos abiertos:

- **Plataforma web** con datos de 6 líneas temáticas y más de **120 indicadores** actualizados
- **15 publicaciones** entre informes, boletines e infografías
- **45.000 visitas** a la plataforma durante 2025
- **8 convenios** con universidades para investigación aplicada
- Implementación del **Asistente de IA** para consulta ciudadana de indicadores (fase beta)

**Participación Ciudadana (2:00 - 2:45)**
Espacio de preguntas y respuestas con la ciudadanía. Se recibieron **87 preguntas** a través de los canales digitales y **23 intervenciones presenciales**. Los temas más consultados fueron:

1. **Seguridad en barrios periféricos** (18 preguntas)
2. **Estado de obras de infraestructura** (15 preguntas)
3. **Programas de empleo juvenil** (12 preguntas)
4. **Calidad de la educación pública** (10 preguntas)
5. **Transporte público y tarifas** (8 preguntas)

**Compromisos para 2026 (2:45 - 3:15)**
El Presidente del Concejo anunció los compromisos para el año 2026:

- Aprobación del **Plan Estratégico de Ordenamiento Territorial (PEOT)** actualizado
- Creación de la **Mesa Permanente de Participación Ciudadana Digital**
- Seguimiento al **Metro de la 80** con informes trimestrales de avance
- Ampliación del Observatorio Distrital con **4 nuevas líneas temáticas**: vivienda, cultura, juventud y género
- Implementación del **presupuesto participativo digital** en las 16 comunas

**Cierre (3:15 - 3:24)**
Palabras de cierre y agradecimiento a los asistentes. Se anunció la publicación de la memoria completa del evento en la página web del Concejo.

### Recursos Disponibles

- Video completo en YouTube (3:24:00)
- Presentación en PDF (disponible para descarga)
- Memoria escrita del evento
- Infografía de resumen ejecutivo
- Transcripción completa con marcas de tiempo`,
    imagen_url: null,
    linea_tematica: "economia",
    fecha_publicacion: "2025-12-20",
    tags: ["rendicion-de-cuentas", "transparencia", "concejo", "participacion-ciudadana"],
    autor: "Concejo de Medellín",
    descargas: 523,
  },

  // ─── 9. Infografía: Mapa de Inversión Social por Comunas ──────────────
  {
    id: "prod-009",
    titulo: "Infografía: Mapa de Inversión Social por Comunas",
    slug: "infografia-mapa-inversion-social-comunas",
    tipo: "infografia",
    descripcion:
      "Visualización georreferenciada de la inversión social del Distrito de Medellín por comunas y corregimientos, desglosada por sectores: educación, salud, infraestructura y cultura.",
    contenido: `## Mapa de Inversión Social por Comunas - 2025

### Inversión Total

El Distrito de Medellín invirtió **$4,8 billones COP** en programas sociales durante 2025, beneficiando a más de **1,2 millones de personas** en las 16 comunas y 5 corregimientos. Esta cifra representa un incremento del **8,4%** frente a la inversión social de 2024.

### Distribución por Sector

| Sector | Inversión (millones COP) | Participación |
|--------|-------------------------|---------------|
| Educación | 1.680.000 | 35% |
| Salud | 960.000 | 20% |
| Infraestructura social | 720.000 | 15% |
| Cultura y recreación | 480.000 | 10% |
| Seguridad y convivencia | 384.000 | 8% |
| Inclusión social | 336.000 | 7% |
| Medio ambiente | 240.000 | 5% |
| **Total** | **4.800.000** | **100%** |

### Inversión por Comuna (Top 10)

Las comunas con mayor inversión per cápita fueron aquellas con mayores índices de vulnerabilidad socioeconómica, en cumplimiento del principio de **equidad territorial**:

1. **Popular (Comuna 1)**: $298.000 millones - $2.291.000 per cápita
   - Principales programas: Buen Comienzo (8.400 niños), mejoramiento de vivienda (1.200 hogares), Becas Futuro (820 jóvenes)

2. **Santa Cruz (Comuna 2)**: $245.000 millones - $2.198.000 per cápita
   - Principales programas: alimentación escolar (12.000 estudiantes), Medellín Me Cuida (4.500 familias)

3. **Manrique (Comuna 3)**: $320.000 millones - $1.997.000 per cápita
   - Principales programas: construcción de 2 nuevos centros de salud, pavimentación de 18 km de vías barriales

4. **San Javier (Comuna 13)**: $305.000 millones - $2.209.000 per cápita
   - Principales programas: Paz y Salvo (prevención de violencia), Parque Biblioteca renovado, 3 nuevas canchas deportivas

5. **Doce de Octubre (Comuna 6)**: $380.000 millones - $1.949.000 per cápita
   - Principales programas: ampliación UVA Sol de Oriente, programa de emprendimiento para 2.400 familias

6. **Villa Hermosa (Comuna 8)**: $275.000 millones - $1.999.000 per cápita
   - Principales programas: mejoramiento integral de barrios (sector Llanadas), centro cultural comunitario

7. **Aranjuez (Comuna 4)**: $310.000 millones - $1.908.000 per cápita
   - Principales programas: renovación del Jardín Botánico de la Ladera, programa de seguridad alimentaria

8. **Robledo (Comuna 7)**: $325.000 millones - $1.856.000 per cápita
   - Principales programas: Ciudadela Universitaria ampliada, programa de vivienda nueva (600 unidades)

9. **Buenos Aires (Comuna 9)**: $255.000 millones - $1.864.000 per cápita
   - Principales programas: renovación vial Barrio Alejandro Echavarría, programa de atención a víctimas del conflicto

10. **Castilla (Comuna 5)**: $270.000 millones - $1.803.000 per cápita
    - Principales programas: nuevo centro deportivo, programa de economía solidaria (1.800 familias)

### Indicadores de Impacto

**Educación**
- **385.200 estudiantes** atendidos en instituciones oficiales
- **98.500 niños** en el programa Buen Comienzo
- **14.800 becas** de educación superior otorgadas

**Salud**
- **2,8 millones de consultas** en la red pública
- **3 nuevos centros de salud** inaugurados
- **145.000 teleconsultas** realizadas

**Infraestructura Social**
- **12 nuevas aulas** construidas
- **45 km de vías barriales** pavimentadas
- **8 equipamientos deportivos** renovados

**Inclusión Social**
- **42.000 adultos mayores** beneficiados con subsidios
- **18.000 personas con discapacidad** atendidas en programas especializados
- **6.500 habitantes de calle** atendidos en centros de acogida

### Metodología

La información fue compilada a partir de los informes de ejecución presupuestal de las Secretarías del Distrito, el sistema de seguimiento al Plan de Desarrollo *Medellín Futuro* y los reportes del Departamento Administrativo de Planeación. Los valores per cápita se calcularon con base en las proyecciones de población del DANE para 2025.`,
    imagen_url: null,
    linea_tematica: "educacion",
    fecha_publicacion: "2025-11-15",
    tags: ["inversion-social", "comunas", "presupuesto", "equidad", "programas-sociales"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 1780,
  },

  // ─── 10. Informe Especial: Impacto del Metro de la 80 ─────────────────
  {
    id: "prod-010",
    titulo: "Informe Especial: Impacto del Metro de la 80",
    slug: "informe-especial-impacto-metro-80",
    tipo: "informe",
    descripcion:
      "Análisis técnico del impacto urbanístico, económico, ambiental y social del proyecto Metro de la 80 en las comunas aledañas al corredor occidental de Medellín.",
    contenido: `## Resumen Ejecutivo

El Metro de la 80 es el proyecto de infraestructura más ambicioso que ha emprendido el Distrito de Medellín en las últimas dos décadas. Con una inversión estimada de **$5,2 billones COP** y una extensión de **13,2 kilómetros** con **17 estaciones**, este corredor férreo conectará el norte con el sur del valle por el costado occidental, beneficiando directamente a más de **800.000 habitantes** de las comunas Castilla (5), Doce de Octubre (6), Robledo (7), La América (12), San Javier (13), Guayabal (15) y Belén (16).

Este informe especial del Observatorio Distrital analiza los impactos esperados y los avances del proyecto a diciembre de 2025, cuando se alcanzó un **38% de avance** en la obra civil.

## Estado del Proyecto

### Avance Físico

- **Avance general**: 38% (meta anual cumplida: 35%)
- **Excavación de túneles**: 2,8 km completados de 4,1 km planeados (68%)
- **Estaciones en construcción**: 7 de 17 (41%)
- **Viaductos**: 1,2 km de 3,4 km (35%)
- **Patio taller (Caribe)**: 45% de avance
- **Fecha estimada de entrega**: segundo semestre de 2028

### Inversión Ejecutada

- **Inversión total a diciembre 2025**: $2,1 billones COP (40% del total)
- **Fuentes de financiación**: Gobierno Nacional (70%), Distrito de Medellín (20%), Área Metropolitana (10%)
- **Generación de empleo directo**: 4.800 trabajadores en obra
- **Generación de empleo indirecto**: estimado en 12.000 personas

## Impacto Urbanístico

### Renovación del Corredor

La construcción del Metro de la 80 ha detonado un proceso de **renovación urbana** sin precedentes en el corredor occidental:

- **Plan Parcial Naranjal**: aprobado para la renovación de 42 hectáreas en la comuna Guayabal, con usos mixtos (vivienda, comercio, servicios)
- **Plan Parcial Caribe**: 28 hectáreas en la comuna Castilla, incluyendo el nuevo patio taller y espacio público
- **Redesarrollo predial**: se han identificado **1.200 predios** en la franja de influencia directa (300 metros) con potencial de redesarrollo
- **Nuevos estándares de espacio público**: el proyecto contempla la creación de **18 hectáreas** de espacio público asociado a las estaciones

### Valorización Predial

Un estudio de Lonja de Propiedad Raíz de Medellín estimó los siguientes incrementos en el valor del suelo:

- **Predios a menos de 300m de estaciones**: valorización promedio del **35%** desde el anuncio del proyecto
- **Predios entre 300m y 600m**: valorización promedio del **22%**
- **Predios entre 600m y 1.000m**: valorización promedio del **12%**
- La mayor valorización se registró en los alrededores de la futura estación **Floresta** (comuna 12) con un **48%**

## Impacto en la Movilidad

### Proyecciones de Demanda

- **Demanda estimada al inicio de operación (2028)**: 180.000 pasajeros diarios
- **Demanda proyectada a 2035**: 250.000 pasajeros diarios
- **Reducción estimada de tiempos de viaje**: 35% para los desplazamientos norte-sur por el corredor occidental
- **Reducción de vehículos particulares**: estimada en 28.000 vehículos diarios en la carrera 80

### Integración con el Sistema

El Metro de la 80 se integrará con:
- **Línea A del Metro** en la estación Caribe
- **Metroplús Línea 2** en la estación Belén
- **Metrocable Línea J** (San Javier)
- **12 rutas alimentadoras** nuevas
- **4 estaciones de EnCicla** asociadas

## Impacto Ambiental

- **Reducción estimada de emisiones de CO2**: 45.000 toneladas/año
- **Árboles compensados**: 8.200 (se talaron 3.100 y se plantaron 11.300)
- **Reducción de ruido ambiental**: se estima una reducción de 8 dB en la carrera 80 por la disminución del tráfico vehicular
- **Manejo de residuos de excavación**: 1,8 millones de metros cúbicos, de los cuales el 72% ha sido reutilizado como material de relleno

## Impacto Social

### Reasentamiento

- **Predios adquiridos**: 892
- **Familias reasentadas**: 634
- **Inversión en reasentamiento**: $245.000 millones COP
- El **89% de las familias** calificó el proceso de reasentamiento como satisfactorio o muy satisfactorio

### Empleo Local

- El **42% de los trabajadores** de la obra provienen de las comunas del corredor
- Se formaron **1.200 personas** en oficios de construcción a través del SENA
- **85 MiPymes** locales fueron vinculadas como proveedores del proyecto

## Recomendaciones

1. **Garantizar la integración tarifaria** completa con el sistema Metro existente desde el primer día de operación.
2. **Acelerar la aprobación** de los planes parciales de renovación urbana para evitar especulación inmobiliaria descontrolada.
3. **Implementar mecanismos de protección** para comerciantes y residentes de bajos ingresos afectados por la valorización.
4. **Asegurar la accesibilidad universal** en todas las estaciones cumpliendo estándares internacionales.
5. **Publicar informes trimestrales** de avance con indicadores de costo, cronograma y calidad.`,
    imagen_url: null,
    linea_tematica: "movilidad",
    fecha_publicacion: "2025-12-28",
    tags: ["metro-80", "infraestructura", "movilidad", "renovacion-urbana", "impacto"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 4210,
    paginas: 96,
  },

  // ─── 11. Guía Metodológica del Observatorio ───────────────────────────
  {
    id: "prod-011",
    titulo: "Guía Metodológica del Observatorio",
    slug: "guia-metodologica-observatorio",
    tipo: "otro",
    descripcion:
      "Documento técnico que describe la metodología, fuentes de datos, indicadores y procesos de análisis utilizados por el Observatorio Distrital del Concejo de Medellín.",
    contenido: `## Presentación

La Guía Metodológica del Observatorio Distrital del Concejo de Medellín establece los lineamientos técnicos, conceptuales y operativos que orientan la producción de información, indicadores y análisis del Observatorio. Este documento es de carácter público y busca garantizar la **transparencia, replicabilidad y rigor** de todos los productos generados.

El Observatorio fue creado mediante **Acuerdo Distrital 045 de 2024** con el propósito de fortalecer la función de control político del Concejo mediante el uso de datos, evidencia y análisis técnico. Su mandato incluye el monitoreo de indicadores socioeconómicos, el seguimiento al Plan de Desarrollo y la producción de insumos para el debate público informado.

## Marco Conceptual

### Principios Orientadores

1. **Rigor técnico**: Todos los indicadores y análisis se basan en metodologías reconocidas por organismos nacionales (DANE, DNP) e internacionales (OCDE, ONU-Habitat, OMS).
2. **Transparencia**: Las fuentes de datos, supuestos metodológicos y limitaciones son explícitos en cada publicación.
3. **Oportunidad**: La información se actualiza con la periodicidad necesaria para ser útil en la toma de decisiones.
4. **Accesibilidad**: Los productos se diseñan para ser comprensibles tanto para tomadores de decisiones como para la ciudadanía en general.
5. **Independencia**: El Observatorio produce análisis técnico independiente de la administración distrital.

### Líneas Temáticas

El Observatorio organiza su trabajo en **6 líneas temáticas** alineadas con los ejes del Plan de Desarrollo Distrital:

- **Seguridad y Convivencia**: homicidios, hurtos, violencia intrafamiliar, percepción de seguridad
- **Educación y Cultura**: cobertura, deserción, calidad, acceso a educación superior
- **Economía y Empleo**: PIB, desempleo, informalidad, dinámica empresarial, inversión
- **Movilidad y Transporte**: transporte público, siniestralidad vial, movilidad activa
- **Medio Ambiente**: calidad del aire, gestión de residuos, arborización, recurso hídrico
- **Salud Pública**: mortalidad, morbilidad, cobertura en salud, salud mental

## Fuentes de Información

### Fuentes Primarias

El Observatorio no genera datos primarios propios. Toda la información proviene de fuentes oficiales con las cuales se han suscrito **convenios de intercambio de información**:

- **DANE** - Departamento Administrativo Nacional de Estadística
- **Secretarías del Distrito de Medellín** (Seguridad, Educación, Salud, Hacienda, Movilidad, Medio Ambiente)
- **Policía Metropolitana del Valle de Aburrá**
- **Medicina Legal - Seccional Antioquia**
- **Cámara de Comercio de Medellín para Antioquia**
- **Metro de Medellín**
- **SIATA** - Sistema de Alerta Temprana del Valle de Aburrá
- **Área Metropolitana del Valle de Aburrá**
- **Medellín Cómo Vamos** - Programa de seguimiento ciudadano

### Fuentes Secundarias

- Informes sectoriales del **Banco de la República**
- Publicaciones académicas de universidades locales (**Universidad de Antioquia, EAFIT, Universidad Nacional sede Medellín, UPB**)
- Informes de organismos internacionales (**BID, Banco Mundial, CAF, ONU-Habitat**)
- Registros administrativos del **SISBEN** y el **DNS**

## Metodología de Indicadores

### Clasificación de Indicadores

Los indicadores del Observatorio se clasifican en tres niveles:

**Nivel 1 - Indicadores de resultado**: Miden el impacto final de las políticas públicas (ej.: tasa de homicidios, tasa de desempleo, esperanza de vida).

**Nivel 2 - Indicadores de gestión**: Miden la ejecución de programas y proyectos (ej.: ejecución presupuestal, cobertura de programas, obras entregadas).

**Nivel 3 - Indicadores de contexto**: Proveen información sobre el entorno socioeconómico (ej.: población, PIB, distribución demográfica).

### Ficha Técnica de Indicadores

Cada indicador cuenta con una **ficha técnica** que incluye:

- Nombre del indicador y código único
- Definición operacional
- Fórmula de cálculo
- Unidad de medida
- Periodicidad de actualización
- Fuente de información
- Nivel de desagregación (distrito, comuna, corregimiento)
- Serie histórica disponible
- Limitaciones y notas metodológicas

### Proceso de Validación

Todo dato publicado pasa por un proceso de **triple validación**:

1. **Verificación de fuente**: Se confirma que el dato provenga de la fuente oficial correspondiente.
2. **Control de consistencia**: Se verifica la coherencia con datos históricos y con indicadores relacionados.
3. **Revisión por pares**: Al menos dos analistas revisan cada indicador antes de su publicación.

## Proceso Editorial

Los productos del Observatorio siguen un flujo editorial de **5 etapas**: planificación, investigación, redacción, revisión y publicación. Cada producto es revisado por el comité editorial integrado por el director del Observatorio, un asesor metodológico y un experto temático externo.`,
    imagen_url: null,
    linea_tematica: "ambiente",
    fecha_publicacion: "2025-06-01",
    tags: ["metodologia", "indicadores", "datos-abiertos", "transparencia", "guia"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 342,
    paginas: 45,
  },

  // ─── 12. Boletín de Salud Mental - Medellín 2025 ──────────────────────
  {
    id: "prod-012",
    titulo: "Boletín de Salud Mental - Medellín 2025",
    slug: "boletin-salud-mental-medellin-2025",
    tipo: "boletin",
    descripcion:
      "Análisis de los indicadores de salud mental en Medellín durante 2025: prevalencia de trastornos, atención, programas de prevención y líneas de ayuda.",
    contenido: `## Panorama de la Salud Mental en Medellín

### Contexto

La salud mental se ha posicionado como una de las **prioridades de salud pública** en el Distrito de Medellín. Según la Organización Mundial de la Salud, los trastornos mentales afectan a 1 de cada 4 personas en algún momento de su vida, y Medellín no es ajena a esta realidad. Factores como la historia del conflicto armado, la desigualdad socioeconómica, la violencia urbana y las secuelas de la pandemia de COVID-19 han configurado un escenario complejo.

Este boletín presenta los datos consolidados de salud mental correspondientes al año 2025, elaborado con base en registros del SIVIGILA (Sistema de Vigilancia en Salud Pública), la ESE Metrosalud, las EPS que operan en el distrito y la Secretaría de Salud.

## Indicadores Principales

### Prevalencia de Trastornos Mentales

Se estima que **420.000 personas** en Medellín presentan algún tipo de trastorno mental, lo que equivale al **17% de la población**. La distribución por tipo de trastorno es la siguiente:

- **Trastornos de ansiedad**: 168.000 personas (40%)
- **Trastornos depresivos**: 109.200 personas (26%)
- **Trastornos relacionados con sustancias**: 67.200 personas (16%)
- **Trastorno bipolar**: 25.200 personas (6%)
- **Esquizofrenia y otros trastornos psicóticos**: 16.800 personas (4%)
- **Otros trastornos**: 33.600 personas (8%)

### Atenciones en Salud Mental

Durante 2025 se realizaron **142.000 atenciones** en salud mental en el sistema de salud del distrito:

- **Consultas de psicología**: 78.400 (55%)
- **Consultas de psiquiatría**: 34.100 (24%)
- **Atenciones en urgencias por crisis de salud mental**: 18.500 (13%)
- **Hospitalizaciones psiquiátricas**: 11.000 (8%)

El tiempo promedio de espera para una cita de psicología en la red pública fue de **18 días**, y para psiquiatría de **32 días**, cifras que reflejan una brecha significativa entre la demanda y la oferta de servicios.

### Conducta Suicida

La conducta suicida continúa siendo uno de los indicadores más preocupantes:

- **Intentos de suicidio notificados**: 3.840 casos (incremento del 9,2% vs. 2024)
- **Suicidios consumados**: 142 casos (tasa de 5,7 por 100.000 hab.)
- **Grupo etario más afectado**: 15-24 años (32% de los intentos)
- **Distribución por sexo**: 62% mujeres en intentos, 71% hombres en suicidios consumados
- Las comunas con mayores tasas fueron **Robledo (7)**, **Buenos Aires (9)** y **San Javier (13)**

### Consumo de Sustancias Psicoactivas

- **Prevalencia de consumo de alcohol riesgoso**: 18,4% de la población adulta
- **Cannabis**: prevalencia de consumo último año del 8,2% en población de 18-35 años
- **Cocaína y bazuco**: prevalencia de consumo último año del 2,1%
- Se atendieron **12.800 personas** en programas de tratamiento de adicciones
- Los Centros de Atención en Drogodependencia (CAD) registraron **4.200 ingresos**

## Programas y Estrategias

### Medellín se Toma la Salud Mental

Este programa bandera del Distrito invirtió **$38.000 millones COP** en 2025:

- **Línea Amiga (444 44 48)**: 67.000 llamadas atendidas, con un tiempo de respuesta promedio de 45 segundos
- **Equipos móviles de salud mental**: 24 equipos que realizaron **32.000 intervenciones** comunitarias en las 16 comunas
- **Primeros auxilios psicológicos**: 2.300 promotores comunitarios capacitados
- **Zonas de Orientación Escolar (ZOE)**: presencia en 180 instituciones educativas, atendiendo a **28.000 estudiantes**

### Estrategia de Base Comunitaria

- **45 grupos de apoyo** conformados en comunas priorizadas
- **180 líderes comunitarios** formados como gestores de salud mental
- **12 Centros de Escucha** en funcionamiento permanente
- Articulación con **28 organizaciones sociales** para la atención psicosocial

### Salud Mental en el Ámbito Laboral

- Se implementó el programa *Empresa Saludable* en **120 empresas** del distrito
- **8.400 trabajadores** participaron en tamizajes de salud mental
- Se detectaron **2.100 casos** con riesgo alto que fueron remitidos a atención especializada

## Desafíos y Recomendaciones

1. **Reducir los tiempos de espera** para atención en psicología y psiquiatría mediante la contratación de al menos **80 profesionales adicionales** en la red pública.
2. **Fortalecer la prevención del suicidio** en población juvenil con programas escolares basados en evidencia y restricción de medios letales.
3. **Ampliar la cobertura de los Centros de Escucha** a todas las comunas, priorizando aquellas con mayores tasas de conducta suicida.
4. **Implementar la telesalud mental** como complemento a la atención presencial, aprovechando la infraestructura tecnológica existente.
5. **Combatir el estigma** asociado a los trastornos mentales a través de campañas de comunicación masiva y formación a periodistas.`,
    imagen_url: null,
    linea_tematica: "salud",
    fecha_publicacion: "2025-10-20",
    tags: ["salud-mental", "suicidio", "depresion", "ansiedad", "prevencion"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 1543,
    paginas: 28,
  },

  // ─── 13. Informe de Gestión de Residuos Sólidos 2025 ──────────────────
  {
    id: "prod-013",
    titulo: "Informe de Gestión de Residuos Sólidos 2025",
    slug: "informe-gestion-residuos-solidos-2025",
    tipo: "informe",
    descripcion:
      "Diagnóstico de la generación, recolección, aprovechamiento y disposición final de residuos sólidos en el Distrito de Medellín, con avances en economía circular.",
    contenido: `## Introducción

La gestión integral de residuos sólidos constituye uno de los mayores desafíos ambientales del Distrito de Medellín. Con una generación diaria estimada de **3.200 toneladas** de residuos sólidos urbanos, el distrito enfrenta presiones crecientes sobre su infraestructura de recolección, transporte, aprovechamiento y disposición final. Este informe presenta el estado de la gestión de residuos durante 2025 y los avances hacia las metas del Plan de Gestión Integral de Residuos Sólidos (PGIRS) 2020-2031.

## Generación de Residuos

### Cifras Generales

- **Generación total anual**: 1.168.000 toneladas
- **Generación per cápita**: 0,47 kg/hab/día (reducción del 2,1% vs. 2024)
- **Composición promedio**:
  - Orgánicos biodegradables: **54%**
  - Plásticos: **14%**
  - Papel y cartón: **11%**
  - Vidrio: **4%**
  - Metales: **3%**
  - Textiles: **3%**
  - Otros (escombros, peligrosos, especiales): **11%**

### Generación por Estrato Socioeconómico

| Estrato | Generación per cápita (kg/hab/día) | % del total |
|---------|-------------------------------------|-------------|
| 1 | 0,32 | 8% |
| 2 | 0,38 | 18% |
| 3 | 0,45 | 32% |
| 4 | 0,56 | 22% |
| 5 | 0,68 | 12% |
| 6 | 0,81 | 8% |

## Recolección y Transporte

El servicio de recolección es prestado por **Emvarias** (empresa pública) y operadores privados bajo contrato:

- **Cobertura de recolección**: 99,7% del área urbana
- **Frecuencia**: 3 veces por semana en zonas residenciales, diaria en zonas comerciales
- **Flota de vehículos**: 320 compactadores (42 a gas natural, 8 eléctricos)
- **Rutas de recolección**: 680
- **Personal operativo**: 2.400 trabajadores
- **Puntos críticos de acumulación**: 87 identificados (reducción de 23 vs. 2024)

## Aprovechamiento y Reciclaje

### Tasa de Aprovechamiento

- **Tasa de aprovechamiento general**: 18,4% (meta PGIRS 2025: 20%)
- **Toneladas aprovechadas**: 214.912 toneladas/año
- **Materiales más reciclados**: papel y cartón (45%), plásticos (28%), vidrio (15%), metales (12%)

### Red de Recicladores

Medellín cuenta con una red activa de **4.200 recicladores de oficio** organizados en **28 cooperativas**:

- **Ingreso promedio del reciclador**: $1.280.000 COP/mes
- **Centros de acopio**: 48 en operación
- **Estaciones de Clasificación y Aprovechamiento (ECA)**: 12, con capacidad conjunta de 180 toneladas/día
- El programa de **formalización y dignificación** del reciclador benefició a 1.800 personas con seguridad social y dotación

### Programa Basura Cero

El programa distrital *Basura Cero* implementó las siguientes estrategias:

- **Separación en la fuente**: 34% de los hogares separan adecuadamente (meta: 40%)
- **Compostaje comunitario**: 45 puntos de compostaje en parques y huertas urbanas, procesando 2.800 toneladas/año
- **Puntos limpios**: 120 contenedores diferenciados instalados en espacios públicos
- **Campaña "Medellín Recicla"**: alcanzó a 1,2 millones de personas a través de medios y redes sociales

## Disposición Final

- **Relleno sanitario La Pradera** (municipio de Don Matías): recibe el 81,6% de los residuos del distrito
- **Vida útil estimada**: 12 años al ritmo actual de disposición
- **Toneladas dispuestas en 2025**: 953.088
- **Costo promedio de disposición**: $42.000 COP/tonelada
- La generación de **biogás** en La Pradera permitió producir **8,2 GWh** de energía eléctrica

## Economía Circular

El Distrito avanzó en la transición hacia un modelo de **economía circular**:

- Se aprobó la **Política Pública de Economía Circular** (en trámite ante el Concejo)
- **85 empresas** participaron en el programa de simbiosis industrial, intercambiando subproductos
- Se inauguró el **Centro de Innovación en Residuos** en Ruta N, con 12 emprendimientos de valorización
- Se produjeron **4.500 toneladas de compost** de alta calidad a partir de residuos orgánicos del mercado mayorista Central Mayorista de Antioquia

## Recomendaciones

1. **Acelerar la meta de aprovechamiento** al 25% para 2027, ampliando la red de ECAs y formalizando a más recicladores.
2. **Implementar la recolección diferenciada** de orgánicos en al menos 5 comunas piloto para 2026.
3. **Explorar tecnologías** de valorización energética de residuos (waste-to-energy) como complemento al relleno sanitario.
4. **Aprobar la Política de Economía Circular** e implementar incentivos tributarios para empresas que incorporen materiales reciclados.
5. **Reducir la disposición final** mediante metas vinculantes de reducción de residuos para grandes generadores.`,
    imagen_url: null,
    linea_tematica: "ambiente",
    fecha_publicacion: "2025-09-10",
    tags: ["residuos-solidos", "reciclaje", "economia-circular", "medio-ambiente", "basura-cero"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 1120,
    paginas: 56,
  },

  // ─── 14. Infografía: Panorama del Empleo Juvenil en Medellín ──────────
  {
    id: "prod-014",
    titulo: "Infografía: Panorama del Empleo Juvenil en Medellín",
    slug: "infografia-empleo-juvenil-medellin",
    tipo: "infografia",
    descripcion:
      "Visualización de los indicadores de empleo juvenil en Medellín: tasas de desempleo, informalidad, sectores de inserción laboral y programas de fomento.",
    contenido: `## Empleo Juvenil en Medellín - Datos Clave 2025

### El Desafío del Empleo Joven

El desempleo juvenil es uno de los problemas estructurales más persistentes en el Distrito de Medellín. Los jóvenes entre **18 y 28 años** representan el **24% de la población en edad de trabajar**, pero concentran el **38% del desempleo total**. Este boletín visual presenta los principales indicadores y programas orientados a cerrar esta brecha.

### Indicadores del Mercado Laboral Juvenil

**Población joven (18-28 años) en Medellín**: 598.000 personas

| Indicador | Jóvenes | Total ciudad | Brecha |
|-----------|---------|-------------|--------|
| Tasa de desempleo | 18,7% | 10,2% | +8,5 pp |
| Tasa de informalidad | 54,3% | 42,1% | +12,2 pp |
| Ingreso promedio mensual | $1.320.000 | $1.890.000 | -30,2% |
| Tasa de ocupación | 48,2% | 57,8% | -9,6 pp |

### Perfil del Joven Desempleado

El análisis del DANE revela el siguiente perfil predominante entre los jóvenes desempleados de Medellín:

- **62%** son mujeres jóvenes
- **48%** tiene formación técnica o tecnológica
- **28%** tiene formación universitaria incompleta
- **71%** reside en estratos 1, 2 y 3
- **Comunas con mayor desempleo juvenil**: Popular (1) con 26,3%, Santa Cruz (2) con 24,8% y Manrique (3) con 23,1%
- **Tiempo promedio de búsqueda de empleo**: 5,8 meses

### Sectores de Inserción Laboral

Los sectores que más emplean jóvenes en Medellín son:

1. **Comercio y ventas**: 28% de los jóvenes ocupados
   - Predominan empleos en centros comerciales, tiendas de barrio y comercio informal
2. **Servicios y hostelería**: 22%
   - Restaurantes, hoteles, eventos y turismo
3. **Tecnología y servicios digitales**: 15%
   - Desarrollo de software, BPO, marketing digital, freelance
4. **Industria manufacturera**: 12%
   - Textil, alimentos, químicos
5. **Construcción**: 8%
   - Empleo temporal asociado a proyectos de infraestructura
6. **Servicios profesionales**: 8%
   - Contabilidad, derecho, consultoría
7. **Otros**: 7%

### Economía Naranja y Emprendimiento Joven

Medellín se ha posicionado como epicentro de la **economía naranja** y el emprendimiento juvenil:

- **4.800 emprendimientos** liderados por jóvenes fueron registrados en 2025
- **Ruta N** albergó a **180 startups** con fundadores menores de 30 años
- **Parque E** (Universidad de Antioquia) acompañó a **320 proyectos** de emprendimiento joven
- El programa **Capital Semilla Joven** otorgó **$8.200 millones COP** en 410 créditos blandos
- **Hub de Innovación del Distrito** capacitó a 2.400 jóvenes en habilidades digitales y de negocio

### Programas Distritales

**Empleo Joven Medellín**
- Presupuesto: **$24.000 millones COP**
- Beneficiarios: **6.200 jóvenes** vinculados a su primer empleo formal
- Duración promedio del contrato: 8 meses
- **68%** fueron contratados de manera permanente al finalizar el programa
- Sectores de vinculación: tecnología (32%), servicios (28%), industria (20%), comercio (20%)

**Jóvenes con Futuro**
- **3.800 jóvenes** capacitados en oficios y competencias laborales
- Alianza con **45 empresas** del sector privado para prácticas laborales
- Tasa de inserción laboral post-programa: **72%**

**Sapiencia - Becas para Empleo**
- **2.400 becas** condicionadas a formación en áreas de alta demanda laboral
- Áreas priorizadas: programación, ciencia de datos, inglés, logística, energías renovables

### Brechas Territoriales

La distribución del desempleo juvenil por zonas muestra desigualdades marcadas:

- **Zona nororiental** (Comunas 1-4): tasa promedio de **24,1%**
- **Zona noroccidental** (Comunas 5-7): tasa promedio de **20,3%**
- **Zona centro-oriental** (Comunas 8-10): tasa promedio de **17,5%**
- **Zona centro-occidental** (Comunas 11-13): tasa promedio de **16,8%**
- **Zona sur** (Comunas 14-16): tasa promedio de **12,4%**

### Perspectivas

El Observatorio Distrital recomienda priorizar la **articulación entre la oferta educativa y la demanda laboral**, fortalecer los programas de primer empleo y ampliar el acceso a formación en competencias digitales en las comunas con mayores brechas. La meta del Plan de Desarrollo es reducir el desempleo juvenil al **15%** para 2027.`,
    imagen_url: null,
    linea_tematica: "economia",
    fecha_publicacion: "2025-08-25",
    tags: ["empleo-juvenil", "desempleo", "emprendimiento", "formacion", "juventud"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 2045,
  },

  // ─── 15. Boletín de Siniestralidad Vial - Medellín 2025 ──────────────
  {
    id: "prod-015",
    titulo: "Boletín de Siniestralidad Vial - Medellín 2025",
    slug: "boletin-siniestralidad-vial-medellin-2025",
    tipo: "boletin",
    descripcion:
      "Estadísticas consolidadas de siniestros viales en Medellín durante 2025: víctimas fatales, lesionados, actores viales más vulnerables y zonas de alta accidentalidad.",
    contenido: `## Siniestralidad Vial en Medellín - 2025

### Resumen de Cifras

La siniestralidad vial en Medellín registró una **reducción del 6,8%** en víctimas fatales durante 2025 respecto al año anterior, aunque los lesionados graves se mantuvieron en niveles preocupantes. El Observatorio Distrital presenta este boletín con base en datos de la Secretaría de Movilidad, la Policía de Tránsito y Medicina Legal.

### Indicadores Generales

| Indicador | 2025 | 2024 | Variación |
|-----------|------|------|-----------|
| Siniestros viales totales | 42.800 | 44.100 | -2,9% |
| Víctimas fatales | 218 | 234 | -6,8% |
| Lesionados graves | 1.840 | 1.810 | +1,7% |
| Lesionados leves | 8.920 | 9.350 | -4,6% |
| Tasa de fatalidad (por 100.000 hab.) | 8,7 | 9,4 | -0,7 pp |

### Víctimas Fatales por Actor Vial

Los **motociclistas** siguen siendo el grupo más vulnerable en las vías de Medellín:

- **Motociclistas**: 98 fallecidos (45% del total)
- **Peatones**: 62 fallecidos (28%)
- **Ciclistas**: 24 fallecidos (11%)
- **Usuarios de vehículos livianos**: 22 fallecidos (10%)
- **Usuarios de transporte público**: 8 fallecidos (4%)
- **Otros**: 4 fallecidos (2%)

### Distribución por Género y Edad

- **Hombres**: 174 víctimas fatales (80%)
- **Mujeres**: 44 víctimas fatales (20%)
- **Grupo etario más afectado**: 25-34 años (32% de las víctimas fatales)
- **Adultos mayores (60+)**: 38 víctimas fatales (17%), principalmente peatones

### Zonas de Alta Accidentalidad

Las **10 intersecciones** con mayor número de siniestros en 2025:

1. **Glorieta de San Diego** (Comuna 10) - 89 siniestros
2. **Avenida Oriental con Calle 44** (Comuna 10) - 72 siniestros
3. **Carrera 80 con Calle 33** (Comuna 16) - 68 siniestros
4. **Autopista Norte con Calle 77** (Comuna 5) - 65 siniestros
5. **Avenida Las Vegas con Calle 10** (Comuna 14) - 58 siniestros
6. **Calle 30 con Carrera 65** (Comuna 11) - 54 siniestros
7. **Carrera 52 (Carabobo) con Calle 58** (Comuna 10) - 51 siniestros
8. **Avenida 33 con Carrera 74** (Comuna 16) - 48 siniestros
9. **Autopista Sur con Calle 12 Sur** (Comuna 15) - 45 siniestros
10. **Calle 50 (Colombia) con Carrera 80** (Comuna 13) - 42 siniestros

### Factores Asociados

Los principales factores asociados a los siniestros viales fueron:

- **Exceso de velocidad**: presente en el **28%** de los siniestros fatales
- **No respetar señales de tránsito**: **22%**
- **Conducción bajo efectos del alcohol**: **14%** (se realizaron 45.000 pruebas de alcoholimetría en el año)
- **Uso de celular al conducir**: **11%**
- **Adelantamiento indebido**: **9%**
- **Fallas mecánicas**: **6%**
- **Otros factores**: **10%**

### Motos: El Desafío Central

Con un parque automotor de **980.000 motocicletas** registradas (el más grande del país por ciudad), Medellín enfrenta un desafío particular:

- Las motos representan el **55% del parque vehicular** pero están involucradas en el **72% de los siniestros**
- Solo el **78% de los motociclistas** usa casco correctamente
- El **34% de las motos** no cuenta con revisión técnico-mecánica vigente
- Se realizaron **180.000 comparendos** a motociclistas durante 2025

### Estrategia de Seguridad Vial

El plan *Visión Cero Medellín* implementó las siguientes acciones:

- **Instalación de 85 cámaras fotomulta** en corredores viales principales
- **Reducción de velocidad a 50 km/h** en 23 corredores urbanos (antes 60 km/h)
- **42 km de ciclo-infraestructura protegida** construidos o mejorados
- **Programa de formación vial** que alcanzó a 120.000 personas (conductores, motociclistas, peatones)
- **15 zonas escolares** con reductores de velocidad y señalización reforzada

### Recomendaciones

1. **Implementar un programa integral para motociclistas** que incluya formación obligatoria, incentivos para revisión técnico-mecánica y mayor control de velocidad.
2. **Ampliar la infraestructura de protección** para peatones y ciclistas en las intersecciones de mayor accidentalidad.
3. **Fortalecer los operativos de alcoholimetría** durante fines de semana y festivos.
4. **Adoptar tecnología de control inteligente de velocidad** en los 10 corredores más críticos.
5. **Evaluar la implementación** de carriles exclusivos para motos en vías de alta velocidad.`,
    imagen_url: null,
    linea_tematica: "movilidad",
    fecha_publicacion: "2026-02-05",
    tags: ["siniestralidad-vial", "seguridad-vial", "motos", "peatones", "vision-cero"],
    autor: "Observatorio Distrital del Concejo de Medellín",
    descargas: 678,
    paginas: 20,
  },
];
