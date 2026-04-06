import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kookla — Trouvez votre centre d'épilation laser",
  description:
    "Comparez, réservez et payez votre épilation laser en 2 minutes. Marketplace spécialisée épilation laser en France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
