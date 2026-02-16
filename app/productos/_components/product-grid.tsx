"use client";

import Link from "next/link";
import { Download, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { THEMATIC_LINES } from "@/lib/constants";
import { formatDate, formatNumber, cn } from "@/lib/utils";
import type { ProductoMock } from "@/lib/mock-data/productos";

const TIPO_COLORS: Record<ProductoMock["tipo"], string> = {
  informe: "bg-blue-500",
  boletin: "bg-green-500",
  infografia: "bg-purple-500",
  video: "bg-red-500",
  podcast: "bg-orange-500",
  otro: "bg-gray-500",
};

const TIPO_BADGE_STYLES: Record<ProductoMock["tipo"], string> = {
  informe: "bg-blue-100 text-blue-800 border-blue-200",
  boletin: "bg-green-100 text-green-800 border-green-200",
  infografia: "bg-purple-100 text-purple-800 border-purple-200",
  video: "bg-red-100 text-red-800 border-red-200",
  podcast: "bg-orange-100 text-orange-800 border-orange-200",
  otro: "bg-gray-100 text-gray-800 border-gray-200",
};

const TIPO_LABELS: Record<ProductoMock["tipo"], string> = {
  informe: "Informe",
  boletin: "Boletín",
  infografia: "Infografía",
  video: "Video",
  podcast: "Podcast",
  otro: "Otro",
};

type ProductGridProps = {
  productos: ProductoMock[];
};

export function ProductGrid({ productos }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => {
        const lineConfig = THEMATIC_LINES.find(
          (l) => l.slug === producto.linea_tematica
        );

        return (
          <Link
            key={producto.id}
            href={`/productos/${producto.slug}`}
            className="group block"
          >
            <Card className="relative flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-card-hover">
              {/* Colored top band */}
              <div
                className={cn(
                  "h-1.5 w-full",
                  TIPO_COLORS[producto.tipo]
                )}
              />

              <div className="flex flex-1 flex-col p-5">
                {/* Tipo badge */}
                <div className="mb-3 flex items-start justify-between">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium",
                      TIPO_BADGE_STYLES[producto.tipo]
                    )}
                  >
                    {TIPO_LABELS[producto.tipo]}
                  </Badge>
                  {producto.paginas && (
                    <span className="text-xs text-muted-foreground">
                      {producto.paginas} págs.
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {producto.titulo}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {producto.descripcion}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(producto.fecha_publicacion)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {formatNumber(producto.descargas)}
                    </span>
                  </div>
                  {lineConfig && (
                    <Badge
                      variant="outline"
                      className="text-xs border-0 px-2 py-0.5"
                      style={{
                        backgroundColor: lineConfig.bgColor,
                        color: lineConfig.color,
                      }}
                    >
                      {lineConfig.name}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
