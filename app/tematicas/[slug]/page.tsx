import { notFound } from "next/navigation";
import { THEMATIC_LINES } from "@/lib/constants";
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

export default function TematicaDetailPage({ params }: Props) {
  const line = THEMATIC_LINES.find((l) => l.slug === params.slug);
  if (!line) notFound();
  return <ThematicDashboard slug={params.slug} />;
}
