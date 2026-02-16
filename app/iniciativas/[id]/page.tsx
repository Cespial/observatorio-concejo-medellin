import { notFound } from "next/navigation";
import { MOCK_INICIATIVAS } from "@/lib/mock-data/iniciativas";
import { MOCK_AUTORES } from "@/lib/mock-data/autores";
import { InitiativeDetailPage } from "./initiative-detail-page";

type Props = {
  params: { id: string };
};

export function generateMetadata({ params }: Props) {
  const initiative = MOCK_INICIATIVAS.find((i) => i.id === params.id);
  if (!initiative) return { title: "Iniciativa no encontrada" };
  return { title: `${initiative.numero_radicado} - ${initiative.titulo}` };
}

export default function IniciativaDetailPage({ params }: Props) {
  const initiative = MOCK_INICIATIVAS.find((i) => i.id === params.id);

  if (!initiative) {
    notFound();
  }

  return (
    <InitiativeDetailPage initiative={initiative} autores={MOCK_AUTORES} />
  );
}
