"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FileText, Video, Headphones, Image as ImageIcon } from "lucide-react";

const productIcons: Record<string, React.ElementType> = {
  informe: FileText,
  video: Video,
  podcast: Headphones,
  infografia: ImageIcon,
  boletin: FileText,
};

const mockProducts = [
  { id: "1", titulo: "Informe trimestral de seguridad Q4 2025", tipo: "informe", slug: "informe-seguridad-q4-2025", fecha: "Diciembre 2025", linea: "Seguridad", color: "#DC2626" },
  { id: "2", titulo: "Boletin estadistico de educacion 2025", tipo: "boletin", slug: "boletin-educacion-2025", fecha: "Enero 2026", linea: "Educacion", color: "#2563EB" },
  { id: "3", titulo: "Analisis del mercado laboral en Medellin", tipo: "informe", slug: "analisis-mercado-laboral", fecha: "Noviembre 2025", linea: "Economia", color: "#16A34A" },
  { id: "4", titulo: "Infografia: Calidad del aire por comunas", tipo: "infografia", slug: "infografia-calidad-aire", fecha: "Enero 2026", linea: "Medio Ambiente", color: "#059669" },
  { id: "5", titulo: "Podcast: Movilidad sostenible en el Valle de Aburra", tipo: "podcast", slug: "podcast-movilidad-sostenible", fecha: "Febrero 2026", linea: "Movilidad", color: "#7C3AED" },
  { id: "6", titulo: "Video: Estado de la salud publica 2025", tipo: "video", slug: "video-salud-publica-2025", fecha: "Diciembre 2025", linea: "Salud", color: "#EA580C" },
];

export function ProductsCarousel() {
  return (
    <SectionWrapper>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold lg:text-3xl">Publicaciones Recientes</h2>
          <p className="mt-2 text-muted-foreground">
            Informes, boletines e infografias producidos por el Observatorio.
          </p>
        </div>
        <Link href="/productos" className="text-sm font-medium text-institucional hover:underline hidden sm:block">
          Ver todos &rarr;
        </Link>
      </div>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {mockProducts.map((product) => {
            const Icon = productIcons[product.tipo] || FileText;
            return (
              <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Link href={`/productos/${product.slug}`}>
                  <Card className="group hover:shadow-card-hover transition-all duration-300 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: product.color + "20" }}
                        >
                          <Icon className="h-5 w-5" style={{ color: product.color }} />
                        </div>
                        <div className="min-w-0">
                          <Badge variant="outline" className="text-[10px] mb-2">{product.linea}</Badge>
                          <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-institucional transition-colors">
                            {product.titulo}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-2">{product.fecha}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </SectionWrapper>
  );
}
