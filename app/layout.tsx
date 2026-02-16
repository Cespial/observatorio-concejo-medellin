import type { Metadata } from "next";
import { sourceSerif, inter } from "@/lib/fonts";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://observatorio-concejo-medellin.vercel.app"),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${sourceSerif.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
