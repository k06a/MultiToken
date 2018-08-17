pragma solidity ^0.4.24;

import "./IBasicMultiToken.sol";


contract IMultiToken is IBasicMultiToken {
    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns (uint256 returnAmount);
    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) public returns (uint256 returnAmount);

    event Update();
    event Change(address indexed _fromToken, address indexed _toToken, address indexed _changer, uint256 _amount, uint256 _return);
}
