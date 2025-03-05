import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("Footchain", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployErc20Fixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, otherAccount2] =
      await hre.viem.getWalletClients();

    // deploy ERC20
    const ERC20 = await hre.viem.deployContract("Footchain");
    // deploy FootchainBank with erc20 in argument
    const FootchainBank = await hre.viem.deployContract("FootchainBank", [
      ERC20.address,
      owner.account.address,
    ]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      ERC20,
      FootchainBank,
      owner,
      otherAccount,
      otherAccount2,
      publicClient,
    };
  }

  describe("Test FootchainBank", function () {
    it("Should mint & deposit & withdraw & pay", async function () {
      const { ERC20, FootchainBank, owner, otherAccount, otherAccount2 } =
        await loadFixture(deployErc20Fixture);

      // mint 100 token for other account
      await ERC20.write.mint([otherAccount.account.address, 100n]);
      // mint 100 token for owner
      await ERC20.write.mint([owner.account.address, 100n]);

      // Verify
      const balanceOtherAccount = await ERC20.read.balanceOf([
        otherAccount.account.address,
      ]);
      expect(balanceOtherAccount).to.equal(100n);

      const balanceOwner = await ERC20.read.balanceOf([owner.account.address]);
      expect(balanceOwner).to.equal(100n);

      // Approve FootchainBank to spend 100 token
      await ERC20.write.approve([FootchainBank.address, 100n], {
        account: otherAccount.account,
      });

      // // Deposit 100 token in FootchainBank from other account
      await FootchainBank.write.deposit([100n], {
        account: otherAccount.account,
      });

      const balanceFootchainBank = await ERC20.read.balanceOf([FootchainBank.address]);
      expect(balanceFootchainBank).to.equal(100n);

      // other Account withdraw from FootchainBank
      await FootchainBank.write.withdraw([10n], {
        account: otherAccount.account,
      });

      // // Verify if other account has 10n
      const balance2 = await ERC20.read.balanceOf([
        otherAccount.account.address,
      ]);
      expect(balance2).to.equal(10n);

      // // Verify if FootchainBank has 90n
      const balance3 = await ERC20.read.balanceOf([FootchainBank.address]);
      expect(balance3).to.equal(90n);

      await expect(
        FootchainBank.write.withdraw([90n], {
          account: otherAccount2.account,
        })
      ).to.be.rejectedWith("Insufficient balance");

      await ERC20.write.approve([FootchainBank.address, 10n], {
        account: owner.account,
      });

      // Pay employees only owner
      await FootchainBank.write.pay([otherAccount.account.address, 10n], {
        account: owner.account,
      });
    });
  });
});
