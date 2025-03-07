import "@rainbow-me/rainbowkit/styles.css"; // Importer les styles de RainbowKit
import { getDefaultConfig } from "@rainbow-me/rainbowkit"; // Import de getDefaultConfig
import { mainnet } from "wagmi/chains"; // Import de la chaîne mainnet de wagmi

/**
 * Configuration pour la librairie RainbowKit.
 * Cette configuration définit les paramètres de l'application,
 * y compris le nom de l'application et la blockchain utilisée.
 */
export const config = getDefaultConfig({
  appName: "FootchainDapp",
  projectId: "1",
  chains: [mainnet], 
  ssr: true, 
});
