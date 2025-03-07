"use client";

import { FOOTCHAIN_ABI } from "@/public/constants/footchain";
import { FOOTCHAIN_BANK_ABI } from "@/public/constants/footchainBank";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

// Adresse des contrats
const FOOTCHAIN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const FOOTCHAINBANK_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Blockchain() {
  const { writeContract, isPending, isSuccess, isError } = useWriteContract();
  const { address, isConnected } = useAccount();

  // Lecture du solde du contrat Footchain
  const { data: balance, refetch } = useReadContract({
    abi: FOOTCHAIN_ABI,
    functionName: "balanceOf",
    address: FOOTCHAIN_ADDRESS,
    args: address ? [address] : undefined,
  });

  // Lecture du solde du contrat FootchainBank
  const { data: bankBalance, refetch: refetchBank } = useReadContract({
    abi: FOOTCHAIN_BANK_ABI,
    functionName: "getBankBalance",
    address: FOOTCHAINBANK_ADDRESS,
  });

  // Fonction pour effectuer un dépôt
  const handleDeposit = (amount: number) => {
    if (!address) return;

    writeContract({
      abi: FOOTCHAIN_BANK_ABI,
      functionName: "deposit",
      address: FOOTCHAINBANK_ADDRESS,
      args: [amount],
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
              onClick={() => handleDeposit(100)} // Déposer un montant de 100 tokens (modifiable)
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
