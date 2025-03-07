"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState } from "react";

// Adresse des contrats sur la blockchain (restent statiques pour la simulation)
const FOOTCHAIN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Remplacez cette adresse par celle de ton contrat Footchain
const FOOTCHAINBANK_ADDRESS = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef"; // Remplacez cette adresse par celle de ton contrat FootchainBank

const HomePage = () => {
  const { address } = useAccount(); // Récupère l'adresse de l'utilisateur connecté
  const [depositAmount, setDepositAmount] = useState<number>(0); // Montant pour le dépôt dans la banque
  const [paymentAmount, setPaymentAmount] = useState<number>(0); // Montant pour le paiement du joueur
  const [mintAmount, setMintAmount] = useState<number>(0); // Montant pour le minting des tokens
  const [toAddress, setToAddress] = useState<string>(""); // Adresse du joueur à payer
  const [userBalance, setUserBalance] = useState<number>(0); // Solde utilisateur simulé
  const [bankBalance, setBankBalance] = useState<number>(0); // Solde banque simulé
  const [playerBalance, setPlayerBalance] = useState<number>(0); // Solde joueur simulé
  const [transactionStatus, setTransactionStatus] = useState<string>("");

  // Simuler le minting des tokens (ajouter des tokens au solde de l'utilisateur)
  const handleMintTokens = () => {
    if (mintAmount > 0) {
      setUserBalance((prevBalance) => prevBalance + mintAmount); // On ajoute des tokens au solde de l'utilisateur
      setTransactionStatus("Minting réussi!");
    } else {
      setTransactionStatus("Erreur: Le montant doit être positif.");
    }
  };

  // Simuler le dépôt dans la banque (ajouter des tokens au solde de la banque)
  const handleDepositToBank = () => {
    if (depositAmount > 0 && userBalance >= depositAmount) {
      setBankBalance((prevBalance) => prevBalance + depositAmount); // On ajoute des tokens à la banque
      setUserBalance((prevBalance) => prevBalance - depositAmount); // On retire des tokens de l'utilisateur
      setTransactionStatus("Dépôt dans la banque réussi!");
    } else {
      setTransactionStatus("Erreur: Solde insuffisant pour le dépôt.");
    }
  };

  // Simuler un paiement d'un joueur (retirer des tokens de la banque et les envoyer au joueur)
  const handlePayPlayer = () => {
    if (paymentAmount > 0 && bankBalance >= paymentAmount && toAddress) {
      setBankBalance((prevBalance) => prevBalance - paymentAmount); // Retirer des tokens de la banque
      setPlayerBalance((prevBalance) => prevBalance + paymentAmount); // Ajouter des tokens au solde du joueur
      setTransactionStatus(`Paiement de ${paymentAmount} tokens effectué au joueur ${toAddress}`);
    } else {
      setTransactionStatus("Erreur: Solde de la banque insuffisant ou adresse invalide.");
    }
  };

  // Si l'utilisateur n'est pas connecté
  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Bienvenue sur la Dapp de FootChain</h1>
        <p className="mb-4">Connecte ton portefeuille pour interagir avec l'application.</p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Portefeuille du Club1</h1>

      {/* Solde utilisateur */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Solde de l'utilisateur</h2>
        <div>
          Solde des tokens : {userBalance} tokens
        </div>
      </section>

      {/* Dépôt à la banque */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dépôt dans la banque</h2>
        <div className="mb-4">
          <input
            className="p-2 border rounded-md"
            type="number"
            placeholder="Montant à déposer"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          disabled={depositAmount <= 0 || depositAmount > userBalance}
          onClick={handleDepositToBank}
        >
          Déposer
        </button>
      </section>

      {/* Solde de la banque */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Solde de la banque</h2>
        <div>
          Solde de la banque : {bankBalance} tokens
        </div>
      </section>

      {/* Paiement d'un joueur */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payer un Joueur</h2>
        <div className="mb-4">
          <input
            className="p-2 border rounded-md"
            type="text"
            placeholder="Adresse du joueur"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)} // Met à jour l'adresse du joueur
          />
        </div>
        <div className="mb-4">
          <input
            className="p-2 border rounded-md"
            type="number"
            placeholder="Montant à payer"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))} // Met à jour le montant à payer
          />
        </div>
        <button
          className="bg-green-500 text-white p-2 rounded-md"
          disabled={paymentAmount <= 0 || paymentAmount > bankBalance || !toAddress}
          onClick={handlePayPlayer}
        >
          Payer le Joueur
        </button>
      </section>

      {/* Solde du joueur */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Solde du Joueur</h2>
        <div>
          Solde du joueur : {playerBalance} tokens
        </div>
      </section>

      {/* Mint des tokens */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mint des Tokens</h2>
        <input
          className="p-2 border rounded-md mb-4"
          type="number"
          placeholder="Quantité de tokens"
          value={mintAmount}
          onChange={(e) => setMintAmount(Number(e.target.value))}
        />
        <button
          className="bg-yellow-500 text-white p-2 rounded-md"
          disabled={mintAmount <= 0}
          onClick={handleMintTokens}
        >
          Mint Tokens
        </button>
      </section>

      {/* Affichage des informations du club */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Informations du Club1</h2>
        <div>
          <h3 className="text-lg font-medium">Ton adresse: {address}</h3>
          <p>Solde de ton portefeuille: {userBalance} tokens</p>
          <p>Solde total à la banque: {bankBalance} tokens</p>
        </div>
      </section>

      {/* Affichage de l'état de la transaction */}
      {transactionStatus && (
        <div className="mt-6 text-center text-lg font-semibold text-green-500">
          {transactionStatus}
        </div>
      )}
    </div>
  );
};

export default HomePage;
