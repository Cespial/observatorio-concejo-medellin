"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Download,
  User,
  FileText,
  ChevronRight,
} from "lucide-react";
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { THEMATIC_LINES } from "@/lib/constants";
import { formatDate, formatNumber, cn } from "@/lib/utils";
import { MOCK_PRODUCTOS, type ProductoMock } from "@/lib/mock-data/productos";

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

type ProductDetailProps = {
  product: ProductoMock;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const lineConfig = THEMATIC_LINES.find(
    (l) => l.slug === product.linea_tematica
  );

  // Extract headings from markdown content for TOC
  const headings =
    product.contenido
      .match(/^##\s+(.+)$/gm)
      ?.map((h) => h.replace(/^##\s+/, "")) || [];

  // Related products: same linea_tematica, exclude current, first 3
  const relatedProducts = MOCK_PRODUCTOS.filter(
    (p) => p.linea_tematica === product.linea_tematica && p.id !== product.id
  ).slice(0, 3);

  const handleScrollToHeading = (heading: string) => {
    // Markdown headings are rendered as h2 elements.
    // Find the element by text content.
    const headingElements = document.querySelectorAll(
      ".prose h2"
    );
    for (const el of headingElements) {
      if (el.textContent?.trim() === heading) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <BreadcrumbNav
          items={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/productos" },
            { label: product.titulo },
          ]}
        />
      </div>

      {/* Hero section */}
      <div className="relative mb-8 overflow-hidden rounded-xl border bg-card">
        {/* Colored top band */}
        <div className={cn("h-2 w-full", TIPO_COLORS[product.tipo])} />

        <div className="p-6 lg:p-8">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className={cn("text-xs font-medium", TIPO_BADGE_STYLES[product.tipo])}
            >
              {TIPO_LABELS[product.tipo]}
            </Badge>
            {lineConfig && (
              <Badge
                variant="outline"
                className="text-xs border-0"
                style={{
                  backgroundColor: lineConfig.bgColor,
                  color: lineConfig.color,
                }}
              >
                {lineConfig.name}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl font-bold leading-tight lg:text-3xl mb-4">
            {product.titulo}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {product.autor}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(product.fecha_publicacion)}
            </span>
            <span className="flex items-center gap-1.5">
              <Download className="h-4 w-4" />
              {formatNumber(product.descargas)} descargas
            </span>
            {product.paginas && (
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                {product.paginas} páginas
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {product.descripcion}
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Content */}
        <div className="flex-[2] min-w-0">
          <Card>
            <CardContent className="p-6 lg:p-8">
              <MarkdownRenderer
                content={product.contenido}
                className="prose-headings:font-serif prose-headings:scroll-mt-20 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-table:text-sm"
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-1">
              Etiquetas:
            </span>
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Back button */}
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/productos" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a Productos
              </Link>
            </Button>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="flex-1 lg:max-w-xs">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Contenido
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <nav className="flex flex-col gap-1">
                    {headings.map((heading, index) => (
                      <button
                        key={index}
                        onClick={() => handleScrollToHeading(heading)}
                        className="text-left text-xs text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-muted truncate"
                      >
                        {heading}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            )}

            {/* Download button */}
            <Button className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Descargar documento
            </Button>

            {/* Related products */}
            {relatedProducts.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Publicaciones relacionadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-3">
                    {relatedProducts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/productos/${related.slug}`}
                        className="group flex items-start gap-2 rounded-md p-2 -mx-2 hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {related.titulo}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {TIPO_LABELS[related.tipo]} &middot;{" "}
                            {formatDate(related.fecha_publicacion)}
                          </p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
