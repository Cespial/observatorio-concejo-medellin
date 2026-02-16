import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { THEMATIC_LINES } from "@/lib/constants";

export const metadata = { title: "Lineas Tematicas" };

export default function TematicasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="font-serif text-3xl font-bold mb-2">Lineas Tematicas</h1>
      <p className="text-muted-foreground mb-8">
        Seleccione una linea tematica para explorar sus indicadores.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMATIC_LINES.map((line) => (
          <Link key={line.slug} href={`/tematicas/${line.slug}`}>
            <Card className="hover:shadow-card-hover transition-shadow h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: line.bgColor }}
                  >
                    <line.icon className="h-5 w-5" style={{ color: line.color }} />
                  </div>
                  <CardTitle className="text-lg">{line.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Ver indicadores</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
