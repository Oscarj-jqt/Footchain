import "@rainbow-me/rainbowkit/styles.css"; // Importer les styles de RainbowKit
import { getDefaultConfig } from "@rainbow-me/rainbowkit"; // Import de getDefaultConfig
import { hardhat } from "wagmi/chains"; // Import de la chaîne Hardhat de wagmi

/**
 * Configuration pour la librairie RainbowKit.
 * Cette configuration définit les paramètres de l'application,
 * y compris le nom de l'application et la blockchain utilisée.
 */
export const config = getDefaultConfig({
  appName: "Dapp Hetic", // Nom de l'application pour RainbowKit
  projectId: "YOUR_PROJECT_ID", // Ton project ID (si tu en as un, sinon supprime cette ligne)
  chains: [hardhat], // Chaîne de test, ici Hardhat
  ssr: true, // Si ta dApp utilise le rendu côté serveur (SSR)
});
