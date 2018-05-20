pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";


contract Token is MintableToken, DetailedERC20 {
    
    constructor(string _symbol) public
        DetailedERC20("Token", _symbol, 18)
    {
    }

}