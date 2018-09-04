pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./IDeployer.sol";
import "../FeeMultiToken.sol";


contract MultiTokenDeployer is Ownable, IDeployer {
    function deploy(bytes data) external onlyOwner returns(address) {
        require(
            // init(address[],uint256[],string,string,uint8)
            (data[0] == 0x6f && data[1] == 0x5f && data[2] == 0x53 && data[3] == 0x5d) ||
            // init2(address[],uint256[],string,string,uint8)
            (data[0] == 0x18 && data[1] == 0x2a && data[2] == 0x54 && data[3] == 0x15)
        );

        FeeMultiToken mtkn = new FeeMultiToken();
        require(address(mtkn).call(data));
        mtkn.transferOwnership(msg.sender);
        return mtkn;
    }
}
