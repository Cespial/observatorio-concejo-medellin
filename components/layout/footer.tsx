import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  observatorio: [
    { label: "Panel General", href: "/" },
    { label: "Lineas Tematicas", href: "/tematicas" },
    { label: "Mapa Distrital", href: "/mapa" },
    { label: "Iniciativas", href: "/iniciativas" },
  ],
  recursos: [
    { label: "Publicaciones", href: "/productos" },
    { label: "Datos Abiertos", href: "#" },
    { label: "Metodologia", href: "#" },
    { label: "API", href: "#" },
  ],
  institucional: [
    { label: "Concejo de Medellin", href: "https://www.concejodemedellin.gov.co" },
    { label: "Universidad EAFIT", href: "https://www.eafit.edu.co" },
    { label: "Contacto", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-institucional text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 font-serif font-bold text-lg">
                OD
              </div>
              <div>
                <p className="font-semibold">Observatorio Distrital</p>
                <p className="text-xs text-white/60">Concejo de Medellin</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Plataforma de datos abiertos para el seguimiento y control politico
              del Distrito de Medellin.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-dorado">Observatorio</h3>
            <ul className="space-y-2">
              {footerLinks.observatorio.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-dorado">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-dorado">Institucional</h3>
            <ul className="space-y-2">
              {footerLinks.institucional.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Concejo de Medellin. Todos los derechos reservados.</p>
          <p>Desarrollado en alianza con Universidad EAFIT</p>
        </div>
      </div>
    </footer>
  );
}
