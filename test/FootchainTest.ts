import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("FootchainBank", function () {
  async function deployFixture() {
    const [Club1, Club2, supporterAccount, arylesAccount] = await hre.viem.getWalletClients();

    // Déploiement des contrats
    const footchain = await hre.viem.deployContract("Footchain", ["Footchain", "FOOT"]);
    const footchainBank = await hre.viem.deployContract("FootchainBank", [footchain.address, Club1.account.address]);

    return { footchain, footchainBank, Club1, Club2, supporterAccount, arylesAccount };
  }

  it("🔹 Mint des tokens pour les clubs et les joueurs", async function () {
    const { footchain, Club1, Club2, arylesAccount } = await loadFixture(deployFixture);

    // Mint initial pour les clubs et joueurs
    await footchain.write.mint([Club1.account.address, 1000n]);
    await footchain.write.mint([Club2.account.address, 1000n]);
    await footchain.write.mint([arylesAccount.account.address, 500n]);

    // Vérification des soldes après le minting
    expect(await footchain.read.balanceOf([Club1.account.address])).to.equal(1000n);
    expect(await footchain.read.balanceOf([Club2.account.address])).to.equal(1000n);
    expect(await footchain.read.balanceOf([arylesAccount.account.address])).to.equal(500n);
  });

  it("🔹 Club1 dépose et retire des tokens", async function () {
    const { footchain, footchainBank, Club1 } = await loadFixture(deployFixture);

    // Mint et approbation avant le dépôt
    await footchain.write.mint([Club1.account.address, 1000n]);
    await footchain.write.approve([footchainBank.address, 100n], { account: Club1.account });

    // Club1 dépose 100 tokens dans la banque
    await footchainBank.write.deposit([100n], { account: Club1.account });

    // Vérification que la banque a 100 tokens
    expect(await footchain.read.balanceOf([footchainBank.address])).to.equal(100n);

    // Club1 retire 50 tokens de la banque
    await footchainBank.write.withdraw([50n], { account: Club1.account });

    // Vérification du solde de la banque et du solde de Club1 après retrait
    expect(await footchain.read.balanceOf([footchainBank.address])).to.equal(50n);
    expect(await footchain.read.balanceOf([Club1.account.address])).to.equal(950n); // 1000n - 50n retirés
  });

  it("🔹 Un club paie un joueur", async function () {
    const { footchain, footchainBank, Club1, arylesAccount } = await loadFixture(deployFixture);

    // Mint et dépôt de tokens pour Club1
    await footchain.write.mint([Club1.account.address, 1000n]);
    await footchain.write.approve([footchainBank.address, 100n], { account: Club1.account });
    await footchainBank.write.deposit([100n], { account: Club1.account });

    // Mint de tokens pour le joueur (arylesAccount) avant le paiement
    await footchain.write.mint([arylesAccount.account.address, 500n]);

    // Vérification du solde de la banque avant paiement
    const balanceBankBefore = await footchain.read.balanceOf([footchainBank.address]);
    const balancePlayerBefore = await footchain.read.balanceOf([arylesAccount.account.address]);

    console.log("Solde de la banque avant paiement:", balanceBankBefore.toString());
    console.log("Solde du joueur avant paiement:", balancePlayerBefore.toString());

    // Club1 paye le joueur avec 50 tokens
    await footchainBank.write.payPlayer([arylesAccount.account.address, 50n], { account: Club1.account });

    // Vérification des soldes après paiement
    const balanceBankAfter = await footchain.read.balanceOf([footchainBank.address]);
    const balancePlayerAfter = await footchain.read.balanceOf([arylesAccount.account.address]);

    console.log("Solde de la banque après paiement:", balanceBankAfter.toString());
    console.log("Solde du joueur après paiement:", balancePlayerAfter.toString());

    // Vérification du solde de la banque après paiement
    expect(balanceBankAfter).to.equal(50n); // 100n - 50n

    // Vérification que le joueur a bien été payé
    expect(balancePlayerAfter).to.equal(550n); // 500n + 50n = 550n
  });

})