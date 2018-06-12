pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";


contract BasicMultiToken is StandardToken, DetailedERC20 {
    
    ERC20[] public tokens;

    event Mint(address indexed minter, uint256 value);
    event Burn(address indexed burner, uint256 value);
    
    constructor(ERC20[] _tokens, string _name, string _symbol, uint8 _decimals) public
        DetailedERC20(_name, _symbol, _decimals)
    {
        require(_tokens.length >= 2, "Contract do not support less than 2 inner tokens");
        tokens = _tokens;
    }

    function mintFirstTokens(address _to, uint256 _amount, uint256[] _tokenAmounts) public {
        require(totalSupply_ == 0, "This method can be used with zero total supply only");
        _mint(_to, _amount, _tokenAmounts);
    }

    function mint(address _to, uint256 _amount) public {
        require(totalSupply_ != 0, "This method can be used with non zero total supply only");
        uint256[] memory tokenAmounts = new uint256[](tokens.length);
        for (uint i = 0; i < tokens.length; i++) {
            tokenAmounts[i] = tokens[i].balanceOf(this).mul(_amount).div(totalSupply_);
        }
        _mint(_to, _amount, tokenAmounts);
    }

    function burn(uint256 _value) public {
        burnSome(_value, tokens);
    }

    function burnSome(uint256 _value, ERC20[] someTokens) public {
        require(someTokens.length > 0, "Array of tokens can't be empty");

        uint256 totalSupply = totalSupply_;
        balances[msg.sender] = balances[msg.sender].sub(_value);
        totalSupply_ = totalSupply.sub(_value);
        emit Burn(msg.sender, _value);
        emit Transfer(msg.sender, address(0), _value);

        for (uint i = 0; i < someTokens.length; i++) {
            uint256 prevBalance = someTokens[i].balanceOf(this);
            uint256 tokenAmount = prevBalance.mul(_value).div(totalSupply);
            someTokens[i].transfer(msg.sender, tokenAmount); // Can't use require because not all ERC20 tokens return bool
            require(someTokens[i].balanceOf(this) == prevBalance.sub(tokenAmount), "Invalid token behavior");
        }
    }

    function _mint(address _to, uint256 _amount, uint256[] _tokenAmounts) internal {
        require(tokens.length == _tokenAmounts.length, "Lenghts of tokens and _tokenAmounts array should be equal");

        for (uint i = 0; i < tokens.length; i++) {
            uint256 prevBalance = tokens[i].balanceOf(this);
            tokens[i].transferFrom(msg.sender, this, _tokenAmounts[i]); // Can't use require because not all ERC20 tokens return bool
            require(tokens[i].balanceOf(this) == prevBalance.add(_tokenAmounts[i]), "Invalid token behavior");
        }

        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
    }

}
