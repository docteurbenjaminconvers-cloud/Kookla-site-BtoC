import type { Metadata } from "next";
import { Baloo_2, Inter } from 'next/font/google';
import "./globals.css";

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-baloo2',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Kookla — La nouvelle façon de réserver votre épilation laser",
  description:
    "Kookla compare les centres laser près de vous, réserve votre séance en 2 clics et vous fait gagner des KCoins à chaque visite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${baloo2.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
