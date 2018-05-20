pragma solidity ^0.4.23;

import "./BasicMultiToken.sol";


contract MultiToken is BasicMultiToken {

    uint256[] public weights;
    
    constructor(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 _decimals) public
        BasicMultiToken(_tokens, _name, _symbol, _decimals)
    {
        _setWeights(_weights);
    }

    function _setWeights(uint256[] _weights) internal {
        require(_weights.length == tokens.length, "Lenghts of _tokens and _weights array should be equal");
        weights = _weights;
        for (uint i = 0; i < _weights.length; i++) {
            require(_weights[i] != 0, "The _weights array should not contains zeros");
        }
    }

    function exchangeRate(uint _fromIndex, uint _toIndex, uint256 _fromTokenAmount) public view returns(uint256) {
        uint256 fromBalance = tokens[_fromIndex].balanceOf(this);
        uint256 toBalance = tokens[_toIndex].balanceOf(this);
        //return toBalance.sub(fromBalance.mul(toBalance).div(fromBalance.add(_fromTokenAmount)));
        return toBalance.mul(_fromTokenAmount).mul(weights[_toIndex]).div(weights[_fromIndex]).div(fromBalance.add(_fromTokenAmount));
    }

    function exchange(uint _fromIndex, uint _toIndex, uint256 _fromTokenAmount) public {
        uint256 toTokenAmount = exchangeRate(_fromIndex, _toIndex, _fromTokenAmount);
        require(tokens[_fromIndex].transferFrom(msg.sender, this, _fromTokenAmount));
        require(tokens[_toIndex].transfer(msg.sender, toTokenAmount));
    }

}