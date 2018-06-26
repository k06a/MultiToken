pragma solidity ^0.4.23;

import "./BasicMultiToken.sol";
import "./ERC228.sol";


contract MultiToken is BasicMultiToken, ERC228 {

    mapping(address => uint256) public weights;

    function init(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 _decimals) public {
        super.init(_tokens, _name, _symbol, _decimals);
        require(_weights.length == tokens.length, "Lenghts of _tokens and _weights array should be equal");
        for (uint i = 0; i < tokens.length; i++) {
            require(_weights[i] != 0, "The _weights array should not contains zeros");
            require(weights[tokens[i]] == 0, "The _tokens array have duplicates");
            weights[tokens[i]] = _weights[i];
        }
    }

    function init2(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 _decimals) public {
        init(_tokens, _weights, _name, _symbol, _decimals);
    }

    function changeableTokenCount() public view returns (uint16 count) {
        count = uint16(tokens.length);
    }

    function changeableToken(uint16 _tokenIndex) public view returns (address tokenAddress) {
        tokenAddress = tokens[_tokenIndex];
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns(uint256 returnAmount) {
        if (weights[_fromToken] > 0 && weights[_toToken] > 0 && _fromToken != _toToken) {
            uint256 fromBalance = ERC20(_fromToken).balanceOf(this);
            uint256 toBalance = ERC20(_toToken).balanceOf(this);
            returnAmount = toBalance.mul(_amount).mul(weights[_fromToken]).div(weights[_toToken]).div(fromBalance.add(_amount));
        }
    }

    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) public returns(uint256 returnAmount) {
        returnAmount = getReturn(_fromToken, _toToken, _amount);
        require(returnAmount > 0, "The return amount is zero");
        require(returnAmount >= _minReturn, "The return amount is less than _minReturn value");
        
        uint256 fromBalance = ERC20(_fromToken).balanceOf(this);
        ERC20(_fromToken).transferFrom(msg.sender, this, _amount);
        require(ERC20(_fromToken).balanceOf(this) == fromBalance + _amount);
        
        uint256 toBalance = ERC20(_toToken).balanceOf(this);
        ERC20(_toToken).transfer(msg.sender, returnAmount);
        require(ERC20(_toToken).balanceOf(this) == toBalance - returnAmount);

        emit Change(_fromToken, _toToken, msg.sender, _amount, returnAmount);
    }

    function changeOverERC228(address _fromToken, address _toToken, uint256 _amount, address exchange) public returns(uint256 returnAmount) {
        returnAmount = getReturn(_fromToken, _toToken, _amount);
        require(returnAmount > 0, "The return amount is zero");

        uint256 fromBalance = ERC20(_fromToken).balanceOf(this);
        ERC20(_toToken).approve(exchange, returnAmount);
        ERC228(exchange).change(_toToken, _fromToken, returnAmount, _amount);
        uint256 realReturnAmount = ERC20(_fromToken).balanceOf(this).sub(fromBalance);
        require(realReturnAmount >= _amount);

        if (realReturnAmount > _amount) {
            uint256 reward = realReturnAmount.sub(_amount);
            ERC20(_fromToken).transfer(msg.sender, reward); // Arbiter reward
            require(ERC20(_fromToken).balanceOf(this) == fromBalance.add(_amount));
        }

        emit Change(_fromToken, _toToken, msg.sender, _amount, returnAmount);
    }

}