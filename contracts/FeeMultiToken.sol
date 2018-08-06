pragma solidity ^0.4.24;

import "./MultiToken.sol";


contract FeeMultiToken is MultiToken {
    function init(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 /*_decimals*/) public {
        super.init(_tokens, _weights, _name, _symbol, 18);
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns(uint256 returnAmount) {
        returnAmount = super.getReturn(_fromToken, _toToken, _amount).mul(998).div(1000); // 0.2% exchange fee
    }

    function lend(address _to, ERC20 _token, uint256 _amount, address _target, bytes _data) public payable {
        uint256 prevBalance = _token.balanceOf(this);
        super.lend(_to, _token, _amount, _target, _data);
        require(_token.balanceOf(this) >= prevBalance.mul(101).div(100), "Lended token must be refilled with 1% fee");
    }
}
