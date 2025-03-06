// footchain.ts

import { Abi } from "wagmi";

// ABI de Footchain - Assurez-vous que c'est l'ABI correcte de votre contrat
export const FOOTCHAIN_ABI: Abi = [
  // Remplacez cela par l'ABI réelle de votre contrat
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Ajoutez d'autres fonctions si nécessaire
];

// Adresse du contrat - Remplacez cela par l'adresse réelle de votre contrat déployé
export const FOOTCHAIN_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678"; // Remplacez par l'adresse réelle du contrat
