pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./MultiToken.sol";


contract ManageableMultiToken is Ownable, MultiToken {

    mapping(address => bool) public tokensLockedForExchange;

    // Deal with broken/scammed tokens to protect protfolio

    function lockTokenForExchange(address token) public onlyOwner {
        tokensLockedForExchange[token] = true;
        emit Update();
    }

    function unlockTokenForExchange(address token) public onlyOwner {
        delete tokensLockedForExchange[token];
        emit Update();
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns(uint256 returnAmount) {
        if (!tokensLockedForExchange[_fromToken] && !tokensLockedForExchange[_toToken]) {
            returnAmount = super.getReturn(_fromToken, _toToken, _amount);
        }
    }

    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) public returns(uint256 returnAmount) {
        require(!tokensLockedForExchange[_fromToken], "The _fromToken is locked for exchange by multitoken owner");
        require(!tokensLockedForExchange[_toToken], "The _toToken is locked for exchange by multitoken owner");
        returnAmount = super.change(_fromToken, _toToken, _amount, _minReturn);
    }

    // Allow slow modification of weights

    function scaleWeights(uint256 _scale) public onlyOwner {
        for (uint i = 0; i < tokens.length; i++) {
            weights[tokens[i]] = weights[tokens[i]].mul(_scale);
        }
        minimalWeight = minimalWeight.mul(_scale);
    }

    function getFromAmountForChangeWeights(address _fromToken, address /*_toToken*/, uint256 _value) public view returns(uint256 fromTokenAmount) {
        fromTokenAmount = ERC20(_fromToken).balanceOf(this).mul(_value).div(weights[_fromToken]);
    }

    function getAmountsForChangeWeight(address _fromToken, address _toToken, uint256 _weightDelta) public view returns(uint256 fromTokenAmount, uint256 toTokenAmount) {
        fromTokenAmount = getFromAmountForChangeWeights(_fromToken, _toToken, _weightDelta);
        toTokenAmount = getReturn(_fromToken, _toToken, fromTokenAmount);
    }

    function changeWeight(address _fromToken, address _toToken, uint256 _weightDelta, uint256 _minReturnAmount) public onlyOwner returns(uint256 fromTokenAmount, uint256 returnAmount) {
        require(weights[_toToken] > 0, "Specified _toToken is not part of multitoken");
        require(weights[_fromToken] > _weightDelta, "Can't set weight of _fromToken to zero");
        
        fromTokenAmount = getFromAmountForChangeWeights(_fromToken, _toToken, _weightDelta);
        returnAmount = change(_fromToken, _toToken, fromTokenAmount, _minReturnAmount);

        weights[_fromToken] = weights[_fromToken].sub(_weightDelta);
        weights[_toToken] = weights[_toToken].add(_weightDelta);
    }

}
