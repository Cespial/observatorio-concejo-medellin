import { MOCK_PRODUCTOS, type ProductoMock } from "@/lib/mock-data/productos";

export async function getProductos(): Promise<ProductoMock[]> {
  // Products require content authoring which is beyond ETL scope.
  // Return mock data until a CMS or admin UI is available.
  return MOCK_PRODUCTOS;
}

export async function getProductoBySlug(slug: string): Promise<ProductoMock | undefined> {
  // For now, always use mock data for product detail
  // Products require content authoring which is beyond ETL scope
  return MOCK_PRODUCTOS.find((p) => p.slug === slug);
}
