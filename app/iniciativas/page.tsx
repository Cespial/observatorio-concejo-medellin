export const metadata = { title: "Iniciativas Legislativas" };

export default function IniciativasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="font-serif text-3xl font-bold mb-2">Iniciativas Legislativas</h1>
      <p className="text-muted-foreground mb-8">
        Repositorio de acuerdos, proposiciones y debates del Concejo de Medellin.
      </p>
      <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <p className="text-lg">Repositorio de iniciativas en construccion</p>
        <p className="text-sm mt-2">Tabla filtrable con busqueda y seguimiento de trazabilidad.</p>
      </div>
    </div>
  );
}
