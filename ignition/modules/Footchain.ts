import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const footchainModule = buildModule("footchainModule", (m) => {
  // Définir les arguments nécessaires pour le constructeur
  const name = "Footchain"; // Le nom du token
  const symbol = "FOOT"; // Le symbole du token

  // Déployer le contrat avec ces arguments
  const footchain = m.contract("Footchain", [name, symbol]);

  return { footchain };
});

export default footchainModule;

