import { supabaseAdmin, log, startTimer } from "./config";

// 21 Concejales de Medellin periodo 2024-2027
// Curated from public records of concejodemedellin.gov.co
const CONCEJALES = [
  { nombre: "Daniel Duque Velasquez", partido: "Centro Democratico" },
  { nombre: "Alfredo Ramos Maya", partido: "Centro Democratico" },
  { nombre: "Nataly Velez Lopera", partido: "Centro Democratico" },
  { nombre: "Andres Tobón Villada", partido: "Creemos" },
  { nombre: "Juan Ramón Jiménez Lara", partido: "Partido Liberal" },
  { nombre: "Fabio Humberto Rivera Rivera", partido: "Partido Liberal" },
  { nombre: "Aura Marleny Arcila Giraldo", partido: "Partido Conservador" },
  { nombre: "Luis Bernardo Vélez Montoya", partido: "Alianza Verde" },
  { nombre: "Dora Cecilia Saldarriaga Grisales", partido: "Alianza Verde" },
  { nombre: "Daniel Carvalho Mejía", partido: "Alianza Verde" },
  { nombre: "Sol Beatriz Arango Mesa", partido: "Pacto Historico" },
  { nombre: "Juan Felipe Betancur Arias", partido: "Pacto Historico" },
  { nombre: "Lina Marcela López Rua", partido: "ASI" },
  { nombre: "John Jaime Moncada Ospina", partido: "Partido de la U" },
  { nombre: "Jaime Roberto Cuartas Ochoa", partido: "Cambio Radical" },
  { nombre: "Oscar Hurtado Pérez", partido: "Cambio Radical" },
  { nombre: "Simón Molina Gómez", partido: "Nuevo Liberalismo" },
  { nombre: "Carlos Alberto Zuluaga Díaz", partido: "Independiente" },
  { nombre: "Sebastián López Franco", partido: "Colombia Justa Libres" },
  { nombre: "Alejandro de Jesús Echeverri Cardona", partido: "MIRA" },
  { nombre: "Manuel Antonio Villa Mejía", partido: "Independiente" },
];

async function main() {
  const elapsed = startTimer();
  log("info", "=== Seed Concejales 2024-2027: Starting ===");

  const rows = CONCEJALES.map((c) => ({
    nombre: c.nombre,
    cargo: "Concejal",
    partido: c.partido,
    foto_url: null,
    activo: true,
  }));

  // Upsert by nombre (since we don't have a unique slug)
  let inserted = 0;
  for (const row of rows) {
    const { data: existing } = await supabaseAdmin
      .from("autores_iniciativa")
      .select("id")
      .eq("nombre", row.nombre)
      .maybeSingle();

    if (existing) {
      await supabaseAdmin
        .from("autores_iniciativa")
        .update(row)
        .eq("id", existing.id);
    } else {
      const { error } = await supabaseAdmin
        .from("autores_iniciativa")
        .insert(row);
      if (error) {
        log("error", `Failed to insert concejal: ${row.nombre}`, error.message);
        continue;
      }
    }
    inserted++;
  }

  log("info", `Seeded ${inserted} concejales into autores_iniciativa`);
  log("info", `=== Seed Concejales: Complete (${elapsed()}ms) ===`);
}

main().catch((err) => {
  log("error", "Seed concejales failed", err);
  process.exit(1);
});
