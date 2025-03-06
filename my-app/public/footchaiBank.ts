// public/footchainBank.ts

export const FOOTCHAIN_BANK_ADDRESS = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef"; // Remplace par l'adresse réelle du contrat
export const FOOTCHAIN_BANK_ABI = [
  // L'ABI de ton contrat FootchainBank
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // Ajouter les autres fonctions de l'ABI
] as const;
