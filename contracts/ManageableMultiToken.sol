pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./MultiToken.sol";


contract ManageableMultiToken is Ownable, MultiToken {

    function setWeights(uint256[] _weights) public onlyOwner {
        _setWeights(_weights);
    }

}
