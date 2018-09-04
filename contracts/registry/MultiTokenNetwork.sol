pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./IDeployer.sol";
import "../interface/IMultiToken.sol";


contract MultiTokenNetwork is Pausable {

    event NewMultitoken(address indexed mtkn);
    event NewDeployer(uint256 indexed index, address indexed oldDeployer, address indexed newDeployer);

    address[] public multitokens;
    mapping(uint256 => IDeployer) public deployers;

    function multitokensCount() public view returns(uint256) {
        return multitokens.length;
    }

    function allMultitokens() public view returns(address[]) {
        return multitokens;
    }

    function allWalletBalances(address wallet) public view returns(uint256[]) {
        uint256[] memory balances = new uint256[](multitokens.length);
        for (uint i = 0; i < multitokens.length; i++) {
            balances[i] = ERC20(multitokens[i]).balanceOf(wallet);
        }
        return balances;
    }

    function deleteMultitoken(uint index) public onlyOwner {
        require(index < multitokens.length, "deleteMultitoken: index out of range");
        if (index != multitokens.length - 1) {
            multitokens[index] = multitokens[multitokens.length - 1];
        }
        multitokens.length -= 1;
    }

    function denyBundlingMultitoken(uint index) public onlyOwner {
        IBasicMultiToken(multitokens[index]).denyBundling();
    }

    function allowBundlingMultitoken(uint index) public onlyOwner {
        IBasicMultiToken(multitokens[index]).allowBundling();
    }

    function denyChangesMultitoken(uint index) public onlyOwner {
        IMultiToken(multitokens[index]).denyChanges();
    }

    function setDeployer(uint256 index, IDeployer deployer) public onlyOwner whenNotPaused {
        require(deployer.owner() == address(this), "setDeployer: first set MultiTokenNetwork as owner");
        emit NewDeployer(index, deployers[index], deployer);
        deployers[index] = deployer;
    }

    function deploy(uint256 index, bytes data) public whenNotPaused {
        address mtkn = deployers[index].deploy(data);
        multitokens.push(mtkn);
        emit NewMultitoken(mtkn);
    }
}