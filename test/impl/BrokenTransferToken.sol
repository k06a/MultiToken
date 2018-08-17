pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";


contract BrokenTransferToken is MintableToken, PausableToken, DetailedERC20 {
    
    constructor(string _symbol) public
        DetailedERC20("BrokenTransferToken", _symbol, 18)
    {
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        super.transfer(_to, _value.mul(80).div(100));
    }

}