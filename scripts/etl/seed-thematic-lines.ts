import { supabaseAdmin, log } from "./config";

const thematicLines = [
  { nombre: "Seguridad y Convivencia", slug: "seguridad", color: "#DC2626", icono: "shield", orden: 1 },
  { nombre: "Educacion y Cultura", slug: "educacion", color: "#2563EB", icono: "graduation-cap", orden: 2 },
  { nombre: "Economia y Empleo", slug: "economia", color: "#16A34A", icono: "trending-up", orden: 3 },
  { nombre: "Movilidad y Transporte", slug: "movilidad", color: "#7C3AED", icono: "bus", orden: 4 },
  { nombre: "Medio Ambiente", slug: "ambiente", color: "#059669", icono: "leaf", orden: 5 },
  { nombre: "Salud Publica", slug: "salud", color: "#EA580C", icono: "heart", orden: 6 },
];

async function main() {
  log("info", "Seeding thematic lines...");

  for (const line of thematicLines) {
    const { error } = await supabaseAdmin
      .from("lineas_tematicas")
      .upsert(line, { onConflict: "slug" });

    if (error) log("error", `Failed to seed ${line.slug}`, error);
    else log("info", `Seeded: ${line.nombre}`);
  }

  log("info", "Thematic lines seeding complete");
}

main().catch(console.error);
