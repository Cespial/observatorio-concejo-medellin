import { notFound } from "next/navigation";
import { getIniciativaById } from "@/lib/services/iniciativas";
import { InitiativeDetailPage } from "./initiative-detail-page";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const { iniciativa } = await getIniciativaById(params.id);
  if (!iniciativa) return { title: "Iniciativa no encontrada" };
  return { title: `${iniciativa.numero_radicado} - ${iniciativa.titulo}` };
}

export default async function IniciativaDetailPage({ params }: Props) {
  const { iniciativa, autores } = await getIniciativaById(params.id);

  if (!iniciativa) {
    notFound();
  }

  return (
    <InitiativeDetailPage initiative={iniciativa} autores={autores} />
  );
}
