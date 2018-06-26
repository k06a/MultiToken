pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "../MultiToken.sol";


contract BancorBuyer {

    function buy(MultiToken mtkn, uint256 amount, address[] exchanges, bytes[] datas, uint256[] values) payable public {
        for (uint i = 0; i < exchanges.length; i++) {
            ERC20 token = mtkn.tokens(i);
            require(exchanges[i].call.value(values[i])(datas[i]));
            token.approve(mtkn, token.balanceOf(this));
        }
        mtkn.mint(msg.sender, amount);
    }

    function buyOptimized(
        MultiToken mtkn,
        uint256 amount,
        address bntExchange,
        bytes bntExchangeData,
        address[] exchanges,
        bytes[] datas,
        uint256[] values) 
        payable
        public
    {
        require(bntExchange.call.value(msg.value)(bntExchangeData));
        for (uint i = 0; i < exchanges.length; i++) {
            ERC20 token = mtkn.tokens(i);
            token.approve(exchanges[i], values[i]);
            require(exchanges[i].call(datas[i]));
            token.approve(mtkn, token.balanceOf(this));
        }
        mtkn.mint(msg.sender, amount);
    }

}