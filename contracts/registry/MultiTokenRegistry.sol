pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./IDeployer.sol";


contract MultiTokenRegistry is Pausable {

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

    function setDeployer(uint256 index, IDeployer deployer) public onlyOwner whenNotPaused {
        emit NewDeployer(index, deployers[index], deployer);
        deployers[index] = deployer;
    }

    function deploy(uint256 index, bytes data) public whenNotPaused {
        address mtkn = deployers[index].deploy(data);
        multitokens.push(mtkn);
        emit NewMultitoken(mtkn);
    }
}