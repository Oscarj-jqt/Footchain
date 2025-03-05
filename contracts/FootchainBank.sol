// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

// la banque qui permet aux clubs de gérer leur trésorerie en tokens
contract FootchainBank {

    address immutable public erc20;
    address immutable public owner;

    mapping(address => uint256) public balances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(address _erc20, address _owner) {
        erc20 = _erc20;
        owner = _owner;
    }

    function deposit(uint256 amount) public {
        IERC20(erc20).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        IERC20(erc20).transfer(msg.sender, amount);
    }

    function payPlayer(address player, uint256 amount) public onlyOwner {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        IERC20(erc20).transfer(player, amount);
    }
}
