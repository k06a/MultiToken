
pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./MultiToken.sol";


contract EqualMultiToken is Ownable, MultiToken {

    uint256[] weights;
    uint256 totalWeight;
    
    constructor(ERC20[] _tokens, uint256[] _weights) public MultiToken(_tokens) {
        setWeigths(_weights);
    }

    function setWeigths(uint256[] _weights) internal {
        require(_weights.length == tokens.length, "Lenghts of _tokens and _weights array should be equal");
        weights = _weights;

        totalWeight = 0;
        for (uint i = 0; i < _weights.length; i++) {
            require(_weights[i] != 0, "The _weights array should not contains zeros");
            totalWeight = totalWeight.add(_weights[i]);   
        }
    }

    function exchangeRate(uint _fromIndex, uint _toIndex, uint256 _fromTokenAmount) public view returns(uint256) {
        uint256 fromBalance = tokens[_fromIndex].balanceOf(this);
        uint256 toBalance = tokens[_toIndex].balanceOf(this);
        //return toBalance.sub(fromBalance.mul(toBalance).div(fromBalance.add(_fromTokenAmount)));
        return toBalance * _fromTokenAmount / (fromBalance + _fromTokenAmount);
    }

    function exchange(uint _fromIndex, uint _toIndex, uint256 _fromTokenAmount) public {
        uint256 toTokenAmount = exchangeRate(_fromIndex, _toIndex, _fromTokenAmount);
        require(tokens[_fromIndex].transferFrom(msg.sender, this, _fromTokenAmount));
        require(tokens[_toIndex].transfer(msg.sender, toTokenAmount));
    }

}