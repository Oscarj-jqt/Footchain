import type { Metadata } from "next"; // Import de la type Metadata pour Next.js
import { Geist, Geist_Mono } from "next/font/google"; // Import des polices depuis Google Fonts
import "./globals.css"; // Import du fichier CSS global
import { Provider } from "@/public/components/Provider"; // Import de ton Provider

// Définition des polices utilisées dans l'application
const geistSans = Geist({
  variable: "--font-geist-sans", // Définir la variable CSS pour la police Geist
  subsets: ["latin"], // Sous-ensembles de la police
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // Définir la variable CSS pour la police Geist_Mono
  subsets: ["latin"], // Sous-ensembles de la police
});

// Métadonnées pour ton application (celles qui apparaîtront dans les tags meta de l'HTML)
export const metadata: Metadata = {
  title: "FootChain Dapp", // Titre de l'application
  description: "Gérez votre club de football avec une monnaie décentralisée", // Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Les composants enfants seront injectés ici
}>) {
  return (
    <html lang="fr"> {/* Changer la langue pour "fr" */}
      <head>
        {/* La section <head> peut être ajoutée ici si besoin */}
        <meta name="description" content="Gérez votre club de football avec une monnaie décentralisée" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Applique les styles de polices et les styles d'anti-aliasing
      >
        {/* Utilisation du Provider pour encapsuler l'ensemble de l'application */}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
