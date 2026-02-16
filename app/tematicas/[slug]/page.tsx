import { notFound } from "next/navigation";
import { THEMATIC_LINES } from "@/lib/constants";
import { getThematicData } from "@/lib/services/indicadores";
import { ThematicDashboard } from "./_components/thematic-dashboard";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return THEMATIC_LINES.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Props) {
  const line = THEMATIC_LINES.find((l) => l.slug === params.slug);
  if (!line) return { title: "No encontrado" };
  return { title: `${line.name} | Dashboard` };
}

export default async function TematicaDetailPage({ params }: Props) {
  const line = THEMATIC_LINES.find((l) => l.slug === params.slug);
  if (!line) notFound();

  const data = await getThematicData(params.slug);

  return <ThematicDashboard slug={params.slug} serverData={data} />;
}
