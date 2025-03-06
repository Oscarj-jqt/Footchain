import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const footchainModule = buildModule("footchainModule", (m) => {

  //addresse Ethereum valide
  const ownerAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const initialValue = m.getParameter("initialValue", "100");


  const footchain = m.contract("Footchain", [ownerAddress, initialValue]);

  return { footchain };
});

export default footchainModule;
