import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balzer 1850 — Caffetteria Pasticceria Ristorante | Bergamo",
  description: "Storico caffè di Bergamo dal 1850. Colazioni, pasticceria artigianale, pranzi e aperitivi sotto i Portici del Sentierone. Il locale più amato di Bergamo da oltre 175 anni.",
  keywords: ["Balzer Bergamo", "caffetteria Bergamo", "pasticceria Bergamo", "ristorante Sentierone", "aperitivo Bergamo", "locale storico Bergamo", "colazione Bergamo"],
  openGraph: {
    title: "Balzer 1850 — Caffetteria Pasticceria Ristorante",
    description: "Storico caffè di Bergamo dal 1850. Colazioni, pasticceria, pranzi e aperitivi sotto i Portici del Sentierone.",
    siteName: "Balzer 1850",
    locale: "it_IT",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
