pragma solidity ^0.4.24;

import "./ext/CheckedERC20.sol";
import "./interface/IMultiToken.sol";
import "./BasicMultiToken.sol";


contract MultiToken is IMultiToken, BasicMultiToken {
    using CheckedERC20 for ERC20;

    uint inLendingMode;
    uint256 internal minimalWeight;
    mapping(address => uint256) public weights;

    function init(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 _decimals) public {
        super.init(_tokens, _name, _symbol, _decimals);
        require(_weights.length == tokens.length, "Lenghts of _tokens and _weights array should be equal");
        for (uint i = 0; i < tokens.length; i++) {
            require(_weights[i] != 0, "The _weights array should not contains zeros");
            require(weights[tokens[i]] == 0, "The _tokens array have duplicates");
            weights[tokens[i]] = _weights[i];
            if (minimalWeight == 0 || minimalWeight < _weights[i]) {
                minimalWeight = _weights[i];
            }
        }
    }

    function init2(ERC20[] _tokens, uint256[] _weights, string _name, string _symbol, uint8 _decimals) public {
        init(_tokens, _weights, _name, _symbol, _decimals);
    }

    function getReturn(address _fromToken, address _toToken, uint256 _amount) public view returns(uint256 returnAmount) {
        if (weights[_fromToken] > 0 && weights[_toToken] > 0 && _fromToken != _toToken) {
            uint256 fromBalance = ERC20(_fromToken).balanceOf(this);
            uint256 toBalance = ERC20(_toToken).balanceOf(this);
            returnAmount = _amount.mul(toBalance).mul(weights[_fromToken]).div(
                _amount.mul(weights[_fromToken]).div(minimalWeight).add(fromBalance)
            );
        }
    }

    function change(address _fromToken, address _toToken, uint256 _amount, uint256 _minReturn) public returns(uint256 returnAmount) {
        require(inLendingMode == 0);
        returnAmount = getReturn(_fromToken, _toToken, _amount);
        require(returnAmount > 0, "The return amount is zero");
        require(returnAmount >= _minReturn, "The return amount is less than _minReturn value");
        
        ERC20(_fromToken).checkedTransferFrom(msg.sender, this, _amount);
        ERC20(_toToken).checkedTransfer(msg.sender, returnAmount);

        emit Change(_fromToken, _toToken, msg.sender, _amount, returnAmount);
    }

    // Instant Loans

    function lend(address _to, ERC20 _token, uint256 _amount, address _target, bytes _data) public payable {
        inLendingMode += 1;
        super.lend(_to, _token, _amount, _target, _data);
        inLendingMode -= 1;
    }

    // Public Getters

    function allWeights() public view returns(uint256[] _weights) {
        _weights = new uint256[](tokens.length);
        for (uint i = 0; i < tokens.length; i++) {
            _weights[i] = weights[tokens[i]];
        }
    }

    function allTokensBalancesDecimalsWeights() public view returns(ERC20[] _tokens, uint256[] _balances, uint8[] _decimals, uint256[] _weights) {
        (_tokens, _balances, _decimals) = allTokensBalancesDecimals();
        _weights = allWeights();
    }

}
