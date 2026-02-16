export type TraceabilityStep = {
  fecha: string;
  estado: string;
  descripcion: string;
  notas?: string;
};

export type InitiativeMock = {
  id: string;
  numero_radicado: string;
  titulo: string;
  descripcion: string;
  tipo: "acuerdo" | "proposicion" | "resolucion" | "debate" | "otro";
  estado:
    | "radicada"
    | "en_comision"
    | "primer_debate"
    | "segundo_debate"
    | "aprobada"
    | "archivada"
    | "retirada";
  fecha_radicacion: string;
  comision: string;
  linea_tematica: string;
  tags: string[];
  autores_ids: string[];
  trazabilidad: TraceabilityStep[];
  documento_url: string | null;
};

export const MOCK_INICIATIVAS: InitiativeMock[] = [
  // ─── SEGURIDAD (6 initiatives) ────────────────────────────────────────
  {
    id: "ini-001",
    numero_radicado: "AC-2024-001",
    titulo:
      "Acuerdo para el fortalecimiento de la seguridad alimentaria en comunas vulnerables",
    descripcion:
      "Proyecto de acuerdo que busca establecer un programa integral de seguridad alimentaria para las comunas con mayores índices de inseguridad alimentaria en Medellín, incluyendo huertas urbanas comunitarias, comedores populares y subsidios para familias en condición de vulnerabilidad.",
    tipo: "acuerdo",
    estado: "aprobada",
    fecha_radicacion: "2024-02-15",
    comision: "Primera",
    linea_tematica: "seguridad",
    tags: ["seguridad alimentaria", "comunas vulnerables", "nutrición"],
    autores_ids: ["a1", "a6"],
    trazabilidad: [
      {
        fecha: "2024-02-15",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo ante la Secretaría General del Concejo.",
      },
      {
        fecha: "2024-03-10",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Primera para estudio y ponencia.",
      },
      {
        fecha: "2024-04-22",
        estado: "Primer Debate",
        descripcion: "Aprobado en primer debate en Comisión Primera con 8 votos a favor y 3 en contra.",
        notas: "Se incorporaron modificaciones propuestas por la administración municipal.",
      },
      {
        fecha: "2024-05-18",
        estado: "Segundo Debate",
        descripcion: "Aprobado en segundo debate en plenaria con 14 votos a favor y 5 en contra.",
      },
      {
        fecha: "2024-06-01",
        estado: "Aprobado",
        descripcion: "Sancionado por la Alcaldía y publicado en la Gaceta Municipal.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-002",
    numero_radicado: "PR-2024-002",
    titulo:
      "Proposición de control político sobre estrategias de seguridad ciudadana en la Comuna 13",
    descripcion:
      "Proposición para citar a debate de control político al Secretario de Seguridad y Convivencia sobre las medidas implementadas para reducir los índices de criminalidad en la Comuna 13, San Javier.",
    tipo: "proposicion",
    estado: "archivada",
    fecha_radicacion: "2024-03-08",
    comision: "Primera",
    linea_tematica: "seguridad",
    tags: ["seguridad ciudadana", "Comuna 13", "control político", "criminalidad"],
    autores_ids: ["a2", "a10"],
    trazabilidad: [
      {
        fecha: "2024-03-08",
        estado: "Radicada",
        descripcion: "Radicación de proposición de control político.",
      },
      {
        fecha: "2024-03-25",
        estado: "En Comisión",
        descripcion: "Discutida en Comisión Primera, se aprueba citación al Secretario.",
      },
      {
        fecha: "2024-04-15",
        estado: "Debate realizado",
        descripcion: "Se realizó debate de control político con asistencia del Secretario de Seguridad.",
        notas: "El Secretario presentó informe con estadísticas de reducción del 12% en hurtos.",
      },
      {
        fecha: "2024-05-02",
        estado: "Archivada",
        descripcion: "Proposición archivada tras cumplimiento del control político.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-003",
    numero_radicado: "AC-2024-010",
    titulo:
      "Acuerdo para la creación del Sistema Distrital de Cámaras de Vigilancia Comunitaria",
    descripcion:
      "Proyecto de acuerdo que propone la implementación de un sistema integrado de cámaras de vigilancia en zonas de alta incidencia delictiva, articulado con la Policía Nacional y las Juntas de Acción Comunal.",
    tipo: "acuerdo",
    estado: "en_comision",
    fecha_radicacion: "2024-06-20",
    comision: "Primera",
    linea_tematica: "seguridad",
    tags: ["vigilancia", "cámaras", "seguridad tecnológica", "prevención del delito"],
    autores_ids: ["a5", "a7", "a11"],
    trazabilidad: [
      {
        fecha: "2024-06-20",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-07-15",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a Comisión Primera para estudio.",
      },
      {
        fecha: "2024-08-20",
        estado: "En estudio",
        descripcion: "Se designaron ponentes y se solicitó concepto a la Secretaría de Seguridad.",
        notas: "Se espera concepto técnico y financiero de la administración.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-004",
    numero_radicado: "DB-2025-001",
    titulo:
      "Debate sobre la implementación del Plan Integral de Convivencia y Seguridad Ciudadana 2024-2027",
    descripcion:
      "Debate de control político para evaluar el avance en la implementación del Plan Integral de Convivencia y Seguridad Ciudadana, sus indicadores de gestión y el impacto en la reducción de homicidios y hurtos.",
    tipo: "debate",
    estado: "primer_debate",
    fecha_radicacion: "2025-01-20",
    comision: "Primera",
    linea_tematica: "seguridad",
    tags: ["convivencia", "plan de seguridad", "homicidios", "hurtos"],
    autores_ids: ["a2", "a5"],
    trazabilidad: [
      {
        fecha: "2025-01-20",
        estado: "Radicado",
        descripcion: "Radicación de solicitud de debate.",
      },
      {
        fecha: "2025-02-10",
        estado: "Programado",
        descripcion: "Debate programado para sesión de Comisión Primera.",
      },
      {
        fecha: "2025-03-05",
        estado: "En primer debate",
        descripcion: "Debate en curso con participación del Secretario de Seguridad y comandante de Policía Metropolitana.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-005",
    numero_radicado: "AC-2025-003",
    titulo:
      "Acuerdo para la creación del programa de prevención de violencia de género en el espacio público",
    descripcion:
      "Proyecto de acuerdo que establece un programa de prevención de violencia de género en espacios públicos de Medellín, incluyendo rutas seguras, iluminación estratégica y capacitación comunitaria.",
    tipo: "acuerdo",
    estado: "radicada",
    fecha_radicacion: "2025-02-28",
    comision: "Primera",
    linea_tematica: "seguridad",
    tags: ["violencia de género", "espacio público", "prevención", "rutas seguras"],
    autores_ids: ["a6", "a8", "a14"],
    trazabilidad: [
      {
        fecha: "2025-02-28",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo ante la Secretaría General.",
      },
      {
        fecha: "2025-03-12",
        estado: "En revisión",
        descripcion: "En revisión de requisitos formales por la Secretaría General.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-006",
    numero_radicado: "RE-2024-001",
    titulo:
      "Resolución para la conformación de la Mesa de Seguridad con Líderes Comunitarios",
    descripcion:
      "Resolución que establece una mesa permanente de diálogo entre concejales, líderes comunitarios y autoridades de seguridad para el seguimiento a las problemáticas de seguridad en las comunas.",
    tipo: "resolucion",
    estado: "aprobada",
    fecha_radicacion: "2024-04-10",
    comision: "Plenaria",
    linea_tematica: "seguridad",
    tags: ["líderes comunitarios", "mesa de diálogo", "seguridad participativa"],
    autores_ids: ["a1", "a3", "a9"],
    trazabilidad: [
      {
        fecha: "2024-04-10",
        estado: "Radicada",
        descripcion: "Radicación de la resolución.",
      },
      {
        fecha: "2024-04-28",
        estado: "Discusión en plenaria",
        descripcion: "Discutida y aprobada en sesión plenaria por unanimidad.",
      },
      {
        fecha: "2024-05-05",
        estado: "Aprobada",
        descripcion: "Resolución publicada y en vigor.",
      },
    ],
    documento_url: null,
  },

  // ─── EDUCACIÓN (6 initiatives) ────────────────────────────────────────
  {
    id: "ini-007",
    numero_radicado: "RE-2024-003",
    titulo:
      "Resolución para la creación del programa de becas universitarias distritales",
    descripcion:
      "Resolución que crea el programa de becas universitarias distritales para jóvenes de estratos 1, 2 y 3 de Medellín, en convenio con universidades públicas y privadas de la ciudad.",
    tipo: "resolucion",
    estado: "aprobada",
    fecha_radicacion: "2024-03-05",
    comision: "Segunda",
    linea_tematica: "educacion",
    tags: ["becas", "educación superior", "jóvenes", "acceso universitario"],
    autores_ids: ["a4", "a8"],
    trazabilidad: [
      {
        fecha: "2024-03-05",
        estado: "Radicada",
        descripcion: "Radicación de la resolución.",
      },
      {
        fecha: "2024-03-20",
        estado: "En Comisión",
        descripcion: "Asignada a la Comisión Segunda para estudio.",
      },
      {
        fecha: "2024-04-15",
        estado: "Aprobada en comisión",
        descripcion: "Aprobada por unanimidad en la Comisión Segunda.",
      },
      {
        fecha: "2024-05-10",
        estado: "Aprobada en plenaria",
        descripcion: "Aprobada en plenaria con 17 votos a favor.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-008",
    numero_radicado: "AC-2024-005",
    titulo:
      "Acuerdo para la implementación del programa de educación digital en instituciones educativas públicas",
    descripcion:
      "Proyecto de acuerdo que ordena la implementación progresiva de un programa de educación digital en las instituciones educativas oficiales de Medellín, incluyendo dotación de equipos, conectividad y formación docente.",
    tipo: "acuerdo",
    estado: "segundo_debate",
    fecha_radicacion: "2024-04-18",
    comision: "Segunda",
    linea_tematica: "educacion",
    tags: ["educación digital", "tecnología", "instituciones públicas", "conectividad"],
    autores_ids: ["a3", "a12"],
    trazabilidad: [
      {
        fecha: "2024-04-18",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-05-12",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Segunda para ponencia.",
      },
      {
        fecha: "2024-06-28",
        estado: "Primer Debate",
        descripcion: "Aprobado en primer debate en Comisión Segunda.",
        notas: "Se incluyó artículo transitorio para pilotos en 5 comunas.",
      },
      {
        fecha: "2024-08-15",
        estado: "Segundo Debate",
        descripcion: "En trámite de segundo debate en sesión plenaria.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-009",
    numero_radicado: "PR-2024-008",
    titulo:
      "Proposición para el control político sobre la deserción escolar en Medellín",
    descripcion:
      "Proposición para citar a la Secretaria de Educación a debate de control político sobre las cifras de deserción escolar en la ciudad, las estrategias de retención y los programas de alimentación escolar.",
    tipo: "proposicion",
    estado: "archivada",
    fecha_radicacion: "2024-05-22",
    comision: "Segunda",
    linea_tematica: "educacion",
    tags: ["deserción escolar", "retención estudiantil", "alimentación escolar"],
    autores_ids: ["a6", "a14"],
    trazabilidad: [
      {
        fecha: "2024-05-22",
        estado: "Radicada",
        descripcion: "Radicación de proposición.",
      },
      {
        fecha: "2024-06-10",
        estado: "Programada",
        descripcion: "Programada citación a la Secretaria de Educación.",
      },
      {
        fecha: "2024-07-05",
        estado: "Debate realizado",
        descripcion: "Se realizó debate con presentación de informe por la Secretaría de Educación.",
        notas: "Se evidenció una reducción del 3% en deserción respecto al año anterior.",
      },
      {
        fecha: "2024-07-20",
        estado: "Archivada",
        descripcion: "Proposición archivada tras cumplimiento del control político.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-010",
    numero_radicado: "AC-2025-006",
    titulo:
      "Acuerdo para el fortalecimiento de las bibliotecas públicas comunitarias de Medellín",
    descripcion:
      "Proyecto de acuerdo para el fortalecimiento de la red de bibliotecas públicas comunitarias, incluyendo ampliación de horarios, actualización de colecciones, espacios maker y programas de lectura para primera infancia.",
    tipo: "acuerdo",
    estado: "en_comision",
    fecha_radicacion: "2025-01-15",
    comision: "Segunda",
    linea_tematica: "educacion",
    tags: ["bibliotecas", "lectura", "primera infancia", "cultura"],
    autores_ids: ["a8", "a15"],
    trazabilidad: [
      {
        fecha: "2025-01-15",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2025-02-05",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Segunda para ponencia.",
      },
      {
        fecha: "2025-03-01",
        estado: "En estudio",
        descripcion: "Ponentes designados, en proceso de elaboración de ponencias.",
        notas: "Se solicitó concepto a la Secretaría de Cultura Ciudadana.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-011",
    numero_radicado: "DB-2025-004",
    titulo:
      "Debate sobre la calidad educativa en las instituciones oficiales de Medellín",
    descripcion:
      "Debate para analizar los resultados de las pruebas Saber 11 y los indicadores de calidad educativa en las instituciones oficiales, con énfasis en la brecha entre comunas.",
    tipo: "debate",
    estado: "retirada",
    fecha_radicacion: "2025-03-10",
    comision: "Segunda",
    linea_tematica: "educacion",
    tags: ["calidad educativa", "pruebas Saber", "brecha educativa", "indicadores"],
    autores_ids: ["a4", "a9"],
    trazabilidad: [
      {
        fecha: "2025-03-10",
        estado: "Radicado",
        descripcion: "Radicación de solicitud de debate de control político.",
      },
      {
        fecha: "2025-03-20",
        estado: "En revisión",
        descripcion: "En revisión por la mesa directiva para programación.",
      },
      {
        fecha: "2025-04-02",
        estado: "Retirado",
        descripcion: "Retirado por los autores al considerar que los indicadores del MEN cubren el análisis solicitado.",
        notas: "Se acordó incorporar el tema en un debate más amplio sobre política educativa distrital.",
      },
    ],
    documento_url: null,
  },

  // ─── ECONOMÍA (5 initiatives) ─────────────────────────────────────────
  {
    id: "ini-012",
    numero_radicado: "AC-2024-003",
    titulo:
      "Acuerdo para la creación del Fondo de Emprendimiento Juvenil del Distrito de Medellín",
    descripcion:
      "Proyecto de acuerdo que crea un fondo de capital semilla para emprendimientos de jóvenes entre 18 y 28 años, con acompañamiento técnico de Ruta N y las incubadoras de negocios de la ciudad.",
    tipo: "acuerdo",
    estado: "aprobada",
    fecha_radicacion: "2024-02-28",
    comision: "Tercera",
    linea_tematica: "economia",
    tags: ["emprendimiento", "juventud", "capital semilla", "Ruta N"],
    autores_ids: ["a3", "a7"],
    trazabilidad: [
      {
        fecha: "2024-02-28",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-03-18",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Tercera.",
      },
      {
        fecha: "2024-04-25",
        estado: "Primer Debate",
        descripcion: "Aprobado en primer debate con modificaciones al monto del fondo.",
        notas: "Monto ajustado de 5.000 a 8.000 millones de pesos.",
      },
      {
        fecha: "2024-06-10",
        estado: "Segundo Debate",
        descripcion: "Aprobado en segundo debate en plenaria.",
      },
      {
        fecha: "2024-06-25",
        estado: "Aprobado",
        descripcion: "Sancionado por la Alcaldía. Vigente a partir de julio 2024.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-013",
    numero_radicado: "PR-2024-005",
    titulo:
      "Proposición de control político sobre la ejecución del presupuesto de inversión social 2024",
    descripcion:
      "Proposición para citar al Secretario de Hacienda a debate de control político sobre el nivel de ejecución del presupuesto de inversión social en el primer semestre de 2024.",
    tipo: "proposicion",
    estado: "archivada",
    fecha_radicacion: "2024-07-10",
    comision: "Tercera",
    linea_tematica: "economia",
    tags: ["presupuesto", "inversión social", "ejecución presupuestal", "hacienda"],
    autores_ids: ["a2", "a10", "a13"],
    trazabilidad: [
      {
        fecha: "2024-07-10",
        estado: "Radicada",
        descripcion: "Radicación de proposición de control político.",
      },
      {
        fecha: "2024-07-28",
        estado: "Programada",
        descripcion: "Programada citación al Secretario de Hacienda.",
      },
      {
        fecha: "2024-08-20",
        estado: "Debate realizado",
        descripcion: "Debate de control político realizado en Comisión Tercera.",
        notas: "Se reportó ejecución del 38% del presupuesto al primer semestre.",
      },
      {
        fecha: "2024-09-05",
        estado: "Archivada",
        descripcion: "Proposición archivada tras el debate.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-014",
    numero_radicado: "AC-2024-015",
    titulo:
      "Acuerdo para el fomento de la economía popular y solidaria en las plazas de mercado de Medellín",
    descripcion:
      "Proyecto de acuerdo que establece incentivos tributarios y programas de formalización para los comerciantes de las plazas de mercado distritales, fortaleciendo la economía popular y solidaria.",
    tipo: "acuerdo",
    estado: "primer_debate",
    fecha_radicacion: "2024-09-12",
    comision: "Tercera",
    linea_tematica: "economia",
    tags: ["economía popular", "plazas de mercado", "formalización", "incentivos tributarios"],
    autores_ids: ["a1", "a15"],
    trazabilidad: [
      {
        fecha: "2024-09-12",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-10-05",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Tercera para estudio.",
      },
      {
        fecha: "2024-11-18",
        estado: "En primer debate",
        descripcion: "En discusión en primer debate en Comisión Tercera.",
        notas: "Se solicitaron ajustes al articulado sobre incentivos tributarios.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-015",
    numero_radicado: "AC-2025-009",
    titulo:
      "Acuerdo para la regulación del comercio informal en el centro de Medellín",
    descripcion:
      "Proyecto de acuerdo que busca establecer un marco regulatorio para la actividad comercial informal en el centro de la ciudad, con zonas designadas, registro de vendedores y acceso a microcréditos.",
    tipo: "acuerdo",
    estado: "retirada",
    fecha_radicacion: "2025-01-25",
    comision: "Tercera",
    linea_tematica: "economia",
    tags: ["comercio informal", "centro de Medellín", "vendedores ambulantes", "regulación"],
    autores_ids: ["a9", "a13"],
    trazabilidad: [
      {
        fecha: "2025-01-25",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2025-02-15",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Tercera.",
      },
      {
        fecha: "2025-03-10",
        estado: "Retirado",
        descripcion: "Retirado por los autores para reformulación del articulado.",
        notas: "Los autores anunciaron que presentarán una nueva versión con ajustes tras consultas con organizaciones de vendedores.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-016",
    numero_radicado: "PR-2025-003",
    titulo:
      "Proposición sobre el impacto económico del turismo en Medellín y su regulación",
    descripcion:
      "Proposición para solicitar a la Secretaría de Desarrollo Económico un informe detallado sobre el impacto económico del turismo, la regulación de plataformas de alojamiento y las estrategias de turismo sostenible.",
    tipo: "proposicion",
    estado: "en_comision",
    fecha_radicacion: "2025-02-18",
    comision: "Tercera",
    linea_tematica: "economia",
    tags: ["turismo", "impacto económico", "regulación", "alojamiento turístico"],
    autores_ids: ["a7", "a11"],
    trazabilidad: [
      {
        fecha: "2025-02-18",
        estado: "Radicada",
        descripcion: "Radicación de proposición.",
      },
      {
        fecha: "2025-03-05",
        estado: "En Comisión",
        descripcion: "En estudio por la Comisión Tercera, pendiente programación de debate.",
      },
    ],
    documento_url: null,
  },

  // ─── MOVILIDAD (6 initiatives) ────────────────────────────────────────
  {
    id: "ini-017",
    numero_radicado: "DB-2025-008",
    titulo:
      "Debate sobre la implementación del Plan de Movilidad Sostenible 2025",
    descripcion:
      "Debate de control político para evaluar el estado de implementación del Plan de Movilidad Sostenible, incluyendo la ampliación de ciclorrutas, el sistema de bicicletas públicas y la integración tarifaria del transporte público.",
    tipo: "debate",
    estado: "primer_debate",
    fecha_radicacion: "2025-03-01",
    comision: "Plan y Tierras",
    linea_tematica: "movilidad",
    tags: ["movilidad sostenible", "ciclorrutas", "transporte público", "bicicletas"],
    autores_ids: ["a4", "a12"],
    trazabilidad: [
      {
        fecha: "2025-03-01",
        estado: "Radicado",
        descripcion: "Radicación de solicitud de debate.",
      },
      {
        fecha: "2025-03-18",
        estado: "Programado",
        descripcion: "Programado para sesión de la Comisión de Plan y Tierras.",
      },
      {
        fecha: "2025-04-02",
        estado: "En debate",
        descripcion: "Debate en curso con participación del Secretario de Movilidad.",
        notas: "Se solicitó ampliación del debate para segunda sesión.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-018",
    numero_radicado: "AC-2024-007",
    titulo:
      "Acuerdo para la ampliación de la red de ciclorrutas de Medellín",
    descripcion:
      "Proyecto de acuerdo que ordena la ampliación de la red de ciclorrutas de la ciudad en 50 kilómetros adicionales, priorizando la conectividad entre comunas y las estaciones del Metro.",
    tipo: "acuerdo",
    estado: "aprobada",
    fecha_radicacion: "2024-05-10",
    comision: "Plan y Tierras",
    linea_tematica: "movilidad",
    tags: ["ciclorrutas", "infraestructura vial", "movilidad activa", "Metro"],
    autores_ids: ["a4", "a6", "a12"],
    trazabilidad: [
      {
        fecha: "2024-05-10",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-06-02",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión de Plan y Tierras.",
      },
      {
        fecha: "2024-07-20",
        estado: "Primer Debate",
        descripcion: "Aprobado en primer debate con 7 votos a favor y 2 en contra.",
      },
      {
        fecha: "2024-09-05",
        estado: "Segundo Debate",
        descripcion: "Aprobado en segundo debate en plenaria con 15 votos a favor.",
      },
      {
        fecha: "2024-09-20",
        estado: "Aprobado",
        descripcion: "Sancionado por la Alcaldía.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-019",
    numero_radicado: "PR-2024-011",
    titulo:
      "Proposición de control político sobre las obras del corredor vial de la 80",
    descripcion:
      "Proposición para citar al Secretario de Infraestructura Física a debate sobre el avance de las obras del corredor vial de la carrera 80, los sobrecostos reportados y el cronograma de entrega.",
    tipo: "proposicion",
    estado: "archivada",
    fecha_radicacion: "2024-08-05",
    comision: "Plan y Tierras",
    linea_tematica: "movilidad",
    tags: ["corredor vial", "carrera 80", "infraestructura", "obras públicas"],
    autores_ids: ["a2", "a5"],
    trazabilidad: [
      {
        fecha: "2024-08-05",
        estado: "Radicada",
        descripcion: "Radicación de proposición de control político.",
      },
      {
        fecha: "2024-08-22",
        estado: "Programada",
        descripcion: "Programada citación al Secretario de Infraestructura.",
      },
      {
        fecha: "2024-09-15",
        estado: "Debate realizado",
        descripcion: "Debate realizado con presentación de informe de avance de obras.",
        notas: "El Secretario reportó avance del 62% y negó sobrecostos.",
      },
      {
        fecha: "2024-10-01",
        estado: "Archivada",
        descripcion: "Archivada tras cumplimiento del control político.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-020",
    numero_radicado: "AC-2025-011",
    titulo:
      "Acuerdo para la regulación de plataformas de transporte por aplicación en Medellín",
    descripcion:
      "Proyecto de acuerdo para establecer un marco regulatorio local para las plataformas de transporte por aplicación, incluyendo requisitos de registro, seguros obligatorios y zonas de recogida.",
    tipo: "acuerdo",
    estado: "radicada",
    fecha_radicacion: "2025-03-15",
    comision: "Plan y Tierras",
    linea_tematica: "movilidad",
    tags: ["transporte por aplicación", "regulación", "taxis", "plataformas digitales"],
    autores_ids: ["a3", "a9"],
    trazabilidad: [
      {
        fecha: "2025-03-15",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo ante la Secretaría General.",
      },
      {
        fecha: "2025-03-28",
        estado: "En revisión",
        descripcion: "En revisión de requisitos formales.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-021",
    numero_radicado: "RE-2024-005",
    titulo:
      "Resolución para la creación de la comisión accidental de seguimiento al Metro de la 80",
    descripcion:
      "Resolución que conforma una comisión accidental del Concejo para hacer seguimiento a la construcción del corredor del Metro de la 80, sus impactos urbanísticos y la gestión social del proyecto.",
    tipo: "resolucion",
    estado: "aprobada",
    fecha_radicacion: "2024-06-15",
    comision: "Plenaria",
    linea_tematica: "movilidad",
    tags: ["Metro de la 80", "comisión accidental", "seguimiento", "transporte masivo"],
    autores_ids: ["a1", "a4", "a8"],
    trazabilidad: [
      {
        fecha: "2024-06-15",
        estado: "Radicada",
        descripcion: "Radicación de la resolución.",
      },
      {
        fecha: "2024-07-02",
        estado: "Discusión en plenaria",
        descripcion: "Discutida en sesión plenaria.",
      },
      {
        fecha: "2024-07-02",
        estado: "Aprobada",
        descripcion: "Aprobada por unanimidad. Comisión conformada por 5 concejales.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-022",
    numero_radicado: "OT-2024-001",
    titulo:
      "Audiencia pública sobre el impacto del Tranvía de Ayacucho en la transformación urbana del oriente",
    descripcion:
      "Audiencia pública convocada para escuchar las voces de la comunidad del oriente de Medellín sobre el impacto del sistema Tranvía-Cable en la transformación urbana, social y económica de las comunas 8, 9 y 10.",
    tipo: "otro",
    estado: "archivada",
    fecha_radicacion: "2024-10-05",
    comision: "Plenaria",
    linea_tematica: "movilidad",
    tags: ["Tranvía de Ayacucho", "transformación urbana", "audiencia pública", "oriente"],
    autores_ids: ["a6", "a15"],
    trazabilidad: [
      {
        fecha: "2024-10-05",
        estado: "Radicada",
        descripcion: "Solicitud de audiencia pública radicada.",
      },
      {
        fecha: "2024-10-22",
        estado: "Aprobada convocatoria",
        descripcion: "Mesa directiva aprueba la convocatoria a audiencia pública.",
      },
      {
        fecha: "2024-11-15",
        estado: "Audiencia realizada",
        descripcion: "Audiencia pública realizada con participación de más de 200 ciudadanos.",
        notas: "Se recogieron 45 intervenciones ciudadanas que serán insumo para futuros proyectos.",
      },
      {
        fecha: "2024-12-01",
        estado: "Archivada",
        descripcion: "Archivada con relatoría y compromisos de seguimiento.",
      },
    ],
    documento_url: null,
  },

  // ─── AMBIENTE (5 initiatives) ─────────────────────────────────────────
  {
    id: "ini-023",
    numero_radicado: "PR-2025-012",
    titulo:
      "Proposición de control político sobre calidad del aire en el Valle de Aburrá",
    descripcion:
      "Proposición para citar a las autoridades ambientales a debate de control político sobre las medidas adoptadas para mejorar la calidad del aire en el Valle de Aburrá, incluyendo restricciones vehiculares y control de emisiones industriales.",
    tipo: "proposicion",
    estado: "en_comision",
    fecha_radicacion: "2025-02-10",
    comision: "Segunda",
    linea_tematica: "ambiente",
    tags: ["calidad del aire", "Valle de Aburrá", "emisiones", "contaminación"],
    autores_ids: ["a4", "a12", "a14"],
    trazabilidad: [
      {
        fecha: "2025-02-10",
        estado: "Radicada",
        descripcion: "Radicación de proposición de control político.",
      },
      {
        fecha: "2025-02-28",
        estado: "En Comisión",
        descripcion: "Asignada a la Comisión Segunda para programación del debate.",
      },
      {
        fecha: "2025-03-15",
        estado: "En trámite",
        descripcion: "Pendiente programación de la citación a autoridades ambientales.",
        notas: "Se solicitó información adicional al Área Metropolitana del Valle de Aburrá.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-024",
    numero_radicado: "AC-2024-012",
    titulo:
      "Acuerdo para la protección y restauración de los cerros tutelares de Medellín",
    descripcion:
      "Proyecto de acuerdo que establece un plan de protección y restauración ecológica de los cerros tutelares de la ciudad (Nutibara, El Volador, Pan de Azúcar, La Asomadera, El Picacho, El Salvador y Santo Domingo), incluyendo corredores ecológicos urbanos.",
    tipo: "acuerdo",
    estado: "segundo_debate",
    fecha_radicacion: "2024-07-22",
    comision: "Segunda",
    linea_tematica: "ambiente",
    tags: ["cerros tutelares", "restauración ecológica", "corredores verdes", "biodiversidad"],
    autores_ids: ["a4", "a8"],
    trazabilidad: [
      {
        fecha: "2024-07-22",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-08-15",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Segunda.",
      },
      {
        fecha: "2024-10-10",
        estado: "Primer Debate",
        descripcion: "Aprobado en primer debate en Comisión Segunda.",
        notas: "Se incorporaron recomendaciones del Jardín Botánico de Medellín.",
      },
      {
        fecha: "2024-12-05",
        estado: "En segundo debate",
        descripcion: "Programado para segundo debate en plenaria.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-025",
    numero_radicado: "AC-2025-014",
    titulo:
      "Acuerdo para la gestión integral de residuos sólidos y la promoción de la economía circular",
    descripcion:
      "Proyecto de acuerdo que establece lineamientos para la gestión integral de residuos sólidos en Medellín, promoviendo la separación en la fuente, el reciclaje inclusivo y la economía circular.",
    tipo: "acuerdo",
    estado: "radicada",
    fecha_radicacion: "2025-03-20",
    comision: "Segunda",
    linea_tematica: "ambiente",
    tags: ["residuos sólidos", "economía circular", "reciclaje", "separación en la fuente"],
    autores_ids: ["a12", "a14"],
    trazabilidad: [
      {
        fecha: "2025-03-20",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2025-04-01",
        estado: "En revisión",
        descripcion: "En revisión de requisitos formales por la Secretaría General.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-026",
    numero_radicado: "DB-2024-003",
    titulo:
      "Debate sobre la gestión del riesgo por inundaciones y deslizamientos en temporada invernal",
    descripcion:
      "Debate de control político para evaluar la preparación del Distrito ante la temporada invernal, las zonas de alto riesgo no mitigable y los programas de reubicación de familias.",
    tipo: "debate",
    estado: "archivada",
    fecha_radicacion: "2024-09-18",
    comision: "Segunda",
    linea_tematica: "ambiente",
    tags: ["gestión del riesgo", "inundaciones", "deslizamientos", "reubicación"],
    autores_ids: ["a1", "a6"],
    trazabilidad: [
      {
        fecha: "2024-09-18",
        estado: "Radicado",
        descripcion: "Radicación de solicitud de debate.",
      },
      {
        fecha: "2024-10-08",
        estado: "Programado",
        descripcion: "Debate programado para sesión de Comisión Segunda.",
      },
      {
        fecha: "2024-10-25",
        estado: "Debate realizado",
        descripcion: "Debate realizado con asistencia del DAGRD y la Secretaría del Medio Ambiente.",
        notas: "Se identificaron 12 zonas críticas que requieren intervención urgente.",
      },
      {
        fecha: "2024-11-10",
        estado: "Archivada",
        descripcion: "Archivada con acta de compromisos de la administración.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-027",
    numero_radicado: "OT-2025-002",
    titulo:
      "Foro distrital sobre cambio climático y sus efectos en Medellín",
    descripcion:
      "Convocatoria a foro distrital para analizar los efectos del cambio climático en Medellín, con participación de la academia, la sociedad civil y la administración municipal, enfocado en la adaptación y mitigación.",
    tipo: "otro",
    estado: "radicada",
    fecha_radicacion: "2025-04-01",
    comision: "Plenaria",
    linea_tematica: "ambiente",
    tags: ["cambio climático", "adaptación", "mitigación", "foro distrital"],
    autores_ids: ["a4", "a8", "a15"],
    trazabilidad: [
      {
        fecha: "2025-04-01",
        estado: "Radicada",
        descripcion: "Radicación de solicitud de foro distrital.",
      },
      {
        fecha: "2025-04-10",
        estado: "En revisión",
        descripcion: "En revisión por la mesa directiva del Concejo.",
      },
    ],
    documento_url: null,
  },

  // ─── SALUD (6 initiatives) ────────────────────────────────────────────
  {
    id: "ini-028",
    numero_radicado: "AC-2024-008",
    titulo:
      "Acuerdo para el fortalecimiento de la red pública hospitalaria del Distrito de Medellín",
    descripcion:
      "Proyecto de acuerdo que establece un plan de fortalecimiento de la red pública hospitalaria, incluyendo inversiones en infraestructura, dotación de equipos y contratación de personal médico especializado.",
    tipo: "acuerdo",
    estado: "aprobada",
    fecha_radicacion: "2024-04-25",
    comision: "Primera",
    linea_tematica: "salud",
    tags: ["red hospitalaria", "salud pública", "infraestructura médica", "personal médico"],
    autores_ids: ["a3", "a6", "a9"],
    trazabilidad: [
      {
        fecha: "2024-04-25",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-05-15",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Primera para ponencia.",
      },
      {
        fecha: "2024-06-22",
        estado: "Primer Debate",
        descripcion: "Aprobado en primer debate con ajustes al cronograma de inversiones.",
      },
      {
        fecha: "2024-08-10",
        estado: "Segundo Debate",
        descripcion: "Aprobado en segundo debate en plenaria con 16 votos a favor.",
      },
      {
        fecha: "2024-08-28",
        estado: "Aprobado",
        descripcion: "Sancionado por la Alcaldía y en proceso de reglamentación.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-029",
    numero_radicado: "PR-2024-015",
    titulo:
      "Proposición sobre el estado de la salud mental en Medellín post-pandemia",
    descripcion:
      "Proposición para solicitar a la Secretaría de Salud un informe detallado sobre el estado de la salud mental en la ciudad, los programas de atención psicosocial y las cifras de suicidio e intentos de suicidio post-pandemia.",
    tipo: "proposicion",
    estado: "archivada",
    fecha_radicacion: "2024-10-15",
    comision: "Primera",
    linea_tematica: "salud",
    tags: ["salud mental", "post-pandemia", "atención psicosocial", "suicidio"],
    autores_ids: ["a8", "a14"],
    trazabilidad: [
      {
        fecha: "2024-10-15",
        estado: "Radicada",
        descripcion: "Radicación de proposición.",
      },
      {
        fecha: "2024-11-05",
        estado: "Programada",
        descripcion: "Programada citación a la Secretaria de Salud.",
      },
      {
        fecha: "2024-11-28",
        estado: "Debate realizado",
        descripcion: "Debate de control político con informe detallado de la Secretaría de Salud.",
        notas: "Se reportó un incremento del 22% en consultas de salud mental entre 2022 y 2024.",
      },
      {
        fecha: "2024-12-10",
        estado: "Archivada",
        descripcion: "Archivada con compromisos de la administración para ampliar centros de atención.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-030",
    numero_radicado: "AC-2025-016",
    titulo:
      "Acuerdo para la creación del programa de atención primaria en salud en zonas rurales de Medellín",
    descripcion:
      "Proyecto de acuerdo que crea un programa de atención primaria en salud en los cinco corregimientos de Medellín, incluyendo brigadas médicas itinerantes, telemedicina y dotación de centros de salud rural.",
    tipo: "acuerdo",
    estado: "en_comision",
    fecha_radicacion: "2025-02-05",
    comision: "Primera",
    linea_tematica: "salud",
    tags: ["atención primaria", "salud rural", "corregimientos", "telemedicina"],
    autores_ids: ["a1", "a11"],
    trazabilidad: [
      {
        fecha: "2025-02-05",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2025-02-25",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Primera.",
      },
      {
        fecha: "2025-03-15",
        estado: "En estudio",
        descripcion: "Ponentes designados, en proceso de elaboración de ponencias.",
        notas: "Se realizó visita a los centros de salud de los corregimientos con la Comisión.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-031",
    numero_radicado: "RE-2025-002",
    titulo:
      "Resolución para la declaratoria de alerta sanitaria por consumo de sustancias psicoactivas en menores",
    descripcion:
      "Resolución que solicita a la administración distrital declarar alerta sanitaria ante el incremento del consumo de sustancias psicoactivas en menores de edad, y activar protocolos de intervención interinstitucional.",
    tipo: "resolucion",
    estado: "primer_debate",
    fecha_radicacion: "2025-01-10",
    comision: "Plenaria",
    linea_tematica: "salud",
    tags: ["sustancias psicoactivas", "menores de edad", "alerta sanitaria", "prevención"],
    autores_ids: ["a6", "a10", "a14"],
    trazabilidad: [
      {
        fecha: "2025-01-10",
        estado: "Radicada",
        descripcion: "Radicación de la resolución.",
      },
      {
        fecha: "2025-01-28",
        estado: "En discusión",
        descripcion: "En discusión en sesión plenaria del Concejo.",
      },
      {
        fecha: "2025-02-15",
        estado: "En primer debate",
        descripcion: "Continúa la discusión con solicitud de información adicional al ICBF y Secretaría de Salud.",
        notas: "Se espera votación en la próxima sesión plenaria.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-032",
    numero_radicado: "AC-2024-020",
    titulo:
      "Acuerdo para la promoción de la lactancia materna y los bancos de leche en Medellín",
    descripcion:
      "Proyecto de acuerdo que promueve la lactancia materna mediante la creación de salas amigas de la familia lactante en entidades públicas y privadas, y el fortalecimiento de los bancos de leche materna.",
    tipo: "acuerdo",
    estado: "retirada",
    fecha_radicacion: "2024-11-20",
    comision: "Primera",
    linea_tematica: "salud",
    tags: ["lactancia materna", "bancos de leche", "primera infancia", "salud materno-infantil"],
    autores_ids: ["a8", "a12"],
    trazabilidad: [
      {
        fecha: "2024-11-20",
        estado: "Radicado",
        descripcion: "Radicación del proyecto de acuerdo.",
      },
      {
        fecha: "2024-12-10",
        estado: "Asignado a Comisión",
        descripcion: "Asignado a la Comisión Primera.",
      },
      {
        fecha: "2025-01-15",
        estado: "Retirado",
        descripcion: "Retirado por las autoras al encontrar duplicidad con normativa nacional vigente.",
        notas: "Se retiró voluntariamente para evitar conflicto normativo con la Ley 1823 de 2017.",
      },
    ],
    documento_url: null,
  },
  {
    id: "ini-033",
    numero_radicado: "DB-2025-006",
    titulo:
      "Debate sobre la cobertura de vacunación infantil en Medellín",
    descripcion:
      "Debate de control político para evaluar las tasas de cobertura de vacunación del Programa Ampliado de Inmunizaciones (PAI) en Medellín, las barreras de acceso y las estrategias para alcanzar coberturas útiles.",
    tipo: "debate",
    estado: "radicada",
    fecha_radicacion: "2025-04-05",
    comision: "Primera",
    linea_tematica: "salud",
    tags: ["vacunación", "cobertura PAI", "salud infantil", "inmunización"],
    autores_ids: ["a3", "a15"],
    trazabilidad: [
      {
        fecha: "2025-04-05",
        estado: "Radicado",
        descripcion: "Radicación de solicitud de debate de control político.",
      },
      {
        fecha: "2025-04-15",
        estado: "En revisión",
        descripcion: "En revisión por la mesa directiva para programación.",
      },
    ],
    documento_url: null,
  },
];
