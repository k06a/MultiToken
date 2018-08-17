pragma solidity ^0.4.24;

import "./IDeployer.sol";
import "../BasicMultiToken.sol";


contract BasicMultiTokenDeployer is IDeployer {
    function deploy(bytes data) external returns(address mtkn) {
        require(
            // init(address[],string,string,uint8)
            (data[0] == 0x46 && data[1] == 0x86 && data[2] == 0xb4 && data[3] == 0xbe)
        );

        mtkn = new BasicMultiToken();
        require(mtkn.call(data));
    }
}
