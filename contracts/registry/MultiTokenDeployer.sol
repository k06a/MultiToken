pragma solidity ^0.4.24;

import "./IDeployer.sol";
import "../MultiToken.sol";


contract MultiTokenDeployer is IDeployer {
    function deploy(bytes data) external returns(address mtkn) {
        require(
            // init(address[],uint256[],string,string,uint8)
            (data[0] == 0x6f && data[1] == 0x5f && data[2] == 0x53 && data[3] == 0x5d) ||
            // init2(address[],uint256[],string,string,uint8)
            (data[0] == 0x18 && data[1] == 0x2a && data[2] == 0x54 && data[3] == 0x15)
        );

        mtkn = new MultiToken();
        require(mtkn.call(data));
    }
}
