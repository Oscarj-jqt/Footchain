import "@rainbow-me/rainbowkit/styles.css"; // Importer les styles de RainbowKit
import { getDefaultConfig } from "@rainbow-me/rainbowkit"; // Import de getDefaultConfig
import { hardhat } from "wagmi/chains"; // Import de la chaîne Hardhat de wagmi

/**
 * Configuration pour la librairie RainbowKit.
 * Cette configuration définit les paramètres de l'application,
 * y compris le nom de l'application et la blockchain utilisée.
 */
export const config = getDefaultConfig({
  appName: "Footchain",
  projectId: "YOUR_PROJECT_ID",
  chains: [hardhat], 
  ssr: true, 
});
