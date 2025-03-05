import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

// Configuration de RainbowKit et Wagmi
export const config = getDefaultConfig({
  appName: "FOOTCHAIN",  
  projectId: "YOUR_PROJECT_ID", 
  chains: [mainnet], 
  ssr: true, 
});
