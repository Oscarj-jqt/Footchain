// app/blockchain/page.tsx

"use client";

import { useState } from "react";
import { useAccount, useBalance, usePrepareContractWrite } from "wagmi";
import { FOOTCHAIN_ABI, FOOTCHAIN_ADDRESS } from "@/public/constants/footchain";  // Import du contrat Footchain
import { FOOTCHAIN_BANK_ABI, FOOTCHAIN_BANK_ADDRESS } from "@/public/constants/footchainBank"; // Import du contrat FootchainBank
import { ConnectButton } from "@rainbow-me/rainbowkit";  // Import du bouton de connexion RainbowKit
import Image from "next/image"; // Import d'Image de Next.js pour gérer les images

// Fonction pour la page Blockchain
export default function BlockchainPage() {
  const [amount, setAmount] = useState<number>(0);
  const [isMinting, setIsMinting] = useState<boolean>(false);

  // Utilisation de Wagmi pour gérer la connexion et le solde
  const { isConnected, address } = useAccount();
  const { data: balanceData } = useBalance({ address });

  // Préparation pour l'appel à la fonction mint de Footchain
  const { config: mintConfig } = usePrepareContractWrite({
    address: FOOTCHAIN_ADDRESS,
    abi: FOOTCHAIN_ABI,
    functionName: "mint",
    args: [address, amount],
  });

  // Fonction pour appeler le mint
  const { write: mint } = useContractWrite(mintConfig);

  const handleMint = async () => {
    setIsMinting(true);
    try {
      await mint();
      alert("Minting successful!");
    } catch (error) {
      console.error("Error during minting", error);
    } finally {
      setIsMinting(false);
    }
  };

  // Affichage de la page
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Interact with the Footchain contract to mint tokens.</li>
          <li>Check your balance and initiate minting.</li>
        </ol>

        {isConnected ? (
          <div className="flex flex-col items-center gap-4">
            <p>Address: {address}</p>
            <p>Balance: {balanceData?.formatted} {balanceData?.symbol}</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="border border-solid border-gray-300 rounded p-2"
              placeholder="Amount to mint"
            />
            <button
              onClick={handleMint}
              disabled={isMinting}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              {isMinting ? "Minting..." : "Mint"}
            </button>
          </div>
        ) : (
          <p>Please connect your wallet to interact with the contract.</p>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdi
