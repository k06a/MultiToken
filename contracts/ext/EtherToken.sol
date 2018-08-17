pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";


contract EtherToken is MintableToken, BurnableToken {
    constructor() public {
        delete owner;
    }

    function() public payable {
        deposit();
    }

    function deposit() public payable {
        depositTo(msg.sender);
    }

    function depositTo(address _to) public payable {
        owner = _to;
        mint(_to, msg.value);
        delete owner;
    }

    function withdraw(uint _amount) public {
        withdrawTo(msg.sender, _amount);
    }

    function withdrawTo(address _to, uint _amount) public {
        burn(_amount);
        _to.transfer(_amount);
    }

    function withdrawFrom(address _from, uint _amount) public {
        this.transferFrom(_from, this, _amount);
        this.burn(_amount);
        _from.transfer(_amount);
    }
}
