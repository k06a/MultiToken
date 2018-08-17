pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../interface/IMultiToken.sol";
import "../ext/CheckedERC20.sol";


contract BancorBuyer {
    using SafeMath for uint256;
    using CheckedERC20 for ERC20;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public tokenBalances; // [owner][token]
    
    function allBalances(address _account, address[] _tokens) public view returns(uint256[] _tokenBalances) {
        _tokenBalances = new uint256[](_tokens.length);
        for (uint i = 0; i < _tokens.length; i++) {
            _tokenBalances[i] = tokenBalances[_account][_tokens[i]];
        }
    }

    function deposit(address _beneficiary, address[] _tokens, uint256[] _tokenValues) external payable {
        if (msg.value > 0) {
            balances[_beneficiary] = balances[_beneficiary].add(msg.value);
        }

        for (uint i = 0; i < _tokens.length; i++) {
            ERC20 token = ERC20(_tokens[i]);
            uint256 tokenValue = _tokenValues[i];

            token.checkedTransferFrom(msg.sender, this, tokenValue);
            tokenBalances[_beneficiary][token] = tokenBalances[_beneficiary][token].add(tokenValue);
        }
    }
    
    function withdrawInternal(address _to, uint256 _value, address[] _tokens, uint256[] _tokenValues) internal {
        if (_value > 0) {
            _to.transfer(_value);
            balances[msg.sender] = balances[msg.sender].sub(_value);
        }

        for (uint i = 0; i < _tokens.length; i++) {
            ERC20 token = ERC20(_tokens[i]);
            uint256 tokenValue = _tokenValues[i];

            token.checkedTransfer(_to, tokenValue);
            tokenBalances[msg.sender][token] = tokenBalances[msg.sender][token].sub(tokenValue);
        }
    }

    function withdraw(address _to, uint256 _value, address[] _tokens, uint256[] _tokenValues) external {
        withdrawInternal(_to, _value, _tokens, _tokenValues);
    }
    
    function withdrawAll(address _to, address[] _tokens) external {
        uint256[] memory tokenValues = allBalances(msg.sender, _tokens);
        withdrawInternal(_to, balances[msg.sender], _tokens, tokenValues);
    }
    
    ////////////////////////////////////////////////////////////////
    
    function buy10(
        ERC20[] _tokens,
        address[] _exchanges,
        uint256[] _values,
        bytes _data1,
        bytes _data2,
        bytes _data3,
        bytes _data4,
        bytes _data5,
        bytes _data6,
        bytes _data7,
        bytes _data8,
        bytes _data9,
        bytes _data10
    ) 
        public
        payable
    {
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        if (_exchanges.length > 0) {
            buyInternal(_tokens[0], _exchanges[0], _values[0], _data1);
            if (_exchanges.length > 1) {
                buyInternal(_tokens[1], _exchanges[1], _values[1], _data2);
                if (_exchanges.length > 2) {
                    buyInternal(_tokens[2], _exchanges[2], _values[2], _data3);
                    if (_exchanges.length > 3) {
                        buyInternal(_tokens[3], _exchanges[3], _values[3], _data4);
                        if (_exchanges.length > 4) {
                            buyInternal(_tokens[4], _exchanges[4], _values[4], _data5);
                            if (_exchanges.length > 5) {
                                buyInternal(_tokens[5], _exchanges[5], _values[5], _data6);
                                if (_exchanges.length > 6) {
                                    buyInternal(_tokens[6], _exchanges[6], _values[6], _data7);
                                    if (_exchanges.length > 7) {
                                        buyInternal(_tokens[7], _exchanges[7], _values[7], _data8);
                                        if (_exchanges.length > 8) {
                                            buyInternal(_tokens[8], _exchanges[8], _values[8], _data9);
                                            if (_exchanges.length > 9) {
                                                buyInternal(_tokens[9], _exchanges[9], _values[9], _data10);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    function buy10bundle(
        IMultiToken _mtkn,
        ERC20[] _tokens,
        address[] _exchanges,
        uint256[] _values,
        bytes _data1,
        bytes _data2,
        bytes _data3,
        bytes _data4,
        bytes _data5,
        bytes _data6,
        bytes _data7,
        bytes _data8,
        bytes _data9,
        bytes _data10
    ) 
        public
        payable
    {
        buy10(_tokens, _exchanges, _values, _data1, _data2, _data3, _data4, _data5, _data6, _data7, _data8, _data9, _data10);
        bundleInternal(_mtkn, _values);
    }

    ////////////////////////////////////////////////////////////////

    function buyInternal(
        ERC20 token,
        address _exchange,
        uint256 _value,
        bytes _data
    ) 
        internal
    {
        if (_data.length == 0) {
            return;
        }
        require(
            // 0xa9059cbb - transfer(address,uint256)
            !(_data[0] == 0xa9 && _data[1] == 0x05 && _data[2] == 0x9c && _data[3] == 0xbb) &&
            // 0x095ea7b3 - approve(address,uint256)
            !(_data[0] == 0x09 && _data[1] == 0x5e && _data[2] == 0xa7 && _data[3] == 0xb3) &&
            // 0x23b872dd - transferFrom(address,address,uint256)
            !(_data[0] == 0x23 && _data[1] == 0xb8 && _data[2] == 0x72 && _data[3] == 0xdd),
            "buyInternal: Do not try to call transfer, approve or transferFrom"
        );
        uint256 tokenBalance = token.balanceOf(this);
        require(_exchange.call.value(_value)(_data));
        balances[msg.sender] = balances[msg.sender].sub(_value);
        tokenBalances[msg.sender][token] = tokenBalances[msg.sender][token]
            .add(token.balanceOf(this).sub(tokenBalance));
    }
    
    function bundleInternal(
        IMultiToken _mtkn,
        uint256[] _notUsedValues
    ) 
        internal
    {
        uint256 totalSupply = _mtkn.totalSupply();
        uint256 bestAmount = uint256(-1);
        uint256 tokensCount = _mtkn.tokensCount();
        for (uint i = 0; i < tokensCount; i++) {
            ERC20 token = _mtkn.tokens(i);

            // Approve XXX to mtkn
            uint256 thisTokenBalance = tokenBalances[msg.sender][token];
            uint256 mtknTokenBalance = token.balanceOf(_mtkn);
            _notUsedValues[i] = token.balanceOf(this);
            token.approve(_mtkn, thisTokenBalance);
            
            uint256 amount = totalSupply.mul(thisTokenBalance).div(mtknTokenBalance);
            if (amount < bestAmount) {
                bestAmount = amount;
            }
        }

        // Bundle mtkn
        _mtkn.bundle(msg.sender, bestAmount);
        
        for (i = 0; i < tokensCount; i++) {
            token = _mtkn.tokens(i);
            token.approve(_mtkn, 0);
            tokenBalances[msg.sender][token] = tokenBalances[msg.sender][token]
                .sub(_notUsedValues[i].sub(token.balanceOf(this)));
        }
    }

}
