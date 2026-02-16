"use client";

import Link from "next/link";
import {
  Download,
  Calendar,
  ChevronRight,
  FileText,
  Newspaper,
  Image,
  Video,
  Headphones,
  Package,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { THEMATIC_LINES } from "@/lib/constants";
import { formatDate, formatNumber, cn } from "@/lib/utils";
import type { ProductoMock } from "@/lib/mock-data/productos";
import type { LucideIcon } from "lucide-react";

const TIPO_ICONS: Record<ProductoMock["tipo"], LucideIcon> = {
  informe: FileText,
  boletin: Newspaper,
  infografia: Image,
  video: Video,
  podcast: Headphones,
  otro: Package,
};

const TIPO_BADGE_STYLES: Record<ProductoMock["tipo"], string> = {
  informe: "bg-blue-100 text-blue-800 border-blue-200",
  boletin: "bg-green-100 text-green-800 border-green-200",
  infografia: "bg-purple-100 text-purple-800 border-purple-200",
  video: "bg-red-100 text-red-800 border-red-200",
  podcast: "bg-orange-100 text-orange-800 border-orange-200",
  otro: "bg-gray-100 text-gray-800 border-gray-200",
};

const TIPO_ICON_BG: Record<ProductoMock["tipo"], string> = {
  informe: "bg-blue-50 text-blue-600",
  boletin: "bg-green-50 text-green-600",
  infografia: "bg-purple-50 text-purple-600",
  video: "bg-red-50 text-red-600",
  podcast: "bg-orange-50 text-orange-600",
  otro: "bg-gray-50 text-gray-600",
};

const TIPO_LABELS: Record<ProductoMock["tipo"], string> = {
  informe: "Informe",
  boletin: "Boletín",
  infografia: "Infografía",
  video: "Video",
  podcast: "Podcast",
  otro: "Otro",
};

type ProductListProps = {
  productos: ProductoMock[];
};

export function ProductList({ productos }: ProductListProps) {
  return (
    <div className="flex flex-col gap-3">
      {productos.map((producto) => {
        const lineConfig = THEMATIC_LINES.find(
          (l) => l.slug === producto.linea_tematica
        );
        const Icon = TIPO_ICONS[producto.tipo];

        return (
          <Link
            key={producto.id}
            href={`/productos/${producto.slug}`}
            className="group block"
          >
            <Card className="flex items-center gap-4 p-4 transition-shadow duration-300 hover:shadow-card-hover">
              {/* Left: tipo icon */}
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                  TIPO_ICON_BG[producto.tipo]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Center: title + description + tags */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-serif text-sm font-bold leading-snug text-foreground group-hover:text-primary transition-colors truncate">
                    {producto.titulo}
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 text-xs",
                      TIPO_BADGE_STYLES[producto.tipo]
                    )}
                  >
                    {TIPO_LABELS[producto.tipo]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                  {producto.descripcion}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {producto.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {lineConfig && (
                    <Badge
                      variant="outline"
                      className="text-[10px] border-0 px-1.5 py-0"
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

              {/* Right: date + downloads + arrow */}
              <div className="hidden sm:flex shrink-0 flex-col items-end gap-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(producto.fecha_publicacion)}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {formatNumber(producto.descargas)} descargas
                </span>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
