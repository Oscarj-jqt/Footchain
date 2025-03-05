import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { parseEther } from "viem";

describe("Footchain", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPayableFixture() {
    // Contracts are deployed using the first signer/account by default
    const [Club1, Club2, supporterAccount, neymarAccount, arylesAccount] =
      await hre.viem.getWalletClients();

    const payable = await hre.viem.deployContract("Footchain");

    const publicClient = await hre.viem.getPublicClient();

    return {
        payable,
        Club1,
        Club2,
        supporterAccount,
        arylesAccount,
    };
  }

  describe("Football Bank", function () {
    it("Barca 50, Real -25", async function () {
      const { payable, Club1, Club2 } = await loadFixture(
        deployPayableFixture
      );

       // Déposer 50 Ether dans le contrat
      await payable.write.deposit([], {
        value: parseEther("50"),
        from: Club1,
      });

      const balance = await payable.read.getBalance();
      expect(balance).to.equal(parseEther("50"));

    // Club2 effectue un retrait de 25 Ether
      await payable.write.withdraw([parseEther("25")], {
        from: Club2,
      });

      const balance2 = await payable.read.getBalance();
      expect(balance2).to.equal(parseEther("25"));
    });
  });
});