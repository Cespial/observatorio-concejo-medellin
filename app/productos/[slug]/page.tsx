import { notFound } from "next/navigation";
import { MOCK_PRODUCTOS } from "@/lib/mock-data/productos";
import { ProductDetail } from "./_components/product-detail";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return MOCK_PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = MOCK_PRODUCTOS.find((p) => p.slug === params.slug);
  if (!product) return { title: "No encontrado" };
  return { title: product.titulo };
}

export default function ProductoDetailPage({ params }: Props) {
  const product = MOCK_PRODUCTOS.find((p) => p.slug === params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
