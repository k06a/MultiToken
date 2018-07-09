pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract ERC1133 {
    event Mint(address indexed minter, uint256 value);
    event Burn(address indexed burner, uint256 value);

    function tokensCount() public view returns(uint);
    function tokens(uint _index) public view returns(ERC20);
    function allTokens() public view returns(ERC20[]);
    function allBalances() public view returns(uint[]);
    
    function mintFirstTokens(address _to, uint256 _amount, uint256[] _tokenAmounts) public;
    function mint(address _to, uint256 _amount) public;

    function burn(uint256 _value) public;
    function burnSome(uint256 _value, ERC20[] _someTokens) public;
}
