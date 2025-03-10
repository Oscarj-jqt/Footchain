// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// token ERC20 représentant la monnaie d'un club de foot
contract Footchain is ERC20 {

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    // mint de nouveaux tokens pour différents club
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
