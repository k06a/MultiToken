// @flow
'use strict'

const abi = require('ethereumjs-abi');
const BigNumber = web3.BigNumber;
const expect = require('chai').expect;
const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(web3.BigNumber))
    .should();

import ether from './helpers/ether';
import { advanceBlock } from './helpers/advanceToBlock';
import { increaseTimeTo, duration } from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';
import EVMThrow from './helpers/EVMThrow';

const Token = artifacts.require('Token.sol');
const BrokenTransferToken = artifacts.require('BrokenTransferToken.sol');
const BrokenTransferFromToken = artifacts.require('BrokenTransferFromToken.sol');
const BasicMultiToken = artifacts.require('BasicMultiToken.sol');

contract('BasicMultiToken', function ([_, wallet1, wallet2, wallet3, wallet4, wallet5]) {

    let abc;
    let xyz;
    let lmn;
    let multi;

    beforeEach(async function() {
        abc = await Token.new("ABC");
        await abc.mint(_, 1000e6);
        await abc.mint(wallet1, 50e6);
        await abc.mint(wallet2, 50e6);

        xyz = await Token.new("XYZ");
        await xyz.mint(_, 500e6);
        await xyz.mint(wallet1, 50e6);
        await xyz.mint(wallet2, 50e6);

        lmn = await Token.new("LMN");
        await lmn.mint(_, 100e6);
    });

    it('should fail to create multitoken for 1 token', async function() {
        await BasicMultiToken.new([abc.address], "Multi", "1ABC", 18).should.be.rejectedWith(EVMRevert);
        await BasicMultiToken.new([xyz.address], "Multi", "1XYZ", 18).should.be.rejectedWith(EVMRevert);
    });

    describe('mint', async function () {
        beforeEach(async function() {
            multi = await BasicMultiToken.new([abc.address, xyz.address], "Multi", "1ABC_1XYZ", 18);
        });

        it('should not mint first tokens with mint method', async function() {
            await multi.mint(_, 1).should.be.rejectedWith(EVMRevert);
        });

        it('should mint second tokens with mint method', async function() {
            await abc.approve(multi.address, 1000e6);
            await xyz.approve(multi.address, 500e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);

            await abc.approve(multi.address, 10e6, { from: wallet1 });
            await xyz.approve(multi.address, 5e6, { from: wallet1 });
            await multi.mint(wallet1, 10, { from: wallet1 });
        });

        it('should mint first tokens with mintFirstTokens method', async function() {
            await abc.approve(multi.address, 1000e6);
            await xyz.approve(multi.address, 500e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
        });

        it('should not mint second tokens with mintFirstTokens method', async function() {
            await abc.approve(multi.address, 1002e6);
            await xyz.approve(multi.address, 501e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
            await multi.mintFirstTokens(_, 1, [2e6, 1e6]).should.be.rejectedWith(EVMRevert);
        });

        it('should not mint invalid number of volumes', async function() {
            await abc.approve(multi.address, 1002e6);
            await xyz.approve(multi.address, 501e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6, 100e6]).should.be.rejectedWith(EVMRevert);
            await multi.mintFirstTokens(_, 1, [2e6]).should.be.rejectedWith(EVMRevert);
        });

        it('should handle wrong transferFrom of tokens', async function() {
            const _abc = await BrokenTransferFromToken.new("ABC");
            await _abc.mint(_, 1000e6);
            const _xyz = await BrokenTransferFromToken.new("XYZ");
            await _xyz.mint(_, 500e6);

            const brokenMulti = await BasicMultiToken.new([_abc.address, _xyz.address], "Multi", "1ABC_1XYZ", 18);
            await _abc.approve(brokenMulti.address, 1000e6);
            await _xyz.approve(brokenMulti.address, 500e6);
            await brokenMulti.mintFirstTokens(_, 1000, [1000e6, 500e6]).should.be.rejectedWith(EVMRevert);
        })
    });

    describe('burn', async function () {
        beforeEach(async function() {
            multi = await BasicMultiToken.new([abc.address, xyz.address], "Multi", "1ABC_1XYZ", 18);
            await abc.approve(multi.address, 1000e6);
            await xyz.approve(multi.address, 500e6);
            await multi.mintFirstTokens(_, 1000, [1000e6, 500e6]);
        });

        it('should not burn when no tokens', async function() {
            await multi.burn(1, { from: wallet1 }).should.be.rejectedWith(EVMThrow);
        });

        it('should not burn too many tokens', async function() {
            await multi.burn(1001).should.be.rejectedWith(EVMThrow);
        });

        it('should burn owned tokens', async function() {
            await multi.burn(200);
            await multi.burn(801).should.be.rejectedWith(EVMThrow);
            await multi.burn(300);
            await multi.burn(501).should.be.rejectedWith(EVMThrow);
            await multi.burn(500);
            await multi.burn(1).should.be.rejectedWith(EVMThrow);

            (await abc.balanceOf.call(multi.address)).should.be.bignumber.equal(0);
            (await xyz.balanceOf.call(multi.address)).should.be.bignumber.equal(0);
        });

        it('should not be able to burn none tokens', async function() {
            await multi.burnSome(100, []).should.be.rejectedWith(EVMRevert);
        });

        it('should be able to burnSome in case of first tokens paused', async function() {
            await abc.pause();
            await multi.burn(500).should.be.rejectedWith(EVMRevert);

            const xyzBalance = await xyz.balanceOf.call(multi.address);
            await multi.burnSome(500, [xyz.address]);
            (await multi.balanceOf.call(_)).should.be.bignumber.equal(500);
            (await xyz.balanceOf.call(_)).should.be.bignumber.equal(xyzBalance / 2);
        });

        it('should be able to burnSome in case of last tokens paused', async function() {
            await xyz.pause();
            await multi.burn(500).should.be.rejectedWith(EVMRevert);

            const abcBalance = await abc.balanceOf.call(multi.address);
            await multi.burnSome(500, [abc.address]);
            (await multi.balanceOf.call(_)).should.be.bignumber.equal(500);
            (await abc.balanceOf.call(_)).should.be.bignumber.equal(abcBalance / 2);
        });

        it('should be able to receive airdrop while burn', async function() {
            await lmn.transfer(multi.address, 100e6);

            const lmnBalance = await lmn.balanceOf.call(multi.address);
            await multi.burnSome(500, [abc.address, xyz.address, lmn.address]);
            (await multi.balanceOf.call(_)).should.be.bignumber.equal(500);
            (await lmn.balanceOf.call(_)).should.be.bignumber.equal(lmnBalance / 2);
        });
    });
});
