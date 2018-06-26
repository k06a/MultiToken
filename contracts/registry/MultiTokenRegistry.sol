pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./IDeployer.sol";


contract MultiTokenRegistry is Pausable {

    address[] public multitokens;
    mapping(uint256 => IDeployer) public deployers;

    function allMultitokens() public view returns(address[]) {
        return multitokens;
    }

    function setDeployer(uint256 index, IDeployer deployer) public onlyOwner whenNotPaused {
        deployers[index] = deployer;
    }

    function deploy(uint256 index, bytes data) public whenNotPaused {
        multitokens.push(deployers[index].deploy(data));
    }
}