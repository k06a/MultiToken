pragma solidity ^0.4.24;


interface IDeployer {
    function deploy(bytes data) external returns(address mtkn);
}