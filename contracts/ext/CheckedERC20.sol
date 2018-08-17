pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


library CheckedERC20 {
    using SafeMath for uint;

    function checkedTransfer(ERC20 _token, address _to, uint256 _value) internal {
        if (_value == 0) {
            return;
        }
        uint256 balance = _token.balanceOf(this);
        _token.transfer(_to, _value);
        require(_token.balanceOf(this) == balance.sub(_value), "checkedTransfer: Final balance didn't match");
    }

    function checkedTransferFrom(ERC20 _token, address _from, address _to, uint256 _value) internal {
        if (_value == 0) {
            return;
        }
        uint256 toBalance = _token.balanceOf(_to);
        _token.transferFrom(_from, _to, _value);
        require(_token.balanceOf(_to) == toBalance.add(_value), "checkedTransfer: Final balance didn't match");
    }
}
