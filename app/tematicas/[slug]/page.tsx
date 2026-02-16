import { notFound } from "next/navigation";
import { THEMATIC_LINES } from "@/lib/constants";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const line = THEMATIC_LINES.find((l) => l.slug === params.slug);
  if (!line) return { title: "No encontrado" };
  return { title: line.name };
}

export default function TematicaDetailPage({ params }: Props) {
  const line = THEMATIC_LINES.find((l) => l.slug === params.slug);
  if (!line) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{ backgroundColor: line.bgColor }}
        >
          <line.icon className="h-6 w-6" style={{ color: line.color }} />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold">{line.name}</h1>
          <p className="text-muted-foreground">Dashboard de indicadores</p>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <p className="text-lg">Dashboard de {line.name} en construccion</p>
        <p className="text-sm mt-2">Los indicadores y visualizaciones se cargaran aqui.</p>
      </div>
    </div>
  );
}
