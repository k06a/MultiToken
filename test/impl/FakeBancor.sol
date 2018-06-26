pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../../contracts/ERC228.sol";


contract FakeBancor is ERC228 {
    using SafeMath for uint256;

    ERC20 public tokenA;
    ERC20 public tokenB;

    constructor(ERC20 _tokenA, ERC20 _tokenB) public {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function changeableTokenCount() external view returns (uint16 count) {
        count = 2;
    }

    function changeableToken(uint16 _tokenIndex) external view returns (address tokenAddress) {
        if (_tokenIndex == 0) {
            tokenAddress = tokenA;
        }
        if (_tokenIndex == 1) {
            tokenAddress = tokenB;
        }
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) external view returns (uint256 returnAmount) {
        if ((_fromToken == address(tokenA) && _toToken == address(tokenB)) ||
            (_fromToken == address(tokenB) && _toToken == address(tokenA))) {
            uint256 fromBalance = ERC20(_fromToken).balanceOf(this);
            uint256 toBalance = ERC20(_toToken).balanceOf(this);
            returnAmount = toBalance.mul(_amount).div(fromBalance);
        }
    }

    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) external returns (uint256 returnAmount) {
        returnAmount = this.getReturn(_fromToken, _toToken, _amount);
        require(returnAmount > 0, "The return amount is zero");
        require(returnAmount >= _minReturn, "The return amount is less than _minReturn value");
        
        ERC20(_fromToken).transferFrom(msg.sender, this, _amount);
        ERC20(_toToken).transfer(msg.sender, returnAmount);
        emit Change(_fromToken, _toToken, msg.sender, _amount, returnAmount);
    }

    event Update();
    event Change(address indexed _fromToken, address indexed _toToken, address indexed _changer, uint256 _amount, uint256 _return);
}