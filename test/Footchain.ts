// import {
//   time,
//   loadFixture,
// } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
// import { expect } from "chai";
// import hre from "hardhat";
// import { parseEther } from "viem";
// import "@nomicfoundation/hardhat-viem";

// describe("Payable", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployPayableFixture() {
//     // Contracts are deployed using the first signer/account by default
//     const [Club1, Club2, supporterAccount, neymarAccount, arylesAccount] =
//       await hre.viem.getWalletClients();

//     const payable = await hre.viem.deployContract("PayableTest");

//     const publicClient = await hre.viem.getPublicClient();

//     return {
//       Club1,
//       Club2,
//       supporterAccount,
//       neymarAccount,
//       arylesAccount,
//     };
//   }

//   describe("First test", function () {
//     it("Should deposit 1 ether & withdraw 0.1 ether", async function () {
//       const { payable, owner, otherAccount, otherAccount2 } = await loadFixture(
//         deployPayableFixture
//       );

//       await payable.write.deposit([], {
//         value: parseEther("1"),
//       });

//       const balance = await payable.read.getBalance();
//       expect(balance).to.equal(parseEther("1"));

//       await payable.write.withdraw([parseEther("0.1")]);

//       const balance2 = await payable.read.getBalance();
//       expect(balance2).to.equal(parseEther("0.9"));
//     });
//   });
// });