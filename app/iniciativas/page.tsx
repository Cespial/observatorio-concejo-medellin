import { getIniciativasFromDb } from "@/lib/services/iniciativas";
import { IniciativasPageClient } from "./_components/iniciativas-page-client";

export const metadata = { title: "Iniciativas Legislativas" };

export default async function IniciativasPage() {
  const { iniciativas, autores } = await getIniciativasFromDb();
  return <IniciativasPageClient serverIniciativas={iniciativas} serverAutores={autores} />;
}
