pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./MultiToken.sol";


contract ManageableMultiToken is Ownable, MultiToken {

    constructor(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 _decimals) public 
        MultiToken(_tokens, _weights, _name, _symbol, _decimals)
    {
    }

    function setWeights(uint256[] _weights) public onlyOwner {
        _setWeights(_weights);
    }

}
