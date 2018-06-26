pragma solidity ^0.4.24;


interface ERC228 {
    function changeableTokenCount() external view returns (uint16 count);
    function changeableToken(uint16 _tokenIndex) external view returns (address tokenAddress);
    function getReturn(address _fromToken, address _toToken, uint256 _amount) external view returns (uint256 returnAmount);
    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) external returns (uint256 returnAmount);

    event Update();
    event Change(address indexed _fromToken, address indexed _toToken, address indexed _changer, uint256 _amount, uint256 _return);
}
