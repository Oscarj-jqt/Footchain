import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const footchainModule = buildModule("footchainModule", (m) => {

  //addresse Ethereum valide
  const param1 = "0xMyAddress";
  const param2 = m.getParameter("initialValue", 100);


  const footchain = m.contract("Footchain", [param1, param2]);

  return { footchain };
});

export default footchainModule;
