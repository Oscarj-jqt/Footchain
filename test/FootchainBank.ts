import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import "@nomicfoundation/hardhat-viem";


describe("Footchain", function () {
  async function deployfootchainContractFixture() {
    // Contracts are deployed using the first signer/account by default
    const [Club1, Club2, supporterAccount, arylesAccount] =
      await hre.viem.getWalletClients();

    // deploy footchainContract
    const footchainContract = await hre.viem.deployContract("Footchain", ["Footchain", "FOOT"]);


    // deploy bank with footchainContract in argument
    const footchainBankContract = await hre.viem.deployContract("FootchainBank", [
      footchainContract.address,
      Club1.account.address,
    ]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      footchainContract,
      footchainBankContract,
      Club1,
      Club2,
      supporterAccount,
      arylesAccount,
      publicClient,
    };
  }

  describe("Test footchainBankContract", function () {
    it("Mint, dépôt, retrait, et paiement", async function () {
      const { footchainContract, footchainBankContract, Club1, Club2, supporterAccount, arylesAccount  } =
        await loadFixture(deployfootchainContractFixture);

      await footchainContract.write.mint([Club1.account.address, 1000n]);
      await footchainContract.write.mint([Club2.account.address, 1000n]);
      await footchainContract.write.mint([arylesAccount.account.address, 200n]);
      await footchainContract.write.mint([supporterAccount.account.address, 100n]);

      // Vérification des soldes initiaux
      const balanceClub1 = await footchainContract.read.balanceOf([Club1.account.address,]);
      expect(balanceClub1).to.equal(1000n);
      console.log(`Solde initial de Club1: ${balanceClub1}`);

      const balanceClub2 = await footchainContract.read.balanceOf([Club2.account.address]);
      expect(balanceClub2).to.equal(1000n);
      console.log(`Solde initial de Club1: ${balanceClub2}`);

      const balancePlayer = await footchainContract.read.balanceOf([arylesAccount.account.address]);
      expect(balancePlayer).to.equal(200n);
      console.log(`Solde initial de Club1: ${balancePlayer}`);

      const balanceSupporter = await footchainContract.read.balanceOf([supporterAccount.account.address]);
      expect(balanceSupporter).to.equal(100n);
      console.log(`Solde initial de Club1: ${balanceSupporter}`);

        // Approuver la banque pour dépenser des tokens de Club1
      await footchainContract.write.approve([footchainBankContract.address, 100n], {
        account: Club1.account,
      });

        // Club1 dépose 100 tokens dans la banque                                          
      await footchainBankContract.write.deposit([100n], {
        account: Club1.account,
      });

      const balancefootchainBankContract = await footchainContract.read.balanceOf([footchainBankContract.address]);
      expect(balancefootchainBankContract).to.equal(100n);

      // Club1 retire 10 tokens de la banque
      await footchainBankContract.write.withdraw([10n], {
        account: Club1.account,
      });
        // Vérifie que le club1 a 10 tokens
      const Club1AfterWithdraw = await footchainContract.read.balanceOf([
        Club1.account.address,
      ]);
      expect(Club1AfterWithdraw).to.equal(910n);// 1000n - 10n retirés
      console.log(`Solde de Club1 après retrait: ${Club1AfterWithdraw}`);

       // Vérifie que la footchainBankContract a 90 tokens
      const footchainBankContractAfterWithdraw = await footchainContract.read.balanceOf([footchainBankContract.address]);
      expect(footchainBankContractAfterWithdraw).to.equal(90n);// 100n - 10n retirés
      console.log(`Solde de la banque après retrait: ${footchainBankContractAfterWithdraw}`);

       // Vérification de l'échec si retrait excède le solde de la banque
      await expect(
        footchainBankContract.write.withdraw([90n], {
          account: Club2.account,
        })
      ).to.be.rejectedWith("Insufficient balance");

       // Approuver la banque pour dépenser des tokens de Club2 pour payer le joueur
      await footchainContract.write.approve([footchainBankContract.address, 20n], {
        account: Club2.account,
      });

       // Effectuer le paiement du joueur
      await footchainBankContract.write.payPlayer([arylesAccount.account.address, 20n], {
        account: Club1.account,
      });
      
      // Vérifier que le joueur a été payer
      const balancePlayerAfterPayment = await footchainContract.read.balanceOf([arylesAccount.account.address]);
      expect(balancePlayerAfterPayment).to.equal(220n);   // 200n + 20n = 220n
      console.log(`Solde du joueur après paiement: ${balancePlayerAfterPayment}`);

      // Fonction pour transférer des tokens d'un joueur à un autre club
      await footchainContract.write.transfer([Club2.account.address, 50n], {
        account: Club1.account,
      });

      // Vérification du solde des clubs après transfert
      const balanceClub1AfterTransfer = await footchainContract.read.balanceOf([Club1.account.address]);
      expect(balanceClub1AfterTransfer).to.equal(860n);// 910n - 50n transférés
      console.log(`Solde de Club1 après transfert: ${balanceClub1AfterTransfer}`);

      const balanceClub2AfterTransfer = await footchainContract.read.balanceOf([Club2.account.address]);
      expect(balanceClub2AfterTransfer).to.equal(1050n); // 1000n initial + 50n transférés
      console.log(`Solde de Club2 après transfert: ${balanceClub2AfterTransfer}`);
    });
  });
});