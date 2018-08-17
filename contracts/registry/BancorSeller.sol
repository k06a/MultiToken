pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/CanReclaimToken.sol";
import { IMultiToken } from "../interface/IMultiToken.sol";
import "../ext/CheckedERC20.sol";


contract BancorSeller is CanReclaimToken {
    using SafeMath for uint256;
    using CheckedERC20 for ERC20;
    using CheckedERC20 for IMultiToken;

    function () public payable {
        require(tx.origin != msg.sender);
    }
    
    ////////////////////////////////////////////////////////////////

    function sell10(
        ERC20[] _tokens,
        address[] _exchanges,
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
    {
        if (_exchanges.length > 0) {
            sellInternal(_tokens[0], _exchanges[0], ERC20(_tokens[0]).balanceOf(this), _data1);
            if (_exchanges.length > 1) {
                sellInternal(_tokens[1], _exchanges[1], ERC20(_tokens[1]).balanceOf(this), _data2);
                if (_exchanges.length > 2) {
                    sellInternal(_tokens[2], _exchanges[2], ERC20(_tokens[2]).balanceOf(this), _data3);
                    if (_exchanges.length > 3) {
                        sellInternal(_tokens[3], _exchanges[3], ERC20(_tokens[3]).balanceOf(this), _data4);
                        if (_exchanges.length > 4) {
                            sellInternal(_tokens[4], _exchanges[4], ERC20(_tokens[4]).balanceOf(this), _data5);
                            if (_exchanges.length > 5) {
                                sellInternal(_tokens[5], _exchanges[5], ERC20(_tokens[5]).balanceOf(this), _data6);
                                if (_exchanges.length > 6) {
                                    sellInternal(_tokens[6], _exchanges[6], ERC20(_tokens[6]).balanceOf(this), _data7);
                                    if (_exchanges.length > 7) {
                                        sellInternal(_tokens[7], _exchanges[7], ERC20(_tokens[7]).balanceOf(this), _data8);
                                        if (_exchanges.length > 8) {
                                            sellInternal(_tokens[8], _exchanges[8], ERC20(_tokens[8]).balanceOf(this), _data9);
                                            if (_exchanges.length > 9) {
                                                sellInternal(_tokens[9], _exchanges[9], ERC20(_tokens[9]).balanceOf(this), _data10);
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

    function sell10unbundle(
        IMultiToken _mtkn,
        ERC20[] _tokens,
        address[] _exchanges,
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
    {
        //_mtkn.checkedTransferFrom(msg.sender, this, _amount); // Too deep stack
        _mtkn.unbundleSome(this, _mtkn.balanceOf(this), _tokens);
        
        sell10(_tokens, _exchanges, _data1, _data2, _data3, _data4, _data5, _data6, _data7, _data8, _data9, _data10);
        tx.origin.transfer(address(this).balance);

        // if (_exchanges.length > 0) {
        //     _tokens[0].checkedTransfer(tx.origin, amounts[0]);
        //     if (_exchanges.length > 1) {
        //         _tokens[1].checkedTransfer(tx.origin, amounts[1]);
        //         if (_exchanges.length > 2) {
        //             _tokens[2].checkedTransfer(tx.origin, amounts[2]);
        //             if (_exchanges.length > 3) {
        //                 _tokens[3].checkedTransfer(tx.origin, amounts[3]);
        //                 if (_exchanges.length > 4) {
        //                     _tokens[4].checkedTransfer(tx.origin, amounts[4]);
        //                     if (_exchanges.length > 5) {
        //                         _tokens[5].checkedTransfer(tx.origin, amounts[5]);
        //                         if (_exchanges.length > 6) {
        //                             _tokens[6].checkedTransfer(tx.origin, amounts[6]);
        //                             // if (_exchanges.length > 7) {
        //                             //     _tokens[7].checkedTransfer(tx.origin, amounts[7]);
        //                             //     // if (_exchanges.length > 8) {
        //                             //     //     _tokens[8].checkedTransfer(tx.origin, amounts[8]);
        //                             //     //     // if (_exchanges.length > 9) {
        //                             //     //     //     _tokens[9].checkedTransfer(tx.origin, amounts[9]);
        //                             //     //     // }
        //                             //     // }
        //                             // }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    ////////////////////////////////////////////////////////////////

    function sellInternal(
        ERC20 _token,
        address _exchange,
        uint256 _amount,
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
            "sellInternal: Do not try to call transfer, approve or transferFrom"
        );
        _token.approve(_exchange, _amount);
        require(_exchange.call(_data));
    }

}
