export const metadata = { title: "Mapa Distrital" };

export default function MapaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="font-serif text-3xl font-bold mb-2">Mapa Distrital</h1>
      <p className="text-muted-foreground mb-8">
        Exploracion geoespacial de indicadores por comuna y corregimiento.
      </p>
      <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <p className="text-lg">Mapa interactivo en construccion</p>
        <p className="text-sm mt-2">El mapa de Mapbox con choropleth se renderizara aqui.</p>
      </div>
    </div>
  );
}
