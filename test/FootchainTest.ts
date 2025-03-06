import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("FootchainBank", function () {
  async function deployFixture() {
    const [Club1, Club2, supporter, player] = await hre.viem.getWalletClients();

    // Déploiement des contrats
    const footchain = await hre.viem.deployContract("Footchain", ["Footchain", "FOOT"]);
    const footchainBank = await hre.viem.deployContract("FootchainBank", [footchain.address, Club1.account.address]);

    return { footchain, footchainBank, Club1, Club2, supporter, player };
  }

  it("🔹 Mint des tokens pour les clubs et les joueurs", async function () {
    const { footchain, Club1, Club2, player } = await loadFixture(deployFixture);

    await footchain.write.mint([Club1.account.address, 100n]);
    await footchain.write.mint([Club2.account.address, 100n]);
    await footchain.write.mint([player.account.address, 50n]);

    expect(await footchain.read.balanceOf([Club1.account.address])).to.equal(100n);
    expect(await footchain.read.balanceOf([Club2.account.address])).to.equal(100n);
    expect(await footchain.read.balanceOf([player.account.address])).to.equal(50n);
  });

  it("🔹 Club1 dépose et retire des tokens", async function () {
    const { footchain, footchainBank, Club1 } = await loadFixture(deployFixture);

    await footchain.write.mint([Club1.account.address, 100n]);

    await footchain.write.approve([footchainBank.address, 100n], { account: Club1.account });
    await footchainBank.write.deposit([100n], { account: Club1.account });

    expect(await footchain.read.balanceOf([footchainBank.address])).to.equal(100n);

    await footchainBank.write.withdraw([50n], { account: Club1.account });

    expect(await footchain.read.balanceOf([footchainBank.address])).to.equal(50n);
    expect(await footchain.read.balanceOf([Club1.account.address])).to.equal(50n);
  });

  it("🔹 Un club paie un joueur", async function () {
    const { footchain, footchainBank, Club1, player } = await loadFixture(deployFixture);

    await footchain.write.mint([Club1.account.address, 100n]);
    await footchain.write.approve([footchainBank.address, 100n], { account: Club1.account });
    await footchainBank.write.deposit([100n], { account: Club1.account });

    await footchainBank.write.payPlayer([player.account.address, 20n], { account: Club1.account });

    expect(await footchain.read.balanceOf([player.account.address])).to.equal(20n);
  });
});
