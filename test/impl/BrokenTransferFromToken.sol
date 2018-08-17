pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";


contract BrokenTransferFromToken is MintableToken, PausableToken, DetailedERC20 {
    
    constructor(string _symbol) public
        DetailedERC20("BrokenTransferFromToken", _symbol, 18)
    {
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        super.transferFrom(_from, _to, _value.mul(80).div(100));
    }

}