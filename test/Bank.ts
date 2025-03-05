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
    const [Club1, Club2, supporterAccount, arylesAccount] =
      await hre.viem.getWalletClients();

    // deploy ERC20
    const ERC20 = await hre.viem.deployContract("Footchain");
    // deploy bank with erc20 in argument
    const Bank = await hre.viem.deployContract("FootChainBank", [
      ERC20.address,
      Club1.account.address,
    ]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      ERC20,
      Bank,
      Club1,
      Club2,
      supporterAccount,
      arylesAccount,
      publicClient,
    };
  }

  describe("Test bank", function () {
    it("Mint, dépôt, retrait, et paiement", async function () {
      const { ERC20, Bank, Club1, Club2, supporterAccount, arylesAccount  } =
        await loadFixture(deployErc20Fixture);

      await ERC20.write.mint([Club1.account.address, 100n]);
      await ERC20.write.mint([Club2.account.address, 100n]);
      await ERC20.write.mint([arylesAccount.account.address, 50n]);
      await ERC20.write.mint([supporterAccount.account.address, 50n]);

      // Vérification des soldes initiaux
      const balanceClub1 = await ERC20.read.balanceOf([Club1.account.address,]);
      expect(balanceClub1).to.equal(100n);

      const balanceClub2 = await ERC20.read.balanceOf([Club2.account.address]);
      expect(balanceClub2).to.equal(100n);

      const balancePlayer = await ERC20.read.balanceOf([arylesAccount.account.address]);
      expect(balancePlayer).to.equal(50n);

      const balanceSupporter = await ERC20.read.balanceOf([supporterAccount.account.address]);
      expect(balanceSupporter).to.equal(50n);

        // Approuver la banque pour dépenser des tokens de Club1
      await ERC20.write.approve([Bank.address, 100n], {
        account: Club1.account,
      });

        // Club1 dépose 100 tokens dans la banque                                          
      await Bank.write.deposit([100n], {
        account: Club1.account,
      });

      const balanceBank = await ERC20.read.balanceOf([Bank.address]);
      expect(balanceBank).to.equal(100n);

      // Club1 retire 10 tokens de la banque
      await Bank.write.withdraw([10n], {
        account: Club1.account,
      });
        // Vérifie que le club1 a 10 tokens
      const Club1AfterWithdraw = await ERC20.read.balanceOf([
        Club1.account.address,
      ]);
      expect(Club1AfterWithdraw).to.equal(10n);// 100n - 10n retirés

       // Vérifie que la bank a 90 tokens
      const BankAfterWithdraw = await ERC20.read.balanceOf([Bank.address]);
      expect(BankAfterWithdraw).to.equal(90n);// 100n - 10n retirés

       // Vérification de l'échec si retrait excède le solde de la banque
      await expect(
        Bank.write.withdraw([90n], {
          account: Club2.account,
        })
      ).to.be.rejectedWith("Insufficient balance");

       // Approuver la banque pour dépenser des tokens de Club2 pour payer le joueur
      await ERC20.write.approve([Bank.address, 10n], {
        account: Club2.account,
      });

       // Effectuer le paiement du joueur
      await Bank.write.pay([arylesAccount.account.address, 10n], {
        account: Club2.account,
      });
      
      // Vérifier que le joueur a été payer
      const balancePlayerAfterPayment = await ERC20.read.balanceOf([arylesAccount.account.address]);
      expect(balancePlayerAfterPayment).to.equal(60n);  // 50n + 10n = 60n

      // Fonction pour transférer des tokens d'un joueur à un autre club
      await ERC20.write.transfer([Club2.account.address, 50n], {
        account: Club1.account,
      });

      // Vérification du solde des clubs après transfert
      const balanceClub1AfterTransfer = await ERC20.read.balanceOf([Club1.account.address]);
      expect(balanceClub1AfterTransfer).to.equal(50n);

      const balanceClub2AfterTransfer = await ERC20.read.balanceOf([Club2.account.address]);
      expect(balanceClub2AfterTransfer).to.equal(150n); // 100n initial + 50n transférés
    });
  });
});
