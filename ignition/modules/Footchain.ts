// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const footchainModule = buildModule("footchainModule", (m) => {
  // Déploiement du smart contrat Footchain
  const footchain = m.contract("Footchain");

  return { footchain };
});

export default footchainModule;
