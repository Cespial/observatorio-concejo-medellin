import { supabaseAdmin, log } from "./config";

const medellin = {
  nombre: "Medellin",
  tipo: "distrito",
  codigo: "MDE",
  poblacion: 2569007,
  area_km2: 380.64,
};

const comunas = [
  { nombre: "Popular", codigo: "COM01", poblacion: 131191 },
  { nombre: "Santa Cruz", codigo: "COM02", poblacion: 111452 },
  { nombre: "Manrique", codigo: "COM03", poblacion: 160253 },
  { nombre: "Aranjuez", codigo: "COM04", poblacion: 162585 },
  { nombre: "Castilla", codigo: "COM05", poblacion: 150284 },
  { nombre: "Doce de Octubre", codigo: "COM06", poblacion: 194967 },
  { nombre: "Robledo", codigo: "COM07", poblacion: 174048 },
  { nombre: "Villa Hermosa", codigo: "COM08", poblacion: 137726 },
  { nombre: "Buenos Aires", codigo: "COM09", poblacion: 136774 },
  { nombre: "La Candelaria", codigo: "COM10", poblacion: 85505 },
  { nombre: "Laureles-Estadio", codigo: "COM11", poblacion: 121234 },
  { nombre: "La America", codigo: "COM12", poblacion: 96788 },
  { nombre: "San Javier", codigo: "COM13", poblacion: 138063 },
  { nombre: "El Poblado", codigo: "COM14", poblacion: 130920 },
  { nombre: "Guayabal", codigo: "COM15", poblacion: 97479 },
  { nombre: "Belen", codigo: "COM16", poblacion: 200178 },
];

const corregimientos = [
  { nombre: "San Sebastian de Palmitas", codigo: "COR50", poblacion: 5412 },
  { nombre: "San Cristobal", codigo: "COR60", poblacion: 67462 },
  { nombre: "Altavista", codigo: "COR70", poblacion: 39441 },
  { nombre: "San Antonio de Prado", codigo: "COR80", poblacion: 106789 },
  { nombre: "Santa Elena", codigo: "COR90", poblacion: 17524 },
];

async function main() {
  log("info", "Seeding territories...");

  const { data: mdeData, error: mdeError } = await supabaseAdmin
    .from("territorios")
    .upsert(medellin, { onConflict: "codigo" })
    .select("id")
    .single();

  if (mdeError) {
    log("error", "Failed to seed Medellin", mdeError);
    return;
  }

  const padreId = mdeData.id;
  log("info", `Medellin seeded with ID: ${padreId}`);

  for (const comuna of comunas) {
    const { error } = await supabaseAdmin
      .from("territorios")
      .upsert({ ...comuna, tipo: "comuna", padre_id: padreId }, { onConflict: "codigo" });
    if (error) log("error", `Failed: ${comuna.nombre}`, error);
    else log("info", `Seeded: ${comuna.nombre}`);
  }

  for (const corr of corregimientos) {
    const { error } = await supabaseAdmin
      .from("territorios")
      .upsert({ ...corr, tipo: "corregimiento", padre_id: padreId }, { onConflict: "codigo" });
    if (error) log("error", `Failed: ${corr.nombre}`, error);
    else log("info", `Seeded: ${corr.nombre}`);
  }

  log("info", "Territory seeding complete");
}

main().catch(console.error);
