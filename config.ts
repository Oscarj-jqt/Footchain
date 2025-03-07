import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

// Configuration de RainbowKit et Wagmi
export const config = getDefaultConfig({
  appName: "FootchainDapp",  
  projectId: "1", 
  chains: [mainnet], 
  ssr: true, 
});
