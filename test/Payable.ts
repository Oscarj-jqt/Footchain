import { expect } from "chai";
import hre from "hardhat";

describe("Payable", function () {
  async function deployPayableFixture() {
    const [owner, otherAccount, otherAccount2] = await hre.viem.getWalletClients();
    
    const ERC20 = await hre.viem.deployContract("Footchain");
    const FootchainBank = await hre.viem.deployContract("FootchainBank", [
      ERC20.address,
      owner.account.address,
    ]);

    return {
      ERC20,
      FootchainBank,
      owner,
      otherAccount,
      otherAccount2,
    };
  }

  describe("Test Token Payments", function () {
    it("Should deposit, withdraw and pay with tokens", async function () {
      const { ERC20, FootchainBank, owner, otherAccount, otherAccount2 } = await loadFixture(deployPayableFixture);

      // Mint des tokens
      await ERC20.write.mint([otherAccount.account.address, 100n]);

      // Approve et déposer dans la banque
      await ERC20.write.approve([FootchainBank.address, 50n], {
        account: otherAccount.account,
      });
      await FootchainBank.write.deposit([50n], {
        account: otherAccount.account,
      });

      // Vérifier les balances
      const balanceBeforeWithdraw = await ERC20.read.balanceOf([otherAccount.account.address]);
      expect(balanceBeforeWithdraw).to.equal(50n);

      // Retirer de la banque
      await FootchainBank.write.withdraw([20n], {
        account: otherAccount.account,
      });

      const balanceAfterWithdraw = await ERC20.read.balanceOf([otherAccount.account.address]);
      expect(balanceAfterWithdraw).to.equal(30n);

      // Payer avec tokens
      await ERC20.write.approve([FootchainBank.address, 10n], {
        account: owner.account,
      });

      await FootchainBank.write.pay([otherAccount.account.address, 10n], {
        account: owner.account,
      });

      const balanceAfterPay = await ERC20.read.balanceOf([otherAccount.account.address]);
      expect(balanceAfterPay).to.equal(40n);
    });
  });
});
