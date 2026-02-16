export const metadata = { title: "Productos y Publicaciones" };

export default function ProductosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="font-serif text-3xl font-bold mb-2">Productos y Publicaciones</h1>
      <p className="text-muted-foreground mb-8">
        Informes, boletines, infografias y contenido multimedia del Observatorio.
      </p>
      <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <p className="text-lg">Catalogo de productos en construccion</p>
        <p className="text-sm mt-2">Grid filtrable con previsualizaciones y descarga.</p>
      </div>
    </div>
  );
}
