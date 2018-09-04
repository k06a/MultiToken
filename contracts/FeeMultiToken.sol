pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./ext/CheckedERC20.sol";
import "./MultiToken.sol";


contract FeeMultiToken is Ownable, MultiToken {
    using CheckedERC20 for ERC20;

    uint256 public constant TOTAL_PERCRENTS = 1000000;
    uint256 public lendFee;
    uint256 public changeFee;
    uint256 public refferalFee;

    function init(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 /*_decimals*/) public {
        super.init(_tokens, _weights, _name, _symbol, 18);
    }

    function setLendFee(uint256 _lendFee) public onlyOwner {
        require(_lendFee <= 30000, "setLendFee: fee should be not greater than 3%");
        lendFee = _lendFee;
    }

    function setChangeFee(uint256 _changeFee) public onlyOwner {
        require(_changeFee <= 30000, "setChangeFee: fee should be not greater than 3%");
        changeFee = _changeFee;
    }

    function setRefferalFee(uint256 _refferalFee) public onlyOwner {
        require(_refferalFee <= 500000, "setChangeFee: fee should be not greater than 50% of changeFee");
        refferalFee = _refferalFee;
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns(uint256 returnAmount) {
        returnAmount = super.getReturn(_fromToken, _toToken, _amount).mul(TOTAL_PERCRENTS.sub(changeFee)).div(TOTAL_PERCRENTS);
    }

    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) public returns(uint256 returnAmount) {
        returnAmount = changeWithRef(_fromToken, _toToken, _amount, _minReturn, 0);
    }

    function changeWithRef(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn, address _ref) public returns(uint256 returnAmount) {
        returnAmount = super.change(_fromToken, _toToken, _amount, _minReturn);
        uint256 refferalAmount = returnAmount
            .mul(changeFee).div(TOTAL_PERCRENTS.sub(changeFee))
            .mul(refferalFee).div(TOTAL_PERCRENTS);

        ERC20(_toToken).checkedTransfer(_ref, refferalAmount);
    }

    function lend(address _to, ERC20 _token, uint256 _amount, address _target, bytes _data) public payable {
        uint256 prevBalance = _token.balanceOf(this);
        super.lend(_to, _token, _amount, _target, _data);
        require(_token.balanceOf(this) >= prevBalance.mul(TOTAL_PERCRENTS.add(lendFee)).div(TOTAL_PERCRENTS), "lend: tokens must be returned with lend fee");
    }
}
