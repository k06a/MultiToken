pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract MultiToken is StandardToken {
    
    ERC20[] tokens;

    event Mint(address indexed minter, uint256 value);
    event Burn(address indexed burner, uint256 value);
    
    constructor(ERC20[] _tokens) public {
        tokens = _tokens;
    }

    function mint(address _to, uint256 _amount) public {
        uint256[] memory tokenAmounts = new uint256[](tokens.length);
        for (uint i = 0; i < tokens.length; i++) {
            tokenAmounts[i] = _amount.mul(tokens[i].balanceOf(this)).div(totalSupply_);
        }
        mintAmounts_(_to, _amount, tokenAmounts);
    }

    function mintAmounts(address _to, uint256 _amount, uint256[] _tokenAmounts) public {
        require(totalSupply_ == 0, "This method can be used on zero total supply only");
        mintAmounts_(_to, _amount, _tokenAmounts);
    }

    function mintAmounts_(address _to, uint256 _amount, uint256[] _tokenAmounts) internal {
        require(tokens.length == _tokenAmounts.length, "Lenghts of tokens and _tokenAmounts array should be equal");
        for (uint i = 0; i < tokens.length; i++) {
            require(tokens[i].transferFrom(msg.sender, this, _tokenAmounts[i]));
        }

        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
    }

    function burn(uint256 _value) public {
        burnSome(_value, tokens);
    }

    function burnSome(uint256 _value, ERC20[] someTokens) public {
        require(_value <= balances[msg.sender]);

        for (uint i = 0; i < someTokens.length; i++) {
            uint256 tokenAmount = _value.mul(someTokens[i].balanceOf(this)).div(totalSupply_);
            require(someTokens[i].transfer(msg.sender, tokenAmount));
        }
        
        balances[msg.sender] = balances[msg.sender].sub(_value);
        totalSupply_ = totalSupply_.sub(_value);
        emit Burn(msg.sender, _value);
        emit Transfer(msg.sender, address(0), _value);
    }

}
