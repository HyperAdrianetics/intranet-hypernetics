import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intranet Hypernetics",
  description: "Cotizador y herramientas internas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
