"use client";

import { FOOTCHAIN_ABI } from "../../public/footchain"; // ABI du contrat Footchain
import { FOOTCHAINBANK_ABI } from "../../public/footchainBank"; // Si footchainBank.ts est dans le dossier public
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

/**
 * Adresse des contrats Footchain et FootchainBank.
 * Ces adresses sont utilisées pour interagir avec les contrats intelligents respectifs.
 */
const FOOTCHAIN_ADDRESS = "0xYourFootchainContractAddress";
const FOOTCHAINBANK_ADDRESS = "0xYourFootchainBankContractAddress";

export default function Blockchain() {
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();
  const { address, isConnected } = useAccount();

  /**
   * Lecture du solde du contrat Footchain.
   * Cette lecture permet de récupérer le solde de Footchain pour l'adresse connectée.
   */
  const { data: balance, refetch } = useReadContract({
    abi: FOOTCHAIN_ABI, // ABI du contrat Footchain
    functionName: "balanceOf", // Nom de la fonction à appeler
    address: FOOTCHAIN_ADDRESS, // Adresse du contrat Footchain
    args: address ? [address] : undefined, // On passe l'adresse si elle existe
  });

  /**
   * Lecture du solde du contrat FootchainBank.
   * Cette lecture permet de récupérer le solde de FootchainBank pour l'adresse connectée.
   */
  const { data: bankBalance, refetch: refetchBank } = useReadContract({
    abi: FOOTCHAINBANK_ABI, // ABI du contrat FootchainBank
    functionName: "getBankBalance", // Nom de la fonction à appeler
    address: FOOTCHAINBANK_ADDRESS, // Adresse du contrat FootchainBank
    enabled: isConnected, // Activer la lecture seulement si l'utilisateur est connecté
  });

  /**
   * Fonction pour effectuer un dépôt dans le contrat FootchainBank.
   * Cette fonction permet d'ajouter des tokens dans le contrat FootchainBank.
   */
  const handleDeposit = (amount: number) => {
    if (!address) return;

    writeContract({
      abi: FOOTCHAINBANK_ABI, // ABI du contrat FootchainBank
      functionName: "deposit", // Nom de la fonction à appeler
      address: FOOTCHAINBANK_ADDRESS, // Adresse du contrat FootchainBank
      args: [amount], // Passer le montant en natif (directement sans conversion)
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-8xl font-bold mb-8 text-gray-800">Footchain Dapp</h1>
      <ConnectButton />

      {isConnected ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-gray-500 mb-4">
            Your Footchain balance: {balance ? balance.toString() : "Loading..."}
          </p>
          <p className="text-lg text-gray-500 mb-4">
            FootchainBank balance: {bankBalance ? bankBalance.toString() : "Loading..."}
          </p>

          <button
            onClick={() => refetch()}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors mb-4"
          >
            Refresh
          </button>

          <div className="mt-4">
            <input
              type="number"
              placeholder="Amount to deposit"
              className="mb-2 p-2 border rounded-md"
              onChange={(e) => handleDeposit(Number(e.target.value))}
            />
            <button
              onClick={() => handleDeposit(100)} // Déposer un montant de 100 tokens (modification selon besoin)
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors mb-4"
            >
              Deposit 100 Footchain Tokens
            </button>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Please connect your wallet to interact with the dApp.</p>
      )}

      {isPending && <p className="text-yellow-500">Transaction in progress...</p>}
      {isSuccess && <p className="text-green-500">Transaction successful!</p>}
      {isError && <p className="text-red-500">Transaction failed.</p>}
    </div>
  );
}
