pragma solidity ^0.4.24;

import "./MultiToken.sol";


contract FeeMultiToken is MultiToken {
    function init(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 /*_decimals*/) public {
        super.init(_tokens, _weights, _name, _symbol, 18);
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns(uint256 returnAmount) {
        returnAmount = super.getReturn(_fromToken, _toToken, _amount).mul(998).div(1000); // 0.2% exchange fee
    }
}
