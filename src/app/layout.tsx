import type { Metadata } from "next";
import { Syne, Inter, Baloo_2 } from 'next/font/google';
import "./globals.css";

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-syne',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-baloo2',
});

export const metadata: Metadata = {
  title: "Kookla — L'épilation laser, enfin simple.",
  description:
    "Kookla réunit les meilleurs centres laser de Paris sur une seule plateforme. Comparez, réservez et payez en 2 minutes — sans appel, sans galère.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable} ${baloo2.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
