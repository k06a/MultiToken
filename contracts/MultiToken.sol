pragma solidity ^0.4.23;

import "./BasicMultiToken.sol";
import "./ERC228.sol";


contract MultiToken is BasicMultiToken, ERC228 {

    mapping(address => uint256) public weights;
    
    constructor(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 _decimals) public
        BasicMultiToken(_tokens, _name, _symbol, _decimals)
    {
        _setWeights(_weights);
    }

    function _setWeights(uint256[] _weights) internal {
        require(_weights.length == tokens.length, "Lenghts of _tokens and _weights array should be equal");
        for (uint i = 0; i < tokens.length; i++) {
            require(_weights[i] != 0, "The _weights array should not contains zeros");
            weights[tokens[i]] = _weights[i];
        }
    }

    function changeableTokenCount() public view returns (uint16 count) {
        count = uint16(tokens.length);
    }

    function changeableToken(uint16 _tokenIndex) public view returns (address tokenAddress) {
        tokenAddress = tokens[_tokenIndex];
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns(uint256 returnAmount) {
        uint256 fromBalance = ERC20(_fromToken).balanceOf(this);
        uint256 toBalance = ERC20(_toToken).balanceOf(this);
        returnAmount = toBalance.mul(_amount).mul(weights[_toToken]).div(weights[_fromToken]).div(fromBalance.add(_amount));
    }

    uint256 public res;

    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) public returns(uint256 returnAmount) {
        returnAmount = getReturn(_fromToken, _toToken, _amount);
        require(returnAmount >= _minReturn, "The return amount is less than _minReturn value");
        require(ERC20(_fromToken).transferFrom(msg.sender, this, _amount));
        require(ERC20(_toToken).transfer(msg.sender, returnAmount));
        emit Change(_fromToken, _toToken, msg.sender, _amount, returnAmount);
    }

}