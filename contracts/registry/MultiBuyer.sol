pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/CanReclaimToken.sol";
import "../interface/IMultiToken.sol";


contract MultiBuyer is CanReclaimToken {
    using SafeMath for uint256;

    function buyOnApprove(
        IMultiToken _mtkn,
        uint256 _minimumReturn,
        ERC20 _throughToken,
        address[] _exchanges,
        bytes _datas,
        uint[] _datasIndexes, // including 0 and LENGTH values
        uint256[] _values
    )
        public
        payable
    {
        require(_datasIndexes.length == _exchanges.length + 1, "buy: _datasIndexes should start with 0 and end with LENGTH");
        require(_values.length == _exchanges.length, "buy: _values should have the same length as _exchanges");

        for (uint i = 0; i < _exchanges.length; i++) {
            bytes memory data = new bytes(_datasIndexes[i + 1] - _datasIndexes[i]);
            for (uint j = _datasIndexes[i]; j < _datasIndexes[i + 1]; j++) {
                data[j - _datasIndexes[i]] = _datas[j];
            }

            if (_throughToken != address(0) && _values[i] == 0) {
                if (_throughToken.allowance(this, _exchanges[i]) == 0) {
                    _throughToken.approve(_exchanges[i], uint256(-1));
                }
                require(_exchanges[i].call(data), "buy: exchange arbitrary call failed");
            } else {
                require(_exchanges[i].call.value(_values[i])(data), "buy: exchange arbitrary call failed");
            }
        }

        j = _mtkn.totalSupply(); // optimization totalSupply
        uint256 bestAmount = uint256(-1);
        for (i = _mtkn.tokensCount(); i > 0; i--) {
            ERC20 token = _mtkn.tokens(i - 1);
            if (token.allowance(this, _mtkn) == 0) {
                token.approve(_mtkn, uint256(-1));
            }

            uint256 amount = j.mul(token.balanceOf(this)).div(token.balanceOf(_mtkn));
            if (amount < bestAmount) {
                bestAmount = amount;
            }
        }

        require(bestAmount >= _minimumReturn, "buy: return value is too low");
        _mtkn.bundle(msg.sender, bestAmount);
        if (address(this).balance > 0) {
            msg.sender.transfer(address(this).balance);
        }
        if (_throughToken != address(0) && _throughToken.balanceOf(this) > 0) {
            _throughToken.transfer(msg.sender, _throughToken.balanceOf(this));
        }
    }

    function buyFirstTokensOnApprove(
        IMultiToken _mtkn,
        ERC20 _throughToken,
        address[] _exchanges,
        bytes _datas,
        uint[] _datasIndexes, // including 0 and LENGTH values
        uint256[] _values
    )
        public
        payable
    {
        require(_datasIndexes.length == _exchanges.length + 1, "buy: _datasIndexes should start with 0 and end with LENGTH");
        require(_values.length == _exchanges.length, "buy: _values should have the same length as _exchanges");

        for (uint i = 0; i < _exchanges.length; i++) {
            bytes memory data = new bytes(_datasIndexes[i + 1] - _datasIndexes[i]);
            for (uint j = _datasIndexes[i]; j < _datasIndexes[i + 1]; j++) {
                data[j - _datasIndexes[i]] = _datas[j];
            }

            if (_throughToken != address(0) && _values[i] == 0) {
                if (_throughToken.allowance(this, _exchanges[i]) == 0) {
                    _throughToken.approve(_exchanges[i], uint256(-1));
                }
                require(_exchanges[i].call(data), "buy: exchange arbitrary call failed");
            } else {
                require(_exchanges[i].call.value(_values[i])(data), "buy: exchange arbitrary call failed");
            }
        }

        uint tokensCount = _mtkn.tokensCount();
        uint256[] memory amounts = new uint256[](tokensCount);
        for (i = 0; i < tokensCount; i++) {
            ERC20 token = _mtkn.tokens(i);
            if (token.allowance(this, _mtkn) == 0) {
                token.approve(_mtkn, uint256(-1));
            }
        }

        _mtkn.bundleFirstTokens(msg.sender, msg.value.mul(1000), amounts);
        if (address(this).balance > 0) {
            msg.sender.transfer(address(this).balance);
        }
        if (_throughToken != address(0) && _throughToken.balanceOf(this) > 0) {
            _throughToken.transfer(msg.sender, _throughToken.balanceOf(this));
        }
    }
}
