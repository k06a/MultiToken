pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract IDeployer is Ownable {
    function deploy(bytes data) external returns(address mtkn);
}